import {
	Message,
	MessageAvatar,
	MessageBubble,
	MessageContent,
	MessageHeader,
} from "@baby-ui/react";

export function Example() {
	return (
		<Message>
			<MessageAvatar>A</MessageAvatar>
			<MessageContent>
				<MessageHeader>Assistant</MessageHeader>
				<MessageBubble>
					Every component satisfies the same spec in both frameworks.
				</MessageBubble>
			</MessageContent>
		</Message>
	);
}
