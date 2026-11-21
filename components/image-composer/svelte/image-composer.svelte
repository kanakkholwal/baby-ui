<script lang="ts">
import type { ComponentProps, Snippet } from "svelte";
import Composer from "../../composer/svelte/composer.svelte";
import { cn } from "../../lib/cn";
import { IMAGE_SHAPES, type ImageShape } from "../shapes";
import { type ImageComposerVariant, imageComposer } from "../variants";
import { setImageComposer } from "./context";

/** A prompt box with a shape choice. Put `ComposerInput`, `ComposerToolbar` and `ComposerSubmit` inside it. */
let {
	value = $bindable(""),
	shape = $bindable(),
	shapes = IMAGE_SHAPES,
	variant = "docked",
	loading = false,
	onSubmit,
	class: classProp,
	children,
	...rest
}: Omit<
	ComponentProps<typeof Composer>,
	"onSubmit" | "variant" | "class" | "children"
> & {
	/** The chosen shape's value; bindable. Starts at the first shape. */
	shape?: string;
	shapes?: ImageShape[];
	variant?: ImageComposerVariant;
	/** Called with the trimmed prompt and the chosen shape. */
	onSubmit?: (prompt: string, shape: string) => void;
	class?: string;
	children?: Snippet;
} = $props();

const current = $derived(shape ?? shapes[0]?.value ?? "");

setImageComposer({
	get shape() {
		return current;
	},
	set shape(next) {
		shape = next;
	},
	get shapes() {
		return shapes;
	},
	get loading() {
		return loading;
	},
	get ratio() {
		return shapes.find((s) => s.value === current)?.ratio ?? 1;
	},
});

const root = $derived(imageComposer({ variant }).root());
</script>

<section data-slot="image-composer" class={cn(root, classProp)}>
	<Composer
		{...rest}
		bind:value
		variant="filled"
		{loading}
		onSubmit={(prompt) => onSubmit?.(prompt, current)}
	>
		{@render children?.()}
	</Composer>
</section>
