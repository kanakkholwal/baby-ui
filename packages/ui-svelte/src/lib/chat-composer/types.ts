/** One scripted agent reply revealed in the thread after the user sends. */
export type ChatMessage = {
	label: string;
	sub: string;
	time: string;
	body: string;
};

/** One switchable thread: its own tab, starting prompt, and scripted replies. */
export type ChatTopic = {
	key: string;
	label: string;
	initialPrompt: string;
	messages: ChatMessage[];
};
