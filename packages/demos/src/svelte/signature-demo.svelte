<script lang="ts">
import { Signature } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Signature>>(props));
</script>

{#key JSON.stringify(props)}
<Signature
	text={p.text || "Baby UI"}
	variant={p.variant ?? "ink"}
	duration={Number(props.duration ?? 2)}
	delay={Number(props.delay ?? 0)}
	strokeWidth={Number(props.strokeWidth ?? 1)}
	inView={p.inView ?? false}
	class="font-['Segoe_Script','Snell_Roundhand','Apple_Chancery',cursive] text-6xl text-foreground"
/>
{/key}
