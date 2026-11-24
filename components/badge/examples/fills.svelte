<script lang="ts">
import { Badge } from "@baby-ui/components/svelte/badge";

const VARIANTS = [
	"default",
	"secondary",
	"outline",
	"success",
	"warning",
	"destructive",
	"info",
	"gold",
] as const;
const FILLS = ["soft", "solid", "ghost"] as const;
</script>

<div class="flex flex-col gap-3">
	{#each FILLS as fill (fill)}
		<div class="flex flex-wrap items-center gap-2">
			{#each VARIANTS as variant (variant)}
				<Badge {variant} {fill}>{variant}</Badge>
			{/each}
		</div>
	{/each}
</div>
