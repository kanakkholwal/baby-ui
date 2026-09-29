<script lang="ts">
import { Typography } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Typography>>(props));

const variant = $derived(p.variant ?? "body");
</script>

<div class="flex w-full max-w-80 flex-col gap-3">
	<Typography variant="h2">Release 0.4</Typography>
	<Typography variant="muted">Shipped 20 September 2026</Typography>
	<Typography {variant}>
		Overlays now animate out as well as in, and every anchored surface grows from the edge
		nearest its trigger.
	</Typography>
</div>
