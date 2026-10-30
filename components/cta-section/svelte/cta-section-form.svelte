<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLFormAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { ctaSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLFormAttributes & { children?: Snippet } = $props();
const cta = ctaSectionState();
</script>

<!-- An email capture in place of CtaSectionActions: put an Input and a submit Button inside. -->
<form data-slot="cta-section-form" {...rest} class={cn(cta.styles.form(), classProp)}>
	{@render children?.()}
</form>
