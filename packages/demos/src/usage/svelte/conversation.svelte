<script lang="ts">
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
	Message,
} from "@baby-ui/svelte";
</script>

<div style="height: 20rem">
	<Conversation class="h-full">
		<ConversationContent>
			<Message align="end" name="You" tone="solid">What does the registry emit?</Message>
			<Message>One JSON item per component, per framework.</Message>
		</ConversationContent>
		<ConversationScrollButton />
	</Conversation>
</div>
