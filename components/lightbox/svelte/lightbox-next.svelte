<script lang="ts">
import { getLightbox } from "./context.svelte";
import Control from "./lightbox-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
</script>

<Control
	slot="lightbox-next"
	icon="next"
	label="Next picture"
	class={classProp}
	disabled={!viewer.loop && viewer.index >= viewer.count - 1}
	onclick={() => viewer.step(1)}
/>
