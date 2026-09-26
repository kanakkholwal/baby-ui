<script lang="ts">
import { ChatComposer, type ChatMessage } from "@baby-ui/svelte";

let messages = $state<ChatMessage[]>([
	{ id: "1", role: "user", body: "Compare mint chip to last summer" },
	{
		id: "2",
		role: "assistant",
		author: "Sales History",
		meta: "for 4s",
		body: "Up 12% on weekends.",
	},
]);
</script>

<ChatComposer
	{messages}
	onSend={(text) => (messages = [...messages, { id: crypto.randomUUID(), role: "user", body: text }])}
/>
