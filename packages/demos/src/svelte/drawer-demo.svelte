<script lang="ts">
import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	type DrawerDirection,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	type DrawerVariant,
	Slider,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let budget = $state(60);
const direction = $derived((props.direction as DrawerDirection) ?? "bottom");
const variant = $derived((props.variant as DrawerVariant) ?? "default");
</script>

<Drawer bind:open {direction} dismissible={props.dismissible !== false}>
	<DrawerTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">
		Set a budget
	</DrawerTrigger>
	<DrawerContent {variant}>
		<DrawerHeader>
			<DrawerTitle>Monthly budget</DrawerTitle>
			<DrawerDescription>Alerts go out when spend crosses this line.</DrawerDescription>
		</DrawerHeader>
		<DrawerClose />
		<div class="mt-6 flex flex-col gap-4">
			<div class="flex items-baseline justify-between">
				<span class="text-muted-foreground text-sm">Limit</span>
				<span class="font-semibold text-3xl text-foreground tabular-nums">${budget}</span>
			</div>
			<Slider bind:value={budget} min={10} max={200} step={5} label="Monthly budget" />
			<p class="text-muted-foreground text-xs">Spent so far this month: $42.</p>
		</div>
		<DrawerFooter>
			<DrawerClose class="inline-flex h-9 items-center justify-center rounded-lg px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]">
				Cancel
			</DrawerClose>
			<Button onclick={() => (open = false)}>Save budget</Button>
		</DrawerFooter>
	</DrawerContent>
</Drawer>
