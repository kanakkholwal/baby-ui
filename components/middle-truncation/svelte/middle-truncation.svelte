<script lang="ts" module>
import type { HTMLAttributes } from "svelte/elements";
import type { MiddleTruncationVariant } from "../variants";

type TailStrategy = { end?: number; minEnd?: never } | { end?: never; minEnd?: number };

export type MiddleTruncationProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> &
	TailStrategy & {
		text: string;
		ellipsis?: string;
		variant?: MiddleTruncationVariant;
	};
</script>

<script lang="ts">
import type { Attachment } from "svelte/attachments";
import { cn } from "../../lib/cn";
import { copyFull, fitElement } from "../truncate";
import { middleTruncation } from "../variants";

let {
	text,
	ellipsis = "…",
	end,
	minEnd,
	variant = "default",
	class: classProp,
	oncopy,
	...rest
}: MiddleTruncationProps = $props();
let displayed = $state<string>();
let root = $state<HTMLSpanElement>();

function measure(
	currentText: string,
	currentEllipsis: string,
	currentEnd?: number,
	currentMinEnd?: number,
): Attachment<HTMLSpanElement> {
	return (element) => {
		let frame = 0;
		let active = true;
		const fit = () => {
			displayed = fitElement(element, currentText, currentEllipsis, currentEnd, currentMinEnd);
		};
		// Measured right away, so a new text never shows a frame of the old one.
		fit();
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				if (active) fit();
			});
		};
		const observer = new ResizeObserver(update);
		observer.observe(element);
		document.fonts?.ready.then(update);
		return () => {
			active = false;
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	};
}
</script>

<span
	bind:this={root}
	{@attach measure(text, ellipsis, end, minEnd)}
	data-slot="middle-truncation"
	class={cn(middleTruncation({ variant }), classProp)}
	title={text}
	oncopy={(event) => {
		oncopy?.(event);
		if (root && !event.defaultPrevented) copyFull(event, root, text);
	}}
	{...rest}
><span aria-hidden="true">{displayed ?? text}</span><span class="sr-only select-none">{text}</span></span>
