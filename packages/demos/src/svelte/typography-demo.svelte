<script lang="ts">
import { Typography, type TypographyVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as TypographyVariant) ?? "body");
</script>

<div class="flex w-80 flex-col gap-3">
	<Typography variant="h2">Ship it twice</Typography>
	<Typography {variant}>
		One spec, two implementations, one token layer. Change the variant control to see
		each level.
	</Typography>
</div>
