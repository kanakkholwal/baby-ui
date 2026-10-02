"use client";

import { StarHistory } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { DEMO_STAR_HISTORIES, DEMO_STAR_HISTORIES_LIST } from "../data/star-history";

type Props = Record<string, unknown>;

export function StarHistoryDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof StarHistory>>(props);
	const [history] = useState(DEMO_STAR_HISTORIES_LIST[0] ?? DEMO_STAR_HISTORIES.mid);
	const mode = p.mode === "daily" ? "daily" : "cumulative";
	return (
		<div className="w-full max-w-4xl">
			<StarHistory
				key={mode}
				history={history}
				variant={p.variant ?? "default"}
				locale={p.locale || undefined}
				defaultMode={mode}
			/>
		</div>
	);
}
