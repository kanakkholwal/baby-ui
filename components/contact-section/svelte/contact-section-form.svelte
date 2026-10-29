<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLFormAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLFormAttributes & { children?: Snippet } = $props();
const contact = contactSectionState();
</script>

<!-- The form card; put your own fields and submit button inside and handle `onsubmit`. -->
<form
	data-slot="contact-section-form"
	aria-labelledby={contact.formTitleId}
	{...rest}
	class={cn(contact.styles.form(), classProp)}
>
	{@render children?.()}
</form>
