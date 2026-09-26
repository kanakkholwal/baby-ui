"use client";

import { ChatComposer, type ChatMessage } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ id: "1", role: "user", body: "Compare mint chip to last summer" },
		{
			id: "2",
			role: "assistant",
			author: "Sales History",
			meta: "for 4s",
			body: "Up 12% on weekends.",
		},
	]);

	return (
		<ChatComposer
			messages={messages}
			onSend={(text) =>
				setMessages((all) => [
					...all,
					{ id: crypto.randomUUID(), role: "user", body: text },
				])
			}
		/>
	);
}
