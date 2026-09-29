"use client";

import { Pricing01 } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { PRICING_PERIODS, PRICING_PLANS_01 } from "../data/pricing";

type Props = Record<string, unknown>;

export function Pricing01Demo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Pricing01>>(props);
	const [period, setPeriod] = useState("monthly");
	const [chosen, setChosen] = useState<string | null>(null);

	return (
		<div className="flex w-full flex-col gap-2">
			<Pricing01
				plans={PRICING_PLANS_01}
				periods={PRICING_PERIODS}
				period={period}
				onPeriodChange={setPeriod}
				onSelect={(id, selectedPeriod) => setChosen(`${id}, ${selectedPeriod}`)}
				eyebrow="Pricing"
				title="A plan for every stage."
				description="Start for free, then move up when your work needs more room. Every plan includes the essentials to ship something great."
				variant={p.variant ?? "default"}
			/>
			<p aria-live="polite" className="text-center text-muted-foreground text-xs">
				{chosen ? `Chose ${chosen}` : null}
			</p>
		</div>
	);
}
