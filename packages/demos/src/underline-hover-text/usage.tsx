"use client";

import { UnderlineHoverText } from "@baby-ui/react";

export function Example() {
	return (
		<p>
			Read the{" "}
			<UnderlineHoverText as="a" href="/changelog" variant="draw" tone="primary">
				changelog
			</UnderlineHoverText>
			.
		</p>
	);
}
