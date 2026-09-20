<script lang="ts">
import { CodeBlock } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const code =
	"export function cn(...inputs: ClassValue[]) {\n\treturn twMerge(clsx(inputs));\n}";
</script>

<div class="w-96">
	<CodeBlock
		{code}
		language={(props.language as string) || "ts"}
		filename={(props.filename as string) || "lib/cn.ts"}
		showLineNumbers={Boolean(props.showLineNumbers)}
		maxHeight={(props.maxHeight as string) || "24rem"}
	/>
</div>
