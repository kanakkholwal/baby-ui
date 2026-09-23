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
	type ResponsiveDialogVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
const variant = $derived((props.variant as ResponsiveDialogVariant) ?? "default");
const BTN =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";
</script>

<div class="flex flex-col items-center gap-3">
	<ResponsiveDialog bind:open {variant}>
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
