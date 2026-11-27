<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { lightbox } from "../variants";
import { getLightbox } from "./context.svelte";
import LightboxIconView from "./lightbox-icon.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getLightbox();
const control = $derived(lightbox({ variant: viewer.variant }).control());
</script>

<DialogPrimitive.Close
	data-slot="lightbox-close"
	aria-label="Close"
	title="Close"
	class={cn(
		"grid size-9 place-items-center rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
		control,
		classProp,
	)}
>
	<LightboxIconView name="close" />
</DialogPrimitive.Close>
