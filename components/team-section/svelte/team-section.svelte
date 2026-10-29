<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type TeamSectionVariant, teamSection } from "../variants";
import { setTeamSection } from "./context";

let {
	variant = "grid",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** Round faces in a `grid`, portrait `cards`, or ruled `list` rows. */
	variant?: TeamSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(teamSection({ variant }));
setTeamSection({
	get variant() {
		return variant;
	},
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- TeamSectionHeader, then TeamSectionList of members, optionally inside TeamSectionGroups. -->
<section
	data-slot="team-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
