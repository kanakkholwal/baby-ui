<script lang="ts">
import { GibberishText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof GibberishText>>(props));
let text = $derived(p.text || "Gibberish");
</script>

{#key text}
	<GibberishText
		{text}
		speedMs={Number(props.speedMs ?? 24)}
		size={p.size ?? "lg"}
		class="text-foreground"
	/>
{/key}
