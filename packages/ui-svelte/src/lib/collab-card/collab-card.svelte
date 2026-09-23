<script lang="ts">
import { cn } from "../lib/cn";
import type { CollabCardCollaborator } from "./types";

let {
	collaborators,
	presenceColors,
	extraCount = 0,
	greeting = "hello!",
	eyebrow = "Now in multiplayer",
	intro = "editing",
	conjunction = "&",
	trailing = "",
	liveLabel,
	backgroundUrl,
	class: className,
}: {
	collaborators: [CollabCardCollaborator, CollabCardCollaborator];
	presenceColors: string[];
	extraCount?: number;
	greeting?: string;
	eyebrow?: string;
	intro?: string;
	conjunction?: string;
	trailing?: string;
	liveLabel?: string;
	backgroundUrl?: string;
	class?: string;
} = $props();

const first = $derived(collaborators[0]);
const second = $derived(collaborators[1]);
const editing = $derived(
	liveLabel ?? `Live · ${presenceColors.length + extraCount} editing`,
);

const CORNER_POSITIONS = [
	"-left-[0.9cqi] -top-[0.9cqi]",
	"-right-[0.9cqi] -top-[0.9cqi]",
	"-left-[0.9cqi] -bottom-[0.9cqi]",
	"-right-[0.9cqi] -bottom-[0.9cqi]",
];
</script>

