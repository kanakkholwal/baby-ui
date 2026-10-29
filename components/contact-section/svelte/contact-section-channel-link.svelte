<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contactSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAnchorAttributes & {
	/** A `mailto:`, `tel:` or page URL. */
	href: string;
	children?: Snippet;
} = $props();
const contact = contactSectionState();
</script>

<a
	data-slot="contact-section-channel-link"
	{...rest}
	class={cn(contact.styles.channelLink(), classProp)}
>
	{@render children?.()}
</a>
