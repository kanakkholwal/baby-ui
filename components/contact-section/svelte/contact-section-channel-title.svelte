<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<h3
	data-slot="contact-section-channel-title"
	{...rest}
	class={cn(contact.styles.channelTitle(), classProp)}
>
	{@render children?.()}
</h3>
