<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { questionState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
const q = questionState("QuestionResult");
</script>

<!-- The line left once answered, e.g. "Going with Edge and streaming". -->
{#if !q.interactive}
	<p data-slot="question-result" role="status" class={cn(q.styles.result(), classProp)}>
		{#if children}{@render children()}{:else}Response submitted{/if}
	</p>
{/if}
