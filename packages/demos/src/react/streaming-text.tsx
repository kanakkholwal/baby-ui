"use client";

import { type StreamingSource, StreamingText, type StreamingToken } from "@baby-ui/react";

type Props = Record<string, unknown>;

const SOURCE_IMAGES = {
	scoop:
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M20 36c0 7 5.4 12 12 12s12-5 12-12H20Z' fill='%23fff'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23bff3dd'/%3E%3C/svg%3E",
	trends:
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232f6fec'/%3E%3Cpath d='M15 43 27 31l8 7 14-18' fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
	market:
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23e56d24'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3C/svg%3E",
};

const SOURCES: StreamingSource[] = [
	{
		name: "Scoop Data",
		domain: "scoopdata.io",
		href: "https://scoopdata.io/",
		image: SOURCE_IMAGES.scoop,
	},
	{
		name: "Trends Index",
		domain: "trends.google.com",
		href: "https://trends.google.com/trends/",
		image: SOURCE_IMAGES.trends,
	},
	{
		name: "Market Basket",
		domain: "marketbasket.io",
		href: "https://marketbasket.io/",
		image: SOURCE_IMAGES.market,
	},
];

const CONTENT: StreamingToken[] = [
	..."Pistachio is your fastest-growing flavor, sales are up 23% this month and margins beat vanilla by 8 points."
		.split(" ")
		.map((text) => ({ text })),
	{ text: "", cite: 0 },
	..."Stone-fruit flavors are trending in the same range."
		.split(" ")
		.map((text) => ({ text })),
];

const FOLLOW_UPS = [
	"Which flavors sell best in winter",
	"Compare gelato and soft serve margins",
];

export function StreamingTextDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-96">
			<StreamingText
				key={String(props.layout)}
				layout={(props.layout as "inline" | "card") ?? "inline"}
				content={CONTENT}
				sources={SOURCES}
				followUps={FOLLOW_UPS}
				onFollowUp={() => {}}
				onRetry={() => {}}
				onFeedback={() => {}}
			/>
		</div>
	);
}
