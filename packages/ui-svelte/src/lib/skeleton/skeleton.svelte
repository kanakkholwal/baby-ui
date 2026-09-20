<script lang="ts">
import { cn } from "../lib/cn";

let {
	width = "100%",
	height = "1rem",
	shape = "line",
	class: classProp,
}: {
	width?: string;
	height?: string;
	shape?: "line" | "circle" | "block";
	class?: string;
} = $props();

const SHAPE = { line: "rounded-md", circle: "rounded-full", block: "rounded-xl" };
</script>

<div
	aria-hidden="true"
	style:width
	style:height
	class={cn("skeleton-shimmer bg-card", SHAPE[shape], classProp)}
></div>
