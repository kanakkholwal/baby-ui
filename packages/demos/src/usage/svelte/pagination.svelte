<script lang="ts">
import { Pagination } from "@baby-ui/svelte";

let page = $state(3);
</script>

<Pagination bind:page total={12} />
