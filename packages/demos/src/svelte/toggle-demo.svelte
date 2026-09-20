<script lang="ts">
import { Toggle } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let pressed = $state(false);

$effect(() => {
	pressed = Boolean(props.pressed);
});
</script>

<Toggle
	bind:pressed
	size={(props.size as "sm" | "md") ?? "md"}
	disabled={Boolean(props.disabled)}
	label={(props.label as string) || "Bold"}
>
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
		<path d="M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
	</svg>
</Toggle>
