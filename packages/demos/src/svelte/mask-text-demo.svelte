<script lang="ts">
import { MaskText } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<MaskText revealText="Hello there" baseText="Move your cursor" />
