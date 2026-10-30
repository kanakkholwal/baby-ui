<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type LogoCloudVariant, logoCloud } from "../variants";
import { setLogoCloud } from "./context";

let {
	variant = "grid",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** A centred `grid`, or a ruled `row` with the title beside the logos. */
	variant?: LogoCloudVariant;
	children?: Snippet;
} = $props();

const styles = $derived(logoCloud({ variant }));
setLogoCloud({
	get styles() {
		return styles;
	},
});
</script>

<!-- LogoCloudTitle, then LogoCloudContent holding a LogoCloudList and an optional LogoCloudLink. -->
<section data-slot="logo-cloud" data-variant={variant} {...rest} class={cn(styles.root(), className)}>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
