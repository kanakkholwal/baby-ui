export type AuroraFlowOptions = {
	/** Five CSS colours, deepest first; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Veil and light strength, 0 to 2. */
	intensity: number;
	/** Film grain, 0 to 1. */
	grain: number;
	/** Flow direction in degrees. */
	direction: number;
	/** Veils bend toward the pointer. */
	interactive: boolean;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's Aurora Flow; its fixed knobs are inlined at their defaults.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform vec2 uDirection;
uniform float uTime;
uniform float uIntensity;
uniform float uPointerStrength;
uniform float uGrain;
uniform float uInvert;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

mat2 rotate2d(float angle) {
	float s = sin(angle);
	float c = cos(angle);
	return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 0.52;
	mat2 turn = mat2(0.84, 0.54, -0.54, 0.84);
	for (int i = 0; i < 6; i++) {
		value += amplitude * valueNoise(p);
		p = turn * p * 2.03 + 0.17;
		amplitude *= 0.5;
	}
	return value;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / max(uResolution.y, 1.0);
	vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
	float t = uTime * 0.075;
	vec2 direction = normalize(uDirection + vec2(0.0001));
	vec2 crossDirection = vec2(-direction.y, direction.x);

	vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);
	vec2 pointerDelta = pointer - p;
	float pointerFalloff = 1.0 - smoothstep(0.0, 0.68, length(pointerDelta));
	p += crossDirection * pointerDelta.x * pointerFalloff * 0.035 * uPointerStrength;
	p += direction * pointerDelta.y * pointerFalloff * 0.022 * uPointerStrength;

	vec2 broadP = p;
	float warpA = fbm(broadP * 0.82 + direction * t * 0.71 + vec2(2.7, -1.3));
	float warpB = fbm(rotate2d(0.73) * broadP * 1.08 - crossDirection * t * 0.53 + vec2(-4.1, 3.6));
	float warpC = fbm(rotate2d(-0.46) * broadP * 1.42 + vec2(-t * 0.31, t * 0.43) + 8.2);

	vec2 silk = broadP;
	silk += vec2(warpA - 0.5, warpB - 0.5) * 0.72;
	silk += direction * (warpC - 0.5) * 0.28;

	float fieldA = fbm(rotate2d(0.28) * silk * 0.74 + direction * t * 0.83 + 1.9);
	float fieldB = fbm(rotate2d(-0.81) * silk * 0.91 - crossDirection * t * 0.61 + 5.4);
	float fieldC = fbm(rotate2d(1.17) * silk * 1.16 + vec2(t * 0.37, -t * 0.29) + 9.7);

	float veilA = smoothstep(0.2, 0.84, fieldA + (warpB - 0.5) * 0.28);
	float veilB = smoothstep(0.26, 0.9, fieldB + (warpC - 0.5) * 0.24);
	float veilC = smoothstep(0.34, 0.94, fieldC + (fieldA - 0.5) * 0.18);

	float folded = 0.5 + 0.5 * sin(silk.y * 2.7 + silk.x * 0.72 + warpA * 3.1 - warpB * 1.9 + t * 0.47);
	float silkFold = smoothstep(0.18, 0.92, folded) * smoothstep(0.12, 0.94, fieldB);

	vec3 color = mix(uColor0, uColor1, clamp(0.22 + veilA * 0.62, 0.0, 1.0));
	color = mix(color, uColor2, veilB * 0.58 * uIntensity);
	color = mix(color, uColor3, veilC * 0.42 * uIntensity);
	color += uColor4 * silkFold * 0.13 * uIntensity;

	vec2 lightCenter = vec2(0.5 + sin(t * 0.296 + 1.4) * 0.24, 0.48 + cos(t * 0.232 - 0.8) * 0.18);
	vec2 lightDelta = rotate2d(0.42 + warpA * 0.22) * (uv - lightCenter);
	lightDelta *= vec2(0.74, 1.32);
	float bloom = exp(-dot(lightDelta, lightDelta) / (0.34 * 0.34));
	bloom *= 0.76 + fieldC * 0.24;
	color += mix(uColor3, uColor4, 0.58) * bloom * 0.176 * uIntensity;

	vec2 ambientDelta = (uv - vec2(0.52, 0.47)) * vec2(0.72, 1.0);
	float ambient = exp(-dot(ambientDelta, ambientDelta) / 0.34);
	color += mix(uColor2, uColor4, 0.5) * ambient * 0.084;

	float haze = fbm(p * 2.6 + vec2(-t * 0.18, t * 0.14));
	color += (haze - 0.5) * 0.0256;

	float vignetteMask = smoothstep(0.18, 1.08, length((uv - 0.5) * vec2(1.0, 0.86)));
	color *= 1.0 - vignetteMask * 0.286;

	color = clamp(color, 0.0, 1.0);
	color = mix(color, 1.0 - color, uInvert);
	vec3 srgb = pow(color, vec3(1.0 / 2.2));
	float grain = hash(gl_FragCoord.xy + floor(uTime * 12.0) * 17.0) - 0.5;
	srgb += grain * uGrain * 0.16;
	srgb = (srgb - 0.5) * 1.04 + 0.5;
	gl_FragColor = vec4(clamp(srgb, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
	"uResolution",
	"uPointer",
	"uDirection",
	"uTime",
	"uIntensity",
	"uPointerStrength",
	"uGrain",
	"uInvert",
] as const;
const COLORS = ["uColor0", "uColor1", "uColor2", "uColor3", "uColor4"] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const STILL_TIME = 7.25;
const POINTER_EASE = 0.035;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the aurora shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountAuroraFlow(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: AuroraFlowOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: AuroraFlowOptions) {}, destroy() {} };
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
		const angle = (opts.direction * Math.PI) / 180;
		context.uniform1f(loc.uTime, time);
		context.uniform2f(loc.uPointer, pointer.x, pointer.y);
		context.uniform2f(loc.uDirection, Math.cos(angle), Math.sin(angle));
		context.uniform1f(loc.uIntensity, opts.intensity);
		context.uniform1f(loc.uGrain, opts.grain);
		context.uniform1f(
			loc.uPointerStrength,
			opts.interactive && !reduced.matches ? 0.7 : 0,
		);
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
		update(next: AuroraFlowOptions) {
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
