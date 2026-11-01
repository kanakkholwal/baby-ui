export type OrbColors = readonly [base: string, light: string, dark: string];

export type OrbInput = {
	/** Voice level from 0 to 1; ignored while an analyser is attached. */
	activity: number;
	analyser: AnalyserNode | null;
	colors: OrbColors;
	/** False holds the surface still. */
	active: boolean;
	speed: number;
};

export type OrbRenderer = { update(input: OrbInput): void; dispose(): void };

const VERTEX = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// A breathing silhouette around an advected liquid field: voice energy opens the folds and
// ripples the rim, while the screen-space grain stays put.
const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_activity;
uniform vec3 u_base;
uniform vec3 u_light;
uniform vec3 u_dark;

float hash(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) {
  return noise(p) * 0.57 + noise(p * 2.03 + 7.2) * 0.28 + noise(p * 4.07 + 3.1) * 0.15;
}
void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time * 0.38;
  float angle = atan(p.y, p.x);
  float breath = sin(u_time * 1.4) * 0.008;
  float ripple = sin(angle * 3.0 + t * 2.1) * 0.55
               + sin(angle * 5.0 - t * 1.7) * 0.30
               + sin(angle * 2.0 + t) * 0.15;
  p /= 0.91 + breath + u_activity * 0.025 + ripple * (0.004 + u_activity * 0.024);
  float r2 = dot(p, p);
  float aa = 3.0 / min(u_resolution.x, u_resolution.y);
  float alpha = 1.0 - smoothstep(1.0 - aa, 1.0, r2);
  if (alpha <= 0.0) { gl_FragColor = vec4(0.0); return; }
  vec3 normal = vec3(p, sqrt(max(0.0, 1.0 - r2)));
  vec3 flow = vec3(normal.xy * 1.65, normal.z * 1.4);
  flow.xy += vec2(sin(normal.y * 2.6 + t), cos(normal.x * 2.3 - t * 0.8)) * (0.25 + u_activity * 0.22);
  vec3 warp = vec3(noise(flow + vec3(0.0, t, t * 0.3)),
                   noise(flow + vec3(4.7, -t * 0.7, t)),
                   noise(flow + vec3(t * 0.5, 9.2, -t))) - 0.5;
  float pigment = fbm(flow + warp * 1.4 + vec3(t * 0.3, -t * 0.2, t * 0.4));
  float fold = normal.x * 0.50 + normal.y * 0.32 + sin(normal.y * 2.6 - t) * 0.30 + (pigment - 0.5) * 0.65;
  float shadow = smoothstep(-0.30, 0.42, fold);
  vec3 color = mix(u_dark, u_base, shadow);
  color = mix(color, u_light, smoothstep(0.40, 0.82, pigment) * 0.34);
  float diffuse = max(0.0, dot(normal, normalize(vec3(-0.4, 0.65, 1.0))));
  color *= 0.64 + 0.46 * diffuse;
  float shine = exp(-pow((fold + 0.06) * 8.0, 2.0)) * pow(normal.z, 0.65);
  float innerLight = exp(-pow((fold - 0.28) * 4.0, 2.0)) * normal.z;
  color = mix(color, u_light, innerLight * (0.18 + u_activity * 0.16));
  color = mix(color, mix(u_light, vec3(1.0), 0.55), shine * 0.78);
  float gleam = pow(max(0.0, dot(normal, normalize(vec3(-0.45, 0.55, 1.0)))), 24.0);
  color += gleam * 0.16;
  float rim = pow(1.0 - normal.z, 3.0);
  color = mix(color, u_light, rim * (0.36 + 0.25 * max(0.0, -normal.x)));
  float grain = hash(vec3(gl_FragCoord.xy, 1.0)) - 0.5;
  color += grain * 0.032;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), alpha);
}
`;

function rgb(hex: string): [number, number, number] {
	const short = /^#([\da-f])([\da-f])([\da-f])$/i.exec(hex);
	const full = short
		? `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`
		: hex;
	if (!/^#[\da-f]{6}$/i.test(full))
		throw new Error("VoiceOrb colours must be #RGB or #RRGGBB.");
	const value = Number.parseInt(full.slice(1), 16);
	return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

const clamp01 = (value: number) =>
	Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;

/**
 * Draws the orb into `canvas` and squashes `canvas` with the voice level. It reads an
 * analyser it is given but never opens a microphone. Throws when WebGL is unavailable.
 */
export function createOrbRenderer(
	canvas: HTMLCanvasElement,
	initial: OrbInput,
	onError: (error: Error) => void,
): OrbRenderer {
	const gl = canvas.getContext("webgl", {
		alpha: true,
		antialias: false,
		premultipliedAlpha: false,
		powerPreference: "low-power",
	});
	if (!gl) throw new Error("WebGL is unavailable in this browser.");
	const reduce = matchMedia("(prefers-reduced-motion: reduce)");
	let input = initial;
	let program: WebGLProgram | null = null;
	let buffer: WebGLBuffer | null = null;
	let shaders: WebGLShader[] = [];
	let uniforms: Record<string, WebGLUniformLocation | null> = {};
	let palette: OrbColors | null = null;
	let size = { width: canvas.clientWidth, height: canvas.clientHeight };
	let sample: Uint8Array<ArrayBuffer> | null = null;
	let frame = 0;
	let previous = 0;
	let elapsed = 0;
	let level = 0;
	let visible = true;
	let lost = false;
	let failed = false;
	let disposed = false;

	const release = () => {
		if (buffer) gl.deleteBuffer(buffer);
		if (program) gl.deleteProgram(program);
		for (const shader of shaders) gl.deleteShader(shader);
		buffer = null;
		program = null;
		shaders = [];
	};
	const build = () => {
		const compile = (type: number, source: string) => {
			const shader = gl.createShader(type);
			if (!shader) throw new Error("Could not allocate an orb shader.");
			shaders.push(shader);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				throw new Error(
					gl.getShaderInfoLog(shader) || "Could not compile the orb shader.",
				);
			return shader;
		};
		const linked = gl.createProgram();
		if (!linked) throw new Error("Could not allocate the orb program.");
		program = linked;
		gl.attachShader(linked, compile(gl.VERTEX_SHADER, VERTEX));
		gl.attachShader(linked, compile(gl.FRAGMENT_SHADER, FRAGMENT));
		gl.linkProgram(linked);
		if (!gl.getProgramParameter(linked, gl.LINK_STATUS))
			throw new Error(gl.getProgramInfoLog(linked) || "Could not link the orb program.");
		gl.useProgram(linked);
		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);
		const position = gl.getAttribLocation(linked, "a_position");
		gl.enableVertexAttribArray(position);
		gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
		uniforms = Object.fromEntries(
			["u_resolution", "u_time", "u_activity", "u_base", "u_light", "u_dark"].map(
				(name) => [name, gl.getUniformLocation(linked, name)],
			),
		);
		palette = null;
	};

	const still = () => !input.active || reduce.matches;
	// The analyser's RMS level, scaled so normal speech reaches about 1.
	const heard = () => {
		const analyser = input.analyser;
		if (!analyser) return clamp01(input.activity);
		if (sample?.length !== analyser.fftSize)
			sample = new Uint8Array(new ArrayBuffer(analyser.fftSize));
		analyser.getByteTimeDomainData(sample);
		let sum = 0;
		for (const byte of sample) sum += ((byte - 128) / 128) ** 2;
		return clamp01(Math.sqrt(sum / sample.length) * 3);
	};

	const draw = (now: number) => {
		frame = 0;
		if (disposed || lost || failed || !visible || document.hidden) {
			previous = 0;
			return;
		}
		try {
			const dt = previous ? Math.min(0.05, (now - previous) / 1000) : 0;
			const animated = !still() && (input.speed > 0 || !!input.analyser);
			const target = still() ? 0 : heard();
			// Eases toward the level, so speech swells and settles instead of flickering.
			level = dt ? level + (target - level) * (1 - Math.exp(-dt * 9)) : target;
			if (animated) elapsed += dt * Math.max(0, input.speed) * (1 + level * 0.6);
			previous = animated ? now : 0;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = Math.max(1, Math.round(size.width * dpr));
			const height = Math.max(1, Math.round(size.height * dpr));
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
			}
			gl.viewport(0, 0, width, height);
			gl.uniform2f(uniforms.u_resolution ?? null, width, height);
			gl.uniform1f(uniforms.u_time ?? null, elapsed);
			gl.uniform1f(uniforms.u_activity ?? null, level);
			if (!palette || palette.some((colour, i) => colour !== input.colors[i])) {
				const [base, light, dark] = input.colors.map(rgb);
				gl.uniform3fv(uniforms.u_base ?? null, base ?? [0, 0, 0]);
				gl.uniform3fv(uniforms.u_light ?? null, light ?? [1, 1, 1]);
				gl.uniform3fv(uniforms.u_dark ?? null, dark ?? [0, 0, 0]);
				palette = input.colors;
			}
			gl.drawArrays(gl.TRIANGLES, 0, 6);
			canvas.style.transform =
				still() || level < 0.001
					? ""
					: `translate3d(0, ${-level * 2}px, 0) scale(${1 + level * 0.04}, ${1 - level * 0.018})`;
			const settling = Math.abs(target - level) > 0.002;
			if (animated || settling) frame = requestAnimationFrame(draw);
		} catch (error) {
			failed = true;
			onError(error instanceof Error ? error : new Error(String(error)));
		}
	};
	const request = () => {
		if (!disposed && !lost && !failed && visible && !document.hidden && !frame)
			frame = requestAnimationFrame(draw);
	};
	const pause = () => {
		cancelAnimationFrame(frame);
		frame = 0;
		previous = 0;
	};

	const onVisibility = () => (document.hidden ? pause() : request());
	const onLost = (event: Event) => {
		event.preventDefault();
		lost = true;
		pause();
	};
	const onRestored = () => {
		try {
			release();
			build();
			lost = false;
			request();
		} catch (error) {
			onError(error instanceof Error ? error : new Error(String(error)));
		}
	};

	try {
		build();
	} catch (error) {
		release();
		throw error;
	}
	const resize = new ResizeObserver(([entry]) => {
		if (entry)
			size = { width: entry.contentRect.width, height: entry.contentRect.height };
		request();
	});
	resize.observe(canvas);
	const seen = new IntersectionObserver(([entry]) => {
		visible = entry?.isIntersecting ?? true;
		if (visible) request();
		else pause();
	});
	seen.observe(canvas);
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", onRestored);
	document.addEventListener("visibilitychange", onVisibility);
	reduce.addEventListener("change", request);
	request();

	return {
		update(next) {
			input = next;
			request();
		},
		dispose() {
			disposed = true;
			pause();
			resize.disconnect();
			seen.disconnect();
			canvas.removeEventListener("webglcontextlost", onLost);
			canvas.removeEventListener("webglcontextrestored", onRestored);
			document.removeEventListener("visibilitychange", onVisibility);
			reduce.removeEventListener("change", request);
			release();
		},
	};
}
