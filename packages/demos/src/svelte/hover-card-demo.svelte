<script lang="ts">
import {
	Avatar,
	AvatarFallback,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<HoverCard
	openDelay={Number(props.openDelay ?? 300)}
	closeDelay={Number(props.closeDelay ?? 150)}
>
	<HoverCardTrigger>
		<button
			type="button"
			class="font-medium text-foreground text-sm underline underline-offset-4"
		>
			@kanakkholwal
		</button>
	</HoverCardTrigger>
	<HoverCardContent side={(props.side as never) ?? "bottom"}>
		<div class="flex items-start gap-3">
			<Avatar size="sm"><AvatarFallback>KK</AvatarFallback></Avatar>
			<div>
				<p class="font-medium text-foreground">Kanak Kholwal</p>
				<p class="mt-1 text-muted-foreground text-xs">
					Building docvia and this registry. Move the pointer onto this card: it stays open.
				</p>
			</div>
		</div>
	</HoverCardContent>
</HoverCard>
