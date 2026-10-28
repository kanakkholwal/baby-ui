import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
	Message,
	MessageBubble,
	MessageContent,
} from "@baby-ui/react";

export function Example() {
	return (
		<div style={{ height: "20rem" }}>
			<Conversation className="h-full">
				<ConversationContent>
					<Message align="end">
						<MessageContent>
							<MessageBubble variant="primary">
								What does the registry emit?
							</MessageBubble>
						</MessageContent>
					</Message>
					<Message>
						<MessageContent>
							<MessageBubble>One JSON item per component, per framework.</MessageBubble>
						</MessageContent>
					</Message>
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</div>
	);
}
