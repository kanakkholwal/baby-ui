"use client";

import { Typography } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TypographyDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Typography>>(props);
	return (
		<div className="flex w-full max-w-80 flex-col gap-3">
			<Typography variant="h2">Release 0.4</Typography>
			<Typography variant="muted">Shipped 20 September 2026</Typography>
			<Typography variant={p.variant ?? "body"}>
				Overlays now animate out as well as in, and every anchored surface grows from the
				edge nearest its trigger.
			</Typography>
		</div>
	);
}
