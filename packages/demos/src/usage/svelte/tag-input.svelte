<script lang="ts">
import { TagInput } from "@baby-ui/svelte";

let tags = $state(["svelte", "react"]);
</script>

<TagInput bind:tags label="Topics" max={6} />
