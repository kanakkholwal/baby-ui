<script lang="ts">
import { TextReel, type TextReelSize } from "@baby-ui/svelte";
import { REEL_ITEMS } from "../data/obsidian";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<TextReel
	items={REEL_ITEMS}
	prefix={(props.prefix as string) || "We"}
	speed={Number(props.speed ?? 0.6)}
	paused={(props.paused as boolean) ?? false}
	size={(props.size as TextReelSize) ?? "md"}
	class="w-full"
/>
