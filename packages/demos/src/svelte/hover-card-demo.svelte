<script lang="ts">
import { Avatar, HoverCard } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<HoverCard
	placement={(props.placement as never) ?? "bottom-start"}
	openDelay={Number(props.openDelay ?? 300)}
	closeDelay={Number(props.closeDelay ?? 150)}
>
	{#snippet trigger()}
		<button type="button" class="font-medium text-foreground text-sm underline underline-offset-4">
			@kanakkholwal
		</button>
	{/snippet}
	<div class="flex items-start gap-3">
		<Avatar name="Kanak Kholwal" size="sm" />
		<div>
			<p class="font-medium text-foreground">Kanak Kholwal</p>
			<p class="mt-1 text-muted-foreground text-xs">
				Building docvia and this registry. Move the pointer onto this card: it stays open.
			</p>
		</div>
	</div>
</HoverCard>
