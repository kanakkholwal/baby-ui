<script lang="ts">
import { MirrorText, type MirrorTextDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<MirrorText
	text={(props.text as string) || "This is a text"}
	direction={(props.direction as MirrorTextDirection) ?? "up"}
	class="text-4xl font-light uppercase"
/>
