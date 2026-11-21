<script lang="ts">
import { getImageViewer } from "./context.svelte";
import Control from "./image-viewer-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
</script>

<Control
	slot="image-viewer-previous"
	icon="previous"
	label="Previous picture"
	class={classProp}
	disabled={!viewer.loop && viewer.index <= 0}
	onclick={() => viewer.step(-1)}
/>
