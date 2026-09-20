<script lang="ts">
import type { Snippet } from "svelte";
import { getContextMenu } from "./context";

let { children }: { children?: Snippet } = $props();

const menu = getContextMenu();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	data-slot="context-menu-trigger"
	class="contents"
	oncontextmenu={(event) => {
		event.preventDefault();
		menu.openAt(event.clientX, event.clientY);
	}}
>
	{@render children?.()}
</div>
