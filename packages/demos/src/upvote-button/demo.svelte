<script lang="ts">
import {
	UpvoteButton,
	type UpvoteOrientation,
	type UpvoteVariant,
} from "@baby-ui/svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(
	controlProps<{ orientation: UpvoteOrientation; variant: UpvoteVariant; label: string }>(
		props,
	),
);
// The `voted` control sets the starting state; the button still toggles on click.
let voted = $state(false);
$effect(() => {
	if (props.voted !== undefined) voted = props.voted === true;
});
</script>

<UpvoteButton
	count={Number(props.count ?? 482)}
	orientation={p.orientation ?? "vertical"}
	variant={p.variant ?? "default"}
	label={p.label || "Upvote"}
	bind:voted
/>
