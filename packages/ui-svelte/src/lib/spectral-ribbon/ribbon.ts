export type SpectralRibbonOptions = {
	/** Surface, core, then five fringe CSS colours; var() and color-mix() resolve against the root. */
	colors: readonly string[];
	/** Time multiplier. */
	speed: number;
	/** Ribbon brightness, 0.25 to 2. */
	intensity: number;
	/** Ribbon thickness, 0.5 to 2. */
	thickness: number;
	/** Film grain, 0 to 1. */
	grain: number;
};

const VERTEX = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Shader math ported from Componentry's Spectral Ribbon; the fringe and core take token colours.
const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uThickness;
uniform float uGrain;
uniform float uInvert;
uniform vec3 uBase;
uniform vec3 uCore;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
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
	float v = 0.0;
	float a = 0.5;
	mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
	for (int i = 0; i < 4; i++) {
		v += a * noise(p);
		p = m * p * 2.02;
		a *= 0.5;
	}
	return v;
}

// A C-shaped trail: enters bottom left, arcs up right, falls away.
vec2 ribbonPoint(float s, float time) {
	float sway = sin(time * 0.42 + s * 2.1) * 0.055;
	float lift = cos(time * 0.31 - s * 1.5) * 0.04;
	float x = mix(-1.2, 0.95, s) + sway * (0.55 + s * 0.5);
	float y = mix(-0.72, -0.55, s)
		+ sin(s * 2.85 + 0.35) * 0.92
		+ cos(s * 1.15) * 0.12
		- pow(max(s - 0.55, 0.0), 2.0) * 1.15
		+ lift;
	return vec2(x, y);
}

vec3 prism(float across, float along) {
	float h = clamp(0.5 + across * 0.52 + along * 0.18, 0.0, 1.0);
	vec3 c = mix(uColor0, uColor1, smoothstep(0.0, 0.28, h));
	c = mix(c, uColor2, smoothstep(0.22, 0.48, h));
	c = mix(c, uColor3, smoothstep(0.42, 0.68, h));
	c = mix(c, uColor4, smoothstep(0.62, 0.95, h));
	return mix(c, uColor4, smoothstep(0.2, 0.9, across) * 0.35);
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;
	float aspect = uResolution.x / max(uResolution.y, 1.0);
	vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
	float portrait = 1.0 - smoothstep(0.85, 1.35, aspect);
	p *= mix(1.0, 1.32, portrait);
	float time = uTime;

	float warp = fbm(p * 1.2 + vec2(time * 0.1, -time * 0.07));
	p += (warp - 0.5) * 0.14;

	float minDist = 1e5;
	float closestT = 0.0;
	float side = 0.0;
	vec2 prev = ribbonPoint(0.0, time);
	for (int i = 1; i <= 56; i++) {
		float s = float(i) / 56.0;
		vec2 cur = ribbonPoint(s, time);
		vec2 pa = p - prev;
		vec2 ba = cur - prev;
		float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
		float d = length(p - (prev + ba * h));
		if (d < minDist) {
			minDist = d;
			closestT = mix(s - 1.0 / 56.0, s, h);
			side = pa.x * ba.y - pa.y * ba.x;
		}
		prev = cur;
	}

	float thick = 0.055 * uThickness;
	float across = clamp((minDist * sign(side)) / (thick * 2.8), -1.2, 1.2);
	float core = exp(-pow(minDist / (thick * 0.7), 2.0));
	float body = exp(-pow(minDist / (thick * 1.8), 2.0));
	float bloom = exp(-pow(minDist / (thick * 4.2), 2.0));
	float haze = exp(-pow(minDist / (thick * 7.5), 2.0));

	vec3 spectral = prism(across, closestT);
	spectral = mix(uCore, spectral, smoothstep(0.0, 0.55, abs(across)));
	float hot = exp(-closestT * 4.5) * pow(core, 0.85);

	vec3 col = spectral * (body * 0.55 + bloom * 0.85 + haze * 0.4);
	col += spectral * core * 0.35;
	col += uCore * hot * 1.1;
	col *= uIntensity * 1.15;
	float mask = clamp(body * 0.7 + bloom + haze * 0.55 + hot, 0.0, 1.6);
	col = uBase + col * mask;

	col = clamp(col, 0.0, 1.0);
	col = mix(col, 1.0 - col, uInvert);
	vec3 srgb = pow(col, vec3(1.0 / 2.2));
	srgb += (hash(gl_FragCoord.xy + time * 40.0) - 0.5) * 0.06 * uGrain * mask;
	gl_FragColor = vec4(clamp(srgb, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
	"uResolution",
	"uTime",
	"uIntensity",
	"uThickness",
	"uGrain",
	"uInvert",
] as const;
const COLORS = [
	"uBase",
	"uCore",
	"uColor0",
	"uColor1",
	"uColor2",
	"uColor3",
	"uColor4",
] as const;
type Uniform = (typeof UNIFORMS)[number] | (typeof COLORS)[number];

const STILL_TIME = 7.25;

function linear(channel: number) {
	return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** Runs the ribbon shader on `canvas`; `onReady(false)` means WebGL is missing or lost. */
export function mountSpectralRibbon(
	root: HTMLElement,
	canvas: HTMLCanvasElement,
	initial: SpectralRibbonOptions,
	onReady: (webgl: boolean) => void,
) {
	let opts = initial;
	const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
	if (!gl) {
		onReady(false);
		return { update(_next: SpectralRibbonOptions) {}, destroy() {} };
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
		context.uniform1f(loc.uIntensity, opts.intensity);
		context.uniform1f(loc.uThickness, opts.thickness);
		context.uniform1f(loc.uGrain, opts.grain);
		context.drawArrays(context.TRIANGLES, 0, 3);
	};

	const live = () => ready && visible && !document.hidden && !reduced.matches;
	const tick = (now: number) => {
		time += Math.min((now - last) / 1000, 0.05) * opts.speed;
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
		attributeFilter: ["class", "style", "data-theme"],
	});
	reduced.addEventListener("change", sync);
	document.addEventListener("visibilitychange", sync);
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", start);
	start();

	return {
		update(next: SpectralRibbonOptions) {
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
