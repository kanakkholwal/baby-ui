<script lang="ts">
import type { Snippet } from "svelte";

// shadcn requires a provider around tooltips; ours needs no shared state, so this
// exists only so the same markup compiles here.
let { children }: { children?: Snippet } = $props();
</script>

{@render children?.()}
