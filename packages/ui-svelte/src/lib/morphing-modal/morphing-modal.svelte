<script lang="ts">
import type { Snippet } from "svelte";
import { prefersReducedMotion } from "svelte/motion";
import { cn } from "../lib/cn";
import { invert, MORPH_EASE, MORPH_MS, type MorphSpring } from "./morph";

type Props = {
	trigger: Snippet;
	children: Snippet;
	title: string;
	class?: string;
	spring?: MorphSpring;
	dismissOnBackdrop?: boolean;
	backdropBlur?: number;
};

let {
	trigger,
	children,
	title,
	class: classProp,
	spring = "gentle",
	dismissOnBackdrop = true,
	backdropBlur = 8,
}: Props = $props();

let triggerEl = $state<HTMLButtonElement>();
let dialog = $state<HTMLDialogElement>();
let panel = $state<HTMLDivElement>();
let hidden = $state(false);

const titleId = $props.id();

function animateMorph(reverse: boolean): Promise<void> {
	const from = triggerEl?.getBoundingClientRect();
	const to = panel?.getBoundingClientRect();
	if (!from || !to || !panel || prefersReducedMotion.current) return Promise.resolve();

	const collapsed = invert(from, to);
	const frames = reverse
		? [
				{ transform: "none", opacity: 1 },
				{ transform: collapsed, opacity: 0 },
			]
		: [
				{ transform: collapsed, opacity: 0 },
				{ transform: "none", opacity: 1 },
			];

	// Closing is faster: the user has already decided.
	const duration = MORPH_MS[spring] * (reverse ? 0.7 : 1);
	return panel
		.animate(frames, {
			duration,
			easing: MORPH_EASE[spring],
			fill: "both",
		})
		.finished.then(() => undefined);
}

async function open() {
	dialog?.showModal();
	hidden = true;
	await animateMorph(false);
}

async function close() {
	await animateMorph(true);
	hidden = false;
	dialog?.close();
	triggerEl?.focus();
}
</script>

<button
	bind:this={triggerEl}
	type="button"
	onclick={open}
	style:opacity={hidden ? 0 : 1}
	class="cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
	{@render trigger()}
</button>

<dialog
	bind:this={dialog}
	aria-labelledby={titleId}
	oncancel={(e) => {
		e.preventDefault();
		close();
	}}
	onclick={(e) => {
		if (dismissOnBackdrop && e.target === dialog) close();
	}}
	style:--morph-blur="{backdropBlur}px"
	class="morph-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/40"
>
	<div
		bind:this={panel}
		class={cn(
			"w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl",
			classProp,
		)}
	>
		<div class="flex items-start justify-between gap-4">
			<h2 id={titleId} class="font-medium text-foreground text-lg">{title}</h2>
			<button
				type="button"
				onclick={close}
				aria-label="Close"
				class="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>
		<div class="mt-3 text-muted-foreground text-sm">{@render children()}</div>
	</div>
</dialog>
