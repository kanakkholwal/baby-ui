<script lang="ts">
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@baby-ui/svelte";
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
</script>

<button
	type="button"
	onclick={() => (open = true)}
	class={[
		"inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card/40 px-3 font-medium text-muted-foreground text-xs transition-colors hover:border-border-strong hover:text-foreground",
		triggerClass,
	]}
>
	{@render icon?.()}
	{label}
</button>

<Drawer bind:open>
	<DrawerContent>
		<DrawerHeader>
			<DrawerTitle>{title}</DrawerTitle>
		</DrawerHeader>
		<div class="scrollbar-hide max-h-[70dvh] overflow-y-auto px-1 pb-2">
			{@render children({ close: () => (open = false) })}
		</div>
	</DrawerContent>
</Drawer>
