export type ContextChunkTone = "destructive" | "success" | "warning";

export type ContextChunk = {
	title: string;
	chars: string;
	body: string;
	source: string;
	badge: string;
	tone: ContextChunkTone;
};
