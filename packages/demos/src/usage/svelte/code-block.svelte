<script lang="ts">
import { CodeBlock } from "@baby-ui/svelte";

const code = ["export function add(a: number, b: number) {", "\treturn a + b;", "}"].join("\n");
</script>

<CodeBlock {code} language="ts" filename="lib/add.ts" showLineNumbers />
