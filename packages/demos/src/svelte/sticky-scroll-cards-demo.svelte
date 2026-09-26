<script lang="ts">
import {
	StickyScrollCards,
	type StickyScrollCardsSize,
	type StickyScrollCardsVariant,
} from "@baby-ui/svelte";
import { STICKY_CARDS } from "../data/stacks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<StickyScrollCards
	cards={STICKY_CARDS}
	variant={(props.variant as StickyScrollCardsVariant) ?? "polaroid"}
	size={(props.size as StickyScrollCardsSize) ?? "md"}
	tilt={Number(props.tilt ?? 1)}
	hint={(props.hint as string | undefined) ?? "Scroll to explore"}
	class="max-w-3xl"
/>
