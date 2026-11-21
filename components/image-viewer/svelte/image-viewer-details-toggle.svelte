<script lang="ts">
import { getImageViewer } from "./context.svelte";
import Control from "./image-viewer-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
</script>

<Control
	slot="image-viewer-details-toggle"
	icon="details"
	label={viewer.detailsOpen ? "Hide details" : "Show details"}
	pressed={viewer.detailsOpen}
	class={classProp}
	onclick={() => (viewer.detailsOpen = !viewer.detailsOpen)}
/>
