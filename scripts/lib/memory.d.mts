export declare function memoryLine(): string;
export declare function reportMemory(
	log: (line: string) => void,
	options?: { intervalMs?: number; threshold?: number },
): () => void;
