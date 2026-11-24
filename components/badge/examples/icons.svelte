<script lang="ts">
import { Badge } from "@baby-ui/components/svelte/badge";
</script>

{#snippet info()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="12" cy="12" r="9" />
		<path d="M12 11v5M12 8h.01" />
	</svg>
{/snippet}
{#snippet check()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="m5 12 5 5 9-10" />
	</svg>
{/snippet}
{#snippet warn()}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M12 4 3 20h18L12 4ZM12 10v4M12 17h.01" />
	</svg>
{/snippet}

<div class="flex flex-wrap items-center gap-2">
	<Badge variant="info">{@render info()}New feature</Badge>
	<Badge variant="success">{@render check()}Available</Badge>
	<Badge variant="warning">{@render warn()}Beta</Badge>
	<Badge variant="success" fill="solid">{@render check()}Verified</Badge>
</div>
