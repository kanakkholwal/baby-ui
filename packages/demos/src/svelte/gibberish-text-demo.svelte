<script lang="ts">
import { GibberishText, type GibberishTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
let text = $derived((props.text as string) || "Gibberish");
</script>

{#key text}
	<GibberishText
		{text}
		speedMs={Number(props.speedMs ?? 24)}
		size={(props.size as GibberishTextSize) ?? "lg"}
		class="text-foreground"
	/>
{/key}
