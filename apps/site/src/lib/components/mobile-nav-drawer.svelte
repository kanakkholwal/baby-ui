<script lang="ts">
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@baby-ui/svelte";
import type { Snippet } from "svelte";

let {
	icon,
	label,
	title,
	children,
	class: triggerClass,
}: {
	icon?: Snippet;
	label: string;
	title: string;
	children: Snippet<[{ close: () => void }]>;
	class?: string;
} = $props();

let open = $state(false);
const close = () => (open = false);

// Any link inside navigates (often to an anchor on this page), so the sheet gets out of the way.
function closeOnLink(event: MouseEvent) {
	if (event.target instanceof Element && event.target.closest("a[href]")) close();
}
</script>

<Button variant="outline" size="sm" onclick={() => (open = true)} class={triggerClass}>
	{@render icon?.()}
	{label}
</Button>

<Drawer bind:open>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>{title}</DrawerTitle>
		</DrawerHeader>
		<!-- -mx-1 px-1: focus rings get room without shifting the list off the title's edge. -->
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -- delegation only; the links handle keys -->
		<div
			class="scrollbar-hide -mx-1 mt-3 max-h-[70dvh] overflow-y-auto px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
			onclick={closeOnLink}
		>
			{@render children({ close })}
		</div>
	</DrawerContent>
</Drawer>
