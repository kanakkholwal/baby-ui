<script lang="ts">
import Avatar from "../../avatar/svelte/avatar.svelte";
import AvatarFallback from "../../avatar/svelte/avatar-fallback.svelte";
import AvatarImage from "../../avatar/svelte/avatar-image.svelte";
import { cn } from "../../lib/cn";
import { initials, TEAM_AVATAR } from "../variants";
import { teamSectionState } from "./context";

let {
	src,
	name,
	class: classProp,
}: {
	src?: string;
	/** The person's name: the image's alt text and the source of the fallback initials. */
	name: string;
	class?: string;
} = $props();
const team = teamSectionState();
const look = $derived(TEAM_AVATAR[team.variant]);
</script>

<!-- A round face in grid and list, a portrait in cards; initials while it loads. -->
<Avatar
	data-slot="team-section-member-avatar"
	size={look.size}
	shape={look.shape}
	class={cn(team.styles.avatar(), classProp)}
>
	<AvatarImage {src} alt={name} />
	<AvatarFallback>{initials(name)}</AvatarFallback>
</Avatar>
