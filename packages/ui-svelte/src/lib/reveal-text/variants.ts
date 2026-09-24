import { tv, type VariantProps } from "tailwind-variants";

export const revealText = tv({
	slots: {
		root: "group/reveal block [--reveal-blur:var(--reveal-blur-amount)] [--reveal-y:40%] motion-reduce:[--reveal-blur:0px] motion-reduce:[--reveal-y:0%] pointer-coarse:[--reveal-blur:0px]",
		line: "block",
		unit: "inline-block transition-[opacity,translate,filter] duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] [transition-delay:var(--reveal-delay)] group-data-[revealed=false]/reveal:translate-y-(--reveal-y) group-data-[revealed=false]/reveal:opacity-0 group-data-[revealed=false]/reveal:blur-(--reveal-blur) group-data-[revealed=false]/reveal:transition-none motion-reduce:duration-250 motion-reduce:[transition-delay:calc(var(--reveal-delay)*0.3)]",
		srOnly: "sr-only",
	},
	variants: {
		split: {
			word: {},
			char: { unit: "whitespace-pre" },
		},
		trigger: {
			mount: {},
			view: {},
		},
		size: {
			inherit: {},
			sm: { root: "text-xl" },
			md: { root: "text-3xl" },
			lg: { root: "text-5xl" },
		},
	},
	defaultVariants: { split: "word", trigger: "mount", size: "inherit" },
});

export type RevealTextSplit = NonNullable<VariantProps<typeof revealText>["split"]>;
export type RevealTextTrigger = NonNullable<VariantProps<typeof revealText>["trigger"]>;
export type RevealTextSize = NonNullable<VariantProps<typeof revealText>["size"]>;

export type RevealUnit = { key: string; text: string; delay: number };

/** Splits lines into staggered units; word units carry their trailing space as a nbsp. */
export function revealUnits(
	lines: string[],
	split: RevealTextSplit,
	delayMs: number,
	staggerMs: number,
): RevealUnit[][] {
	let n = 0;
	return lines.map((line, l) => {
		const parts = split === "char" ? Array.from(line) : line.split(/\s+/).filter(Boolean);
		return parts.map((part, i) => {
			const text = split === "word" && i < parts.length - 1 ? `${part}\u00a0` : part;
			return { key: `${l}-${i}`, text, delay: delayMs + n++ * staggerMs };
		});
	});
}
