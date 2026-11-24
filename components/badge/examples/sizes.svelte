<script lang="ts">
import { Badge } from "@baby-ui/components/svelte/badge";

const SIZES = ["sm", "default", "lg", "xl"] as const;
</script>

<div class="flex flex-wrap items-center gap-3">
	{#each SIZES as size (size)}
		<Badge {size}>{size}</Badge>
	{/each}
</div>
