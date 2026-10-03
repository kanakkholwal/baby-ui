<script lang="ts">
import {
	IconArrowLeft,
	IconArrowRight,
	IconArrowUpRight,
	IconBrandReact,
	IconBrandSvelte,
	IconChevronRight,
	IconList,
} from "@baby-ui/icons";
import type { Framework } from "@baby-ui/registry-schema";
import { Alert, AlertDescription, AlertTitle } from "@baby-ui/svelte";
import { Renderer } from "@docvia/renderer-svelte";
import { registry } from "docvia/registry";
import type { Snippet } from "svelte";
import { track } from "#lib/analytics.js";
import CodeBlock from "#lib/components/code-block.svelte";
import ComponentCard from "#lib/components/component-card.svelte";
import ControlsPanel from "#lib/components/controls-panel.svelte";
import DemoPreview from "#lib/components/demo-preview.svelte";
import EmailFrame from "#lib/components/email-frame.svelte";
import InstallBlock from "#lib/components/install-block.svelte";
import MobileNavDrawer from "#lib/components/mobile-nav-drawer.svelte";
import OgPngStage from "#lib/components/og-png-stage.svelte";
import OutlineToggle from "#lib/components/outline-toggle.svelte";
import PageMenu from "#lib/components/page-menu.svelte";
import PreviewToolbar from "#lib/components/preview-toolbar.svelte";
import ProInstallGate from "#lib/components/pro-install-gate.svelte";
import PropsRail from "#lib/components/props-rail.svelte";
import PropsTable from "#lib/components/props-table.svelte";
import SegmentControl, {
	type SegmentOption,
} from "#lib/components/segment-control.svelte";
import Seo from "#lib/components/seo.svelte";
import Tabs from "#lib/components/tabs.svelte";
import { demos } from "#lib/demos.js";
import type { Heading } from "#lib/docs-nodes.js";
import { OUTLINE_PANEL, outlineSidebar } from "#lib/docs-sidebar.svelte.js";
import { prefs } from "#lib/preferences.svelte.js";
import { EmailPreview, OgPngPreview, PREVIEW_VIEWS } from "#lib/preview-modes.svelte.js";
import { productFor } from "#lib/products.js";
import {
	CATEGORY_LABEL,
	categoryHref,
	defaultProps,
	specHref,
	TOP_LEVEL,
} from "#lib/registry.js";
import {
	breadcrumbLd,
	componentKeywords,
	componentLd,
	metaDescription,
} from "#lib/seo.js";
import { installSourceUrl } from "#lib/source.js";
import { page } from "$app/state";
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

// Extra preview views (OG PNG, email HTML/text); their fetch state lives in preview-modes.
const views = $derived(PREVIEW_VIEWS[data.spec.category] ?? []);
let view = $state("");
$effect(() => {
	if (!views.some((v) => v.id === view)) view = views[0]?.id ?? "";
});
const png = new OgPngPreview(() =>
	view === "og_png"
		? `/api/og/${data.spec.slug}?props=${encodeURIComponent(JSON.stringify(values))}`
		: null,
);
const email = new EmailPreview(() => ({
	renders: data.email,
	changed:
		data.email?.slug === data.spec.slug &&
		JSON.stringify(values) !== JSON.stringify(defaultProps(data.spec)),
	values,
	framework: framework === "react" ? "react" : "svelte",
}));
const stage = $derived(
	data.email ? emailStage : view === "og_png" ? pngStage : undefined,
);

// Viewport sizes are a fullscreen tool; leaving fullscreen restores the full-width frame.
$effect(() => {
	if (!fullscreen) viewport = "desktop";
});

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
const adjacent = $derived(data.adjacent);
const hasControls = $derived(data.spec.props.some((p) => p.control.kind !== "none"));
const related = $derived(data.related);
// In split the stage is pinned beside the page, so its tab becomes the controls, or goes.
const tabs = $derived(
	[
		!split
			? { id: "preview", label: "Preview" }
			: hasControls && { id: "preview", label: "Controls" },
		{ id: "usage", label: "Usage" },
	].filter((t): t is { id: string; label: string } => Boolean(t)),
);

