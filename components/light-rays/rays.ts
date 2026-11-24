import { mountShader } from "../lib/shader";

/** Beam shape knobs, as fractions of the canvas: x 0 (left) to 1 (right), y 0 (top) to 1 (bottom). */
export type RayField = {
	spread: number;
	center: number;
	width: number;
	widthVariance: number;
	softness: number;
	glow: number;
	top: number;
	length: number;
	lengthVariance: number;
	featherTop: number;
	featherBottom: number;
	shape: number;
	taper: number;
	edgeFade: number;
	cycle: number;
	duty: number;
	fade: number;
	stagger: number;
	sway: number;
	swaySpeed: number;
	shimmer: number;
	shimmerSpeed: number;
};

export type LightRaysOptions = {
	/** Three CSS colours; each beam samples the A, B, C ramp. var() and color-mix() resolve against the root. */
	colors: readonly [string, string, string];
	/** Time multiplier. */
	speed: number;
	/** Beam strength, 0 to 2. */
	intensity: number;
	/** How many beams exist at once, 1 to 64. */
	count: number;
	/** Reshuffles beam positions, widths and phases. */
	seed: number;
	field: RayField;
};

const MAX_RAYS = 64;

// WebGL 1: one full-screen triangle and no extensions, so it runs on old Safari and low-end Android.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uCount;
uniform float uSeed;
uniform float uIntensity;
uniform float uSpread;
uniform float uCenter;
uniform float uWidth;
uniform float uWidthVariance;
uniform float uSoftness;
uniform float uGlow;
uniform float uTop;
uniform float uLength;
uniform float uLengthVariance;
uniform float uFeatherTop;
uniform float uFeatherBottom;
uniform float uShape;
uniform float uTaper;
uniform float uEdgeFade;
uniform float uCycle;
uniform float uDuty;
uniform float uFade;
uniform float uStagger;
uniform float uSway;
uniform float uSwaySpeed;
uniform float uShimmer;
uniform float uShimmerSpeed;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

const int MAX_RAYS = ${MAX_RAYS};
const float TAU = 6.2831853;

float hash11(float p) {
	p = fract(p * 0.1031);
	p *= p + 33.33;
	p *= p + p;
	return fract(p);
}

float hash21(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * 0.1031);
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.x + p3.y) * p3.z);
}

vec3 ramp(float t) {
	return t < 0.5 ? mix(uColorA, uColorB, t * 2.0) : mix(uColorB, uColorC, (t - 0.5) * 2.0);
}

