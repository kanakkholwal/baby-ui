<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { type ButtonSize, type ButtonVariant, button } from "./variants";

type Props = {
	variant?: ButtonVariant;
	size?: ButtonSize;
	href?: string;
	loading?: boolean;
	loadingLabel?: string;
	children?: Snippet;
	class?: string;
} & Partial<HTMLButtonAttributes | HTMLAnchorAttributes>;

let {
	variant,
	size,
	href,
	loading = false,
	loadingLabel = "Loading…",
	children,
	class: classProp,
	onclick,
	...rest
}: Props = $props();

const FACE =
	"col-start-1 row-start-1 flex items-center justify-center gap-2 transition-[opacity,transform,scale,translate,filter] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none data-[on=false]:pointer-events-none data-[on=false]:translate-y-[3px] data-[on=false]:opacity-0 data-[on=false]:blur-[3px]";

const classes = $derived(cn(button({ variant, size }), classProp));

function activate(event: MouseEvent) {
	if (loading) {
		event.preventDefault();
		return;
	}
	(onclick as ((e: MouseEvent) => void) | undefined)?.(event);
}
</script>

{#snippet faces()}
	<span class="grid place-items-center">
		<span class={FACE} data-on={!loading} aria-hidden={loading}>
			{@render children?.()}
		</span>
		<span class={FACE} data-on={loading} aria-hidden={!loading}>
			<svg
				viewBox="0 0 12 12"
				fill="none"
				aria-hidden="true"
				class="size-3.5 [animation:spin_850ms_linear_infinite] motion-reduce:animate-none"
				style:animation-play-state={loading ? "running" : "paused"}
			>
				<circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5" opacity="0.22" />
				<path
					d="M10.5 6A4.5 4.5 0 0 0 6 1.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
			{loadingLabel}
		</span>
	</span>
{/snippet}

{#if href !== undefined}
	<a
		{...rest as HTMLAnchorAttributes}
		href={loading ? undefined : href}
		role={loading ? "link" : undefined}
		class={classes}
		aria-busy={loading || undefined}
		aria-disabled={loading || undefined}
		data-variant={variant}
		data-size={size}
		onclick={activate}
		onkeydown={(e) => {
			// Anchors don't activate on Space natively; the spec requires that they do.
			if (e.key === " ") {
				e.preventDefault();
				e.currentTarget.click();
			}
		}}
	>
		{@render faces()}
	</a>
{:else}
	<button
		{...rest as HTMLButtonAttributes}
		type={(rest as HTMLButtonAttributes).type ?? "button"}
		class={classes}
		aria-busy={loading || undefined}
		aria-disabled={loading || undefined}
		data-variant={variant}
		data-size={size}
		onclick={activate}
	>
		{@render faces()}
	</button>
{/if}
