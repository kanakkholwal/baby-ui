<script lang="ts">
import type { AlertVariant } from "@baby-ui/svelte";
import { Alert } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-96">
	{#key [props.variant, props.dismissible]}
		<Alert
			variant={(props.variant as AlertVariant) ?? "info"}
			title={(props.title as string) || undefined}
			dismissible={Boolean(props.dismissible)}
		>
			Your last deploy finished 4 minutes ago and is serving traffic.
		</Alert>
	{/key}
</div>
