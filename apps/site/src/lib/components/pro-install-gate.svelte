<script lang="ts">
import { IconLock } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
import { page } from "$app/state";

let { name }: { name: string } = $props();
</script>

<!-- Pro source ships from the private registry, behind sign-in. -->
<div class="flex flex-col items-start gap-4 rounded-xl border border-border bg-card p-6">
	<span class="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground">
		<IconLock size={17} />
	</span>
	<div>
		<p class="font-medium text-foreground text-sm">{name} is a Pro component</p>
		<p class="mt-1 max-w-md text-muted-foreground text-sm">
			Sign in to get the install command and source for React and Svelte.
		</p>
	</div>
	<div class="flex gap-2">
		<Button size="sm" href="/login?next={encodeURIComponent(page.url.pathname)}">
			Sign in to install
		</Button>
		<Button size="sm" variant="outline" href="/pricing">See plans</Button>
	</div>
</div>
