<script lang="ts">
import type { InstallSource } from "$lib/source";
import CodeBlock from "./code-block.svelte";
import InstallCommand from "./install-command.svelte";
import PmCommand from "./pm-command.svelte";
import SourceFiles from "./source-files.svelte";
import Tabs from "./tabs.svelte";

let {
	slug,
	dependencies,
	source,
	dialect = "ts",
}: {
	slug: string;
	dependencies: string[];
	/** JSON with the highlighted files and CSS, fetched the first time Manual opens. */
	source: string;
	dialect?: string;
} = $props();

const cache = new Map<string, Promise<InstallSource>>();
function load(url: string) {
	let pending = cache.get(url);
	if (!pending) {
		pending = fetch(url).then((res) => {
			if (!res.ok) throw new Error(String(res.status));
			return res.json() as Promise<InstallSource>;
		});
		pending.catch(() => cache.delete(url));
		cache.set(url, pending);
	}
	return pending;
}

let mode = $state("cli");
const tabs = [
	{ id: "cli", label: "CLI" },
	{ id: "manual", label: "Manual" },
];
</script>

<Tabs {tabs} bind:active={mode} variant="segment" class="self-start" />

<div class="mt-4">
	{#if mode === "cli"}
		<InstallCommand {slug} />
	{:else}
		<ol class="flex flex-col gap-6">
			{#if dependencies.length}
				<li>
					<p class="mb-2 text-foreground text-sm">Install the dependencies.</p>
					<PmCommand kind="add" args={dependencies.join(" ")} />
				</li>
			{/if}
			{#await load(source)}
				<li role="status" class="text-muted-foreground text-sm">Loading source files…</li>
			{:then { files, css }}
				<li>
					<p class="mb-2 text-foreground text-sm">Copy each file to the path shown.</p>
					<SourceFiles {files} {dialect} />
				</li>
				{#if css}
					<li>
						<p class="mb-2 text-foreground text-sm">Add this to your global stylesheet.</p>
						<CodeBlock code={css.code} html={css.html} lang="css" />
					</li>
				{/if}
			{:catch}
				<li role="alert" class="text-muted-foreground text-sm">
					Could not load the source files.
					<a href={source} class="underline">Open them as JSON</a>.
				</li>
			{/await}
			<li>
				<p class="text-muted-foreground text-sm">
					Add <code class="rounded bg-muted px-1 text-foreground">tokens.json</code> once with
					the CLI; it holds the motion variables every component reads.
				</p>
			</li>
		</ol>
	{/if}
</div>