$effect(() => {
	if (!tabs.some((t) => t.id === tab)) tab = tabs[0]?.id ?? "usage";
});
const FRAMEWORKS: SegmentOption<Framework>[] = [
	{ id: "svelte", label: "Svelte", icon: IconBrandSvelte },
	{ id: "react", label: "React", icon: IconBrandReact },
];
const product = $derived(productFor(data.spec.slug));
const PAGE_SECTIONS = new Set([
	"overview",
	"preview",
	"installation",
	"behaviour",
	"accessibility",
	"api-reference",
	"related",
]);
const hasA11y = $derived(
	data.spec.a11y.keyboard.length > 0 || data.spec.a11y.notes.length > 0,
);
const outline = $derived(
	[
		{ id: "overview", label: "Overview", depth: 2 as const },
		{ id: "preview", label: "Preview", depth: 2 as const },
		{ id: "installation", label: "Installation", depth: 2 as const },
		// A prose heading that reuses a page section's id would key the outline twice and crash it.
		...data.proseHeadings.filter((h) => !PAGE_SECTIONS.has(h.id)),
		data.spec.motion && { id: "behaviour", label: "Behaviour", depth: 2 as const },
		hasA11y && { id: "accessibility", label: "Accessibility", depth: 2 as const },
		data.spec.props.length > 0 && {
			id: "api-reference",
			label: "API reference",
			depth: 2 as const,
		},
		related.length > 0 && {
			id: "related",
			label: "Related components",
			depth: 2 as const,
		},
	].filter((h): h is Heading => Boolean(h)),
);
const usage = $derived(
	dialect === "js" && port?.usage?.js ? port.usage.js : (port?.usage?.ts ?? null),
);
const seoDescription = $derived(
	metaDescription(
		data.spec.description,
		"React and Svelte component, installable with the shadcn CLI.",
	),
);
const categoryTrail = $derived(
	TOP_LEVEL.includes(data.spec.category)
		? []
		: [{ name: "Components", path: "/components" }],
);
</script>

<Seo
	title="{data.spec.name}: React & Svelte Component"
	description={seoDescription}
	tag={CATEGORY_LABEL[data.spec.category]}
	keywords={componentKeywords(data.spec.name, data.spec.keywords)}
	noindex={data.spec.retired || data.spec.status === "alpha" || data.spec.status === "experimental"}
	markdown="{specHref(data.spec)}.md"
	jsonLd={[
		componentLd({
			name: data.spec.name,
			description: seoDescription,
			path: specHref(data.spec),
			keywords: componentKeywords(data.spec.name, data.spec.keywords),
		}),
		breadcrumbLd([
			...categoryTrail,
			{ name: CATEGORY_LABEL[data.spec.category], path: categoryHref(data.spec.category) },
			{ name: data.spec.name, path: specHref(data.spec) },
		]),
	]}
/>

