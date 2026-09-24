<script lang="ts">
import { FillButton, type FillButtonSize, type FillButtonTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<FillButton
	tone={(props.tone as FillButtonTone) ?? "accent"}
	size={(props.size as FillButtonSize) ?? "md"}
>
	Get started
</FillButton>
