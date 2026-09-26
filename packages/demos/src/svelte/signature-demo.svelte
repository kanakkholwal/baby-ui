<script lang="ts">
import { Signature, type SignatureVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key JSON.stringify(props)}
<Signature
	text={(props.text as string) || "Baby UI"}
	variant={(props.variant as SignatureVariant) ?? "ink"}
	duration={Number(props.duration ?? 2)}
	delay={Number(props.delay ?? 0)}
	strokeWidth={Number(props.strokeWidth ?? 1)}
	inView={Boolean(props.inView)}
	class="font-['Segoe_Script','Snell_Roundhand','Apple_Chancery',cursive] text-6xl text-foreground"
/>
{/key}
