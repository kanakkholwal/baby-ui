<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ImageGalleryVariant, imageGallery } from "../variants";
import { type ImageGalleryImage, setImageGallery } from "./context";

let {
	images,
	variant = "masonry",
	selectable = false,
	selected = $bindable([]),
	onOpen,
	columnWidth,
	class: classProp,
	style,
	children,
	...rest
}: {
	images: ImageGalleryImage[];
	variant?: ImageGalleryVariant;
	/** Selection mode: a click toggles the picture instead of opening it. */
	selectable?: boolean;
	selected?: number[];
	/** Called with the picture's index when it is clicked outside selection mode. */
	onOpen?: (index: number) => void;
	/** Preferred column width in rem; the column count follows the available width. */
	columnWidth?: number;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setImageGallery({
	get images() {
		return images;
	},
	get variant() {
		return variant;
	},
	get selectable() {
		return selectable;
	},
	get selected() {
		return selected;
	},
	toggle: (index) => {
		selected = selected.includes(index)
			? selected.filter((i) => i !== index)
			: [...selected, index];
	},
	open: (index) => onOpen?.(index),
});

const root = $derived(imageGallery({ variant }).root());
</script>

<div
	{...rest}
	data-slot="image-gallery"
	data-variant={variant}
	class={cn(root, classProp)}
	style={[style, columnWidth ? `--gallery-column-width:${columnWidth}rem` : ""].filter(Boolean).join(";") || undefined}
>
	{@render children?.()}
</div>
