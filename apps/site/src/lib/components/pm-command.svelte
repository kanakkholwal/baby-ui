<script lang="ts">
import { type PackageManager, prefs } from "$lib/preferences.svelte";
import CodeFrame from "./code-frame.svelte";

type Kind = "dlx" | "add";

let {
	kind,
	args,
	/** Args rendered with the `[]` positions bracketed as the highlighted target. */
	highlight = "",
}: { kind: Kind; args: string; highlight?: string } = $props();

const VERB: Record<Kind, Record<PackageManager, string>> = {
	dlx: { bun: "bunx --bun", npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx" },
	add: { bun: "bun add", npm: "npm install", pnpm: "pnpm add", yarn: "yarn add" },
};
const tabs = (["bun", "npm", "pnpm", "yarn"] as const).map((id) => ({ id, label: id }));

const verb = $derived(VERB[kind][prefs.pm].split(" "));
const command = $derived(`${verb.join(" ")} ${args}`);
// The tail of `args` that should read as the target, everything before it as plain text.
const head = $derived(
	highlight && args.endsWith(highlight) ? args.slice(0, -highlight.length) : args,
);
const tail = $derived(highlight && args.endsWith(highlight) ? highlight : "");
</script>

<CodeFrame
	{tabs}
	bind:active={() => prefs.pm, (next) => prefs.set("pm", next as PackageManager)}
	copyText={command}
>
	<div class="scroll-area overflow-x-auto">
		<div class="min-w-max whitespace-nowrap px-5 py-4 font-mono text-[13px] leading-[1.7]">
			<span class="select-none text-muted-foreground">$&nbsp;</span
			><span class="text-[#1f6feb] dark:text-[#ffa657]">{verb[0]}</span
			>{#if verb[1]}<span class="text-[#6f42c1] dark:text-[#d2a8ff]">&nbsp;{verb[1]}</span
				>{/if}<span class="text-muted-foreground">&nbsp;{head}</span
			><span class="font-medium text-[#0a3069] dark:text-[#a5d6ff]">{tail}</span>
		</div>
	</div>
</CodeFrame>
