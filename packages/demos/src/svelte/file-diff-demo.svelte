<script lang="ts">
import { FileDiff } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

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
		filename={(props.filename as string) || "src/button.tsx"}
		{lines}
		showLineNumbers={props.showLineNumbers !== false}
	/>
</div>
