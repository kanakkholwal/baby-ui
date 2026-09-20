<script lang="ts">
import { cn } from "../lib/cn";
import {
	hexToHsl,
	hexToHsv,
	hexToRgb,
	hslToHex,
	hsvToHex,
	isValidHex,
	rgbToHex,
} from "../lib/color";

export type ColorFormat = "hsv" | "hsl" | "rgb";

let {
	value = $bindable("#7dd3fc"),
	format = $bindable<ColorFormat>("hsv"),
	swatches = [
		"#7dd3fc",
		"#a78bfa",
		"#86efac",
		"#fcd34d",
		"#fda4af",
		"#f87171",
		"#e5e7eb",
	],
	label = "Colour",
	class: classProp,
}: {
	value?: string;
	format?: ColorFormat;
	swatches?: string[];
	label?: string;
	class?: string;
} = $props();

const uid = $props.id();

let hue = $state(0);
let sat = $state(0);
let val = $state(100);
let hex = $state(isValidHex(value) ? value.toLowerCase() : "#000000");

/**
 * HSL lives beside HSV rather than being derived from the hex: a grey hex has no
 * hue at all, so a round trip would snap the H slider back to 0 mid-drag.
 */
let hslH = $state(0);
let hslS = $state(0);
let hslL = $state(100);
let rgb = $state<[number, number, number]>([255, 255, 255]);
let skipSync = false;

let square = $state<HTMLDivElement>();
let strip = $state<HTMLDivElement>();
let dragging = $state<"square" | "strip" | null>(null);

const hueColor = $derived(`hsl(${hue}, 100%, 50%)`);
const preview = $derived(isValidHex(hex) ? hex : isValidHex(value) ? value : "#000000");

$effect(() => {
	if (!isValidHex(value)) return;
	const lower = value.toLowerCase();
	const [h, s, v] = hexToHsv(value);
	hue = h;
	sat = s;
	val = v;
	hex = lower;
	rgb = hexToRgb(value);
	if (skipSync) {
		skipSync = false;
		return;
	}
	const [hh, hs, hl] = hexToHsl(value);
	if (hs > 0) hslH = hh;
	hslS = hs;
	hslL = hl;
});

function apply(next: string) {
	if (isValidHex(next)) value = next;
}

function applyHsv() {
	hex = hsvToHex(hue, sat, val);
	value = hex;
}

function setHsl(channel: "h" | "s" | "l", raw: string) {
	const next = Number.parseFloat(raw);
	if (!Number.isFinite(next)) return;
	if (channel === "h") {
		hslH = next;
		// At S=0 every hue is the same grey, so moving H would feel dead.
		if (hslS === 0) hslS = 60;
	} else if (channel === "s") {
		hslS = next;
	} else {
		hslL = next;
	}
	skipSync = true;
	apply(hslToHex(hslH, hslS, hslL));
}

function setRgb(channel: 0 | 1 | 2, raw: string) {
	const next = Number.parseFloat(raw);
	if (!Number.isFinite(next)) return;
	const copy: [number, number, number] = [...rgb];
	copy[channel] = next;
	rgb = copy;
	apply(rgbToHex(copy[0], copy[1], copy[2]));
}

function typeHex(raw: string) {
	const digits = raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
	hex = `#${digits}`;
	apply(hex);
}

function clamp(n: number) {
	return Math.max(0, Math.min(1, n));
}

function readSquare(event: PointerEvent) {
	if (!square) return;
	const rect = square.getBoundingClientRect();
	sat = Math.round(clamp((event.clientX - rect.left) / rect.width) * 100);
	val = Math.round(clamp(1 - (event.clientY - rect.top) / rect.height) * 100);
	applyHsv();
}

function readStrip(event: PointerEvent) {
	if (!strip) return;
	const rect = strip.getBoundingClientRect();
	hue = Math.round(clamp((event.clientX - rect.left) / rect.width) * 360);
	applyHsv();
}

function onpointermove(event: PointerEvent) {
	if (dragging === "square") readSquare(event);
	else if (dragging === "strip") readStrip(event);
}

const CHANNELS = $derived(
	format === "hsl"
		? ([
				{ key: "h", label: "H", max: 360, unit: "°", value: hslH },
				{ key: "s", label: "S", max: 100, unit: "%", value: hslS },
				{ key: "l", label: "L", max: 100, unit: "%", value: hslL },
			] as const)
		: format === "rgb"
			? ([
					{ key: "r", label: "R", max: 255, unit: "", value: rgb[0] },
					{ key: "g", label: "G", max: 255, unit: "", value: rgb[1] },
					{ key: "b", label: "B", max: 255, unit: "", value: rgb[2] },
				] as const)
			: ([
					{ key: "h", label: "H", max: 360, unit: "°", value: hue },
					{ key: "s", label: "S", max: 100, unit: "%", value: sat },
					{ key: "v", label: "V", max: 100, unit: "%", value: val },
				] as const),
);

