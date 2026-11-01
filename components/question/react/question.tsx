"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { Checkbox } from "../../checkbox/react/checkbox";
import { Input } from "../../input/react/input";
import { cn } from "../../lib/cn";
import { RadioGroup, RadioGroupItem } from "../../radio-group/react/radio-group";
import {
	EMPTY_ANSWER,
	isAnswered,
	QUESTION_ICONS,
	type QuestionAnswer,
	type QuestionAnswers,
	type QuestionItem,
	type QuestionOption,
	type QuestionStatus,
	type QuestionVariant,
	question,
} from "../variants";

export type {
	QuestionAnswer,
	QuestionAnswers,
	QuestionItem,
	QuestionOption,
	QuestionStatus,
	QuestionVariant,
};

type Ctx = {
	questions: QuestionItem[];
	item: QuestionItem | undefined;
	step: number;
	answer: QuestionAnswer;
	status: QuestionStatus;
	interactive: boolean;
	busy: boolean;
	setAnswer: (next: QuestionAnswer) => void;
	setStep: (next: number) => void;
	advance: () => void;
	queueAdvance: () => void;
	styles: ReturnType<typeof question>;
};
const QuestionContext = createContext<Ctx | null>(null);

function useQuestion(part: string): Ctx {
	const ctx = useContext(QuestionContext);
	if (!ctx) throw new Error(`${part} must be used inside <Question>`);
	return ctx;
}

function Glyph({ d, className }: { d: string; className?: string }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden className={className}>
			<path d={d} />
		</svg>
	);
}

export interface QuestionProps extends Omit<ComponentProps<"div">, "onSubmit"> {
	questions: QuestionItem[];
	/** `submitting` locks the card with a spinner; `answered` folds it to its result. */
	status?: QuestionStatus;
	answers?: QuestionAnswers;
	defaultAnswers?: QuestionAnswers;
	onAnswersChange?: (answers: QuestionAnswers) => void;
	step?: number;
	defaultStep?: number;
	onStepChange?: (step: number) => void;
	onSubmit?: (answers: QuestionAnswers) => void;
	variant?: QuestionVariant;
}

/** The root: clarifying questions an agent asks, one at a time, then a one-line result. */
export function Question({
	questions,
	status = "pending",
	answers,
	defaultAnswers = {},
	onAnswersChange,
	step,
	defaultStep = 0,
	onStepChange,
	onSubmit,
	variant = "muted",
	className,
	children,
	...props
}: QuestionProps) {
	const [ownAnswers, setOwnAnswers] = useState<QuestionAnswers>(defaultAnswers);
	const [ownStep, setOwnStep] = useState(defaultStep);
	const timer = useRef<number | undefined>(undefined);
	const current = answers ?? ownAnswers;
	const index = Math.min(Math.max(0, step ?? ownStep), Math.max(0, questions.length - 1));
	const item = questions[index];
	const busy = status === "submitting";
	const interactive = status === "pending" || busy;

	const clearTimer = () => {
		window.clearTimeout(timer.current);
		timer.current = undefined;
	};
	useEffect(() => () => window.clearTimeout(timer.current), []);

	const setStep = (next: number) => {
		clearTimer();
		if (step === undefined) setOwnStep(next);
		onStepChange?.(next);
	};
	const advance = () => {
		if (index < questions.length - 1) setStep(index + 1);
		else onSubmit?.(current);
	};

	const styles = question({ variant });
	const ctx: Ctx = {
		questions,
		item,
		step: index,
		answer: item ? (current[item.id] ?? EMPTY_ANSWER) : EMPTY_ANSWER,
		status,
		interactive,
		busy,
		setAnswer: (next) => {
			if (!item) return;
			const all = { ...current, [item.id]: next };
			if (answers === undefined) setOwnAnswers(all);
			onAnswersChange?.(all);
		},
		setStep,
		advance,
		// A single pick moves on after a beat, so the choice is seen before the next question.
		queueAdvance: () => {
			if (!item || item.multiple || item.autoAdvance === false || busy) return;
			if (index >= questions.length - 1) return;
			clearTimer();
			timer.current = window.setTimeout(() => setStep(index + 1), 240);
		},
		styles,
	};

	return (
		<QuestionContext.Provider value={ctx}>
			<div
				data-slot="question"
				data-status={status}
				data-variant={variant}
				aria-busy={busy}
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
			</div>
		</QuestionContext.Provider>
	);
}

export interface QuestionHeaderProps {
	/** Shown once answered, in place of the last question's title. */
	title?: ReactNode;
	/** Shows a close button. */
	onDismiss?: () => void;
	className?: string;
}

