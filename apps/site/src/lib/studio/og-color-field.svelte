<script lang="ts" module>
import { OG_TOKENS, type OgColor } from "./og-canvas";

export const TOKEN_LABEL: Record<string, string> = {
	"--foreground": "Text",
	"--muted-foreground": "Muted text",
	"--background": "Background",
	"--muted": "Muted surface",
	"--primary": "Primary",
	"--primary-foreground": "Text on primary",
	"--chart-1": "Chart 1",
	"--chart-2": "Chart 2",
	"--chart-3": "Chart 3",
	"--chart-4": "Chart 4",
	"--chart-5": "Chart 5",
};

let pixel: CanvasRenderingContext2D | null | undefined;

/** Any CSS colour as #rrggbb, by painting one pixel; tokens may be oklch or color-mix. */
function toHex(color: string): string | undefined {
	pixel ??= document
		.createElement("canvas")
		.getContext("2d", { willReadFrequently: true });
	if (!pixel) return undefined;
	pixel.clearRect(0, 0, 1, 1);
	pixel.fillStyle = "#000000";
	pixel.fillStyle = color;
	pixel.fillRect(0, 0, 1, 1);
	const [r = 0, g = 0, b = 0] = pixel.getImageData(0, 0, 1, 1).data;
	return `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function resolveTokens(probe: HTMLElement): Record<string, string> {
	const out: Record<string, string> = {};
	for (const token of OG_TOKENS) {
		probe.style.color = `var(${token})`;
		const hex = toHex(getComputedStyle(probe).color);
		if (hex) out[token] = hex;
	}
	return out;
}
</script>

<script lang="ts">
import { ColorPicker } from "@baby-ui/svelte";
import { mode } from "mode-watcher";

let {
	label,
	value,
	dark,
	onchange,
}: {
	label: string;
	value: OgColor;
	/** The card's theme, which decides what each token resolves to. */
	dark: boolean;
	onchange: (next: OgColor) => void;
} = $props();

let probe: HTMLSpanElement | undefined = $state();
let tokenHex = $state<Record<string, string>>({});

// After the DOM settles, so the probe already carries the card's light or dark class.
$effect(() => {
	void mode.current;
	void dark;
	if (probe) tokenHex = resolveTokens(probe);
});

const hex = $derived(value.startsWith("--") ? (tokenHex[value] ?? "#888888") : value);
const swatches = $derived(OG_TOKENS.map((t) => tokenHex[t]).filter((h): h is string => Boolean(h)));

// A swatch that matches a theme token stores the token, so exported code follows the theme.
function pick(next: string) {
	const token = OG_TOKENS.find((t) => tokenHex[t]?.toLowerCase() === next.toLowerCase());
	onchange(token ?? next);
}
</script>

<div class="flex flex-col gap-1">
	<ColorPicker variant="row" size="sm" {label} {swatches} bind:value={() => hex, pick} />
	<p class="text-muted-foreground text-xs">
		{value.startsWith("--") ? `Theme colour: ${TOKEN_LABEL[value] ?? value}` : "Custom colour"}
	</p>
	<span bind:this={probe} aria-hidden="true" class={["hidden", dark && "dark"]}></span>
</div>
