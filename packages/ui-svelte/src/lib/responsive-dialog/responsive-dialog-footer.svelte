<script lang="ts">
import type { Snippet } from "svelte";
import DialogFooter from "../dialog/dialog-footer.svelte";
import DrawerFooter from "../drawer/drawer-footer.svelte";
import { getResponsiveDialog } from "./context";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const dialog = getResponsiveDialog();
</script>

{#if dialog.isMobile}
	<DrawerFooter class={classProp}>
		{@render children?.()}
	</DrawerFooter>
{:else}
	<DialogFooter class={classProp}>
		{@render children?.()}
	</DialogFooter>
{/if}
