<script lang="ts">
import type { Snippet } from "svelte";
import DialogTitle from "../dialog/dialog-title.svelte";
import DrawerTitle from "../drawer/drawer-title.svelte";
import { getResponsiveDialog } from "./context";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const dialog = getResponsiveDialog();
</script>

{#if dialog.isMobile}
	<DrawerTitle class={classProp}>
		{@render children?.()}
	</DrawerTitle>
{:else}
	<DialogTitle class={classProp}>
		{@render children?.()}
	</DialogTitle>
{/if}
