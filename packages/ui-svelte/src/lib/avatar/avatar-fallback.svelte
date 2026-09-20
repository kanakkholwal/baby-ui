<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAvatar } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLSpanElement> = $props();

const avatar = getAvatar();
</script>

<span
	{...rest}
	aria-hidden={avatar.loaded ? "true" : undefined}
	data-slot="avatar-fallback"
	class={cn("font-medium text-muted-foreground select-none", classProp)}
>
	{@render children?.()}
</span>
