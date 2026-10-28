<script lang="ts">
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@baby-ui/svelte";
</script>

<Sheet>
	<SheetTrigger>Open sheet</SheetTrigger>
	<SheetContent side="right">
		<SheetHeader>
			<SheetTitle>Filters</SheetTitle>
			<SheetClose />
		</SheetHeader>
		<p class="text-muted-foreground text-sm">Anything can live in the panel.</p>
	</SheetContent>
</Sheet>
