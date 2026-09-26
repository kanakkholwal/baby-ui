<script lang="ts">
import { registry } from "virtual:docvia/source";
import { demos } from "@baby-ui/demos/svelte";
import { specs } from "@baby-ui/registry-schema/components";
import { Renderer } from "@docvia/renderer-svelte";
import IconArrowLeft from "@tabler/icons-svelte/icons/arrow-left";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import IconList from "@tabler/icons-svelte/icons/list";
import { page } from "$app/state";
import { track } from "$lib/analytics";
import CodeBlock from "$lib/components/code-block.svelte";
import ComponentCard from "$lib/components/component-card.svelte";
import ControlsPanel from "$lib/components/controls-panel.svelte";
import DemoPreview from "$lib/components/demo-preview.svelte";
import InstallBlock from "$lib/components/install-block.svelte";
import MobileNavDrawer from "$lib/components/mobile-nav-drawer.svelte";
import PageMenu from "$lib/components/page-menu.svelte";
import PreviewToolbar from "$lib/components/preview-toolbar.svelte";
import PropsRail from "$lib/components/props-rail.svelte";
import PropsTable from "$lib/components/props-table.svelte";
import Seo from "$lib/components/seo.svelte";
import Tabs from "$lib/components/tabs.svelte";
import { prefs } from "$lib/preferences.svelte";
import {
	adjacentComponents,
	CATEGORY_LABEL,
	categoryHref,
	defaultProps,
	specHref,
} from "$lib/registry";
import { absoluteUrl } from "$lib/seo";
import { installSourceUrl } from "$lib/source";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

let tab = $state("preview");
let viewport = $state<"desktop" | "mobile">("desktop");
let fullscreen = $state(false);
let reloadKey = $state(0);
let wide = $state(false);

$effect(() => {
	const query = matchMedia("(min-width: 1280px)");
	const sync = () => (wide = query.matches);
	sync();
	query.addEventListener("change", sync);
	return () => query.removeEventListener("change", sync);
});

// Split pins the stage in the right column; below xl the page stays stacked either way.
const split = $derived(prefs.layout === "split" && wide);

// Framework and language are global preferences, set from the header settings drawer.
const framework = $derived(prefs.framework);
const dialect = $derived(prefs.dialect);
let values = $state<Record<string, unknown>>({});

$effect(() => {
	if (!fullscreen) return;
	const onKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") fullscreen = false;
	};
	window.addEventListener("keydown", onKey);
	document.body.style.overflow = "hidden";
	return () => {
		window.removeEventListener("keydown", onKey);
		document.body.style.overflow = "";
	};
});

// $effect, not a `{#key data.spec.slug}`-scoped $state init: relies on `data.spec`
// changing exactly on navigation, not on any other future reactive field of `data`.
$effect(() => {
	values = defaultProps(data.spec);
});

const port = $derived(data.ports.find((p) => p.framework === framework) ?? data.ports[0]);
const adjacent = $derived(adjacentComponents(data.spec.category, data.spec.slug));
const hasControls = $derived(data.spec.props.some((p) => p.control.kind !== "none"));
const related = $derived(
	specs
		.filter((s) => s.category === data.spec.category && s.slug !== data.spec.slug)
		.slice(0, 6),
);
// In split the stage is pinned beside the page, so its tab becomes the controls, or goes.
const tabs = $derived(
	[
		!split
			? { id: "preview", label: "Preview" }
			: hasControls && { id: "preview", label: "Controls" },
		{ id: "usage", label: "Usage" },
		{ id: "install", label: "Installation" },
	].filter((t): t is { id: string; label: string } => Boolean(t)),
);

$effect(() => {
	if (!tabs.some((t) => t.id === tab)) tab = tabs[0]?.id ?? "usage";
});
const hasA11y = $derived(
	data.spec.a11y.keyboard.length > 0 || data.spec.a11y.notes.length > 0,
);
const outline = $derived(
	[
		{ id: "overview", label: "Overview" },
		{ id: "preview", label: "Preview" },
		...data.proseHeadings,
		data.spec.motion && { id: "behaviour", label: "Behaviour" },
		hasA11y && { id: "accessibility", label: "Accessibility" },
		data.spec.props.length > 0 && { id: "api-reference", label: "API reference" },
		related.length > 0 && { id: "related", label: "Related components" },
	].filter((h): h is { id: string; label: string } => Boolean(h)),
);
const usage = $derived(
	dialect === "js" && port?.usage?.js ? port.usage.js : (port?.usage?.ts ?? null),
);
const breadcrumbJsonLd = $derived(
	JSON.stringify({
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: CATEGORY_LABEL[data.spec.category],
				item: absoluteUrl(page.url.origin, categoryHref(data.spec.category)),
			},
			{
				"@type": "ListItem",
				position: 2,
				name: data.spec.name,
				item: absoluteUrl(page.url.origin, specHref(data.spec)),
			},
		],
	}),
);
</script>

