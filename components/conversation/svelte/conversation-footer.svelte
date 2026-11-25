<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { conversation } from "../variants";
import { getConversation } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const ctx = getConversation();
</script>

<!-- The strip under the transcript, for a Composer. It stays put while the transcript scrolls. -->
<div {...rest} data-slot="conversation-footer" class={cn(conversation({ variant: ctx.variant }).footer(), classProp)}>
	{@render children?.()}
</div>
