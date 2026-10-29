<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLLiAttributes & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<!-- One way to reach you: a title, a link and a detail line. -->
<li
	data-slot="contact-section-channel"
	{...rest}
	class={cn(contact.styles.channel(), classProp)}
>
	{@render children?.()}
</li>
