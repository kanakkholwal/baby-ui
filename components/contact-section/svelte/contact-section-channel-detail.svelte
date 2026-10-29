<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<p
	data-slot="contact-section-channel-detail"
	{...rest}
	class={cn(contact.styles.channelDetail(), classProp)}
>
	{@render children?.()}
</p>
