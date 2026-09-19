<script lang="ts">
import { registry } from "virtual:docvia/source";
import { demos } from "@baby-ui/demos/svelte";
import type { Framework } from "@baby-ui/registry-schema";
import { Renderer } from "@docvia/renderer-svelte";
import CodeBlock from "$lib/components/code-block.svelte";
import DemoPreview from "$lib/components/demo-preview.svelte";
import InstallBlock from "$lib/components/install-block.svelte";
import PropsRail from "$lib/components/props-rail.svelte";
import PropsTable from "$lib/components/props-table.svelte";
import Tabs from "$lib/components/tabs.svelte";
import { CATEGORY_LABEL, defaultProps } from "$lib/registry";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

let tab = $state("preview");
let framework = $state<Framework>("svelte");
let values = $state<Record<string, unknown>>({});

$effect(() => {
	values = defaultProps(data.spec);
});

const port = $derived(data.ports.find((p) => p.framework === framework) ?? data.ports[0]);
const tabs = [
	{ id: "preview", label: "Preview" },
	{ id: "code", label: "Code" },
	{ id: "install", label: "Install" },
];
</script>

<svelte:head>
	<title>{data.spec.name} — baby-ui</title>
	<meta name="description" content={data.spec.description} />
</svelte:head>

<div class="min-w-0 py-8">
	<div id="overview" class="scroll-mt-24">
		<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
			<a href="/components" class="text-muted-foreground transition-colors hover:text-foreground">
				{CATEGORY_LABEL[data.spec.category]}
			</a>
			<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="h-3.5 w-3.5 text-muted-foreground">
				<path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<span class="font-medium text-foreground">{data.spec.name}</span>
		</nav>

		<div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
			<div class="flex items-center gap-3">
				<h1 class="font-medium text-3xl text-foreground tracking-tight">{data.spec.name}</h1>
				{#if data.spec.status !== "stable"}
					<span class="mt-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
						{data.spec.status}
					</span>
				{/if}
			</div>
			<div class="flex items-center gap-0.5 rounded-full bg-card p-1 text-xs">
				{#each data.ports as p (p.framework)}
					<button
						type="button"
						aria-pressed={framework === p.framework}
						onclick={() => (framework = p.framework)}
						class="rounded-full px-2.5 py-1 text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
					>
						{p.framework}
					</button>
				{/each}
			</div>
		</div>

		<p class="mt-2 max-w-2xl text-muted-foreground">{data.spec.description}</p>
	</div>

	<section id="preview" class="mt-8 scroll-mt-24">
		<Tabs {tabs} bind:active={tab} />
		<div id="panel-{tab}" role="tabpanel" aria-labelledby="tab-{tab}" class="mt-4">
			{#if tab === "preview"}
				<DemoPreview {framework} slug={data.spec.slug} demo={demos[data.spec.slug]} props={values} />
			{:else if tab === "code"}
				<div class="flex flex-col gap-4">
					{#each port?.files ?? [] as file (file.path)}
						<CodeBlock code={file.code} html={file.html} lang={file.lang} filename={file.path} />
					{/each}
				</div>
			{:else if port}
				<InstallBlock
					install={port.install}
					installHtml={port.installHtml}
					dependencies={port.dependencies}
					files={port.files}
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

<aside aria-label="Controls and metadata" class="hidden min-w-0 xl:block">
	<div
		class="scrollbar-hide fixed top-24 right-8 z-10 max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) overflow-y-auto pb-1"
	>
		<PropsRail spec={data.spec} bind:values />
	</div>
</aside>
