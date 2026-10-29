<script lang="ts">
import { IconBookmark } from "@baby-ui/icons";
import { Button, RollingDigits } from "@baby-ui/svelte";
import { bookmarks } from "#lib/bookmarks.svelte.js";

// The store reads browser storage, so the count waits for the client to avoid a server mismatch.
let ready = $state(false);
$effect(() => {
	ready = true;
});
const count = $derived(ready ? bookmarks.slugs.length : 0);
</script>

<!-- Sits beside the GitHub star; the count rolls as bookmarks change and folds away at zero. -->
<Button
	href="/bookmarks"
	variant="ghost"
	size="sm"
	aria-label={count ? `Bookmarks, ${count} saved` : "Bookmarks"}
	class="h-8 gap-0 rounded-full bg-foreground/[0.045] px-2.5 font-normal text-foreground/70 tabular-nums ring-1 ring-foreground/[0.05] hover:bg-foreground/[0.075] hover:text-foreground"
>
	<IconBookmark size={16} aria-hidden="true" />
	<span
		data-open={count > 0}
		class="hidden grid-cols-[0fr] transition-[grid-template-columns] duration-(--duration-base) ease-(--ease-ui-out) data-[open=true]:grid-cols-[1fr] motion-reduce:transition-none sm:grid"
	>
		<span class="min-w-0 overflow-hidden">
			<span class="block ps-1 text-xs"><RollingDigits value={count} startOnView={false} /></span>
		</span>
	</span>
</Button>
