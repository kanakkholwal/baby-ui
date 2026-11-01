import { tv, type VariantProps } from "tailwind-variants";

const FOLD = [
	"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
	"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100",
];

export const question = tv({
	slots: {
		root: "w-full overflow-hidden text-sm",
		header: "flex items-start gap-3",
		icon: "grid size-5 shrink-0 place-items-center text-muted-foreground data-[status=answered]:text-success-strong [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2]",
		heading: "flex min-w-0 flex-1 items-start gap-3",
		title: "m-0 min-w-0 flex-1 font-medium text-base text-foreground leading-5",
		titleText:
			"inline-block transition-[opacity,translate,filter] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1.5 starting:opacity-0 starting:blur-[2px] motion-reduce:transition-none",
		counter: "shrink-0 text-muted-foreground text-xs tabular-nums",
		dismiss:
			"grid size-5 shrink-0 place-items-center rounded-full text-muted-foreground outline-none transition-[color,scale] duration-(--duration-fast) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-width:2]",
		fold: FOLD,
		clip: "min-h-0 overflow-hidden ps-8",
		pane: "transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-x-2 starting:opacity-0 motion-reduce:transition-none",
		description: "m-0 mt-1 text-muted-foreground leading-5",
		options: "mt-3 grid gap-0.5",
		option: "min-h-9 rounded-lg px-1.5 py-1",
		custom:
			"mt-1.5 h-10 rounded-xl border-0 bg-background/70 px-3 focus-visible:bg-background",
		footer: "mt-4 flex items-center gap-3",
		dots: "flex gap-1.5",
		dot: "size-1.5 rounded-full bg-foreground opacity-35 transition-[scale,opacity] duration-(--duration-fast) ease-(--ease-ui-out) scale-75 data-[done]:opacity-100 data-[current]:scale-100 data-[current]:opacity-100 motion-reduce:transition-none",
		next: "ms-auto rounded-full",
		result: "m-0 mt-1 ps-8 text-muted-foreground",
		spinner: "spinner",
	},
	variants: {
		/** `muted` is a filled card on the muted surface; `outline` a bordered one; `plain` sits in a turn. */
		variant: {
			muted: { root: "rounded-2xl bg-muted p-4" },
			outline: { root: "rounded-2xl border border-border bg-card p-4" },
			plain: {},
		},
	},
	defaultVariants: { variant: "muted" },
});

export type QuestionVariant = NonNullable<VariantProps<typeof question>["variant"]>;
export type QuestionStatus = "pending" | "submitting" | "answered";

export type QuestionOption = {
	value: string;
	label: string;
	/** Plain supporting text under the label. */
	description?: string;
	disabled?: boolean;
};

export type QuestionItem = {
	id: string;
	title: string;
	description?: string;
	options?: QuestionOption[];
	multiple?: boolean;
	/** Single-select: move on once picked. On by default. */
	autoAdvance?: boolean;
	allowCustom?: boolean;
	customPlaceholder?: string;
};

export type QuestionAnswer = { selected: string[]; custom?: string };
export type QuestionAnswers = Record<string, QuestionAnswer>;

export const EMPTY_ANSWER: QuestionAnswer = { selected: [], custom: "" };

export const isAnswered = (answer: QuestionAnswer) =>
	answer.selected.length > 0 || Boolean(answer.custom?.trim());

/** Stroke paths on a 24px grid. */
export const QUESTION_ICONS = {
	help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.25a2.5 2.5 0 0 1 4.86.83c0 1.67-2.5 2.5-2.5 2.5M12 16.5h.01",
	check: "m5 12.5 4.5 4.5L19 7.5",
	close: "M7 7l10 10M17 7 7 17",
	back: "M19 12H5m6-6-6 6 6 6",
	next: "M5 12h14m-6-6 6 6-6 6",
	spinner: "M21 12a9 9 0 1 1-6.2-8.56",
} as const;
