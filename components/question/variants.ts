import { tv, type VariantProps } from "tailwind-variants";

const FOLD = [
	"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
	"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100",
];

export const question = tv({
	slots: {
		// A fieldset keeps the group semantics native; its browser chrome is reset.
		root: "m-0 w-full min-w-0 border-0 text-foreground text-sm",
		// Holds the title, the options and the result; framed, it is the inner panel.
		body: "",
		header: "flex items-start gap-3",
		// Only shown while sending and once answered.
		icon: "mt-px grid size-6 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground data-[status=answered]:bg-success/15 data-[status=answered]:text-success-strong [&_svg]:size-3.5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2.25]",
		heading: "min-w-0 flex-1",
		eyebrow: "m-0 mb-1 text-muted-foreground text-xs tabular-nums",
		title:
			"m-0 min-w-0 rounded-md text-balance font-semibold text-foreground text-lg leading-6 tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring",
		titleText:
			"inline-block transition-[opacity,translate,filter] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1.5 starting:opacity-0 starting:blur-[2px] motion-reduce:transition-none",
		// 32px circle with a 44px hit area around it.
		dismiss:
			"relative grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground outline-none transition-[color,background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) before:absolute before:-inset-1.5 hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-width:2]",
		fold: FOLD,
		// The padding and the matching negative margin leave room for focus rings the fold would clip.
		clip: "-m-1 min-h-0 overflow-hidden p-1",
		pane: "transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-x-2 starting:opacity-0 motion-reduce:transition-none",
		description: "m-0 mt-1 text-pretty text-muted-foreground leading-5",
		options: "mt-4 grid gap-2",
		// One tile per answer: the whole row is the target. Checked, it tints; the radio or box stays the real control.
		option: [
			"relative min-h-12 items-center gap-3 rounded-xl bg-muted/60 px-4 py-2.5 text-base text-foreground",
			"transition-[background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-muted active:scale-(--press-scale-sm) motion-reduce:transition-none motion-reduce:active:scale-100",
			"has-data-checked:bg-primary/10 has-data-[state=checked]:bg-primary/10",
			"has-focus-visible:outline-2 has-focus-visible:outline-ring has-focus-visible:outline-offset-2",
			"has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50",
			"forced-colors:has-data-checked:outline forced-colors:has-data-[state=checked]:outline",
			"[&_[role=radio]]:border-transparent [&_[role=radio]]:bg-foreground/15 [&_[role=radio][data-checked]]:bg-primary [&_[role=radio][data-state=checked]]:bg-primary",
			// Radio and checkbox tiles read the same: 16px label, 14px description, filled box at rest.
			"[&_[role=checkbox]]:border-transparent [&_[role=checkbox]]:bg-foreground/15 [&_[role=checkbox][data-checked]]:border-primary [&_[role=checkbox][data-state=checked]]:border-primary [&_label>span.block:first-child]:text-base [&_span.text-xs]:text-sm",
		],
		custom:
			"mt-2 h-12 rounded-xl border-0 bg-muted/60 px-4 text-base hover:bg-muted focus-visible:bg-muted",
		footer: "mt-5 flex flex-wrap items-center gap-x-4 gap-y-3",
		// One segment per question; the finished ones and the current one are filled.
		steps: "flex items-center gap-1",
		step: "h-1.5 w-5 rounded-full bg-foreground/15 transition-[width,background-color] duration-(--duration-base) ease-(--ease-ui-out) data-[done]:bg-primary/55 data-[current]:w-8 data-[current]:bg-primary motion-reduce:transition-none",
		actions: "ms-auto flex items-center gap-1.5",
		back: "rounded-full pointer-coarse:h-11",
		skip: "rounded-full pointer-coarse:h-11",
		next: "rounded-full px-5 pointer-coarse:h-11",
		result: "m-0 mt-1 ps-9 text-muted-foreground",
		spinner: "spinner",
	},
	variants: {
		/** `framed` holds the body in a card rim with the footer; `card` is one raised surface; `plain` has no surface and sits in a turn. */
		variant: {
			framed: {
				root: "rounded-2xl bg-card p-1",
				body: "rounded-[calc(var(--radius-2xl)-0.25rem)] bg-background p-4",
				footer: "mt-0 px-3 py-2.5",
			},
			card: {
				root: "rounded-2xl bg-card p-4 shadow-(--overlay-shadow)",
			},
			plain: {},
		},
	},
	defaultVariants: { variant: "framed" },
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
	/** Hides Skip: the question has to be answered to move on. */
	required?: boolean;
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
