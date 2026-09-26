<script lang="ts">
import { type PmKind, pmCommand, pmVerb } from "$lib/pm";
import { prefs } from "$lib/preferences.svelte";
import TextCascade from "./text-cascade.svelte";

let {
	kind,
	args,
	/** Tail of `args` shown as the highlighted target. */
	highlight = "",
	/** Rolls the highlighted tail letter by letter when it changes. */
	cascade = false,
}: { kind: PmKind; args: string; highlight?: string; cascade?: boolean } = $props();

const verb = $derived(pmVerb(kind, prefs.pm));
const command = $derived(pmCommand(kind, args, prefs.pm));
const tail = $derived(highlight && args.endsWith(highlight) ? highlight : "");
const head = $derived(
	command.slice(verb.join(" ").length + 1, command.length - tail.length),
);
</script>

<div class="scroll-area overflow-x-auto">
	<div class="min-w-max whitespace-nowrap px-5 py-4 font-mono text-[13px] leading-[1.7]">
		<span class="select-none text-muted-foreground">$&nbsp;</span
		><span class="text-[#1f6feb] dark:text-[#ffa657]">{verb[0]}</span
		>{#if verb[1]}<span class="text-[#6f42c1] dark:text-[#d2a8ff]">&nbsp;{verb[1]}</span
			>{/if}<span class="text-muted-foreground">&nbsp;{head}</span
		><span class="font-medium text-[#0a3069] dark:text-[#a5d6ff]"
			>{#if cascade}<TextCascade value={tail} />{:else}{tail}{/if}</span
		>
	</div>
</div>
