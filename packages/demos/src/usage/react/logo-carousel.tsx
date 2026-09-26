"use client";

import { LogoCarousel } from "@baby-ui/react";

export function Example({ logos }: { logos: { src: string; alt: string }[] }) {
	return (
		<LogoCarousel columnCount={4}>
			{logos.map((logo) => (
				<img
					key={logo.src}
					src={logo.src}
					alt={logo.alt}
					className="h-8 w-24 object-contain"
				/>
			))}
		</LogoCarousel>
	);
}
