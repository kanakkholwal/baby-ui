<script lang="ts">
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	paginationRange,
} from "@baby-ui/svelte";

const total = 12;
let page = $state(3);

const entries = $derived(paginationRange(page, total));
</script>

<Pagination>
	<PaginationPrevious disabled={page <= 1} onclick={() => (page = page - 1)} />
	<PaginationContent>
		{#each entries as entry, i (typeof entry === "number" ? entry : `gap-${i}`)}
			<PaginationItem>
				{#if entry === "gap"}
					<PaginationEllipsis />
				{:else}
					<PaginationLink active={entry === page} onclick={() => (page = entry)}>
						{entry}
					</PaginationLink>
				{/if}
			</PaginationItem>
		{/each}
	</PaginationContent>
	<PaginationNext disabled={page >= total} onclick={() => (page = page + 1)} />
</Pagination>
