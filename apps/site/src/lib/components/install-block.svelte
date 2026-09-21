<script lang="ts">
import CodeBlock from "./code-block.svelte";
import InstallCommand from "./install-command.svelte";
import PmCommand from "./pm-command.svelte";
import SourceFiles from "./source-files.svelte";
import Tabs from "./tabs.svelte";

type Variant = { code: string; lang: string; html: string };
type File = { path: string; jsPath: string | null; ts: Variant; js: Variant | null };

let {
	slug,
	dependencies,
	files,
	css = null,
	dialect = "ts",
}: {
	slug: string;
	dependencies: string[];
	files: File[];
	/** What the CLI writes into the global stylesheet for this component. */
	css?: { code: string; html: string } | null;
	dialect?: string;
} = $props();

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
			<li>
				<p class="text-muted-foreground text-sm">
					Add <code class="rounded bg-muted px-1 text-foreground">tokens.json</code> once with
					the CLI; it holds the motion variables every component reads.
				</p>
			</li>
		</ol>
	{/if}
</div>
