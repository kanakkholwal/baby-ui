<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { questionState } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();
const q = questionState("QuestionBody");
</script>

<!-- The inner panel (framed) around the header, content and result; the footer stays in the rim. -->
<div {...rest} data-slot="question-body" class={cn(q.styles.body(), classProp)}>
	{@render children?.()}
</div>
