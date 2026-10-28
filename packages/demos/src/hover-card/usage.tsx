import { HoverCard, HoverCardContent, HoverCardTrigger } from "@baby-ui/react";

export function Example() {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<a href="/about">baby-ui</a>
			</HoverCardTrigger>
			<HoverCardContent>
				<p className="text-sm">
					A registry of React and Svelte components built from one spec.
				</p>
			</HoverCardContent>
		</HoverCard>
	);
}
