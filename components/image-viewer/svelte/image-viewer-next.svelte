<script lang="ts">
import { getImageViewer } from "./context.svelte";
import Control from "./image-viewer-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
</script>

<Control
	slot="image-viewer-next"
	icon="next"
	label="Next picture"
	class={classProp}
	disabled={!viewer.loop && viewer.index >= viewer.count - 1}
	onclick={() => viewer.step(1)}
/>
