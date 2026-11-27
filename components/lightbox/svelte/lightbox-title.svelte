<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let { children, ...rest }: DialogPrimitive.TitleProps & { children?: Snippet } = $props();
</script>

<DialogPrimitive.Title {...rest} data-slot="lightbox-title">
	{@render children?.()}
</DialogPrimitive.Title>
