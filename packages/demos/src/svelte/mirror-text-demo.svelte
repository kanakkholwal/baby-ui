<script lang="ts">
import { MirrorText, type MirrorTextDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
	<MirrorText
		text={(props.text as string) || "This is a text"}
		direction={(props.direction as MirrorTextDirection) ?? "up"}
		durationMs={Number(props.durationMs ?? 500)}
		staggerMs={Number(props.staggerMs ?? 67)}
		class="text-4xl font-light uppercase"
	/>
{/key}
