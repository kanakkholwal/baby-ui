<script lang="ts">
import { getLightbox } from "./context.svelte";
import Control from "./lightbox-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
</script>

<Control
	slot="lightbox-details-toggle"
	icon="details"
	label={viewer.detailsOpen ? "Hide details" : "Show details"}
	pressed={viewer.detailsOpen}
	class={classProp}
	onclick={() => (viewer.detailsOpen = !viewer.detailsOpen)}
/>
