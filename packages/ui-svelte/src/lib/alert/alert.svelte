<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "../lib/cn.js";
	import { ALERT_ICON, ALERT_ROLE, type AlertVariant, alert } from "./variants.js";

	type Props = {
		children?: Snippet;
		variant?: AlertVariant;
		title?: string;
		dismissible?: boolean;
		class?: string;
	};

	let { children, variant = "info", title, dismissible = false, class: classProp }: Props =
		$props();

	let open = $state(true);
	const tone = {
		info: "text-muted-foreground",
		success: "text-[var(--success)]",
		warning: "text-[var(--warning)]",
		destructive: "text-[var(--destructive)]",
	};
</script>

{#if open}
	<div role={ALERT_ROLE[variant]} class={cn("alert-in", alert({ variant }), classProp)}>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={cn("mt-px size-4 shrink-0", tone[variant])}>
			<circle cx="8" cy="8" r="6.4" stroke="currentColor" stroke-width="1.3" />
			<path d={ALERT_ICON[variant]} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		<div class="min-w-0 flex-1">
			{#if title}<p class="font-medium text-foreground">{title}</p>{/if}
			{#if children}
				<div class={cn("text-muted-foreground", title && "mt-1")}>{@render children()}</div>
			{/if}
		</div>
		{#if dismissible}
			<button
				type="button"
				aria-label="Dismiss"
				onclick={() => (open = false)}
				class="-mr-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		{/if}
	</div>
{/if}
