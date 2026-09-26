<script lang="ts">
import { MusicPlayer } from "@baby-ui/svelte";

let playing = $state(false);
</script>

<MusicPlayer
	title="Northern Lights"
	artist="Aurora Hall"
	cover="https://picsum.photos/id/1040/480/480"
	duration={214}
	src="/audio/northern-lights.mp3"
	bind:playing
/>
