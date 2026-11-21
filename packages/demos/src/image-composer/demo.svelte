<script lang="ts">
import {
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
	ImageComposer,
	ImageComposerModel,
	ImageComposerShapes,
	ImageComposerTools,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ImageComposer>>(props));
let making = $state(false);
</script>

<div class="w-full max-w-2xl">
	<ImageComposer
		variant={p.variant}
		loading={p.loading ?? making}
		onStop={() => (making = false)}
		onSubmit={() => {
			// The demo plays the run; the component only renders the loading state it is given.
			making = true;
			setTimeout(() => (making = false), 3000);
		}}
	>
		<ComposerInput placeholder="Describe the picture you want" minRows={2} />
		<ComposerToolbar>
			<ImageComposerShapes />
			<ImageComposerTools>
				<ImageComposerModel>SDXL Turbo</ImageComposerModel>
				<ComposerSubmit />
			</ImageComposerTools>
		</ComposerToolbar>
	</ImageComposer>
</div>
