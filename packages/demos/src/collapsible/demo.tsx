"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function CollapsibleDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Collapsible>>(props);
	return (
		<div className="w-full max-w-80">
			<Collapsible defaultOpen={p.open ?? false}>
				<CollapsibleTrigger>Advanced options</CollapsibleTrigger>
				<CollapsibleContent>
					Build command, install command and the output directory. Changing these rebuilds
					every preview deployment.
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
