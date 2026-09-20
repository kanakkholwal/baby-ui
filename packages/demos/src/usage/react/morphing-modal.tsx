import { MorphingModal } from "@baby-ui/react";

export function Example() {
	return (
		<MorphingModal title="Release 2.1" trigger={<span className="font-medium text-sm">Release 2.1</span>}>
			<p className="text-muted-foreground text-sm">
				The card you clicked becomes the dialog, then returns to exactly where it started.
			</p>
		</MorphingModal>
	);
}
