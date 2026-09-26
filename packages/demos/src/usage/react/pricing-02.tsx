"use client";

import { Pricing02 } from "@baby-ui/react";
import { useState } from "react";

const periods = [
	{ value: "monthly", label: "Monthly", cadence: "/ month" },
	{ value: "yearly", label: "Yearly", cadence: "/ year" },
];

const plans = [
	{
		id: "hobby",
		name: "Hobby",
		prices: { monthly: "$0", yearly: "$0" },
		features: ["1 project", "Community support"],
		featuresLabel: "Hobby includes",
	},
	{
		id: "pro",
		name: "Pro",
		prices: { monthly: "$20", yearly: "$192" },
		features: ["Unlimited projects", "Email support"],
		featuresLabel: "Everything in Hobby, plus",
		featured: true,
	},
];

export function Example() {
	const [period, setPeriod] = useState("monthly");

	return (
		<Pricing02
			title="Pricing"
			plans={plans}
			periods={periods}
			period={period}
			onPeriodChange={setPeriod}
			onSelect={(planId, billing) => console.log(planId, billing)}
		/>
	);
}
