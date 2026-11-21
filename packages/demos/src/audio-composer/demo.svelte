<script lang="ts">
import {
	AudioComposer,
	AudioComposerDuration,
	AudioComposerStyle,
	AudioComposerTools,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AudioComposer>>(props));
const PRESETS = ["Cinematic", "Lo-fi", "Ambient", "Foley", "Orchestral"];
let making = $state(false);
</script>

<div class="w-full max-w-2xl">
	<AudioComposer
		presets={PRESETS}
		variant={p.variant}
		min={p.min}
		max={p.max}
		loading={p.loading ?? making}
		onStop={() => (making = false)}
		onSubmit={() => {
			// The demo plays the run; the component only renders the loading state it is given.
			making = true;
			setTimeout(() => (making = false), 3000);
		}}
	>
		<ComposerInput placeholder="Describe the sound you want" minRows={2} />
		<ComposerToolbar>
			<AudioComposerDuration shape="dial" />
			<AudioComposerStyle />
			<AudioComposerTools>
				<ComposerSubmit />
			</AudioComposerTools>
		</ComposerToolbar>
	</AudioComposer>
</div>
