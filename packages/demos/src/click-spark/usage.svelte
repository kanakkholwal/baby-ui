<script lang="ts">
import { ClickSpark } from "@baby-ui/svelte";

let { children } = $props();
</script>

<!-- Once, near the root of the app: every press on the page bursts. -->
<ClickSpark />
{@render children()}
