<script lang="ts">
import { TextExplodeIMessage } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<TextExplodeIMessage text="Big news" mode="loop" />
