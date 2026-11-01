import { getContext, hasContext, setContext } from "svelte";
import type { QuestionAnswer, QuestionItem, QuestionStatus, question } from "../variants";

export interface QuestionState {
	readonly questions: QuestionItem[];
	readonly item: QuestionItem | undefined;
	readonly step: number;
	readonly answer: QuestionAnswer;
	readonly status: QuestionStatus;
	readonly interactive: boolean;
	readonly busy: boolean;
	readonly styles: ReturnType<typeof question>;
	setAnswer(next: QuestionAnswer): void;
	setStep(next: number): void;
	advance(): void;
	queueAdvance(): void;
}

const KEY = Symbol("question");

/** The root's state behind getters, so every part reads the latest value. */
export const setQuestion = (state: QuestionState) => setContext(KEY, state);
export function questionState(part: string): QuestionState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <Question>`);
	return getContext<QuestionState>(KEY);
}