function setChannel(key: string, raw: string) {
	if (format === "hsl") return setHsl(key as "h" | "s" | "l", raw);
	if (format === "rgb") return setRgb(key === "r" ? 0 : key === "g" ? 1 : 2, raw);
	const next = Number.parseFloat(raw);
	if (!Number.isFinite(next)) return;
	if (key === "h") hue = next;
	else if (key === "s") sat = next;
	else val = next;
	applyHsv();
}

const FORMATS: ColorFormat[] = ["hsv", "hsl", "rgb"];
</script>

<svelte:window {onpointermove} onpointerup={() => (dragging = null)} onpointercancel={() => (dragging = null)} />

<div
	class={cn(
		"w-60 select-none overflow-hidden rounded-xl border border-border bg-popover",
		classProp,
	)}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={square}
		style:--picker-hue={hueColor}
		style:background="linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, var(--picker-hue))"
		onpointerdown={(e) => {
			dragging = "square";
			square?.setPointerCapture(e.pointerId);
			readSquare(e);
		}}
		class="relative h-36 w-full cursor-crosshair"
	>
		<span
			aria-hidden="true"
			style:left="{sat}%"
			style:top="{100 - val}%"
			style:background={preview}
			class="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute size-3.5 rounded-full border-2 border-white shadow-[0_1px_4px_rgb(0_0_0/0.5)]"
		></span>
	</div>

	<div class="flex items-center gap-2.5 border-border border-b p-2">
		<span
			aria-hidden="true"
			style:background={preview}
			class="size-7 shrink-0 rounded-md ring-1 ring-foreground/10 ring-inset"
		></span>
		<div class="min-w-0 flex-1 space-y-1.5">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={strip}
				onpointerdown={(e) => {
					dragging = "strip";
					strip?.setPointerCapture(e.pointerId);
					readStrip(e);
				}}
				style:background="linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)"
				class="relative h-2.5 w-full cursor-ew-resize rounded-full"
			>
				<span
					aria-hidden="true"
					style:left="{(hue / 360) * 100}%"
					style:background={hueColor}
					class="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 size-3.5 rounded-full border-2 border-white shadow-[0_1px_4px_rgb(0_0_0/0.5)]"
				></span>
			</div>
			<div
				class="flex items-center gap-1 rounded-md border border-border bg-background px-1.5 transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
			>
				<span class="font-mono text-[0.78rem] text-muted-foreground">#</span>
				<input
					id="{uid}-hex"
					value={hex.replace(/^#/, "")}
					aria-label="{label} hex value"
					placeholder="000000"
					spellcheck="false"
					autocomplete="off"
					oninput={(e) => typeHex(e.currentTarget.value)}
					class="h-6 min-w-0 flex-1 bg-transparent font-mono text-[0.78rem] text-foreground uppercase outline-none"
				/>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-1.5 border-border border-b p-2">
		<div class="flex items-center gap-0.5 rounded-md bg-card p-0.5">
			{#each FORMATS as option (option)}
				<button
					type="button"
					onclick={() => (format = option)}
					aria-pressed={format === option}
					class="h-5 flex-1 rounded font-mono text-[10px] text-muted-foreground uppercase transition-colors aria-pressed:bg-background aria-pressed:text-foreground"
				>
					{option}
				</button>
			{/each}
		</div>

		{#each CHANNELS as channel (channel.key)}
			<div class="flex items-center gap-2">
				<label for="{uid}-{channel.key}" class="w-3 shrink-0 font-mono text-[11px] text-muted-foreground">
					{channel.label}
				</label>
				<input
					id="{uid}-{channel.key}"
					type="range"
					min="0"
					max={channel.max}
					step="1"
					value={channel.value}
					style:--thumb={preview}
					oninput={(e) => setChannel(channel.key, e.currentTarget.value)}
					class="color-slider h-1 flex-1"
				/>
				<span class="w-9 shrink-0 text-right font-mono text-[10px] text-foreground tabular-nums">
					{channel.value}{channel.unit}
				</span>
			</div>
		{/each}
	</div>

	<div class="flex flex-wrap items-center gap-1.5 p-2">
		{#each swatches as swatch (swatch)}
			<button
				type="button"
				aria-label={swatch}
				aria-pressed={value.toLowerCase() === swatch.toLowerCase()}
				onclick={() => apply(swatch)}
				style:background={swatch}
				class="grid size-6 place-items-center rounded-md ring-1 ring-foreground/10 ring-inset transition-transform hover:scale-110"
			>
				{#if value.toLowerCase() === swatch.toLowerCase()}
					<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class="size-3 text-white drop-shadow-[0_1px_1px_rgb(0_0_0/0.6)]">
						<path d="M2.5 6.2 4.8 8.5 9.5 3.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{/if}
			</button>
		{/each}
	</div>
</div>
