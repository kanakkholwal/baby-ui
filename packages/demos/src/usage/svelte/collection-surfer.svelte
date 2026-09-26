<script lang="ts">
import { CollectionSurfer } from "@baby-ui/svelte";

const items = [1005, 1011, 1012, 1027, 1035, 1038].map((id, i) => ({
	src: `https://picsum.photos/id/${id}/440/588`,
	alt: `Look ${i + 1}`,
}));
</script>

<CollectionSurfer {items} title="Spring collection" />
