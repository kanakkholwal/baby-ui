"use client";

import { ChatComposer, type ChatTopic } from "@baby-ui/react";

const TOPICS: ChatTopic[] = [
	{
		key: "flavors",
		label: "Flavors",
		initialPrompt: "Compare mint chip to last summer",
		messages: [
			{
				label: "Sales History",
				sub: "Flavor Data",
				time: "4s",
				body: "Pulled 3 summers of data.",
			},
		],
	},
];

export function Example() {
	return <ChatComposer topics={TOPICS} />;
}
