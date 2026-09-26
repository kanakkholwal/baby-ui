export type PrismGradientOptions = {
	/** Three CSS colours: base, band, highlight; var() resolves against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Film grain, 0 to 1. */
	grain: number;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's Prism Gradient; its fixed knobs are inlined at their defaults.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uTime;
uniform float uGrain;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 rotate(vec2 uv, float th) {
	return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float time = 0.5 * uTime;

	uv -= 0.5;
	uv *= 0.00056 * uResolution;
	uv = rotate(uv, -1.37078);
	uv /= uPixelRatio;
	uv += 0.5;

	for (int i = 1; i <= 16; i++) {
		float fi = float(i);
		uv.x += 0.5 / fi * cos(time + fi * 1.5 * uv.y);
		uv.y += 0.5 / fi * cos(time + fi * uv.x);
	}

	vec2 checks = uv * 2.075;
	float mixer = 0.5 + 0.5 * sin(checks.x) * cos(checks.y) - 0.336;
	float r1 = smoothstep(0.1855, 0.5195, mixer);
	float r2 = smoothstep(0.4855, 0.8246, mixer);
	vec3 color = mix(mix(uColor0, uColor1, r1), uColor2, r2);

	float grain = hash(gl_FragCoord.xy + floor(uTime * 12.0) * 17.0) - 0.5;
	color += grain * uGrain * 0.16;
	gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = ["uResolution", "uPixelRatio", "uTime", "uGrain"] as const;
const COLORS = ["uColor0", "uColor1", "uColor2"] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const START_TIME = -2.99;
const BASE_SPEED = 1.5;

/** Runs the prism shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountPrismGradient(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: PrismGradientOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: PrismGradientOptions) {}, destroy() {} };
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
	let time = START_TIME;
	let dpr = 1;

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
		return [r / 255, g / 255, b / 255];
	};

	const readColors = () => {
		COLORS.forEach((name, i) => {
			const [r, g, b] = resolve(opts.colors[i] ?? "var(--foreground)");
			context.uniform3f(loc[name], r, g, b);
		});
	};

	const draw = () => {
		context.uniform1f(loc.uTime, time);
		context.uniform1f(loc.uGrain, opts.grain);
		context.drawArrays(context.TRIANGLES, 0, 3);
	};

	const live = () =>
		ready && visible && !document.hidden && !reduced.matches && opts.speed > 0;
	const tick = (now: number) => {
		time += Math.min((now - last) / 1000, 0.05) * opts.speed * BASE_SPEED;
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
			time = START_TIME;
			draw();
		}
	};
	const refresh = () => {
		if (ready && !frame) draw();
	};

	const resize = () => {
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
		canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
		if (!ready) return;
		context.viewport(0, 0, canvas.width, canvas.height);
		context.uniform2f(loc.uResolution, canvas.width, canvas.height);
		context.uniform1f(loc.uPixelRatio, dpr);
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
		attributeFilter: ["class", "style", "data-theme"],
	});
	reduced.addEventListener("change", sync);
	document.addEventListener("visibilitychange", sync);
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", start);
	start();

	return {
		update(next: PrismGradientOptions) {
			const recolor = next.colors.join() !== opts.colors.join();
			opts = next;
			if (!ready) return;
			if (recolor) readColors();
			refresh();
			sync();
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
