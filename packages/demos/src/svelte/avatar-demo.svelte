<script lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Avatar>>(props));
const pImage = $derived(controlProps<ComponentProps<typeof AvatarImage>>(props));

const name = $derived(typeof props.name === "string" ? props.name : "Kanak Kholwal");
const initials = $derived(
	name
		.trim()
		.split(/\s+/)
		.map((word) => word[0] ?? "")
		.slice(0, 2)
		.join("")
		.toUpperCase(),
);
</script>

<div class="flex items-center gap-3">
	<Avatar size={p.size ?? "md"} shape={p.shape ?? "circle"}>
		<AvatarFallback>{initials}</AvatarFallback>
		<AvatarImage src={pImage.src || "https://github.com/kanakkholwal.png"} alt={name} />
	</Avatar>
	<div class="text-sm">
		<p class="font-medium text-foreground">{name}</p>
		<p class="text-muted-foreground text-xs">Fallback shows until an image loads</p>
	</div>
</div>
