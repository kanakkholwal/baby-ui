"use client";

import { BentoCell, BentoGrid } from "@baby-ui/react";

type Props = Record<string, unknown>;

const CELLS = [
	{
		span: "2x1" as const,
		title: "Registry",
		body: "shadcn and shadcn-svelte, one spec.",
		image: "https://picsum.photos/id/1036/800/300",
	},
	{
		span: "1x1" as const,
		title: "Tokens",
		body: "Shared colour and motion.",
		image: "https://picsum.photos/id/1050/400/300",
	},
	{
		span: "1x1" as const,
		title: "Agents",
		body: "llms.txt and specs.json.",
		image: "https://picsum.photos/id/1057/400/300",
	},
	{
		span: "1x1" as const,
		title: "Playground",
		body: "Both renders, side by side.",
		image: "https://picsum.photos/id/1067/400/300",
	},
];

export function BentoGridDemo({ props }: { props: Props }) {
	return (
		<BentoGrid
			columns={Number(props.columns ?? 3)}
			gap={Number(props.gap ?? 16)}
			rowHeight={Number(props.rowHeight ?? 160)}
			className="w-full max-w-2xl"
		>
			{CELLS.map((cell) => (
				<BentoCell
					key={cell.title}
					span={cell.span}
					title={cell.title}
					description={cell.body}
				>
					<img
						src={cell.image}
						alt=""
						loading="lazy"
						className="mt-3 size-full rounded-lg object-cover"
					/>
				</BentoCell>
			))}
		</BentoGrid>
	);
}
