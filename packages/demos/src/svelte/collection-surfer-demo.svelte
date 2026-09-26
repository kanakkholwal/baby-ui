<script lang="ts">
import {
	CollectionSurfer,
	type CollectionSurferSize,
	type CollectionSurferVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const IDS = [1005, 1011, 1012, 1027, 1035, 1038, 1041, 1050, 1062, 1074];
const ITEMS = IDS.map((id, i) => ({
	src: `https://picsum.photos/id/${id}/440/588`,
	alt: `Look ${i + 1}`,
}));
</script>

<CollectionSurfer
	items={ITEMS}
	variant={(props.variant as CollectionSurferVariant) ?? "magnetic"}
	size={(props.size as CollectionSurferSize) ?? "md"}
	scrollPerItem={Number(props.scrollPerItem ?? 300)}
	title={(props.title as string) ?? "Heritage FW25 collection"}
	hint={(props.hint as string) ?? "Scroll to surf"}
/>
