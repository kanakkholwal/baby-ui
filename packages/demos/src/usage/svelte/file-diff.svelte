<script lang="ts">
import { type DiffLine, FileDiff } from "@baby-ui/svelte";

const lines: DiffLine[] = [
	{ kind: "context", text: "export function cn(...inputs: ClassValue[]) {" },
	{ kind: "remove", text: "\treturn inputs.join(' ');" },
	{ kind: "add", text: "\treturn twMerge(clsx(inputs));" },
	{ kind: "context", text: "}" },
];
</script>

<FileDiff filename="lib/cn.ts" {lines} />
