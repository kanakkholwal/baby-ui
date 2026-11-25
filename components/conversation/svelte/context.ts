import { createContext } from "svelte";
import type { ConversationVariant } from "../variants";

export type ConversationContext = {
	follow: boolean;
	atBottom: boolean;
	readonly threshold: number;
	readonly variant: ConversationVariant;
	viewport: HTMLDivElement | null;
	scrollingToBottom: boolean;
	scrollToBottom(behavior?: ScrollBehavior): void;
};

export const [getConversation, setConversation] = createContext<ConversationContext>();
