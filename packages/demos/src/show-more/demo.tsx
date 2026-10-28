"use client";

import { ShowMore, ShowMoreContent, ShowMoreTrigger } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const LOREM =
	"Components here are copied into your project rather than installed, which means you own the source and can change anything. The registry only decides what the first version looks like. Every port satisfies the same ComponentSpec, so the React and Svelte builds behave identically even though neither is generated from the other.";

export function ShowMoreDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ShowMore>>(props);
	const trigger = controlProps<ComponentProps<typeof ShowMoreTrigger>>(props);
	return (
		<div className="w-full max-w-80">
			<ShowMore lines={Number(p.lines ?? 3)} maxHeight={Number(p.maxHeight ?? 320)}>
				<ShowMoreContent>
					<p>{LOREM}</p>
				</ShowMoreContent>
				<ShowMoreTrigger
					moreLabel={trigger.moreLabel || "Show more"}
					lessLabel={trigger.lessLabel || "Show less"}
				/>
			</ShowMore>
		</div>
	);
}
