<script lang="ts">
import { SearchInput } from "@baby-ui/svelte";

let query = $state("");
</script>

<SearchInput bind:value={query} shortcut="/" onSearch={(q) => console.log("search", q)} />