<main class="@container min-w-0 pt-8 pb-16 md:pt-12">
	<div id="overview" class="scroll-mt-[calc(var(--header-h)+1.5rem)]">
		<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
			<a
				href={categoryHref(data.spec.category)}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				{CATEGORY_LABEL[data.spec.category]}
			</a>
			<IconChevronRight size={14} class="text-muted-foreground" />
			<span class="font-medium text-foreground">{data.spec.name}</span>
		</nav>

		{#if data.spec.retired}
			<Alert variant="warning" class="mt-4">
				<AlertTitle>Retired</AlertTitle>
				<AlertDescription>
					No longer maintained. Installs still work, but it will be removed in a future release.
				</AlertDescription>
			</Alert>
		{/if}

		<div class="mt-5 flex flex-col gap-4 @xl:flex-row @xl:items-start @xl:justify-between">
			<div class="flex items-center gap-3">
				<h1 class="text-balance font-semibold text-[2.125rem] text-foreground leading-[1.1] tracking-[-0.03em] md:text-[2.5rem]">
					{data.spec.name}
				</h1>
				{#if data.spec.tier === "pro"}
					<span class="mt-1 rounded-full bg-foreground px-2 py-0.5 font-medium text-[11px] text-background">
						Pro
					</span>
				{/if}
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
				{#if !split}<OutlineToggle />{/if}
			</div>
		</div>

		<p class="mt-4 max-w-2xl text-pretty text-base text-muted-foreground leading-7 sm:text-[1.0625rem] sm:leading-8">
			{data.spec.description}
		</p>

		<div class={["mt-5", !split && "xl:hidden"]}>
			<MobileNavDrawer label="On this page" title="On this page">
				{#snippet icon()}<IconList size={14} />{/snippet}
				{#snippet children()}
					<div class="mx-auto w-full max-w-md">
						<PropsRail slug={data.spec.slug} {outline} heading={false} promo={false} />
					</div>
				{/snippet}
			</MobileNavDrawer>
		</div>
	</div>

	<section id="preview" class="mt-10 scroll-mt-[calc(var(--header-h)+1.5rem)]">
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
		</div>
		<div id="panel-{tab}" role="tabpanel" aria-labelledby="tab-{tab}" class="mt-4">
			{#if tab === "preview"}
				{#if !split}
					<div class="overflow-x-auto">
						{@render previewStage()}
					</div>
				{/if}
				{#if hasControls}
					<ControlsPanel spec={data.spec} bind:values defaultOpen={split} />
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
			{/if}
		</div>
	</section>

	<section id="installation" class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<h2 class="font-semibold text-foreground text-xl tracking-tight">Installation</h2>
			<SegmentControl
				options={FRAMEWORKS}
				current={framework}
				onPick={(id) => prefs.set("framework", id)}
			/>
		</div>
		<div class="mt-4">
			{#if data.spec.tier === "pro"}
				<ProInstallGate name={data.spec.name} />
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
		<section class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
			<article class="prose-baby max-w-2xl"><Renderer nodes={data.prose} {registry} /></article>
		</section>
	{/if}

	{#if data.spec.motion}
		<section id="behaviour" class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
			<h2 class="font-semibold text-foreground text-xl tracking-tight">Behaviour contract</h2>
			<p class="mt-2 max-w-2xl text-[0.9375rem] text-muted-foreground leading-7">
				What both implementations must observably do, for an agent reading this page as well
				as a person. Not a description of either one's code.
			</p>
			<div class="mt-4 max-w-2xl rounded-xl border border-border p-4">
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
		<section id="accessibility" class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
			<h2 class="font-semibold text-foreground text-xl tracking-tight">Accessibility</h2>
			<p class="mt-2 max-w-2xl text-[0.9375rem] text-muted-foreground leading-7">
				Keyboard support and assistive-technology guarantees both ports share.
			</p>
			<div class="mt-4 flex max-w-2xl flex-col gap-4 rounded-xl border border-border p-4">
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
		<section id="api-reference" class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
			<h2 class="font-semibold text-foreground text-xl tracking-tight">API Reference</h2>
			<div class="mt-4"><PropsTable props={data.spec.props} /></div>
		</section>
	{/if}

	{#if related.length}
		<section id="related" class="mt-16 scroll-mt-[calc(var(--header-h)+1.5rem)]">
			<h2 class="font-semibold text-foreground text-xl tracking-tight">Related components</h2>
			<p class="mt-2 text-[0.9375rem] text-muted-foreground leading-7">
				More from {CATEGORY_LABEL[data.spec.category]}.
			</p>
			<div class="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 [grid-auto-rows:19rem] @lg:grid-cols-2 @4xl:grid-cols-3">
				{#each related as item (item.slug)}
					<ComponentCard {item} />
				{/each}
			</div>
		</section>
	{/if}

	{#if adjacent.prev || adjacent.next}
		<nav aria-label="Component pages" class="mt-16 flex items-center justify-between gap-3 border-border border-t pt-6">
			{#if adjacent.prev}
				<a
					href={adjacent.prev.href}
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/20 py-2 pr-4 pl-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]"
				>
					<IconArrowLeft size={15} class="shrink-0 text-muted-foreground" />
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
					<IconArrowRight size={15} class="shrink-0 text-muted-foreground" />
				</a>
			{/if}
		</nav>
	{/if}
	<div class="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-muted-foreground text-xs">
		<a
			href={product.href}
			target="_blank"
			rel="noreferrer"
			class="inline-flex items-center gap-1 transition-colors hover:text-foreground"
		>
			Also from Nexonauts: <span class="text-foreground">{product.name}</span>, {product.headline}
			<IconArrowUpRight size={12} />
		</a>
		<!-- A real link, not only the menu item: crawlers and agents follow it to the markdown twin. -->
		<a href="{specHref(data.spec)}.md" class="underline decoration-border underline-offset-4 transition-colors hover:text-foreground">
			View this page as Markdown
		</a>
	</div>
</main>

{#snippet previewStage(fill = false)}
	<div
		class={[
			"mx-auto w-full",
			viewport === "mobile" ? "max-w-sm" : "max-w-full",
			fill && "flex h-full flex-col",
		]}
	>
		<div class={["relative", fill && "flex min-h-0 flex-1 flex-col"]}>
			{#key reloadKey}
				<DemoPreview
					{framework}
					slug={data.spec.slug}
					demo={demos[data.spec.slug]}
					props={values}
					content={stage as Snippet | undefined}
					maxHeight={fill ? undefined : "min(55vh, 34rem)"}
					class={fill ? "h-full flex-1" : undefined}
				/>
			{/key}
			<div class="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
				<PreviewToolbar
					bind:viewport
					bind:fullscreen
					bind:view
					{views}
					onReload={() => reloadKey++}
				/>
			</div>
		</div>
	</div>
{/snippet}

{#snippet emailStage()}
	{#if email.shown}
		<EmailFrame
			html={email.shown.html}
			text={email.shown.text}
			bytes={email.shown.bytes}
			view={view === "email_text" ? "text" : "html"}
			pending={email.pending}
			title="{data.spec.name} preview"
		/>
	{/if}
{/snippet}

{#snippet pngStage()}
	<OgPngStage preview={png} name={data.spec.name} />
{/snippet}

{#if fullscreen}
	<div class="fixed inset-0 z-50 flex flex-col gap-4 bg-background p-4 sm:p-6">
		<div class="flex items-center justify-between gap-3">
			<p class="font-medium text-foreground text-sm">{data.spec.name} · Preview</p>
		</div>
		<div class="min-h-0 flex-1 overflow-auto">
			{@render previewStage(true)}
		</div>
	</div>
{/if}

{#if split}
	<aside aria-label="Live preview" class="hidden min-w-0 xl:block">
		<div class="sticky top-(--header-h) flex h-[calc(100dvh-var(--header-h))] flex-col gap-3 py-8">
			<div class="flex items-center justify-between gap-3">
				<p class="font-medium text-foreground text-sm">Preview</p>
			</div>
			<div class="min-h-0 flex-1">
				{@render previewStage(true)}
			</div>
		</div>
	</aside>
{:else}
	<aside aria-label="On this page" class="hidden min-w-0 xl:block">
		<div
			id="outline-sidebar"
			inert={!outlineSidebar.current}
			class={["scrollbar-hide fixed top-[calc(var(--header-h)+2.5rem)] right-8 z-10 max-h-[calc(100dvh-var(--header-h)-4.5rem)] w-(--right-sidebar-width) overflow-y-auto pb-1", OUTLINE_PANEL]}
		>
			<PropsRail slug={data.spec.slug} {outline} promo={false} />
		</div>
	</aside>
{/if}
