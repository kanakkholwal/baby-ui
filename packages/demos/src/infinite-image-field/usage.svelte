<script lang="ts">
import { InfiniteImageField, type InfiniteImageItem } from "@baby-ui/svelte";

let { works }: { works: InfiniteImageItem[] } = $props();
</script>

<InfiniteImageField items={works} variant="fisheye" />
