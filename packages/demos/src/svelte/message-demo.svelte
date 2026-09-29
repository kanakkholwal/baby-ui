<script lang="ts">
import {
	Message,
	MessageAvatar,
	MessageBubble,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const pMessage = $derived(controlProps<ComponentProps<typeof Message>>(props));
const pBubble = $derived(controlProps<ComponentProps<typeof MessageBubble>>(props));

const align = $derived(pMessage.align ?? "start");
const motion = $derived(pMessage.motion ?? "spring");
const variant = $derived(pBubble.variant ?? "default");
const animated = $derived(props.animated !== false);
</script>

<MessageGroup class="w-full max-w-96">
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
