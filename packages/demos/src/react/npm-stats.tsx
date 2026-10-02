"use client";

import { NpmStats } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { DEMO_NPM_PACKAGES } from "../data/npm-stats";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function NpmStatsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof NpmStats>>(props);
	const [packages] = useState(DEMO_NPM_PACKAGES);
	const range = p.range === "90d" ? "90d" : "30d";
	return (
		<div className="w-full max-w-4xl">
			<NpmStats
				key={range}
				packages={packages}
				variant={p.variant ?? "default"}
				locale={p.locale || undefined}
				defaultRange={range}
			/>
		</div>
	);
}
