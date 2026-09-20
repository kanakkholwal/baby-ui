<script lang="ts">
import { Pagination } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let page = $state(4);

$effect(() => {
	page = Number(props.page ?? 4);
});
</script>

<Pagination
	bind:page
	total={Number(props.total ?? 12)}
	siblings={Number(props.siblings ?? 1)}
/>
