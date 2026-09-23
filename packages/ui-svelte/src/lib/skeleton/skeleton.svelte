<script lang="ts">
import { cn } from "../lib/cn";
import { type SkeletonShape, skeleton } from "./variants";

let {
	width = "100%",
	height = "1rem",
	shape = "line",
	class: classProp,
}: {
	width?: string;
	height?: string;
	shape?: SkeletonShape;
	class?: string;
} = $props();
</script>

<div
	aria-hidden="true"
	style:width
	style:height
	class={cn(skeleton({ shape }), classProp)}
></div>
