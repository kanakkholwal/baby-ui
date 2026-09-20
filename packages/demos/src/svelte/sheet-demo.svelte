<script lang="ts">
import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let region = $state("fra");
</script>

<Sheet>
	<SheetTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Open sheet</SheetTrigger>
	<SheetContent side={(props.side as "left" | "right" | "top" | "bottom") ?? "right"}>
		<SheetHeader>
			<SheetTitle>Filters</SheetTitle>
			<SheetClose />
		</SheetHeader>
		<div class="flex flex-col gap-1.5">
			<Label for="sheet-region">Region</Label>
			<Select bind:value={region}>
				<SelectTrigger id="sheet-region">
					<SelectValue placeholder="Pick a region" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="fra">Frankfurt</SelectItem>
					<SelectItem value="iad">Washington DC</SelectItem>
					<SelectItem value="syd">Sydney</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<p class="text-muted-foreground text-sm">Escape closes the sheet and restores focus.</p>
	</SheetContent>
</Sheet>