void main() {
	float x = gl_FragCoord.x / uResolution.x;
	float y = 1.0 - gl_FragCoord.y / uResolution.y;
	vec3 light = vec3(0.0);
	float coverage = 0.0;

	for (int i = 0; i < MAX_RAYS; i++) {
		if (float(i) >= uCount) break;
		float fi = float(i) + uSeed * 7.13;
		float hx = hash11(fi * 1.13 + 0.7);
		float hw = hash11(fi * 2.71 + 5.3);
		float hp = hash11(fi * 3.37 + 11.1);
		float hc = hash11(fi * 4.91 + 17.9);
		float hl = hash11(fi * 6.19 + 23.3);
		float hs = hash11(fi * 7.53 + 29.7);

		float phase = fract(uTime / max(uCycle, 0.01) + hp * uStagger + float(i) * 0.0137);
		float lit = phase / max(uDuty, 0.001);
		if (lit > 1.0) continue;
		float fade = clamp(uFade, 0.001, 0.5);
		float env = smoothstep(0.0, fade, lit) * (1.0 - smoothstep(1.0 - fade, 1.0, lit));
		if (env <= 0.0) continue;

		float len = max(uLength * (1.0 - uLengthVariance * hl), 0.001);
		float along = (y - uTop) / len;
		float mask = smoothstep(0.0, max(uFeatherTop, 0.0005), along)
			* (1.0 - smoothstep(1.0 - max(uFeatherBottom, 0.0005), 1.0, along));
		if (mask <= 0.0) continue;
		mask = pow(mask, uShape);

		float center = uCenter + (hx - 0.5) * uSpread;
		center += sin(uTime * uSwaySpeed * (0.4 + hs) + hp * TAU) * uSway;
		float width = uWidth * (1.0 + (hw - 0.5) * 2.0 * uWidthVariance);
		width *= mix(1.0, uTaper, clamp(along, 0.0, 1.0));
		width = max(width, 0.0002);

		float dx = (x - center) / width;
		float d2 = dx * dx;
		// A tight core plus a wide halo: far cheaper than a blur pass.
		float core = exp(-d2 * (1.0 + uSoftness * 8.0));
		float halo = exp(-d2 * 0.22) * uGlow;
		float shimmer = 1.0 + uShimmer * sin(along * 14.0 - uTime * uShimmerSpeed * 4.0 + hp * TAU);

		float amount = (core + halo) * mask * env * max(shimmer, 0.0);
		light += ramp(hc) * amount;
		coverage += amount;
	}

	float edge = max(uEdgeFade, 0.0005);
	float edgeMask = smoothstep(0.0, edge, x) * (1.0 - smoothstep(1.0 - edge, 1.0, x));
	light *= edgeMask;
	coverage *= edgeMask;

	// Beams paint their own colour with coverage as alpha, so they read on light and dark pages alike.
	float alpha = 1.0 - exp(-coverage * uIntensity * 1.15);
	vec3 paint = coverage > 0.0001 ? light / coverage : vec3(0.0);
	// Dither hides 8-bit banding in the soft gradients.
	float noise = hash21(gl_FragCoord.xy + fract(uTime) * 91.7) - 0.5;
	vec3 color = paint * alpha + noise * 0.03 * alpha;
	gl_FragColor = vec4(clamp(color, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
}
`;

const FIELD = [
	["uSpread", "spread"],
	["uCenter", "center"],
	["uWidth", "width"],
	["uWidthVariance", "widthVariance"],
	["uSoftness", "softness"],
	["uGlow", "glow"],
	["uTop", "top"],
	["uLength", "length"],
	["uLengthVariance", "lengthVariance"],
	["uFeatherTop", "featherTop"],
	["uFeatherBottom", "featherBottom"],
	["uShape", "shape"],
	["uTaper", "taper"],
	["uEdgeFade", "edgeFade"],
	["uCycle", "cycle"],
	["uDuty", "duty"],
	["uFade", "fade"],
	["uStagger", "stagger"],
	["uSway", "sway"],
	["uSwaySpeed", "swaySpeed"],
	["uShimmer", "shimmer"],
	["uShimmerSpeed", "shimmerSpeed"],
] as const;

const UNIFORMS = [
	"uCount",
	"uSeed",
	"uIntensity",
	...FIELD.map(([name]) => name),
	"uColorA",
	"uColorB",
	"uColorC",
] as const;
const COLORS = ["uColorA", "uColorB", "uColorC"] as const;

/** Runs the ray field on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountLightRays(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: LightRaysOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const shader = mountShader(
		root,
		canvas,
		{
			fragment: FRAGMENT,
			uniforms: UNIFORMS,
			context: {
				alpha: true,
				premultipliedAlpha: true,
				antialias: false,
				depth: false,
				powerPreference: "low-power",
			},
			stillTime: 12,
			frameMs: 33,
			colors(u, rgb) {
				COLORS.forEach((name, i) => {
					const [r, g, b] = rgb(opts.colors[i] ?? "var(--foreground)");
					u.vec3(name, r, g, b);
				});
			},
			draw(u) {
				u.float("uCount", Math.min(MAX_RAYS, Math.max(1, Math.round(opts.count))));
				u.float("uSeed", opts.seed);
				u.float("uIntensity", opts.intensity);
				for (const [name, key] of FIELD) u.float(name, opts.field[key]);
			},
			step: (dt) => dt * opts.speed,
			moving: () => opts.speed > 0,
		},
		onReady,
	);

	return {
		update(next: LightRaysOptions) {
			const recolor = next.colors.join() !== opts.colors.join();
			opts = next;
			shader.refresh(recolor);
		},
		destroy: shader.destroy,
	};
}
