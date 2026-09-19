<script lang="ts">
import CodeBlock from "./code-block.svelte";
import InstallCommand from "./install-command.svelte";
import SourceFiles from "./source-files.svelte";
import Tabs from "./tabs.svelte";

type Variant = { code: string; lang: string; html: string };
type File = { path: string; jsPath: string | null; ts: Variant; js: Variant | null };

let {
	slug,
	dependencies,
	files,
	depsHtml,
	dialect = "ts",
}: {
	slug: string;
	dependencies: string[];
	files: File[];
	depsHtml: string;
	dialect?: string;
} = $props();

let mode = $state("cli");
const tabs = [
	{ id: "cli", label: "CLI" },
	{ id: "manual", label: "Manual" },
];
const depCommand = $derived(`pnpm add ${dependencies.join(" ")}`);
</script>

<Tabs {tabs} bind:active={mode} variant="segment" class="self-start" />

<div class="mt-4">
	{#if mode === "cli"}
		<InstallCommand {slug} />
	{:else}
		<div class="flex flex-col gap-4">
			{#if dependencies.length}
				<div>
					<p class="mb-2 text-muted-foreground text-sm">Install dependencies.</p>
					<CodeBlock code={depCommand} html={depsHtml} lang="bash" />
				</div>
			{/if}
			<p class="text-muted-foreground text-sm">
				Then copy each file into your project at the listed path.
			</p>
			<SourceFiles {files} {dialect} />
		</div>
	{/if}
</div>
