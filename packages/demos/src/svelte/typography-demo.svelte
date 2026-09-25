<script lang="ts">
import { Typography, type TypographyVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as TypographyVariant) ?? "body");
</script>

<div class="flex w-full max-w-80 flex-col gap-3">
	<Typography variant="h2">Release 0.4</Typography>
	<Typography variant="muted">Shipped 20 September 2026</Typography>
	<Typography {variant}>
		Overlays now animate out as well as in, and every anchored surface grows from the edge
		nearest its trigger.
	</Typography>
</div>
