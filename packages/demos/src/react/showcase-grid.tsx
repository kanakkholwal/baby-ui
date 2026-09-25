"use client";

import {
	Badge,
	Button,
	type ShowcaseFrame,
	ShowcaseGrid,
	ShowcasePanel,
	type ShowcaseSpan,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

const PANELS: { title: string; tag: string; span: ShowcaseSpan }[] = [
	{ title: "Charts", tag: "d3 + SVG", span: 7 },
	{ title: "Agents", tag: "streaming", span: 5 },
	{ title: "Text", tag: "motion", span: 5 },
	{ title: "Blocks", tag: "layouts", span: 7 },
];

export function ShowcaseGridDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl p-2 md:p-10">
			<ShowcaseGrid frame={(props.frame as ShowcaseFrame) ?? "rulers"}>
				{PANELS.map((panel) => (
					<ShowcasePanel
						key={panel.title}
						span={panel.span}
						className="min-h-36 md:min-h-44"
						actions={
							<Button size="sm" variant="outline">
								Open
							</Button>
						}
					>
						<div className="flex flex-col items-center gap-2">
							<span className="font-medium text-foreground text-lg">{panel.title}</span>
							<Badge variant="outline">{panel.tag}</Badge>
						</div>
					</ShowcasePanel>
				))}
			</ShowcaseGrid>
		</div>
	);
}
