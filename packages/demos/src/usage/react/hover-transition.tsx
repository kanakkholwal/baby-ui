import { HoverTransition } from "@baby-ui/react";

export function Example() {
	return (
		<HoverTransition
			effect="ripple"
			direction="bottom-left"
			className="aspect-square w-64"
			hoverContent={
				<div className="grid size-full place-items-center bg-primary">After</div>
			}
		>
			<div className="grid size-full place-items-center bg-muted">Before</div>
		</HoverTransition>
	);
}
