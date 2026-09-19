<script lang="ts">
import CodeBlock from "./code-block.svelte";

type Variant = { code: string; lang: string; html: string };
type File = { path: string; jsPath: string | null; ts: Variant; js: Variant | null };

let { files, dialect = "ts" }: { files: File[]; dialect?: string } = $props();
</script>

<div class="flex flex-col gap-4">
	{#each files as file (file.path)}
		{@const shown = dialect === "js" && file.js ? file.js : file.ts}
		{@const path = dialect === "js" && file.jsPath ? file.jsPath : file.path}
		<CodeBlock code={shown.code} html={shown.html} lang={shown.lang} filename={path} />
	{/each}
</div>
