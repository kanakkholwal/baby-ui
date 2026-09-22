<script lang="ts">
import { ChatComposer, type ChatTopic } from "@baby-ui/svelte";

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
</script>

<ChatComposer topics={TOPICS} />
