<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { setAvatar } from "./context";
import { type AvatarShape, type AvatarSize, avatar } from "./variants";

let {
	children,
	size = "md",
	shape = "circle",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	size?: AvatarSize;
	shape?: AvatarShape;
	class?: string;
} & HTMLAttributes<HTMLSpanElement> = $props();

let loaded = $state(false);

setAvatar({
	get loaded() {
		return loaded;
	},
	setLoaded: (next) => (loaded = next),
});
</script>

<span {...rest} data-slot="avatar" class={cn(avatar({ size, shape }), classProp)}>
	{@render children?.()}
</span>
