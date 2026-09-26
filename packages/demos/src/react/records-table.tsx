"use client";

import { type RecordRow, type RecordsDensity, RecordsTable } from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const ROWS: RecordRow[] = [
	{
		id: "1",
		name: "Northwind Traders",
		tags: ["Retail", "Logistics"],
		last: "3 days ago",
		strength: "strong",
		website: "northwindtraders.com",
		logo: "https://avatar.vercel.sh/northwindtraders.com?size=40",
		aiValue: "Series B, $40M raised",
	},
	{
		id: "2",
		name: "Vantage Analytics",
		tags: ["Data", "B2B"],
		last: "2 weeks ago",
		strength: "weak",
		website: "vantageanalytics.io",
		logo: "https://avatar.vercel.sh/vantageanalytics.io?size=40",
		aiValue: "Bootstrapped, profitable",
	},
	{
		id: "3",
		name: "Coral Reef Studio",
		tags: ["Design"],
		last: "No contact",
		strength: "none",
		aiValue: "Acquired by Adobe, 2024",
	},
	{
		id: "4",
		name: "Ferrous Robotics",
		tags: ["Hardware", "Manufacturing"],
		last: "1 month ago",
		strength: "veryweak",
		website: "ferrousrobotics.com",
		logo: "https://avatar.vercel.sh/ferrousrobotics.com?size=40",
		aiValue: "Series A, $12M raised",
	},
	{
		id: "5",
		name: "Lumen Health",
		tags: ["Healthcare", "AI"],
		last: "Yesterday",
		strength: "strong",
		website: "lumenhealth.co",
		logo: "https://avatar.vercel.sh/lumenhealth.co?size=40",
		aiValue: "Series C, $85M raised",
	},
];

const MODEL_OPTIONS = ["GPT-5", "Claude Sonnet 5", "Gemini 2.5 Pro"];

export function RecordsTableDemo({ props }: { props: Props }) {
	const [calculatingColumn, setCalculatingColumn] = useState<string | null>(null);
	const [resolvedCount, setResolvedCount] = useState(0);
	const [showAi, setShowAi] = useState(false);

	useEffect(() => setShowAi(props.showAiColumn === true), [props.showAiColumn]);

	useEffect(() => {
		if (!calculatingColumn) return;
		if (resolvedCount >= ROWS.length) {
			setCalculatingColumn(null);
			return;
		}
		const timer = setTimeout(() => setResolvedCount((count) => count + 1), 110);
		return () => clearTimeout(timer);
	}, [calculatingColumn, resolvedCount]);

	return (
		<RecordsTable
			rows={ROWS}
			modelOptions={MODEL_OPTIONS}
			fill={props.fill as boolean | undefined}
			density={props.density as RecordsDensity | undefined}
			showAiColumn={showAi}
			onShowAiColumnChange={setShowAi}
			calculatingColumn={calculatingColumn}
			resolvedCount={resolvedCount}
			onCalculate={(column) => {
				setCalculatingColumn(column);
				setResolvedCount(0);
			}}
		/>
	);
}
