<script lang="ts">
import { Avatar, AvatarFallback } from "@baby-ui/components/svelte/avatar";
import { Badge, BadgeAnchor } from "@baby-ui/components/svelte/badge";

const DOTS = ["default", "success", "warning", "destructive"] as const;
const COUNTS = ["5", "New", "99+"] as const;
</script>

{#snippet host()}
	<Avatar>
		<AvatarFallback>JD</AvatarFallback>
	</Avatar>
{/snippet}

<div class="flex flex-col gap-6">
	<div class="flex items-center gap-6">
		{#each DOTS as variant (variant)}
			<BadgeAnchor>
				{@render host()}
				<Badge {variant} fill="solid" size="sm" placement="bottom-right" aria-label={variant} />
			</BadgeAnchor>
		{/each}
	</div>
	<div class="flex items-center gap-6">
		{#each COUNTS as count (count)}
			<BadgeAnchor>
				{@render host()}
				<Badge variant="destructive" fill="solid" size="sm" placement="top-right">{count}</Badge>
			</BadgeAnchor>
		{/each}
	</div>
</div>
