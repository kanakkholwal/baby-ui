<script lang="ts">
import { GibberishText, type GibberishTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
let text = $derived((props.text as string) || "Gibberish");
</script>

{#key text}
	<GibberishText {text} size={(props.size as GibberishTextSize) ?? "lg"} class="text-foreground" />
{/key}
