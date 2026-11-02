<script lang="ts">
import type { Icon } from "@baby-ui/icons";
import {
	IconArrowUpRight,
	IconDeviceDesktop,
	IconDeviceMobile,
	IconRefresh,
} from "@baby-ui/icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@baby-ui/svelte";
import { track } from "#lib/analytics.js";
import type { PreviewView } from "#lib/preview-modes.svelte.js";

let {
	viewport = $bindable(),
	view = $bindable(),
	views = [],
	viewports = false,
	reload = true,
	href,
	onReload,
}: {
	viewport: "desktop" | "mobile";
	/** Shows the width switch, for previews that render at a set width (emails). */
	viewports?: boolean;
	view?: string;
	/** Extra views a category offers, e.g. OG's Live / PNG; see PREVIEW_VIEWS. */
	views?: PreviewView[];
	/** Hidden on the Code tab, where there is nothing to reload. */
	reload?: boolean;
	/** The /frame URL for the current demo and controls, opened in a new tab. */
	href?: string;
	onReload: () => void;
} = $props();

type Action = {
	id: string;
	label: string;
	icon: Icon;
	pressed?: boolean;
	run: () => void;
};

const groups = $derived<Action[][]>(
	[
		views.map((v) => ({ ...v, pressed: view === v.id, run: () => (view = v.id) })),
		viewports
			? [
					{
						id: "desktop",
						label: "Desktop width",
						icon: IconDeviceDesktop,
						pressed: viewport === "desktop",
						run: () => (viewport = "desktop"),
					},
					{
						id: "mobile",
						label: "Mobile width",
						icon: IconDeviceMobile,
						pressed: viewport === "mobile",
						run: () => (viewport = "mobile"),
					},
				]
			: [],
		reload
			? [{ id: "reload", label: "Reload preview", icon: IconRefresh, run: onReload }]
			: [],
	].filter((group) => group.length > 0),
);

const button =
	"grid size-8 shrink-0 place-items-center rounded-full pointer-coarse:size-10 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground";
</script>

<!-- Sits in the preview header, right of the Preview / Code tabs. -->
<TooltipProvider>
	<div role="toolbar" aria-label="Preview controls" class="flex shrink-0 items-center gap-0.5">
		{#each groups as group, g (g)}
			{#if g > 0}<span aria-hidden="true" class="mx-1 h-4 w-px bg-border"></span>{/if}
			{#each group as action (action.id)}
				{@const ActionIcon = action.icon}
				<Tooltip delay={250}>
					<TooltipTrigger
						aria-label={action.label}
						aria-pressed={action.pressed}
						onclick={() => {
							action.run();
							track("preview_action", { action: action.id });
						}}
						class={button}
					>
						<ActionIcon size={15} />
					</TooltipTrigger>
					<TooltipContent side="top">{action.label}</TooltipContent>
				</Tooltip>
			{/each}
		{/each}
		{#if href}
			{#if groups.length > 0}<span aria-hidden="true" class="mx-1 h-4 w-px bg-border"></span>{/if}
			<Tooltip delay={250}>
				<TooltipTrigger>
					{#snippet child({ props })}
						<a
							{...props}
							{href}
							target="_blank"
							rel="noopener"
							aria-label="Open preview in a new tab"
							onclick={() => track("preview_action", { action: "new_tab" })}
							class={button}
						>
							<IconArrowUpRight size={15} />
						</a>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent side="top">Open in a new tab</TooltipContent>
			</Tooltip>
		{/if}
	</div>
</TooltipProvider>
