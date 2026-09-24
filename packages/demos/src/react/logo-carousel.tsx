"use client";

import { LogoCarousel } from "@baby-ui/react";

type Props = Record<string, unknown>;

const NAMES = [
	"Acme",
	"Nimbus",
	"Kestrel",
	"Orbital",
	"Vantage",
	"Fathom",
	"Beacon",
	"Marrow",
];

function LogoMark({ name }: { name: string }) {
	return (
		<span className="flex h-10 w-28 items-center justify-center rounded-lg border border-border bg-card font-medium text-muted-foreground text-sm">
			{name}
		</span>
	);
}

export function LogoCarouselDemo({ props }: { props: Props }) {
	return (
		<LogoCarousel
			columnCount={Number(props.columnCount ?? 4)}
			direction={(props.direction as "ltr" | "rtl") ?? "ltr"}
			className="w-full max-w-lg gap-3"
		>
			{NAMES.map((name) => (
				<LogoMark key={name} name={name} />
			))}
		</LogoCarousel>
	);
}
