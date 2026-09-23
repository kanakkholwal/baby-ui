<script lang="ts">
import { JitterText, type JitterTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<JitterText text="Jitter" size={(props.size as JitterTextSize) ?? "lg"} class="text-foreground" />
