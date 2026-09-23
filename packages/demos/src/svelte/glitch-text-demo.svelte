<script lang="ts">
import { GlitchText, type GlitchTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<GlitchText text="Glitch" size={(props.size as GlitchTextSize) ?? "md"} class="text-foreground" />
