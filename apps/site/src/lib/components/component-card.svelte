<script lang="ts" module>
import type { DemoLoader } from "@baby-ui/demos/svelte";
import { SvelteMap } from "svelte/reactivity";
import { tv, type VariantProps } from "tailwind-variants";

const cardFrame = tv({
	base: "w-full",
	variants: {
		frame: { compact: "h-48", sm: "h-56", md: "h-68", lg: "h-84", xl: "h-100" },
	},
	defaultVariants: { frame: "md" },
});

export type CardFrame = NonNullable<VariantProps<typeof cardFrame>["frame"]>;

/** Which cards are picked, for pages that act on several at once. */
export type CardSelection = {
	has: (slug: string) => boolean;
	toggle: (slug: string) => void;
};

/** Each frame's height in px: the masonry places tiles from it, and `content-visibility` reserves it. */
export const FRAME_PX: Record<CardFrame, number> = {
	compact: 192,
	sm: 224,
	md: 272,
	lg: 336,
	xl: 400,
};

const EMAIL_PX = 640;
const loaded = new SvelteMap<string, Awaited<ReturnType<DemoLoader>>>();
</script>

<script lang="ts">
import {
	Badge,
	Checkbox,
	CopyButton,
	ShowcaseCard,
	ShowcaseCardAction,
	ShowcaseCardCopy,
	ShowcaseCardDescription,
	ShowcaseCardFooter,
	ShowcaseCardLink,
	ShowcaseCardPreview,
	ShowcaseCardTitle,
	Spinner,
} from "@baby-ui/svelte";
import { mode } from "mode-watcher";
import { untrack } from "svelte";
import BookmarkButton from "#lib/components/bookmark-button.svelte";
import { demos } from "#lib/demos.js";
import { installArgs } from "#lib/install.js";
import { claim, type LiveSlot, watchLive } from "#lib/live-demo.js";
import { pmCommand } from "#lib/pm.js";
import { prefs } from "#lib/preferences.svelte.js";
import { CATEGORY_LABEL, type CardItem } from "#lib/registry.js";

let {
	item,
	frame = "md",
	selection,
}: { item: CardItem; frame?: CardFrame; selection?: CardSelection } = $props();

let stage = $state<HTMLElement>();
let live = $state(false);
const slot: LiveSlot = { visible: false, release: () => (live = false) };

function activate() {
	if (live) return;
	live = true;
	claim(slot);
}

$effect(() => {
	if (!stage) return;
	const slug = item.slug;
	return watchLive(stage, slot, activate, { ready: () => loaded.has(slug) });
});

const email = $derived(item.category === "emails");
const cached = $derived(loaded.get(item.slug));
const demoPromise = $derived.by(() => {
	const slug = item.slug;
	if (!live || email || untrack(() => loaded.has(slug))) return undefined;
	return demos[slug]?.().then((mod) => {
		loaded.set(slug, mod);
		return mod;
	});
});
let stageWidth = $state(0);
let emailHeight = $state(0);
const emailScale = $derived(stageWidth / EMAIL_PX);

function fitEmail(event: Event) {
	if (!(event.currentTarget instanceof HTMLIFrameElement)) return;
	const root = event.currentTarget.contentDocument?.documentElement;
	if (root) root.style.scrollbarWidth = "none";
	emailHeight = root?.scrollHeight ?? 0;
}

const demoProps = $derived(item.defaults);
const intrinsic = $derived(FRAME_PX[frame]);
const installCommand = $derived(pmCommand("dlx", installArgs(item.slug), prefs.pm));
</script>

