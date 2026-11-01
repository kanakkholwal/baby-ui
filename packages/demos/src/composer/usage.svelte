<script lang="ts">
import {
	Composer,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
} from "@baby-ui/svelte";

let { send }: { send: (text: string) => void } = $props();
let value = $state("");
</script>

<Composer bind:value onSubmit={send}>
	<ComposerInput placeholder="Ask anything…" />
	<ComposerToolbar>
		<ComposerSubmit />
	</ComposerToolbar>
</Composer>