<Seo
	title={data.spec.name}
	description={data.spec.description}
	tag={CATEGORY_LABEL[data.spec.category]}
	keywords={data.spec.keywords}
	noindex={data.spec.status === "alpha" || data.spec.status === "experimental"}
/>
<svelte:head>
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}</script>`}
</svelte:head>

<div class="@container min-w-0 py-8">
	<div id="overview" class="scroll-mt-24">
		<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
			<a
				href={categoryHref(data.spec.category)}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				{CATEGORY_LABEL[data.spec.category]}
			</a>
			<IconChevronRight size={14} stroke={1.6} class="text-muted-foreground" />
			<span class="font-medium text-foreground">{data.spec.name}</span>
		</nav>

		<div class="mt-4 flex flex-col gap-4 @xl:flex-row @xl:items-start @xl:justify-between">
			<div class="flex items-center gap-3">
				<h1 class="font-semibold text-3xl text-foreground tracking-tight">{data.spec.name}</h1>
				{#if data.spec.status !== "stable"}
					<span class="mt-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
						{data.spec.status}
					</span>
				{/if}
			</div>
			<div class="flex flex-wrap items-center gap-2 @xl:justify-end">
				<PageMenu
					markdownUrl="{specHref(data.spec)}.md"
					copyText={data.spec.description}
				/>
				<div class="flex shrink-0 items-center gap-1.5">
					<a
						href={adjacent.prev?.href}
						aria-label={adjacent.prev ? `Previous: ${adjacent.prev.name}` : "No previous component"}
						aria-disabled={!adjacent.prev}
						tabindex={adjacent.prev ? 0 : -1}
						class={[
							"grid size-8 place-items-center rounded-xl border border-border bg-card/20 text-muted-foreground transition-colors",
							adjacent.prev
								? "hover:bg-foreground/[0.06] hover:text-foreground"
								: "pointer-events-none opacity-40",
						]}
					>
						<IconArrowLeft size={15} stroke={1.6} />
					</a>
					<a
						href={adjacent.next?.href}
						aria-label={adjacent.next ? `Next: ${adjacent.next.name}` : "No next component"}
						aria-disabled={!adjacent.next}
						tabindex={adjacent.next ? 0 : -1}
						class={[
							"grid size-8 place-items-center rounded-xl border border-border bg-card/20 text-muted-foreground transition-colors",
							adjacent.next
								? "hover:bg-foreground/[0.06] hover:text-foreground"
								: "pointer-events-none opacity-40",
						]}
					>
						<IconArrowRight size={15} stroke={1.6} />
					</a>
				</div>
			</div>
		</div>

		<p class="mt-2 max-w-2xl text-muted-foreground">{data.spec.description}</p>

		<div class={["mt-4", !split && "xl:hidden"]}>
			<MobileNavDrawer label="On this page" title="On this page">
				{#snippet icon()}<IconList size={14} stroke={1.6} />{/snippet}
				{#snippet children()}
					<PropsRail slug={data.spec.slug} {outline} />
				{/snippet}
			</MobileNavDrawer>
		</div>
	</div>

	<section id="preview" class="mt-8 scroll-mt-24">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<Tabs
				{tabs}
				bind:active={
					() => tab,
					(next) => {
						tab = next;
						track("component_tab_selected", { tab: next });
					}
				}
				variant="underline"
				class="min-w-0 flex-1"
			/>
			{#if tab === "preview" && !split}
				<PreviewToolbar bind:viewport bind:fullscreen onReload={() => reloadKey++} />
			{/if}
		</div>
		<div id="panel-{tab}" role="tabpanel" aria-labelledby="tab-{tab}" class="mt-4">
			{#if tab === "preview"}
				{#if !split}
					<div class="overflow-x-auto">
						{@render previewStage()}
					</div>
				{/if}
				{#if hasControls}
					<ControlsPanel spec={data.spec} bind:values />
				{/if}
			{:else if tab === "usage"}
				{#if usage}
					<CodeBlock
						code={usage.code}
						html={usage.html}
						lang={usage.lang}
						maxHeight="none"
						analytics={{ event: "usage_copied" }}
					/>
				{/if}
			{:else if port}
				<InstallBlock
					slug={data.spec.slug}
					dependencies={port.dependencies}
					source={installSourceUrl(data.spec.category, data.spec.slug, port.framework)}
					css={port.css}
					{dialect}
				/>
			{/if}
		</div>
	</section>

	{#if data.prose}
		<section class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<article class="prose-baby max-w-2xl"><Renderer nodes={data.prose} {registry} /></article>
		</section>
	{/if}

	{#if data.spec.motion}
		<section id="behaviour" class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<h2 class="font-semibold text-foreground text-sm">Behaviour contract</h2>
			<p class="mt-1 max-w-2xl text-muted-foreground text-sm">
				What both implementations must observably do, for an agent reading this page as well
				as a person. Not a description of either one's code.
			</p>
			<div class="mt-3 max-w-2xl rounded-xl border border-border p-4">
				<ul class="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground text-sm [overflow-wrap:anywhere]">
					{#each data.spec.motion.behaviour as rule (rule)}
						<li>{rule}</li>
					{/each}
					<li>{data.spec.motion.reducedMotion}</li>
				</ul>
			</div>
		</section>
	{/if}

	{#if hasA11y}
		<section id="accessibility" class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<h2 class="font-semibold text-foreground text-sm">Accessibility</h2>
			<p class="mt-1 max-w-2xl text-muted-foreground text-sm">
				Keyboard support and assistive-technology guarantees both ports share.
			</p>
			<div class="mt-3 flex max-w-2xl flex-col gap-4 rounded-xl border border-border p-4">
				{#if data.spec.a11y.keyboard.length}
					<p class="-mb-2 font-medium text-foreground text-xs">Keyboard</p>
					<ul class="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground text-sm [overflow-wrap:anywhere]">
						{#each data.spec.a11y.keyboard as key (key)}
							<li>{key}</li>
						{/each}
					</ul>
				{/if}
				{#if data.spec.a11y.notes.length}
					<p class="-mb-2 font-medium text-foreground text-xs">Notes</p>
					<ul class="flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground text-sm [overflow-wrap:anywhere]">
						{#each data.spec.a11y.notes as note (note)}
							<li>{note}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	{/if}

	{#if data.spec.props.length}
		<section id="api-reference" class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<h2 class="font-semibold text-foreground text-sm">API Reference</h2>
			<div class="mt-3"><PropsTable props={data.spec.props} /></div>
		</section>
	{/if}

	{#if related.length}
		<section id="related" class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<h2 class="font-semibold text-foreground text-sm">Related components</h2>
			<p class="mt-1 text-muted-foreground text-sm">
				More from {CATEGORY_LABEL[data.spec.category]}.
			</p>
			<div class="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 [grid-auto-rows:19rem] @lg:grid-cols-2 @4xl:grid-cols-3">
				{#each related as item (item.slug)}
					<ComponentCard spec={item} />
				{/each}
			</div>
		</section>
	{/if}

	{#if adjacent.prev || adjacent.next}
		<nav aria-label="Component pages" class="mt-12 flex items-center justify-between gap-3 border-border border-t pt-6">
			{#if adjacent.prev}
				<a
					href={adjacent.prev.href}
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/20 py-2 pr-4 pl-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]"
				>
					<IconArrowLeft size={15} stroke={1.6} class="shrink-0 text-muted-foreground" />
					{adjacent.prev.name}
				</a>
			{:else}
				<span></span>
			{/if}
			{#if adjacent.next}
				<a
					href={adjacent.next.href}
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/20 py-2 pr-3 pl-4 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]"
				>
					{adjacent.next.name}
					<IconArrowRight size={15} stroke={1.6} class="shrink-0 text-muted-foreground" />
				</a>
			{/if}
		</nav>
	{/if}
</div>

{#snippet previewStage(fill = false)}
	<div
		class={[
			"mx-auto w-full transition-[max-width] duration-300",
			viewport === "mobile" ? "max-w-sm" : "max-w-full",
			fill && "flex h-full flex-col",
		]}
	>
		{#key reloadKey}
			<DemoPreview
				{framework}
				slug={data.spec.slug}
				demo={demos[data.spec.slug]}
				props={values}
				class={fill ? "h-full flex-1" : undefined}
			/>
		{/key}
	</div>
{/snippet}

{#if fullscreen}
	<div class="fixed inset-0 z-50 flex flex-col gap-4 bg-background p-4 sm:p-6">
		<div class="flex items-center justify-between gap-3">
			<p class="font-medium text-foreground text-sm">{data.spec.name} · Preview</p>
			<PreviewToolbar bind:viewport bind:fullscreen onReload={() => reloadKey++} />
		</div>
		<div class="min-h-0 flex-1 overflow-auto">
			{@render previewStage(true)}
		</div>
	</div>
{/if}

{#if split}
	<aside aria-label="Live preview" class="hidden min-w-0 xl:block">
		<div class="sticky top-14 flex h-[calc(100dvh-3.5rem)] flex-col gap-3 py-8">
			<div class="flex items-center justify-between gap-3">
				<p class="font-medium text-foreground text-sm">Preview</p>
				<PreviewToolbar bind:viewport bind:fullscreen onReload={() => reloadKey++} />
			</div>
			<div class="min-h-0 flex-1">
				{@render previewStage(true)}
			</div>
		</div>
	</aside>
{:else}
	<aside aria-label="On this page" class="hidden min-w-0 xl:block">
		<div
			class="scrollbar-hide fixed top-24 right-8 z-10 max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) overflow-y-auto pb-1"
		>
			<PropsRail slug={data.spec.slug} {outline} />
		</div>
	</aside>
{/if}
