<script lang="ts">
import { TextInertia, type TextInertiaSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const text =
	"Crafting refined, pixel-perfect web experiences that balance design clarity with technical excellence. Every interaction should feel responsive, intentional, and calm enough to disappear into the work.";
</script>

<TextInertia
	{text}
	intensity={Number(props.intensity ?? 1)}
	size={(props.size as TextInertiaSize) ?? "inherit"}
	class="w-full max-w-3xl justify-start text-left text-foreground text-lg leading-relaxed sm:text-xl"
/>
