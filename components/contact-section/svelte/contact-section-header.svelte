<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<div
	data-slot="contact-section-header"
	{...rest}
	class={cn(contact.styles.header(), classProp)}
>
	{@render children?.()}
</div>
