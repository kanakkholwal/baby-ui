<script lang="ts">
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@baby-ui/svelte";
import type { Icon } from "@tabler/icons-svelte";
import IconArrowsMaximize from "@tabler/icons-svelte/icons/arrows-maximize";
import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
import IconDeviceMobile from "@tabler/icons-svelte/icons/device-mobile";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import IconX from "@tabler/icons-svelte/icons/x";
import { track } from "$lib/analytics";
import type { PreviewView } from "$lib/preview-modes.svelte";

let {
	viewport = $bindable(),
	fullscreen = $bindable(),
	view = $bindable(),
	views = [],
	onReload,
}: {
	viewport: "desktop" | "mobile";
	fullscreen: boolean;
	view?: string;
	/** Extra views a category offers, e.g. OG's Live / PNG; see PREVIEW_VIEWS. */
	views?: PreviewView[];
	onReload: () => void;
} = $props();

type Action = {
	id: string;
	label: string;
	hint: string;
	icon: Icon;
	pressed?: boolean;
	run: () => void;
};

// Viewport sizes only mean something in fullscreen, so they only appear there.
const groups = $derived<Action[][]>(
	[
		views.map((v) => ({ ...v, pressed: view === v.id, run: () => (view = v.id) })),
		fullscreen
			? [
					{
						id: "desktop",
						label: "Desktop viewport",
						hint: "Desktop width",
						icon: IconDeviceDesktop,
						pressed: viewport === "desktop",
						run: () => (viewport = "desktop"),
					},
					{
						id: "mobile",
						label: "Mobile viewport",
						hint: "Mobile width",
						icon: IconDeviceMobile,
						pressed: viewport === "mobile",
						run: () => (viewport = "mobile"),
					},
				]
			: [],
		[
			{
				id: "reload",
				label: "Reload preview",
				hint: "Reload preview",
				icon: IconRefresh,
				run: onReload,
			},
			{
				id: fullscreen ? "exit_fullscreen" : "fullscreen",
				label: fullscreen ? "Exit fullscreen" : "Fullscreen preview",
				hint: fullscreen ? "Exit fullscreen (Esc)" : "Fullscreen",
				icon: fullscreen ? IconX : IconArrowsMaximize,
				run: () => (fullscreen = !fullscreen),
			},
		],
	].filter((group) => group.length > 0),
);

const button =
	"grid size-7 shrink-0 place-items-center rounded-full pointer-coarse:size-10 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground";
</script>

<!-- Floats over the bottom of the preview frame. -->
<TooltipProvider>
	<div
		role="toolbar"
		aria-label="Preview controls"
		class="pointer-events-auto flex shrink-0 items-center gap-0.5 rounded-full border border-border bg-background/85 p-1 shadow-lg backdrop-blur-md"
	>
		{#each groups as group, g (g)}
			{#if g > 0}<span aria-hidden="true" class="mx-0.5 h-4 w-px bg-border"></span>{/if}
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
						<ActionIcon size={15} stroke={1.6} />
					</TooltipTrigger>
					<TooltipContent side="top">{action.hint}</TooltipContent>
				</Tooltip>
			{/each}
		{/each}
	</div>
</TooltipProvider>
