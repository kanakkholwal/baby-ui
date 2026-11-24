<script lang="ts">
import { Avatar, AvatarFallback } from "@baby-ui/components/svelte/avatar";
import { Badge, BadgeAnchor } from "@baby-ui/components/svelte/badge";

const PLACEMENTS = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;
</script>

<div class="flex items-center gap-8">
	{#each PLACEMENTS as placement (placement)}
		<div class="flex flex-col items-center gap-2">
			<BadgeAnchor>
				<Avatar>
					<AvatarFallback>JD</AvatarFallback>
				</Avatar>
				<Badge fill="solid" size="sm" {placement} aria-label={placement} />
			</BadgeAnchor>
			<span class="text-muted-foreground text-xs">{placement}</span>
		</div>
	{/each}
</div>
