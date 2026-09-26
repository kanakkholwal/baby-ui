"use client";

import { Pricing01, type Pricing01Variant } from "@baby-ui/react";
import { useState } from "react";
import { PRICING_PERIODS, PRICING_PLANS_01 } from "../data/pricing";

type Props = Record<string, unknown>;

export function Pricing01Demo({ props }: { props: Props }) {
	const [period, setPeriod] = useState("monthly");
	const [chosen, setChosen] = useState<string | null>(null);

	return (
		<div className="flex w-full flex-col gap-2">
			<Pricing01
				plans={PRICING_PLANS_01}
				periods={PRICING_PERIODS}
				period={period}
				onPeriodChange={setPeriod}
				onSelect={(id, p) => setChosen(`${id}, ${p}`)}
				eyebrow="Pricing"
				title="A plan for every stage."
				description="Start for free, then move up when your work needs more room. Every plan includes the essentials to ship something great."
				variant={(props.variant as Pricing01Variant) ?? "default"}
			/>
			<p aria-live="polite" className="text-center text-muted-foreground text-xs">
				{chosen ? `Chose ${chosen}` : null}
			</p>
		</div>
	);
}
