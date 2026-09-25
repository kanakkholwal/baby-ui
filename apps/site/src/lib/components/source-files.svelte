<script lang="ts">
import type { TrackEvent } from "$lib/analytics";
import CodeBlock from "./code-block.svelte";

type Variant = { code: string; lang: string; html: string };
type File = { path: string; jsPath: string | null; ts: Variant; js: Variant | null };

let {
	files,
	dialect = "ts",
	analytics,
}: { files: File[]; dialect?: string; analytics?: TrackEvent } = $props();

const panels = $derived(
	files.map((file) => {
		const shown = dialect === "js" && file.js ? file.js : file.ts;
		const path = dialect === "js" && file.jsPath ? file.jsPath : file.path;
		return { id: path, label: path.split("/").pop() ?? path, ...shown };
	}),
);
</script>

<CodeBlock {panels} {analytics} />
