import { Conversation, Message } from "@baby-ui/react";

export function Example() {
	return (
		<Conversation maxHeight="20rem">
			<Message role="user" name="You">
				What does the registry emit?
			</Message>
			<Message role="assistant">One JSON item per component, per framework.</Message>
		</Conversation>
	);
}
