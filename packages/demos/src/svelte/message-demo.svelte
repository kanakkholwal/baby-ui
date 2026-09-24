<script lang="ts">
import {
	Message,
	type MessageAlign,
	MessageAvatar,
	MessageBubble,
	type MessageBubbleVariant,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
	type MessageMotion,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const align = $derived((props.align as MessageAlign) ?? "start");
const motion = $derived((props.motion as MessageMotion) ?? "spring");
const variant = $derived((props.variant as MessageBubbleVariant) ?? "default");
const animated = $derived(props.animated !== false);
</script>

<MessageGroup class="w-96">
	<Message align="end" animated={false}>
		<MessageContent>
			<MessageBubble variant="primary">
				Why is the dock magnifying from the wrong centre?
			</MessageBubble>
		</MessageContent>
	</Message>
	{#key `${align}-${motion}-${animated}`}
		<Message {align} {motion} {animated}>
			<MessageAvatar>A</MessageAvatar>
			<MessageContent>
				<MessageHeader>Assistant</MessageHeader>
				<MessageBubble {variant}>
					Because the item's own width grows as it magnifies, so its measured centre
					moves with it. Measure from the resting rect instead.
				</MessageBubble>
				<MessageFooter>Just now</MessageFooter>
			</MessageContent>
		</Message>
	{/key}
</MessageGroup>
