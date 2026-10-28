"use client";

import {
	Message,
	MessageAvatar,
	MessageBubble,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function MessageDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Message>>(props);
	const pBubble = controlProps<ComponentProps<typeof MessageBubble>>(props);
	const align = p.align ?? "start";
	const motion = p.motion ?? "spring";
	const animated = p.animated ?? true;
	return (
		<MessageGroup className="w-full max-w-96">
			<Message align="end" animated={false}>
				<MessageContent>
					<MessageBubble variant="primary">
						Why is the dock magnifying from the wrong centre?
					</MessageBubble>
				</MessageContent>
			</Message>
			<Message
				key={`${align}-${motion}-${animated}`}
				align={align}
				motion={motion}
				animated={animated}
			>
				<MessageAvatar>A</MessageAvatar>
				<MessageContent>
					<MessageHeader>Assistant</MessageHeader>
					<MessageBubble variant={pBubble.variant ?? "default"}>
						Because the item&apos;s own width grows as it magnifies, so its measured
						centre moves with it. Measure from the resting rect instead.
					</MessageBubble>
					<MessageFooter>Just now</MessageFooter>
				</MessageContent>
			</Message>
		</MessageGroup>
	);
}
