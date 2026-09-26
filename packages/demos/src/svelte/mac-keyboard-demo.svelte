<script lang="ts">
import {
	MacKeyboard,
	type MacKeyboardSize,
	type MacKeyboardVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-4xl overflow-x-auto p-2">
	<MacKeyboard
		listen={(props.listen as boolean) ?? true}
		variant={(props.variant as MacKeyboardVariant) ?? "default"}
		size={(props.size as MacKeyboardSize) ?? "md"}
	/>
</div>
