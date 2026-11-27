<script lang="ts">
import { getLightbox } from "./context.svelte";
import Control from "./lightbox-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
</script>

<Control
	slot="lightbox-previous"
	icon="previous"
	label="Previous picture"
	class={classProp}
	disabled={!viewer.loop && viewer.index <= 0}
	onclick={() => viewer.step(-1)}
/>
