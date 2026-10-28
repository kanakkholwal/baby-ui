<script lang="ts">
import { IconBookmark, IconBookmarkFilled } from "@baby-ui/icons";
import { Toggle } from "@baby-ui/svelte";
import { bookmarks } from "#lib/bookmarks.svelte.js";

let {
	slug,
	name,
	size = "sm",
	class: classProp = "",
}: { slug: string; name: string; size?: "xs" | "sm"; class?: string } = $props();

const saved = $derived(bookmarks.has(slug));
</script>

<!-- Outline and filled marks share one cell; the filled one springs in, so a quick re-press retargets. -->
<Toggle
	variant="primary"
	{size}
	label={saved ? `Remove ${name} from bookmarks` : `Bookmark ${name}`}
	bind:pressed={() => saved, () => bookmarks.toggle(slug)}
	class="group/bookmark relative {classProp}"
>
	<span class="grid place-items-center [&>*]:[grid-area:1/1] [&_svg]:size-4">
		<IconBookmark
			aria-hidden="true"
			class="transition-[opacity,scale] duration-(--duration-fast) ease-(--ease-ui-out) group-aria-pressed/bookmark:scale-75 group-aria-pressed/bookmark:opacity-0 motion-reduce:transition-none"
		/>
		<IconBookmarkFilled
			aria-hidden="true"
			class="scale-50 opacity-0 transition-[opacity,scale] duration-(--duration-spring-bouncy) ease-(--ease-spring-bouncy) group-aria-pressed/bookmark:scale-100 group-aria-pressed/bookmark:opacity-100 motion-reduce:transition-none"
		/>
	</span>
</Toggle>
