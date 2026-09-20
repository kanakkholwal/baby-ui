<script lang="ts">
import type { Snippet } from "svelte";
import { setContextMenu } from "./context";

let { children, open = $bindable(false) }: { children?: Snippet; open?: boolean } =
	$props();

const contentId = $props.id();
let point = $state({ x: 0, y: 0 });

setContextMenu({
	get open() {
		return open;
	},
	get point() {
		return point;
	},
	contentId,
	openAt: (x, y) => {
		point = { x, y };
		open = true;
	},
	close: () => (open = false),
});
</script>

{@render children?.()}
