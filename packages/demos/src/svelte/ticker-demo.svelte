<script lang="ts">
import { Ticker } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Ticker value="1,024" />
