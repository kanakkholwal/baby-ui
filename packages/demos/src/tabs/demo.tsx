"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const TABS = [
	{ id: "overview", label: "Overview" },
	{ id: "activity", label: "Activity" },
	{ id: "settings", label: "Settings" },
];

const TAB_COPY: Record<string, string> = {
	overview: "Deployment health, traffic and recent errors at a glance.",
	activity: "Every deploy, who triggered it and how long it took.",
	settings: "Build command, environment variables and domains.",
};

export function TabsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Tabs>>(props);
	const [value, setValue] = useState("overview");
	return (
		<div className="w-full max-w-96">
			<Tabs
				value={value}
				onValueChange={setValue}
				variant={p.variant ?? "pill"}
				size={p.size ?? "default"}
				orientation={p.orientation ?? "horizontal"}
			>
				<TabsList>
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{TABS.map((tab) => (
					<TabsContent key={tab.id} value={tab.id}>
						<p className="text-muted-foreground text-sm">{TAB_COPY[tab.id]}</p>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