/** The icon, the current question's title, its place in the set, and an optional close. */
export function QuestionHeader({ title, onDismiss, className }: QuestionHeaderProps) {
	const {
		item,
		step,
		questions,
		status,
		interactive,
		busy,
		styles: s,
	} = useQuestion("QuestionHeader");
	const text = interactive ? item?.title : (title ?? item?.title);
	return (
		<div data-slot="question-header" className={cn(s.header(), className)}>
			<span aria-hidden data-status={status} className={s.icon()}>
				<Glyph
					d={
						busy
							? QUESTION_ICONS.spinner
							: interactive
								? QUESTION_ICONS.help
								: QUESTION_ICONS.check
					}
					className={busy ? s.spinner() : undefined}
				/>
			</span>
			<div className={s.heading()}>
				<h3 className={s.title()}>
					<span key={`${status}-${item?.id}`} className={s.titleText()}>
						{text}
					</span>
				</h3>
				{interactive && questions.length > 1 && (
					<span className={s.counter()}>
						{step + 1}/{questions.length}
					</span>
				)}
				{onDismiss && (
					<button
						type="button"
						aria-label="Dismiss"
						onClick={onDismiss}
						className={s.dismiss()}
					>
						<Glyph d={QUESTION_ICONS.close} />
					</button>
				)}
			</div>
		</div>
	);
}

/** The current question's description, its options and an optional free-text answer. */
export function QuestionContent({ className }: { className?: string }) {
	const {
		item,
		answer,
		interactive,
		busy,
		setAnswer,
		queueAdvance,
		styles: s,
	} = useQuestion("QuestionContent");
	if (!item) return null;
	const custom = answer.custom ?? "";
	return (
		<div
			data-slot="question-content"
			data-open={interactive || undefined}
			className={s.fold()}
		>
			<div className={s.clip()} inert={!interactive}>
				<div key={item.id} className={cn(s.pane(), className)}>
					{item.description && <p className={s.description()}>{item.description}</p>}
					{item.options?.length ? (
						item.multiple ? (
							<div className={s.options()}>
								{item.options.map((option) => (
									<Checkbox
										key={option.value}
										checked={answer.selected.includes(option.value)}
										disabled={busy || option.disabled}
										label={option.label}
										description={option.description}
										onCheckedChange={(checked) =>
											setAnswer({
												...answer,
												selected: checked
													? [...answer.selected, option.value]
													: answer.selected.filter((v) => v !== option.value),
											})
										}
										className={s.option()}
									/>
								))}
							</div>
						) : (
							<RadioGroup
								value={answer.selected[0] ?? ""}
								onValueChange={(value) => {
									setAnswer({ selected: [value], custom: "" });
									queueAdvance();
								}}
								className={s.options()}
							>
								{item.options.map((option) => (
									<RadioGroupItem
										key={option.value}
										value={option.value}
										label={option.label}
										description={option.description}
										disabled={busy || option.disabled}
										className={s.option()}
									/>
								))}
							</RadioGroup>
						)
					) : null}
					{item.allowCustom && (
						<Input
							value={custom}
							disabled={busy}
							aria-label={item.customPlaceholder ?? "Another response"}
							placeholder={item.customPlaceholder ?? "Add another response…"}
							onChange={(event) =>
								setAnswer({
									selected: item.multiple ? answer.selected : [],
									custom: event.currentTarget.value,
								})
							}
							className={s.custom()}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export interface QuestionFooterProps {
	submitLabel?: string;
	className?: string;
}

/** Back, a dot per question, and next, which submits on the last question. */
export function QuestionFooter({
	submitLabel = "Submit response",
	className,
}: QuestionFooterProps) {
	const {
		questions,
		step,
		answer,
		busy,
		interactive,
		setStep,
		advance,
		styles: s,
	} = useQuestion("QuestionFooter");
	const last = step === questions.length - 1;
	return (
		<div
			data-slot="question-footer"
			data-open={interactive || undefined}
			className={s.fold()}
		>
			<div className={s.clip()} inert={!interactive}>
				<div className={cn(s.footer(), className)}>
					{questions.length > 1 && (
						<>
							<Button
								variant="ghost"
								size="icon-sm"
								aria-label="Previous question"
								disabled={busy || step === 0}
								onClick={() => setStep(step - 1)}
								className="rounded-full"
							>
								<Glyph
									d={QUESTION_ICONS.back}
									className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
								/>
							</Button>
							<span className={s.dots()}>
								<span className="sr-only">
									Question {step + 1} of {questions.length}
								</span>
								{questions.map((q, i) => (
									<span
										key={q.id}
										aria-hidden
										data-done={i <= step || undefined}
										data-current={i === step || undefined}
										className={s.dot()}
									/>
								))}
							</span>
						</>
					)}
					<Button
						size={last ? "sm" : "icon-sm"}
						aria-label={last ? submitLabel : "Next question"}
						disabled={busy || !isAnswered(answer)}
						onClick={advance}
						className={s.next()}
					>
						{busy ? (
							<Glyph
								d={QUESTION_ICONS.spinner}
								className="spinner fill-none stroke-current [stroke-linecap:round] [stroke-width:2]"
							/>
						) : last ? (
							<>
								{submitLabel}
								<Glyph
									d={QUESTION_ICONS.next}
									className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
								/>
							</>
						) : (
							<Glyph
								d={QUESTION_ICONS.next}
								className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
							/>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

/** The line left once answered, e.g. "Going with Edge and streaming". */
export function QuestionResult({
	className,
	children = "Response submitted",
}: {
	className?: string;
	children?: ReactNode;
}) {
	const { interactive, styles: s } = useQuestion("QuestionResult");
	if (interactive) return null;
	return (
		<p data-slot="question-result" role="status" className={cn(s.result(), className)}>
			{children}
		</p>
	);
}
