<script lang="ts">
import { ColorPicker, type ColorPickerVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("#7dd3fc");
let format = $state<"hsv" | "hsl" | "rgb">("hsv");
// Recents live in the parent; the popover adds the colour it closed on.
let recent = $state<string[]>([]);

$effect(() => {
	if (typeof props.value === "string") value = props.value;
});
$effect(() => {
	format = (props.format as "hsv" | "hsl" | "rgb") ?? "hsv";
});
</script>

<ColorPicker
	bind:value
	bind:format
	variant={(props.variant as ColorPickerVariant) ?? "inline"}
	{recent}
	onOpenChange={(open) => {
		if (!open) recent = [value, ...recent.filter((c) => c !== value)].slice(0, 6);
	}}
	label={(props.label as string) || "Accent"}
/>
