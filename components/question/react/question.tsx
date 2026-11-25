"use client";

import {
	type ComponentProps,
	createContext,
	type ReactNode,
	type RefObject,
	useContext,
	useEffect,
	useId,
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
	titleId: string;
	descriptionId: string;
	titleRef: RefObject<HTMLHeadingElement | null>;
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

export interface QuestionProps extends Omit<ComponentProps<"fieldset">, "onSubmit"> {
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

/**
 * The root: clarifying questions an agent asks, one at a time, then a one-line result. A native
 * fieldset named by the current title; a step change is announced and moves focus to that title.
 */
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
	variant = "framed",
	className,
	children,
	...props
}: QuestionProps) {
	const [ownAnswers, setOwnAnswers] = useState<QuestionAnswers>(defaultAnswers);
	const [ownStep, setOwnStep] = useState(defaultStep);
	const [announcement, setAnnouncement] = useState("");
	const timer = useRef<number | undefined>(undefined);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const uid = useId();
	const titleId = `${uid}-title`;
	const descriptionId = `${uid}-description`;
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

	// A new question is spoken and takes focus; the first render and plain re-renders stay quiet.
	const seen = useRef({ index, status });
	useEffect(() => {
		const before = seen.current;
		seen.current = { index, status };
		if (status === "pending" && index !== before.index && item) {
			setAnnouncement(`Question ${index + 1} of ${questions.length}: ${item.title}`);
			titleRef.current?.focus({ preventScroll: true });
		} else if (status === "submitting" && before.status !== "submitting") {
			setAnnouncement("Sending your answers");
		}
	}, [index, status, item, questions.length]);

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
		titleId,
		descriptionId,
		titleRef,
		styles,
	};

	return (
		<QuestionContext.Provider value={ctx}>
			<fieldset
				data-slot="question"
				data-status={status}
				data-variant={variant}
				aria-labelledby={titleId}
				aria-describedby={interactive && item?.description ? descriptionId : undefined}
				aria-busy={busy}
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
				<p role="status" className="sr-only">
					{announcement}
				</p>
			</fieldset>
		</QuestionContext.Provider>
	);
}

/** The inner panel (framed) around the header, content and result; the footer stays in the rim. */
export function QuestionBody({ className, ...props }: ComponentProps<"div">) {
	const { styles: s } = useQuestion("QuestionBody");
	return <div data-slot="question-body" className={cn(s.body(), className)} {...props} />;
}

export interface QuestionHeaderProps {
	/** Shown once answered, in place of the last question's title. */
	title?: ReactNode;
	/** Shows a close button. */
	onDismiss?: () => void;
	/** Accessible name of the close button. */
	dismissLabel?: string;
	className?: string;
}

/** The place in the set, the current title (the group's name) and an optional close. */
export function QuestionHeader({
	title,
	onDismiss,
	dismissLabel = "Dismiss questions",
	className,
}: QuestionHeaderProps) {
	const {
		item,
		step,
		questions,
		status,
		interactive,
		busy,
		titleId,
		titleRef,
		styles: s,
	} = useQuestion("QuestionHeader");
	const text = interactive ? item?.title : (title ?? item?.title);
	return (
		<div data-slot="question-header" className={cn(s.header(), className)}>
			{interactive && !busy ? null : (
				<span aria-hidden data-status={status} className={s.icon()}>
					<Glyph
						d={busy ? QUESTION_ICONS.spinner : QUESTION_ICONS.check}
						className={busy ? s.spinner() : undefined}
					/>
				</span>
			)}
			<div className={s.heading()}>
				{interactive && questions.length > 1 && (
					<p className={s.eyebrow()}>
						Question {step + 1} of {questions.length}
					</p>
				)}
				<h3 id={titleId} ref={titleRef} tabIndex={-1} className={s.title()}>
					<span key={`${status}-${item?.id}`} className={s.titleText()}>
						{text}
					</span>
				</h3>
			</div>
			{onDismiss && (
				<button
					type="button"
					aria-label={dismissLabel}
					onClick={onDismiss}
					className={s.dismiss()}
				>
					<Glyph d={QUESTION_ICONS.close} />
				</button>
			)}
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
		titleId,
		descriptionId,
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
					{item.description && (
						<p id={descriptionId} className={s.description()}>
							{item.description}
						</p>
					)}
					{item.options?.length ? (
						item.multiple ? (
							<div className={s.options()}>
								{item.options.map((option) => (
									<Checkbox
										key={option.value}
										checked={answer.selected.includes(option.value)}
										disabled={busy || option.disabled}
										size="lg"
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
								variant="solid"
								size="lg"
								aria-labelledby={titleId}
								aria-describedby={item.description ? descriptionId : undefined}
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
							aria-describedby={item.description ? descriptionId : undefined}
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
	/** The last question's submit label. */
	submitLabel?: string;
	/** Label of the button that moves on without an answer; hidden for `required` questions. */
	skipLabel?: string;
	/** Label of the button that returns to the previous question. */
	backLabel?: string;
	className?: string;
}

/** Progress, then Back, Skip and Next; Next submits on the last question. */
export function QuestionFooter({
	submitLabel = "Send",
	skipLabel = "Skip",
	backLabel = "Back",
	className,
}: QuestionFooterProps) {
	const {
		item,
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
						<span aria-hidden className={s.steps()}>
							{questions.map((q, i) => (
								<span
									key={q.id}
									data-done={i < step || undefined}
									data-current={i === step || undefined}
									className={s.step()}
								/>
							))}
						</span>
					)}
					<div className={s.actions()}>
						{step > 0 && (
							<Button
								variant="ghost"
								disabled={busy}
								onClick={() => setStep(step - 1)}
								className={s.back()}
							>
								{backLabel}
							</Button>
						)}
						{item?.required ? null : (
							<Button
								variant="ghost"
								disabled={busy}
								onClick={advance}
								className={s.skip()}
							>
								{skipLabel}
							</Button>
						)}
						<Button
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
								submitLabel
							) : (
								"Next"
							)}
						</Button>
					</div>
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
