<script lang="ts">
import { ColorPicker } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("#7dd3fc");
let format = $state<"hsv" | "hsl" | "rgb">("hsv");

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
	label={(props.label as string) || "Accent"}
/>
