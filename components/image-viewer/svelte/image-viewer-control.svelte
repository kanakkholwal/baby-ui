<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import type { ImageViewerIcon } from "../icons";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";
import ImageViewerIconView from "./image-viewer-icon.svelte";

let {
	icon,
	label,
	class: classProp,
	disabled = false,
	pressed,
	slot,
	onclick,
}: {
	icon: ImageViewerIcon;
	label: string;
	class?: string;
	disabled?: boolean;
	pressed?: boolean;
	slot?: string;
	onclick?: () => void;
} = $props();

const viewer = getImageViewer();
const control = $derived(imageViewer({ variant: viewer.variant }).control());
</script>

<Button
	variant="ghost"
	size="icon"
	data-slot={slot}
	aria-label={label}
	aria-pressed={pressed}
	title={label}
	class={cn(control, classProp)}
	{disabled}
	{onclick}
>
	<ImageViewerIconView name={icon} />
</Button>
