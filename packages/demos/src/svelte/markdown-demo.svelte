<script lang="ts">
import { Markdown } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Markdown>>(props));

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

const content = $derived(p.content || SAMPLE);
</script>

<div class="w-full max-w-96"><Markdown {content} size={p.size ?? "md"} /></div>
