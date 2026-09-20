import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@baby-ui/react";

export function Example() {
	return (
		<Sheet>
			<SheetTrigger>Open sheet</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
					<SheetClose />
				</SheetHeader>
				<p className="text-muted-foreground text-sm">Anything can live in the panel.</p>
			</SheetContent>
		</Sheet>
	);
}
