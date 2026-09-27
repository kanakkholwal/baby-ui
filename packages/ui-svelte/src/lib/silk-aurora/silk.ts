import { mountShader, uploadInvertible } from "../lib/shader";
export type SilkAuroraOptions = {
	/** Base, mid, sheen and accent CSS colours; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Ribbon and sheen strength, 0 to 2. */
	intensity: number;
	/** Film grain, 0 to 1. */
	grain: number;
	/** Ribbons lean toward the pointer, which lifts a soft sheen. */
	interactive: boolean;
};

// Shader math ported from Componentry's Silk Aurora; the glint takes the sheen colour.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uIntensity;
uniform float uPointerStrength;
uniform float uGrain;
uniform float uInvert;
uniform vec3 uBase;
uniform vec3 uMid;
uniform vec3 uSheen;
uniform vec3 uAccent;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(41.93, 289.17))) * 43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amp = 0.5;
	mat2 rot = mat2(0.82, 0.57, -0.57, 0.82);
	for (int i = 0; i < 5; i++) {
		value += amp * noise(p);
		p = rot * p * 2.03;
		amp *= 0.5;
	}
	return value;
}

float ribbon(vec2 p, float offset, float width, float softness) {
	float y = p.y + sin(p.x * 1.8 + offset) * 0.18;
	y += sin(p.x * 4.2 - offset * 0.7) * 0.045;
	return 1.0 - smoothstep(width, width + softness, abs(y));
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / max(uResolution.y, 1.0);
	vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
	vec2 mouse = (uPointer - 0.5) * vec2(aspect, 1.0);
	float t = uTime * 0.12;
	float pointerFalloff = 1.0 - smoothstep(0.0, 0.72, length(p - mouse));
	p += (mouse - p) * pointerFalloff * 0.05 * uPointerStrength;

	vec2 silk = p;
	silk.x += fbm(p * 1.6 + vec2(t * 0.8, -t * 0.35)) * 0.16;
	silk.y += fbm(p * 2.2 + vec2(-t * 0.25, t * 0.7)) * 0.10;

	float veilA = ribbon(silk + vec2(-0.18, 0.08), t * 2.1, 0.055, 0.22);
	float veilB = ribbon(silk * vec2(0.86, 1.18) + vec2(0.2, -0.14), -t * 2.8 + 1.7, 0.038, 0.18);
	float veilC = ribbon(silk * vec2(1.18, 0.9) + vec2(-0.08, 0.24), t * 1.4 - 2.1, 0.03, 0.16);

	float atmosphere = fbm(p * 1.35 + vec2(t * 0.22, -t * 0.1));
	float pearlescent = pow(max(0.0, sin((p.x - p.y) * 7.5 + atmosphere * 4.0 - t * 2.5)), 5.0);
	float glint = pow(max(0.0, noise(gl_FragCoord.xy * 0.065 + t * 18.0) - 0.72), 5.0);

	vec3 col = mix(uBase, uMid, smoothstep(-0.45, 0.75, p.y + atmosphere * 0.75));
	col += uAccent * veilA * 0.72 * uIntensity;
	col += uSheen * veilB * 0.64 * uIntensity;
	col += mix(uSheen, uAccent, 0.35) * veilC * 0.42 * uIntensity;
	col += uSheen * pearlescent * 0.075 * uIntensity;
	col += uSheen * glint * 0.22 * uIntensity;
	col += uSheen * pointerFalloff * 0.08 * uPointerStrength;

	float vignette = 1.0 - smoothstep(0.22, 1.25, length(p));
	col *= mix(0.58, 1.06, vignette);

	col = clamp(col, 0.0, 1.0);
	col = mix(col, 1.0 - col, uInvert);
	vec3 srgb = pow(col, vec3(1.0 / 2.2));
	srgb += (hash(gl_FragCoord.xy + t * 90.0) - 0.5) * 0.08 * uGrain;
	gl_FragColor = vec4(clamp(srgb, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
	"uResolution",
	"uPointer",
	"uTime",
	"uIntensity",
	"uPointerStrength",
	"uGrain",
	"uInvert",
] as const;
const COLORS = ["uBase", "uMid", "uSheen", "uAccent"] as const;

const STILL_TIME = 7.25;
const POINTER_EASE = 0.045;

/** Runs the silk shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountSilkAurora(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: SilkAuroraOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const pointer = { x: 0.5, y: 0.5 };
	const target = { x: 0.5, y: 0.5 };
	const shader = mountShader(
		root,
		canvas,
		{
			fragment: FRAGMENT,
			uniforms: [...UNIFORMS, ...COLORS],
			stillTime: STILL_TIME,
			colors: (u, rgb) => uploadInvertible(u, rgb, COLORS, opts.colors),
			draw(u, reduced) {
				u.vec2("uPointer", pointer.x, pointer.y);
				u.float("uIntensity", opts.intensity);
				u.float("uGrain", opts.grain);
				u.float("uPointerStrength", opts.interactive && !reduced ? 1 : 0);
			},
			step(dt) {
				pointer.x += (target.x - pointer.x) * POINTER_EASE;
				pointer.y += (target.y - pointer.y) * POINTER_EASE;
				return dt * opts.speed;
			},
			still() {
				pointer.x = pointer.y = target.x = target.y = 0.5;
			},
			pointer(x, y, inside) {
				target.x = inside && opts.interactive ? x : 0.5;
				target.y = inside && opts.interactive ? y : 0.5;
			},
		},
		onReady,
	);

	return {
		update(next: SilkAuroraOptions) {
			const recolor = next.colors.join() !== opts.colors.join();
			opts = next;
			shader.refresh(recolor);
		},
		destroy: shader.destroy,
	};
}
