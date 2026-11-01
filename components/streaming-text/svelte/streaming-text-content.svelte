<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../../lib/cn";
import Markdown from "../../markdown/svelte/markdown.svelte";
import { plainTextOf, type StreamingToken, tokensOf, WORD_DELAY } from "../variants";
import { streamingTextState } from "./context";

let {
	content,
	markdown = false,
	streaming,
	caret = true,
	wordDelay = WORD_DELAY,
	onDone,
	class: classProp,
}: {
	/** Tokens with optional citations, or plain text revealed word by word. */
	content: StreamingToken[] | string;
	/** Render as Markdown; the reveal then follows `streaming` instead of the word timer. */
	markdown?: boolean;
	/** Markdown: `true` while chunks arrive, `false` once done. */
	streaming?: boolean;
	/** A blinking caret while the text reveals. */
	caret?: boolean;
	/** Milliseconds between words. */
	wordDelay?: number;
	onDone?: () => void;
	class?: string;
} = $props();
const ctx = streamingTextState("StreamingTextContent");
const tokens = $derived(tokensOf(content));
const plain = $derived(plainTextOf(content));
let count = $state(0);
const done = $derived(markdown ? !streaming : count >= tokens.length);
let reported = false;

$effect(() => {
	ctx.text = plain;
});
$effect(() => {
	const now = done;
	untrack(() => {
		ctx.done = now;
		if (now && !reported) {
			reported = true;
			onDone?.();
		}
		if (!now) reported = false;
	});
});
$effect(() => {
	if (markdown || count >= tokens.length) return;
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
		count = tokens.length;
		return;
	}
	const id = setTimeout(() => {
		count = Math.min(tokens.length, count + 1);
	}, wordDelay);
	return () => clearTimeout(id);
});
</script>

{#if markdown}
	<div data-slot="streaming-text-content" class={classProp}>
		<Markdown content={plain} {streaming} size={ctx.size} {caret} />
	</div>
{:else}
	<p data-slot="streaming-text-content" aria-busy={!done || undefined} class={cn(ctx.styles.text(), classProp)}>
		{#each tokens.slice(0, count) as token, i (`${i}-${token.text}`)}
			{@const source = token.cite === undefined ? undefined : ctx.sources[token.cite]}
			{#if token.cite === undefined}
				<span>{token.text} </span>
			{:else if source}
				<a href={source.href} target="_blank" rel="noreferrer" class={ctx.styles.chip()}>
					<img src={source.image} alt="" class="size-3 rounded-[3px]" />
					<span>{source.domain}</span>
				</a>
			{/if}
		{/each}
		{#if caret && !done}<span aria-hidden="true" class={ctx.styles.caret()}></span>{/if}
	</p>
{/if}
