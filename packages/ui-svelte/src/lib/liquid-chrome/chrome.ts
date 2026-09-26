export type LiquidChromeOptions = {
	/** Shadow, base, silver and specular CSS colours; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Domain-warp depth of the metal, 0 to 1.5. */
	amplitude: number;
	/** The surface bulges away from the pointer instead of the centre. */
	interactive: boolean;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's Liquid Chrome; shadows and vignette fall to the shadow token.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uAmplitude;
uniform float uInvert;
uniform vec3 uShadow;
uniform vec3 uBase;
uniform vec3 uSilver;
uniform vec3 uSpecular;

const mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
	float f = 0.0;
	f += 0.5000 * noise(p); p = m * p * 2.02;
	f += 0.2500 * noise(p); p = m * p * 2.03;
	f += 0.1250 * noise(p); p = m * p * 2.01;
	f += 0.0625 * noise(p);
	return f / 0.9375;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / max(uResolution.y, 1.0);
	vec2 p = (-1.0 + 2.0 * uv) * vec2(aspect, 1.0);
	vec2 mouse = (uPointer - 0.5) * 2.0 * vec2(aspect, 1.0);
	vec2 diff = p - mouse;
	float dist = length(diff);
	if (dist > 0.0) p += (diff / dist) * exp(-dist * 3.0) * 0.1;

	float time = uTime * 0.5;
	vec2 q = vec2(fbm(p + time * 0.1), fbm(p + vec2(5.2, 1.3) + time * 0.15));
	vec2 r = vec2(
		fbm(p + 4.0 * q + vec2(1.7, 9.2) + time * 0.2),
		fbm(p + 4.0 * q + vec2(8.3, 2.8) + time * 0.25)
	);
	float f = fbm(p + r * 4.0 * uAmplitude);

	vec3 col = mix(uBase, uShadow, 1.0 - smoothstep(0.1, 0.3, f));
	col = mix(col, uSilver, smoothstep(0.4, 0.6, f));
	col = mix(col, uSpecular, smoothstep(0.6, 0.8, f));
	float v = 16.0 * uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
	col = mix(uShadow, col, 0.5 + 0.5 * pow(max(0.0, v), 0.2));

	col = clamp(col, 0.0, 1.0);
	col = mix(col, 1.0 - col, uInvert);
	gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}`;

const UNIFORMS = ["uResolution", "uPointer", "uTime", "uAmplitude", "uInvert"] as const;
const COLORS = ["uShadow", "uBase", "uSilver", "uSpecular"] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const STILL_TIME = 7.25;
const POINTER_EASE = 0.08;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the chrome shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountLiquidChrome(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: LiquidChromeOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: LiquidChromeOptions) {}, destroy() {} };
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
		context.uniform1f(loc.uAmplitude, opts.amplitude);
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
		update(next: LiquidChromeOptions) {
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
