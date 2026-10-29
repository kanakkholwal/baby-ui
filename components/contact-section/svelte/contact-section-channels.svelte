<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLUListElement> & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<ul
	data-slot="contact-section-channels"
	{...rest}
	class={cn(contact.styles.channels(), classProp)}
>
	{@render children?.()}
</ul>
