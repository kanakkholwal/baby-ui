<script lang="ts">
import { StaggeredLetter, type StaggeredLetterDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.delayMs ?? "") + String(props.durationMs ?? "")}
	<StaggeredLetter
		text={(props.text as string) || "Baby UI"}
		applyMask={props.applyMask === true}
		delayMs={Number(props.delayMs ?? 90)}
		durationMs={Number(props.durationMs ?? 500)}
		direction={(props.direction as StaggeredLetterDirection) ?? "drop"}
	/>
{/key}