{#snippet cursor(cls?: string)}
	<svg viewBox="0 0 24 24" aria-hidden="true" class={cn("h-[6.5cqi] w-[6.5cqi] drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]", cls)}>
		<path d="M4 3.2 L4 19.4 L8.6 15.2 L11.4 21.2 L14 20 L11.2 14 L17.2 13.6 Z" fill="currentColor" stroke="white" stroke-width="1.4" stroke-linejoin="round" />
	</svg>
{/snippet}

{#snippet clickBurst(cls: string)}
	<span
		data-burst=""
		aria-hidden="true"
		class={cn(
			"pointer-events-none absolute inline-block h-[3cqi] w-[3cqi]",
			"before:absolute before:inset-[35%] before:rounded-full before:bg-current",
			"after:absolute after:inset-0 after:rounded-full",
			"after:bg-[conic-gradient(from_0deg,transparent_0_8%,currentColor_8%_12%,transparent_12%_33%,currentColor_33%_37%,transparent_37%_58%,currentColor_58%_62%,transparent_62%_83%,currentColor_83%_87%,transparent_87%)]",
			"after:mask-[radial-gradient(circle,transparent_38%,black_40%,black_60%,transparent_62%)]",
			cls,
		)}
	></span>
{/snippet}

<div
	data-slot="collab-card"
	class={cn(
		"group/collab @container relative isolate aspect-3/2 w-full overflow-hidden rounded-2xl",
		"bg-[#111114] text-white shadow-xl ring-1 ring-white/10",
		className,
	)}
	style={backgroundUrl ? `background-image:url(${backgroundUrl});background-size:cover;background-position:center;` : undefined}
>
	{#if !backgroundUrl}
		<div aria-hidden="true" class="absolute inset-0 -z-10 bg-[linear-gradient(165deg,#18181f_0%,#0c0c10_55%,#09090c_100%)]"></div>
	{/if}

	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_18%_88%,color-mix(in_oklch,#A259FF_42%,transparent)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_88%_22%,color-mix(in_oklch,#FF7262_32%,transparent)_0%,transparent_68%)]"
	></div>

	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] bg-[radial-gradient(rgba(255,255,255,0.32)_1px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_88%)]"
	></div>

	<header class="absolute inset-x-[5cqi] top-[4cqi] z-10 flex items-center justify-between gap-[2cqi]">
		<span class="flex min-w-0 items-center gap-[1.4cqi] text-[2.4cqi] font-medium leading-none tracking-tight text-white/75">
			<span class="relative inline-flex h-[1.7cqi] w-[1.7cqi] shrink-0">
				<span class="collab-live-ping absolute inset-0 rounded-full bg-emerald-400/70"></span>
				<span class="relative inline-block h-full w-full rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.75)]"></span>
			</span>
			<span class="truncate tabular-nums leading-snug">{editing}</span>
		</span>
		<ul class="m-0 flex list-none items-center p-0" aria-hidden="true">
			{#each presenceColors as color, index (index)}
				<li class={cn("relative size-[3.25cqi] shrink-0", index > 0 && "-ml-[1.08cqi]")} style="z-index:{index + 1}">
					<span class="block size-full rounded-full ring-2 ring-[#0e0e12] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" style="background-color:{color}"></span>
				</li>
			{/each}
			{#if extraCount > 0}
				<li class="relative size-[3.25cqi] shrink-0 -ml-[1.08cqi]" style="z-index:{presenceColors.length + 1}">
					<span
						class={cn(
							"flex size-full items-center justify-center rounded-full ring-2 ring-[#0e0e12]",
							"bg-[oklch(0.26_0.012_285)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]",
							"font-(family-name:--font-mono) text-[1.65cqi] font-medium leading-none tabular-nums tracking-tight text-white/88",
						)}
					>
						+{extraCount}
					</span>
				</li>
			{/if}
		</ul>
	</header>

	<div class="relative flex h-full w-full flex-col items-center justify-center gap-[3.2cqi] px-[5.5cqi] pb-[5cqi] pt-[9cqi]">
		<p class="max-w-[88%] text-center text-[2.75cqi] font-medium leading-snug tracking-tight text-[#0D99FF]">
			{eyebrow}
		</p>

		<div class="relative w-[80%] max-w-full">
			<div class="relative grid place-items-center rounded-[1.8cqi] border-2 border-dashed border-[#0D99FF]/75 px-[5.5cqi] py-[4.2cqi]">
				{#each CORNER_POSITIONS as pos (pos)}
					<span
						aria-hidden="true"
						class={cn(
							"absolute h-[1.7cqi] w-[1.7cqi] rounded-[0.25cqi] bg-[#111114] ring-[1.5px] ring-[#0D99FF] shadow-[0_2px_4px_rgba(0,0,0,0.35)]",
							pos,
						)}
					></span>
				{/each}
				<h2 class="font-(family-name:--font-heading) text-[17.5cqi] font-medium leading-[0.92] tracking-[-0.035em] text-white">
					{greeting}
				</h2>
			</div>

			<span aria-hidden="true" class="collab-cursor collab-cursor--host pointer-events-none absolute left-[-2.8cqi] top-[-3.6cqi] text-white">
				{@render cursor()}
			</span>
		</div>

		<p class="flex max-w-full flex-wrap items-baseline justify-center gap-x-[1.5cqi] gap-y-[1.2cqi] text-[3.85cqi] font-medium leading-none tracking-tight text-white/95">
			<span class="text-white/80">{intro}</span>

			<span class="relative inline-flex items-center">
				<span class={cn("inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] font-semibold leading-none", first.pill, first.pillText ?? "text-white")}>
					{first.name}
				</span>
				<span aria-hidden="true" class={cn("collab-cursor collab-cursor--first pointer-events-none absolute right-[-1.8cqi] bottom-[-2.9cqi]", first.cursor)}>
					{@render cursor("-scale-x-100")}
					{@render clickBurst("top-[-0.7cqi] right-[-0.7cqi]")}
				</span>
			</span>

			<span class="text-white/55">{conjunction}</span>

			<span class="relative inline-flex items-center">
				<span class={cn("inline-flex items-center rounded-full px-[2.8cqi] py-[0.55cqi] text-[3.5cqi] font-semibold leading-none", second.pill, second.pillText ?? "text-white")}>
					{second.name}
				</span>
				<span aria-hidden="true" class={cn("collab-cursor collab-cursor--second pointer-events-none absolute top-[-3.2cqi] right-[-2.8cqi]", second.cursor)}>
					{@render cursor()}
					{@render clickBurst("bottom-[-0.7cqi] left-[-0.7cqi]")}
				</span>
			</span>

			{#if trailing}
				<span class="text-white/80">{trailing}</span>
			{/if}
		</p>
	</div>
</div>
