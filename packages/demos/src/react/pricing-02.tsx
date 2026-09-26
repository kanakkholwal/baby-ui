"use client";

import { Pricing02, type Pricing02Variant } from "@baby-ui/react";
import { useState } from "react";
import { PRICING_PERIODS, PRICING_PLANS_02 } from "../data/pricing";

type Props = Record<string, unknown>;

export function Pricing02Demo({ props }: { props: Props }) {
	const [period, setPeriod] = useState("monthly");
	const [chosen, setChosen] = useState<string | null>(null);

	return (
		<div className="flex w-full flex-col gap-2">
			<Pricing02
				plans={PRICING_PLANS_02}
				periods={PRICING_PERIODS}
				period={period}
				onPeriodChange={setPeriod}
				onSelect={(id, p) => setChosen(`${id}, ${p}`)}
				eyebrow="Simple pricing"
				title={"Start small.\nKeep room to grow."}
				description="Straightforward plans with every essential included. Upgrade, downgrade, or cancel whenever you like."
				footnotes={[
					"No credit card required for Starter.",
					"Prices exclude applicable taxes.",
				]}
				variant={(props.variant as Pricing02Variant) ?? "soft"}
			/>
			<p aria-live="polite" className="text-center text-muted-foreground text-xs">
				{chosen ? `Chose ${chosen}` : null}
			</p>
		</div>
	);
}
