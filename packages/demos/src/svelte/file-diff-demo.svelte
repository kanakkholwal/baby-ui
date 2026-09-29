<script lang="ts">
import { FileDiff } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof FileDiff>>(props));

const lines = [
	{ kind: "context" as const, text: "export function Button(props: ButtonProps) {" },
	{ kind: "remove" as const, text: "  const classes = button({ variant });" },
	{
		kind: "add" as const,
		text: "  const classes = cn(button({ variant, size }), className);",
	},
	{ kind: "context" as const, text: "  return <button className={classes} />;" },
	{ kind: "context" as const, text: "}" },
];
</script>

<div class="w-full max-w-lg">
	<FileDiff
		filename={p.filename || "src/button.tsx"}
		{lines}
		showLineNumbers={props.showLineNumbers !== false}
	/>
</div>
