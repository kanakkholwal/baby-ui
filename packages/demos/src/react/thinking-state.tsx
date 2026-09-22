"use client";

import {
	type ThinkingRow,
	ThinkingState,
	type ThinkingStateVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const CONTENT: Record<
	ThinkingStateVariant,
	{ active: string; done: string; query?: string; rows: ThinkingRow[] }
> = {
	steps: {
		active: "Thinking",
		done: "Thought for 4 seconds",
		rows: [
			{ primary: "Reading flavor briefs" },
			{ primary: "Scanning supplier lists" },
			{ primary: "Comparing tasting notes", secondary: "6 flavors" },
			{ primary: "Writing the scoop report", status: "active" },
		],
	},
	reasoning: {
		active: "Thinking",
		done: "Thought for 4 seconds",
		rows: [
			{
				primary: "Summer demand spikes for stone-fruit flavors, peach and apricot lead.",
			},
			{
				primary: "I should check cone inventory before promoting a waffle-bowl special.",
			},
		],
	},
	search: {
		active: "Searching the web",
		done: "Searched the web",
		query: "best waffle cone supplier",
		rows: [
			{
				primary: "Joy Cone",
				secondary: "joycone.com",
				href: "https://joycone.com/fs_products/waffle-cones/",
			},
			{
				primary: "WebstaurantStore",
				secondary: "webstaurantstore.com",
				href: "https://www.webstaurantstore.com/ice-cream-shop-supplies.html",
			},
			{
				primary: "The Konery",
				secondary: "thekonery.com",
				href: "https://www.thekonery.com/",
			},
		],
	},
	coding: {
		active: "Running tools",
		done: "Ran 3 tools",
		rows: [
			{ primary: "Read", secondary: "flavors.ts", mono: true },
			{ primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
			{ primary: "Run", secondary: "npm run freeze", mono: true },
		],
	},
};

export function ThinkingStateDemo({ props }: { props: Props }) {
	const variant = (props.variant as ThinkingStateVariant) ?? "steps";
	const [thinking, setThinking] = useState(true);

	useEffect(() => {
		setThinking(true);
		const id = setTimeout(() => setThinking(false), 3400);
		return () => clearTimeout(id);
	}, [variant]);

	const content = CONTENT[variant];
	const rows = thinking
		? content.rows
		: content.rows.map((r) => ({ ...r, status: undefined }));

	return (
		<ThinkingState
			key={variant}
			variant={variant}
			rows={rows}
			thinking={thinking}
			activeLabel={content.active}
			doneLabel={content.done}
			query={content.query}
		/>
	);
}
