export declare const TARGETS: {
	name: string;
	react: string;
	svelte: string;
}[];
export declare function generate(options?: { check?: boolean; quiet?: boolean }): {
	generated: string[];
	stale: string[];
	conflicts: string[];
};
export declare function watchRoots(): string[];
