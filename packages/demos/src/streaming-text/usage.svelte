<script lang="ts">
import {
	type StreamingSource,
	StreamingText,
	StreamingTextContent,
	StreamingTextCopy,
	StreamingTextFollowUps,
	StreamingTextFooter,
	StreamingTextSources,
} from "@baby-ui/svelte";

let {
	answer,
	sources,
	ask,
}: { answer: string; sources: StreamingSource[]; ask: (text: string) => void } = $props();
</script>

<StreamingText {sources}>
	<StreamingTextContent content={answer} />
	<StreamingTextFooter>
		<StreamingTextCopy />
		<StreamingTextSources />
	</StreamingTextFooter>
	<StreamingTextFollowUps items={["Tell me more"]} onSelect={ask} />
</StreamingText>
