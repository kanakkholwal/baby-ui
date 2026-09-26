export type ClosingPlasmaOptions = {
	/** Three CSS colours: surface, body, ridge; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Noise frequency growth per octave, 0 to 2. */
	turbulence: number;
	/** Sparkle strength, 0 to 2. */
	sparkle: number;
	/** Film grain, 0 to 2. */
	grain: number;
	/** The field leans toward the pointer. */
	interactive: boolean;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's Closing Plasma; light mode fades edges to the surface.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uIsDark;
uniform float uTurbulence;
uniform float uPointerStrength;
uniform float uGrain;
uniform float uSparkle;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
	const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
	vec2 i = floor(v + dot(v, C.yy));
	vec2 x0 = v - i + dot(i, C.xx);
	vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
	vec4 x12 = x0.xyxy + C.xxzz;
	x12.xy -= i1;
	i = mod289(i);
	vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
	vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
	m = m * m;
	m = m * m;
	vec3 x = 2.0 * fract(p * C.www) - 1.0;
	vec3 h = abs(x) - 0.5;
	vec3 ox = floor(x + 0.5);
	vec3 a0 = x - ox;
	m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
	vec3 g;
	g.x = a0.x * x0.x + h.x * x0.y;
	g.yz = a0.yz * x12.xz + h.yz * x12.yw;
	return 130.0 * dot(m, g);
}

float fbm(vec2 p, float turbulence) {
	float total = 0.0;
	float amp = 0.5;
	float freq = 1.0;
	mat2 rot = mat2(cos(0.45), sin(0.45), -sin(0.45), cos(0.45));
	for (int i = 0; i < 5; i++) {
		total += snoise(p * freq) * amp;
		p = rot * p;
		freq *= mix(1.85, 2.35, clamp(turbulence, 0.0, 2.0) * 0.5);
		amp *= 0.5;
	}
	return total;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / max(uResolution.y, 1.0);
	vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
	float t = uTime * 0.15;

	vec2 mouse = (uPointer - 0.5) * vec2(aspect, 1.0);
	float dMouse = length(p - mouse);
	p += (mouse - p) * 0.02 * uPointerStrength * (1.0 - smoothstep(0.0, 0.45, dMouse));

	vec2 flow = vec2(
		fbm(p + vec2(t * 0.2, t * 0.1), uTurbulence),
		fbm(p + vec2(-t * 0.1, t * 0.3), uTurbulence)
	);
	float n = fbm(p * 2.0 + flow * 1.45, uTurbulence);
	float ridges = 1.0 - abs(snoise(p * 4.0 + n) * 2.0);
	ridges = pow(ridges, 3.0);

	vec3 col = mix(uColorA, uColorB, smoothstep(-0.5, 0.5, n));
	col = mix(col, uColorC, smoothstep(0.25, 1.0, n * 0.52 + ridges * 0.48));

	float sparkle = pow(max(0.0, snoise(gl_FragCoord.xy * 0.2 + t * 2.0)), 18.0) * 0.5 * uSparkle;
	vec3 sparkleColor = pow(mix(vec3(0.56, 0.58, 0.72), vec3(0.8, 0.9, 1.0), uIsDark), vec3(2.2));
	col += sparkleColor * sparkle;

	float vigDark = 1.0 - smoothstep(0.5, mix(1.8, 1.55, uIsDark), length(p));
	col = mix(col, col * vigDark, uIsDark);
	float vigLight = 1.0 - smoothstep(0.4, 1.45, length(p));
	col = mix(mix(uColorA, col, vigLight), col, uIsDark);

	vec3 srgb = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
	float grain = (fract(sin(dot(gl_FragCoord.xy + t * 50.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.06 * uGrain;
	gl_FragColor = vec4(clamp(srgb + grain, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
	"uResolution",
	"uPointer",
	"uTime",
	"uIsDark",
	"uTurbulence",
	"uPointerStrength",
	"uGrain",
	"uSparkle",
] as const;
const COLORS = ["uColorA", "uColorB", "uColorC"] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const STILL_TIME = 7.25;
const POINTER_EASE = 0.05;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the plasma shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountClosingPlasma(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: ClosingPlasmaOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: ClosingPlasmaOptions) {}, destroy() {} };
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

	const readColors = () => {
		const [r, g, b] = resolve("var(--background)");
		const dark = 0.2126 * r + 0.7152 * g + 0.0722 * b <= 0.2;
		context.uniform1f(loc.uIsDark, dark ? 1 : 0);
		COLORS.forEach((name, i) => {
			const [x, y, z] = resolve(opts.colors[i] ?? "var(--foreground)");
			context.uniform3f(loc[name], x, y, z);
		});
	};

	const draw = () => {
		context.uniform1f(loc.uTime, time);
		context.uniform2f(loc.uPointer, pointer.x, pointer.y);
		context.uniform1f(loc.uTurbulence, opts.turbulence);
		context.uniform1f(loc.uSparkle, opts.sparkle);
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
		attributeFilter: ["class", "style", "data-theme"],
	});
	reduced.addEventListener("change", sync);
	document.addEventListener("visibilitychange", sync);
	window.addEventListener("pointermove", onMove, { passive: true });
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", start);
	start();

	return {
		update(next: ClosingPlasmaOptions) {
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
