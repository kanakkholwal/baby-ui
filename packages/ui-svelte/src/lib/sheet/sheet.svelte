<script lang="ts">
import type { Snippet } from "svelte";
import { setSheet } from "./context";

let { children, open = $bindable(false) }: { children?: Snippet; open?: boolean } =
	$props();

const uid = $props.id();

setSheet({
	get open() {
		return open;
	},
	titleId: `${uid}-title`,
	descriptionId: `${uid}-description`,
	setOpen: (next) => (open = next),
});
</script>

{@render children?.()}
