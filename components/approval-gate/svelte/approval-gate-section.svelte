<script lang="ts">
import type { Snippet } from "svelte";
import { approvalSection } from "../variants";

let { open, id, children }: { open: boolean; id?: string; children?: Snippet } = $props();
</script>

<!-- Internal: the grid-rows fold every appearing or leaving region shares. -->
<div {id} class={approvalSection({ open })} inert={!open}>
	<div class="overflow-hidden">{@render children?.()}</div>
</div>
