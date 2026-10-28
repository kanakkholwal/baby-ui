<script lang="ts">
import { IconBolt } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";

let { class: classProp }: { class?: string } = $props();
</script>

<Button href="/pricing" variant="default_soft" size="sm" class="rounded-full {classProp ?? ''}">
	<IconBolt aria-hidden="true" />
	Get Pro
</Button>
