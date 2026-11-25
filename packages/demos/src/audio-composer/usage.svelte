<script lang="ts">
import {
	AudioComposer,
	AudioComposerDuration,
	AudioComposerStyle,
	AudioComposerTools,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
} from "@baby-ui/svelte";
</script>

<AudioComposer
	presets={["Cinematic", "Lo-fi", "Ambient"]}
	onSubmit={(prompt, { duration, preset }) => console.log(prompt, duration, preset)}
>
	<ComposerInput placeholder="Describe the sound you want" />
	<ComposerToolbar>
		<AudioComposerDuration />
		<AudioComposerStyle />
		<AudioComposerTools>
			<ComposerSubmit />
		</AudioComposerTools>
	</ComposerToolbar>
</AudioComposer>
