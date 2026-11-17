<script lang="ts">
import {
	Button,
	ResponsiveDialog,
	ResponsiveDialogClose,
	ResponsiveDialogContent,
	ResponsiveDialogDescription,
	ResponsiveDialogFooter,
	ResponsiveDialogHeader,
	ResponsiveDialogTitle,
	ResponsiveDialogTrigger,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ResponsiveDialog>>(props));

let open = $state(false);
const variant = $derived(p.variant ?? "default");
const BTN =
	"inline-flex h-9 items-center rounded-lg bg-card px-3 font-medium text-foreground text-sm";
</script>

<div class="flex flex-col items-center gap-3">
	<ResponsiveDialog
		bind:open
		{variant}
		size={p.size}
		dismissOnBackdrop={p.dismissOnBackdrop ?? true}
		direction={p.direction ?? "bottom"}
		dismissible={p.dismissible ?? true}
	>
		<ResponsiveDialogTrigger class={BTN}>Edit profile</ResponsiveDialogTrigger>
		<ResponsiveDialogContent>
			<ResponsiveDialogHeader>
				<ResponsiveDialogTitle>Edit profile</ResponsiveDialogTitle>
				<ResponsiveDialogDescription>
					Dialog on desktop, Drawer on mobile: the same markup renders both.
				</ResponsiveDialogDescription>
			</ResponsiveDialogHeader>
			<ResponsiveDialogClose />
			<ResponsiveDialogFooter>
				<Button variant="ghost" size="sm" onclick={() => (open = false)}>Cancel</Button>
				<Button onclick={() => (open = false)}>Save</Button>
			</ResponsiveDialogFooter>
		</ResponsiveDialogContent>
	</ResponsiveDialog>
	<p class="text-muted-foreground text-xs">
		Resize below 768px (or open on a phone) to see it switch to a Drawer.
	</p>
</div>
