<script lang="ts">
import { TextRepel, type TextRepelMode, type TextRepelSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="px-6 py-10 font-semibold text-3xl text-foreground tracking-tight">
	<TextRepel
		text={(props.text as string) || "Move your cursor here"}
		mode={(props.mode as TextRepelMode) ?? "repel"}
		radius={Number(props.radius ?? 120)}
		strength={Number(props.strength ?? 45)}
		size={(props.size as TextRepelSize) ?? "inherit"}
	/>
</div>
