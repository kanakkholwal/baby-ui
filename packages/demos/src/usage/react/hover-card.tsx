import { HoverCard } from "@baby-ui/react";

export function Example() {
	return (
		<HoverCard trigger={<a href="/about">baby-ui</a>}>
			<p className="text-sm">
				A registry of React and Svelte components built from one spec.
			</p>
		</HoverCard>
	);
}
