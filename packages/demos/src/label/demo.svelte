<script lang="ts">
import { Input, Label } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex w-full max-w-72 flex-col gap-1.5">
	<Label for="demo-label-input" required={Boolean(props.required)} disabled={Boolean(props.disabled)}>
		Email address
	</Label>
	<Input id="demo-label-input" placeholder="you@example.com" disabled={Boolean(props.disabled)} />
</div>
