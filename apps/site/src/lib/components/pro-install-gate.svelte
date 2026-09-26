<script lang="ts">
import { Button } from "@baby-ui/svelte";
import IconLock from "@tabler/icons-svelte/icons/lock";

let { name }: { name: string } = $props();
</script>

<!-- Pro source ships from the private registry; this stands in until sign-in exists. -->
<div class="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6">
	<span class="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground">
		<IconLock size={17} stroke={1.6} />
	</span>
	<div>
		<p class="font-medium text-foreground text-sm">{name} is a Pro component</p>
		<p class="mt-1 max-w-md text-muted-foreground text-sm">
			Sign in to get the install command and source for React and Svelte.
		</p>
	</div>
	<Button size="sm" disabled>Sign in to install</Button>
</div>
