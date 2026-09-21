<script lang="ts">
import type { Snippet } from "svelte";
import { Drawer } from "vaul-svelte";
import { cn } from "../lib/cn";
import { DRAWER_CONTENT, DRAWER_SURFACE, getDrawer } from "./context";

let {
	children,
	class: classProp,
	handle = true,
	...rest
}: {
	children?: Snippet;
	class?: string;
	/** Hide the drag handle; only sensible with `dismissible={false}`. */
	handle?: boolean;
} & Omit<Drawer.ContentProps, "children"> = $props();

const drawer = getDrawer();
const vertical = $derived(drawer.direction === "bottom" || drawer.direction === "top");
</script>

<Drawer.Portal>
	<Drawer.Overlay
		data-slot="drawer-overlay"
		class="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
	/>
	<!-- The frame is the rim; the body scrolls on a lighter surface inside it. -->
	<Drawer.Content
		data-slot="drawer-content"
		class={cn(
			"fixed z-50 flex flex-col border border-border bg-background p-1 text-foreground shadow-2xl outline-none",
			DRAWER_CONTENT[drawer.direction],
			classProp,
		)}
		{...rest}
	>
		{#if handle && vertical}
			<Drawer.Handle
				class={cn(
					"mx-auto! h-1.5! w-10! shrink-0 rounded-full! bg-muted-foreground/40! opacity-100!",
					drawer.direction === "bottom" ? "mt-2 mb-1" : "order-last mt-1 mb-2",
				)}
			/>
		{/if}
		<div
			data-slot="drawer-surface"
			class={cn(
				"relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain bg-card p-5",
				DRAWER_SURFACE[drawer.direction],
			)}
		>
			{@render children?.()}
		</div>
	</Drawer.Content>
</Drawer.Portal>
