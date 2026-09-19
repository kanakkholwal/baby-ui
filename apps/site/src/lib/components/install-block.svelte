<script lang="ts">
import CodeBlock from "./code-block.svelte";
import Tabs from "./tabs.svelte";

type File = { path: string; code: string; html: string; lang: string };

let {
	install,
	installHtml,
	dependencies,
	files,
}: {
	install: string;
	installHtml: string;
	dependencies: string[];
	files: File[];
} = $props();

let mode = $state("cli");
const tabs = [
	{ id: "cli", label: "CLI" },
	{ id: "manual", label: "Manual" },
];
const depCommand = $derived(`pnpm add ${dependencies.join(" ")}`);
</script>

<Tabs {tabs} bind:active={mode} />

<div class="mt-4">
	{#if mode === "cli"}
		<CodeBlock code={install} html={installHtml} lang="bash" />
	{:else}
		<div class="flex flex-col gap-4">
			{#if dependencies.length}
				<div>
					<p class="mb-2 text-muted-foreground text-sm">Install dependencies.</p>
					<CodeBlock
						code={depCommand}
						html={`<pre class="shiki"><code><span class="line">${depCommand}</span></code></pre>`}
						lang="bash"
					/>
				</div>
			{/if}
			<p class="text-muted-foreground text-sm">
				Then copy each file into your project at the listed path.
			</p>
			{#each files as file (file.path)}
				<CodeBlock code={file.code} html={file.html} lang={file.lang} filename={file.path} />
			{/each}
		</div>
	{/if}
</div>
