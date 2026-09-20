import { CodeBlock } from "@baby-ui/react";

const code = ["export function add(a: number, b: number) {", "\treturn a + b;", "}"].join(
	"\n",
);

export function Example() {
	return <CodeBlock code={code} language="ts" filename="lib/add.ts" showLineNumbers />;
}