<!-- Pro stays in view so the paywall is never a surprise; New and Updated surface on hover, focus or touch. -->
{#snippet badges()}
	{#if selection}
		<span class="absolute top-3 left-3 z-30 rounded-md border border-border bg-background/85 p-1.5 backdrop-blur-md">
			<Checkbox
				size="sm"
				aria-label="Select {item.name}"
				bind:checked={() => selection.has(item.slug), () => selection.toggle(item.slug)}
			/>
		</span>
	{:else}
		<span class="pointer-events-none absolute top-4 left-4 z-30 rounded-full border border-border bg-background/80 px-2.5 py-0.5 text-muted-foreground text-xs backdrop-blur-md">
			{CATEGORY_LABEL[item.category]}
		</span>
	{/if}
	<div class="pointer-events-none absolute top-4 right-4 z-30 flex items-center gap-1.5">
		{#if item.isNew || item.isUpdated}
			<Badge
				size="sm"
				variant={item.isNew ? "info" : "success"}
				class="translate-y-1 opacity-0 shadow-xs backdrop-blur-md transition-[opacity,translate] duration-(--duration-dropdown) ease-(--ease-ui-out) group-hover/showcase:translate-y-0 group-hover/showcase:opacity-100 group-focus-within/showcase:translate-y-0 group-focus-within/showcase:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100"
			>
				{item.isNew ? "New" : "Updated"}
			</Badge>
		{/if}
		{#if item.tier === "pro"}
			<Badge size="sm" variant="gold" class="shadow-xs">Pro</Badge>
		{/if}
	</div>
{/snippet}

{#snippet demoView(Demo: Awaited<ReturnType<DemoLoader>>["default"])}
	<div class="pointer-events-none flex w-full scale-90 justify-center opacity-90 transition-opacity duration-[var(--duration-dropdown)] ease-[var(--ease-ui-out)] group-hover/showcase:opacity-100 motion-reduce:transition-none">
		<Demo props={demoProps} />
	</div>
{/snippet}

{#snippet stageContent()}
	<ShowcaseCardPreview
		class="relative grid h-full min-w-0 place-items-center overflow-hidden bg-background bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]"
	>
		<div
			bind:this={stage}
			bind:clientWidth={stageWidth}
			class="absolute inset-0 grid min-w-0 place-items-center overflow-hidden p-4"
		>
			{#if email}
				<iframe
					src="/components/{item.category}/{item.slug}/email/{prefs.framework}.html"
					title="{item.name} preview"
					loading="lazy"
					sandbox="allow-same-origin"
					tabindex="-1"
					aria-hidden="true"
					onload={fitEmail}
					style:width="{EMAIL_PX}px"
					style:height="{Math.max(emailHeight, emailScale ? FRAME_PX[frame] / emailScale : 0)}px"
					style:transform="scale({emailScale})"
					style:color-scheme={mode.current === "dark" ? "dark" : "light"}
					class="pointer-events-none absolute top-0 left-0 origin-top-left border-0 bg-transparent"
				></iframe>
			{:else if demoPromise}
				{#await demoPromise}
					<Spinner size="sm" label="Loading preview" class="text-muted-foreground" />
				{:then mod}
					{@render demoView(mod.default)}
				{/await}
			{:else if live && cached}
				{@render demoView(cached.default)}
			{/if}
		</div>
	</ShowcaseCardPreview>
{/snippet}

<ShowcaseCard
	variant="framed"
	size="sm"
	class={cardFrame({ frame, class: "[content-visibility:auto] [--showcase-footer:3.5rem]" })}
	style="contain-intrinsic-block-size: auto {intrinsic}px"
	onpointerenter={(event) => {
		if (event.pointerType === "mouse") activate();
	}}
	onfocusin={activate}
>
	{@render stageContent()}
	{@render badges()}
	<ShowcaseCardLink href={item.href} aria-label="View {item.name}" />
	<ShowcaseCardFooter>
		<ShowcaseCardCopy>
			<ShowcaseCardTitle class="truncate">{item.name}</ShowcaseCardTitle>
			<ShowcaseCardDescription class="line-clamp-1 text-pretty">{item.description}</ShowcaseCardDescription>
		</ShowcaseCardCopy>
		<ShowcaseCardAction class="flex items-center gap-1">
			<BookmarkButton slug={item.slug} name={item.name} class="size-8 rounded-full bg-background" />
			<CopyButton
				text={installCommand}
				label="Copy {item.name} install command"
				iconOnly
				class="size-8 rounded-full bg-background"
			/>
		</ShowcaseCardAction>
	</ShowcaseCardFooter>
</ShowcaseCard>
