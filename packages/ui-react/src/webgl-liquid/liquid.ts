export type WebglLiquidOptions = {
	/** Deep, mid and highlight CSS colours; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Large-scale flow and glow strength, 0 to 2. */
	flow: number;
	/** Dither amount, 0 to 0.2. */
	grain: number;
	/** Sweep the field in from the left the first time it is on screen. */
	reveal: boolean;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's WebGL Liquid; output is premultiplied over the surface.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFlow;
uniform float uGrain;
uniform float uReveal;
uniform float uInvert;
uniform vec3 uDeep;
uniform vec3 uMid;
uniform vec3 uHighlight;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	mat2 rot = mat2(0.86, 0.51, -0.51, 0.86);
	for (int i = 0; i < 6; i++) {
		v += a * noise(p);
		p = rot * p * 2.0;
		a *= 0.5;
	}
	return v;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float t = uTime * 0.14;
	vec2 p = (uv - 0.5) * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);

	vec2 flowP = vec2(p.x * 1.1, p.y - t * 0.35);
	float n1 = fbm(flowP * 2.8 + vec2(0.0, t * 0.2));
	float n2 = fbm((flowP + n1 * 0.45) * 4.0 - vec2(0.0, t * 0.35));
	float n3 = fbm((flowP + n2 * 0.4) * 6.5 + vec2(t * 0.15, 0.0));
	float structure = n3 * 1.15 + (n2 - 0.5) * 0.5;
	structure += (n1 - 0.5) * 0.3 * uFlow;

	vec3 col = mix(uDeep, uMid, smoothstep(0.18, 0.6, structure));
	col = mix(col, uHighlight, smoothstep(0.62, 1.08, structure));
	float glow = smoothstep(0.52, 0.95, structure) * (0.35 + 0.5 * uFlow);
	col += glow * uHighlight * 0.35;

	float verticalMask = pow(1.0 - smoothstep(0.05, 1.05, uv.y), 1.1);
	float vignette = 1.0 - smoothstep(0.36, 1.28, length(uv - 0.5));
	col *= mix(0.9, 1.05, vignette);

	col = clamp(col, 0.0, 1.0);
	col = mix(col, 1.0 - col, uInvert);
	vec3 srgb = clamp((pow(col, vec3(1.0 / 2.2)) - 0.5) * 1.1 + 0.5, 0.0, 1.0);
	srgb += (hash(gl_FragCoord.xy + t * 10.0) - 0.5) * uGrain;

	float alpha = verticalMask * smoothstep(0.08, 0.95, structure);
	alpha *= smoothstep(0.0, 0.28, uReveal - uv.x) * 0.95;
	alpha = clamp(alpha, 0.0, 1.0);
	gl_FragColor = vec4(clamp(srgb, 0.0, 1.0) * alpha, alpha);
}`;

const UNIFORMS = [
	"uResolution",
	"uTime",
	"uFlow",
	"uGrain",
	"uReveal",
	"uInvert",
] as const;
const COLORS = ["uDeep", "uMid", "uHighlight"] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const REVEAL_SECONDS = 1.2;
const STILL_TIME = 7.25;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the liquid shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountWebglLiquid(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: WebglLiquidOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", {
		alpha: true,
		premultipliedAlpha: true,
		antialias: false,
		depth: false,
	});
	if (!gl) {
		onReady(false);
		return { update(_next: WebglLiquidOptions) {}, destroy() {} };
	}
	const context = gl;
	const reduced = matchMedia("(prefers-reduced-motion: reduce)");
	const pixel = document.createElement("canvas");
	pixel.width = pixel.height = 1;
	const pen = pixel.getContext("2d", { willReadFrequently: true });
	const loc = {} as Record<Uniform, WebGLUniformLocation | null>;
	let program: WebGLProgram | null = null;
	let buffer: WebGLBuffer | null = null;
	let shaders: WebGLShader[] = [];
	let ready = false;
	let visible = true;
	let frame = 0;
	let last = 0;
	let time = STILL_TIME;
	let revealed = 0;

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
		context.uniform1f(loc.uFlow, opts.flow);
		context.uniform1f(loc.uGrain, opts.grain);
		context.uniform1f(loc.uReveal, opts.reveal && !reduced.matches ? revealed : 1);
		context.drawArrays(context.TRIANGLES, 0, 3);
	};

	const live = () => ready && visible && !document.hidden && !reduced.matches;
	const tick = (now: number) => {
		const dt = Math.min((now - last) / 1000, 0.05);
		time += dt * opts.speed;
		revealed = Math.min(1, revealed + dt / REVEAL_SECONDS);
		last = now;
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
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", start);
	start();

	return {
		update(next: WebglLiquidOptions) {
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
			canvas.removeEventListener("webglcontextlost", onLost);
			canvas.removeEventListener("webglcontextrestored", start);
			release();
		},
	};
}
