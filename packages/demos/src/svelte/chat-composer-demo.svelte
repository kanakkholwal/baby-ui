<script lang="ts">
import { ChatComposer, type ChatTopic } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();

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
				body: "Pulled 3 summers of mint chip sales for comparison.",
			},
			{
				label: "Comparison",
				sub: "Trend Detection",
				time: "2s",
				body: "Mint chip is up 12% with stronger weekend peaks.",
			},
		],
	},
	{
		key: "suppliers",
		label: "Suppliers",
		initialPrompt: "Which suppliers are behind schedule?",
		messages: [
			{
				label: "Supplier Status",
				sub: "Order Tracking",
				time: "3s",
				body: "2 of 14 suppliers have shipments running late this week.",
			},
			{
				label: "Root Cause",
				sub: "Delay Analysis",
				time: "5s",
				body: "Cone King's delay traces back to a packaging shortage, expected clear by Friday.",
			},
		],
	},
];
</script>

<ChatComposer topics={TOPICS} placeholder="Prompt or tag a flavor with @" />
