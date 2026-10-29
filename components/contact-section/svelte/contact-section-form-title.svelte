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
	data-slot="contact-section-form-title"
	id={contact.formTitleId}
	{...rest}
	class={cn(contact.styles.formTitle(), classProp)}
>
	{@render children?.()}
</h3>
