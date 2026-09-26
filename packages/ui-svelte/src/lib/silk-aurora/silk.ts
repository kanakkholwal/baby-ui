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

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

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
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const STILL_TIME = 7.25;
const POINTER_EASE = 0.045;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the silk shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountSilkAurora(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: SilkAuroraOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: SilkAuroraOptions) {}, destroy() {} };
	}
	const context = gl;
	const reduced = matchMedia("(prefers-reduced-motion: reduce)");
	const pixel = document.createElement("canvas");
	pixel.width = pixel.height = 1;
	const pen = pixel.getContext("2d", { willReadFrequently: true });
	const pointer = { x: 0.5, y: 0.5 };
	const target = { x: 0.5, y: 0.5 };
	const loc = {} as Record<Uniform, WebGLUniformLocation | null>;
	let program: WebGLProgram | null = null;
	let buffer: WebGLBuffer | null = null;
	let shaders: WebGLShader[] = [];
	let ready = false;
	let visible = true;
	let frame = 0;
	let last = 0;
	let time = STILL_TIME;

	const release = () => {
		for (const shader of shaders) context.deleteShader(shader);
		context.deleteProgram(program);
		context.deleteBuffer(buffer);
		shaders = [];
		program = null;
		buffer = null;
	};

	const compile = (type: number, source: string) => {
		const shader = context.createShader(type);
		if (!shader) return false;
		shaders.push(shader);
		context.shaderSource(shader, source);
		context.compileShader(shader);
		return context.getShaderParameter(shader, context.COMPILE_STATUS) === true;
	};

	const build = () => {
		program = context.createProgram();
		buffer = context.createBuffer();
		if (
			!program ||
			!buffer ||
			!compile(context.VERTEX_SHADER, VERTEX) ||
			!compile(context.FRAGMENT_SHADER, FRAGMENT)
		) {
			release();
			return false;
		}
		for (const shader of shaders) context.attachShader(program, shader);
		context.linkProgram(program);
		if (!context.getProgramParameter(program, context.LINK_STATUS)) {
			release();
			return false;
		}
		context.useProgram(program);
		context.bindBuffer(context.ARRAY_BUFFER, buffer);
		context.bufferData(
			context.ARRAY_BUFFER,
			new Float32Array([-1, -1, 3, -1, -1, 3]),
			context.STATIC_DRAW,
		);
		const aPos = context.getAttribLocation(program, "aPos");
		context.enableVertexAttribArray(aPos);
		context.vertexAttribPointer(aPos, 2, context.FLOAT, false, 0, 0);
		for (const name of [...UNIFORMS, ...COLORS]) {
			loc[name] = context.getUniformLocation(program, name);
		}
		return true;
	};

	// The canvas doubles as the probe, so var() resolves inside any scoped theme.
	const resolve = (css: string): [number, number, number] => {
		canvas.style.color = css;
		const computed = getComputedStyle(canvas).color;
		canvas.style.color = "";
		if (!pen) return [0, 0, 0];
		pen.clearRect(0, 0, 1, 1);
		pen.fillStyle = computed;
		pen.fillRect(0, 0, 1, 1);
		const [r = 0, g = 0, b = 0] = pen.getImageData(0, 0, 1, 1).data;
		return [linear(r / 255), linear(g / 255), linear(b / 255)];
	};

	// Tuned for a dark surface: light themes render in inverted space and flip back.
	const readColors = () => {
		const [r, g, b] = resolve("var(--background)");
		const invert = 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.2;
		context.uniform1f(loc.uInvert, invert ? 1 : 0);
		COLORS.forEach((name, i) => {
			const c = resolve(opts.colors[i] ?? "var(--foreground)");
			const [x, y, z] = invert ? c.map((v) => 1 - v) : c;
			context.uniform3f(loc[name], x ?? 0, y ?? 0, z ?? 0);
		});
	};

	const draw = () => {
		context.uniform1f(loc.uTime, time);
		context.uniform2f(loc.uPointer, pointer.x, pointer.y);
		context.uniform1f(loc.uIntensity, opts.intensity);
		context.uniform1f(loc.uGrain, opts.grain);
		context.uniform1f(loc.uPointerStrength, opts.interactive && !reduced.matches ? 1 : 0);
		context.drawArrays(context.TRIANGLES, 0, 3);
	};

	const live = () => ready && visible && !document.hidden && !reduced.matches;
	const tick = (now: number) => {
		time += Math.min((now - last) / 1000, 0.05) * opts.speed;
		last = now;
		pointer.x += (target.x - pointer.x) * POINTER_EASE;
		pointer.y += (target.y - pointer.y) * POINTER_EASE;
		draw();
		frame = live() ? requestAnimationFrame(tick) : 0;
	};
	const sync = () => {
		if (live()) {
			if (!frame) {
				last = performance.now();
				frame = requestAnimationFrame(tick);
			}
			return;
		}
		cancelAnimationFrame(frame);
		frame = 0;
		if (ready && reduced.matches) {
			time = STILL_TIME;
			pointer.x = pointer.y = target.x = target.y = 0.5;
			draw();
		}
	};
	const refresh = () => {
		if (ready && !frame) draw();
	};

	const resize = () => {
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
		canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
		if (!ready) return;
		context.viewport(0, 0, canvas.width, canvas.height);
		context.uniform2f(loc.uResolution, canvas.width, canvas.height);
		refresh();
	};

	const start = () => {
		ready = build();
		if (!ready) {
			onReady(false);
			return;
		}
		readColors();
		resize();
		draw();
		onReady(true);
		sync();
	};

	// Window-level so a `fixed` background under page content still tracks the pointer.
	const onMove = (e: PointerEvent) => {
		const rect = root.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = 1 - (e.clientY - rect.top) / rect.height;
		const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
		target.x = inside && opts.interactive ? x : 0.5;
		target.y = inside && opts.interactive ? y : 0.5;
	};
	const onLost = (e: Event) => {
		e.preventDefault();
		ready = false;
		cancelAnimationFrame(frame);
		frame = 0;
		shaders = [];
		program = null;
		buffer = null;
		onReady(false);
	};

	const sizes = new ResizeObserver(resize);
	const seen = new IntersectionObserver(([entry]) => {
		visible = entry?.isIntersecting ?? true;
		sync();
	});
	const theme = new MutationObserver(() => {
		if (!ready) return;
		readColors();
		refresh();
	});
	sizes.observe(root);
	seen.observe(root);
	theme.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class", "style"],
	});
	reduced.addEventListener("change", sync);
	document.addEventListener("visibilitychange", sync);
	window.addEventListener("pointermove", onMove, { passive: true });
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", start);
	start();

	return {
		update(next: SilkAuroraOptions) {
			const recolor = next.colors.join() !== opts.colors.join();
			opts = next;
			if (!ready) return;
			if (recolor) readColors();
			refresh();
		},
		destroy() {
			ready = false;
			cancelAnimationFrame(frame);
			frame = 0;
			sizes.disconnect();
			seen.disconnect();
			theme.disconnect();
			reduced.removeEventListener("change", sync);
			document.removeEventListener("visibilitychange", sync);
			window.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("webglcontextlost", onLost);
			canvas.removeEventListener("webglcontextrestored", start);
			release();
		},
	};
}
