<script lang="ts">
import type { ComponentProps, Snippet } from "svelte";
import Composer from "../../composer/svelte/composer.svelte";
import { cn } from "../../lib/cn";
import { type AudioComposerVariant, audioComposer } from "../variants";
import { setAudioComposer } from "./context";

/** A prompt box for generating audio. Put `ComposerInput`, `ComposerToolbar` and `ComposerSubmit` inside it. */
let {
	value = $bindable(""),
	presets,
	preset = $bindable(),
	duration = $bindable(10),
	min = 2,
	max = 60,
	step = 2,
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
	/** The style choices, e.g. "Cinematic" or "Lo-fi". */
	presets: string[];
	/** The chosen style; bindable. Starts at the first one. */
	preset?: string;
	/** Length in seconds; bindable. */
	duration?: number;
	min?: number;
	max?: number;
	step?: number;
	variant?: AudioComposerVariant;
	/** Called with the trimmed prompt, the length in seconds and the style. */
	onSubmit?: (prompt: string, options: { duration: number; preset: string }) => void;
	class?: string;
	children?: Snippet;
} = $props();

const chosen = $derived(preset ?? presets[0] ?? "");

setAudioComposer({
	get duration() {
		return duration;
	},
	set duration(next) {
		duration = next;
	},
	get preset() {
		return chosen;
	},
	set preset(next) {
		preset = next;
	},
	get presets() {
		return presets;
	},
	get min() {
		return min;
	},
	get max() {
		return max;
	},
	get step() {
		return step;
	},
	get loading() {
		return loading;
	},
});

const root = $derived(audioComposer({ variant }).root());
</script>

<section data-slot="audio-composer" class={cn(root, classProp)}>
	<Composer
		{...rest}
		bind:value
		variant="bare"
		{loading}
		onSubmit={(prompt) => onSubmit?.(prompt, { duration, preset: chosen })}
	>
		{@render children?.()}
	</Composer>
</section>
