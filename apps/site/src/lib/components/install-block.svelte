<script lang="ts">
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
	dialect = "ts",
}: {
	slug: string;
	dependencies: string[];
	files: File[];
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
		</ol>
	{/if}
</div>
