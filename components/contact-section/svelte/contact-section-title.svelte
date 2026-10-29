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

<h2
	data-slot="contact-section-title"
	id={contact.titleId}
	{...rest}
	class={cn(contact.styles.title(), classProp)}
>
	{@render children?.()}
</h2>
