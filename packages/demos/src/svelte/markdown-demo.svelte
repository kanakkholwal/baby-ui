<script lang="ts">
import { Markdown } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";

type MarkdownSize = NonNullable<ComponentProps<typeof Markdown>["size"]>;

let { props = {} }: { props?: Record<string, unknown> } = $props();

const SAMPLE = [
	"## Installing",
	"Components are copied into your project rather than installed.",
	"",
	"- You own the source",
	"- Nothing is imported at runtime",
	"- Updates are a diff, not a version bump",
	"",
	"```",
	"npx shadcn add button",
	"```",
].join("\n");

const content = $derived((props.content as string) || SAMPLE);
</script>

<div class="w-96"><Markdown {content} size={(props.size as MarkdownSize) ?? "md"} /></div>
