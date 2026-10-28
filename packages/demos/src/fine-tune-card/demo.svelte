<script lang="ts">
import {
	FineTuneCard,
	type FineTuneCardLabels,
	type FineTuneField,
} from "@baby-ui/svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<FineTuneCardLabels>(props));

type ElementKind = "button" | "card";

const ELEMENTS: Record<ElementKind, FineTuneField[]> = {
	button: [
		{ key: "width", value: 324, min: 40, max: 999 },
		{ key: "height", value: 96, min: 24, max: 999 },
		{ key: "radius", value: 28, min: 0, max: 64 },
		{ key: "opacity", value: 100, min: 0, max: 100 },
	],
	card: [
		{ key: "width", value: 480, min: 40, max: 999 },
		{ key: "height", value: 220, min: 24, max: 999 },
		{ key: "radius", value: 12, min: 0, max: 64 },
		{ key: "opacity", value: 88, min: 0, max: 100 },
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
	labels={{ title: p.title || undefined }}
/>
