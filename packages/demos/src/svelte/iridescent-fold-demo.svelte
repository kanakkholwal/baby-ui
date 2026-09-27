<script lang="ts">
import {
	IridescentFold,
	type IridescentFoldSpeed,
	type IridescentFoldTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<IridescentFold
		position="absolute"
		tone={(props.tone as IridescentFoldTone) ?? "spectrum"}
		speed={(props.speed as IridescentFoldSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Folded light</p>
		</div>
	</IridescentFold>
</div>
