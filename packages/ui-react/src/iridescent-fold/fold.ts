import { mountShader } from "../lib/shader";

export type IridescentFoldOptions = {
	/** Base plus three tone colours; var() resolves against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Effect strength, 0 to 2. */
	intensity: number;
	/** Film grain, 0 to 1. */
	grain: number;
};

const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uTime;
uniform float uGrain;
uniform float uIntensity;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Blends the three tone colours around a hue circle, so any phase lands on a tone mix.
vec3 tones(float phase) {
	float a = 0.5 + 0.5 * cos(6.28318 * phase);
	float b = 0.5 + 0.5 * cos(6.28318 * (phase - 0.3333));
	float c = 0.5 + 0.5 * cos(6.28318 * (phase - 0.6667));
	return (uColor1 * a + uColor2 * b + uColor3 * c) / max(a + b + c, 0.001);
}

// Soft creases: three rotated sine ridges over a slowly drifting warp.
float height(vec2 p, float t) {
	p += 0.35 * vec2(sin(p.y * 0.9 + t * 0.6), cos(p.x * 0.8 - t * 0.5));
	float h = sin(p.x * 1.3 + t * 0.7) * 0.5;
	h += sin(dot(p, vec2(0.8, 1.1)) * 1.1 - t * 0.4) * 0.35;
	h += sin(dot(p, vec2(-1.2, 0.6)) * 0.9 + t * 0.55) * 0.25;
	return h;
}

void main() {
	vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / (uPixelRatio * 520.0);
	float t = uTime * 0.25;
	float e = 0.02;
	float h = height(p, t);
	vec2 grad = vec2(height(p + vec2(e, 0.0), t) - h, height(p + vec2(0.0, e), t) - h) / e;
	vec3 n = normalize(vec3(-grad * 0.6, 1.0));
	vec3 light = normalize(vec3(-0.4, 0.5, 0.75));
	// Thin-film: the colour follows fold height and the angle to the light.
	float phase = h * 0.55 + dot(n, light) * 0.8 + t * 0.05;
	vec3 film = tones(phase);
	float crease = smoothstep(0.2, 1.4, length(grad));
	float sheen = pow(max(dot(n, normalize(light + vec3(0.0, 0.0, 1.0))), 0.0), 24.0);
	float amount = clamp(uIntensity * (0.3 + 0.4 * crease + 0.25 * sheen), 0.0, 1.0);
	vec3 col = mix(uColor0, film, amount);
	float grain = hash(gl_FragCoord.xy + floor(uTime * 12.0) * 17.0) - 0.5;
	col += grain * uGrain * 0.16;
	gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = ["uResolution", "uPixelRatio", "uTime", "uGrain", "uIntensity"] as const;
const COLORS = ["uColor0", "uColor1", "uColor2", "uColor3"] as const;

const START_TIME = 4;
// Ambient motion: 30fps reads the same and halves the GPU work.
const FRAME_MS = 1000 / 30 - 1;

/** Runs the iridescent fold shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountIridescentFold(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: IridescentFoldOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const shader = mountShader(
		root,
		canvas,
		{
			fragment: FRAGMENT,
			uniforms: [...UNIFORMS, ...COLORS],
			context: {
				alpha: false,
				antialias: false,
				depth: false,
				powerPreference: "low-power",
			},
			stillTime: START_TIME,
			frameMs: FRAME_MS,
			colors(u, rgb) {
				COLORS.forEach((name, i) => {
					const [r, g, b] = rgb(opts.colors[i] ?? "var(--foreground)");
					u.vec3(name, r, g, b);
				});
			},
			draw(u) {
				u.float("uGrain", opts.grain);
				u.float("uIntensity", opts.intensity);
			},
			step: (dt) => dt * opts.speed,
			moving: () => opts.speed > 0,
			resize: (u, dpr) => u.float("uPixelRatio", dpr),
		},
		onReady,
	);

	return {
		update(next: IridescentFoldOptions) {
			const recolor = next.colors.join() !== opts.colors.join();
			opts = next;
			shader.refresh(recolor);
		},
		destroy: shader.destroy,
	};
}
