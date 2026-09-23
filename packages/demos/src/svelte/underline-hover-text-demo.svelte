<script lang="ts">
import { UnderlineHoverText, type UnderlineHoverTextTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<UnderlineHoverText text="Underline hover" tone={(props.tone as UnderlineHoverTextTone) ?? "default"} />
