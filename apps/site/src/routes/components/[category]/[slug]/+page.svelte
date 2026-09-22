<script lang="ts">
import { registry } from "virtual:docvia/source";
import { demos } from "@baby-ui/demos/svelte";
import { Renderer } from "@docvia/renderer-svelte";
import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
import IconList from "@tabler/icons-svelte/icons/list";
import CodeBlock from "$lib/components/code-block.svelte";
import ControlsPanel from "$lib/components/controls-panel.svelte";
import DemoPreview from "$lib/components/demo-preview.svelte";
import InstallBlock from "$lib/components/install-block.svelte";
import MobileNavDrawer from "$lib/components/mobile-nav-drawer.svelte";
import PageMenu from "$lib/components/page-menu.svelte";
import PreviewToolbar from "$lib/components/preview-toolbar.svelte";
import PropsRail from "$lib/components/props-rail.svelte";
import PropsTable from "$lib/components/props-table.svelte";
import Tabs from "$lib/components/tabs.svelte";
import { prefs } from "$lib/preferences.svelte";
import { CATEGORY_LABEL, defaultProps } from "$lib/registry";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

let tab = $state("preview");
let viewport = $state<"desktop" | "mobile">("desktop");
let fullscreen = $state(false);
let reloadKey = $state(0);

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

$effect(() => {
	values = defaultProps(data.spec);
});

const port = $derived(data.ports.find((p) => p.framework === framework) ?? data.ports[0]);
const hasControls = $derived(data.spec.props.some((p) => p.control.kind !== "none"));
const tabs = [
	{ id: "preview", label: "Preview" },
	{ id: "usage", label: "Usage" },
	{ id: "install", label: "Installation" },
];
const outline = $derived(
	[
		{ id: "overview", label: "Overview" },
		{ id: "preview", label: "Preview" },
		...data.proseHeadings,
		data.spec.motion && { id: "behaviour", label: "Behaviour" },
		data.spec.props.length > 0 && { id: "api-reference", label: "API reference" },
	].filter((h): h is { id: string; label: string } => Boolean(h)),
);
const usage = $derived(
	dialect === "js" && port?.usage?.js ? port.usage.js : (port?.usage?.ts ?? null),
);
</script>

<svelte:head>
	<title>{data.spec.name} · Baby UI</title>
	<meta name="description" content={data.spec.description} />
</svelte:head>

<div class="min-w-0 py-8">
	<div id="overview" class="scroll-mt-24">
		<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
			<a
				href="/components/{data.spec.category}"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				{CATEGORY_LABEL[data.spec.category]}
			</a>
			<IconChevronRight size={14} stroke={1.6} class="text-muted-foreground" />
			<span class="font-medium text-foreground">{data.spec.name}</span>
		</nav>

		<div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div class="flex items-center gap-3">
				<h1 class="font-semibold text-3xl text-foreground tracking-tight">{data.spec.name}</h1>
				{#if data.spec.status !== "stable"}
					<span class="mt-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
						{data.spec.status}
					</span>
				{/if}
			</div>
			<PageMenu
				markdownUrl="/components/{data.spec.category}/{data.spec.slug}.md"
				copyText={data.spec.description}
			/>
		</div>

		<p class="mt-2 max-w-2xl text-muted-foreground">{data.spec.description}</p>

		<div class="mt-4 xl:hidden">
			<MobileNavDrawer label="On this page" title="On this page">
				{#snippet icon()}<IconList size={14} stroke={1.6} />{/snippet}
				{#snippet children()}
					<PropsRail slug={data.spec.slug} {outline} />
				{/snippet}
			</MobileNavDrawer>
		</div>
	</div>

	<section id="preview" class="mt-8 scroll-mt-24">
		<div class="flex items-center justify-between gap-3">
			<Tabs {tabs} bind:active={tab} variant="underline" class="flex-1" />
			{#if tab === "preview"}
				<PreviewToolbar bind:viewport bind:fullscreen onReload={() => reloadKey++} />
			{/if}
		</div>
		<div id="panel-{tab}" role="tabpanel" aria-labelledby="tab-{tab}" class="mt-4">
			{#if tab === "preview"}
				{@render previewStage()}
				{#if hasControls}
					<ControlsPanel spec={data.spec} bind:values />
				{/if}
			{:else if tab === "usage"}
				{#if usage}
					<CodeBlock code={usage.code} html={usage.html} lang={usage.lang} maxHeight="none" />
				{/if}
			{:else if port}
				<InstallBlock
					slug={data.spec.slug}
					dependencies={port.dependencies}
					files={port.files}
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
				What both implementations must observably do. Not a description of either one's code.
			</p>
			<ul class="mt-3 flex max-w-2xl list-disc flex-col gap-1.5 pl-5 text-muted-foreground text-sm">
				{#each data.spec.motion.behaviour as rule (rule)}
					<li>{rule}</li>
				{/each}
				<li>{data.spec.motion.reducedMotion}</li>
			</ul>
		</section>
	{/if}

	{#if data.spec.props.length}
		<section id="api-reference" class="mt-12 scroll-mt-24 border-border border-t pt-8">
			<h2 class="font-semibold text-foreground text-sm">API Reference</h2>
			<div class="mt-3"><PropsTable props={data.spec.props} /></div>
		</section>
	{/if}
</div>

{#snippet previewStage(fill = false)}
	<div
		class={[
			"mx-auto transition-[max-width] duration-300",
			viewport === "mobile" ? "max-w-sm" : "max-w-none",
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

<aside aria-label="On this page" class="hidden min-w-0 xl:block">
	<div
		class="scrollbar-hide fixed top-24 right-8 z-10 max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) overflow-y-auto pb-1"
	>
		<PropsRail slug={data.spec.slug} {outline} />
	</div>
</aside>
