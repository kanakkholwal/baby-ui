<script lang="ts">
import { FineTuneCard, type FineTuneField } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

type ElementKind = "button" | "card";

const ELEMENTS: Record<ElementKind, FineTuneField[]> = {
	button: [
		{ key: "width", label: "W", value: 324, min: 40, max: 999 },
		{ key: "height", label: "H", value: 96, min: 24, max: 999 },
		{ key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
		{ key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
	],
	card: [
		{ key: "width", label: "W", value: 480, min: 40, max: 999 },
		{ key: "height", label: "H", value: 220, min: 24, max: 999 },
		{ key: "radius", label: "Radius", value: 12, min: 0, max: 64 },
		{ key: "opacity", label: "Opacity", value: 88, min: 0, max: 100, suffix: "%" },
	],
};

const OPTIONS = ["Primary", "Secondary", "Ghost"];

let element: ElementKind = $derived(props.element === "card" ? "card" : "button");
</script>

<!-- id/element swap proves uncontrolled edits reset on a new subject, not carry over. -->
<FineTuneCard
	id={element}
	fields={ELEMENTS[element]}
	options={OPTIONS}
	labels={{ title: (props.title as string) || undefined }}
/>
