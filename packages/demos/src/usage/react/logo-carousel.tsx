"use client";

import { LogoCarousel } from "@baby-ui/react";

const LOGOS = ["Acme", "Nimbus", "Kestrel", "Orbital"];

export function Example() {
	return (
		<LogoCarousel columnCount={4}>
			{LOGOS.map((name) => (
				<span key={name} className="flex h-10 w-24 items-center justify-center text-sm">
					{name}
				</span>
			))}
		</LogoCarousel>
	);
}
