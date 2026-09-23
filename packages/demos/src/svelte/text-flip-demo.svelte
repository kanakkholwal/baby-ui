<script lang="ts">
import { TextFlip, type TextFlipSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const words = ["fantastic", "love", "fire", "awesome"];
</script>

<TextFlip label="Coding is" {words} size={(props.size as TextFlipSize) ?? "lg"} />
