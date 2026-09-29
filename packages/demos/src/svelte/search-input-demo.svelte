<script lang="ts">
import { SearchInput } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { SEARCHABLE } from "../data/utility-inputs";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SearchInput>>(props));

let query = $state("");
let results = $state(SEARCHABLE);
let loading = $state(false);
let timer: ReturnType<typeof setTimeout> | undefined;
$effect(() => () => clearTimeout(timer));

// Stands in for a request to your search endpoint.
function search(q: string) {
	loading = true;
	clearTimeout(timer);
	timer = setTimeout(() => {
		results = SEARCHABLE.filter((name) => name.toLowerCase().includes(q.toLowerCase()));
		loading = false;
	}, 350);
}
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
	<SearchInput
		bind:value={query}
		shortcut="/"
		placeholder="Search components…"
		loading={loading || Boolean(props.loading)}
		size={p.size ?? "md"}
		onSearch={search}
	/>
	<ul class="flex flex-col gap-1 text-muted-foreground text-sm">
		{#each results.slice(0, 5) as name (name)}
			<li>{name}</li>
		{/each}
		{#if results.length === 0}<li>No components match.</li>{/if}
	</ul>
</div>
