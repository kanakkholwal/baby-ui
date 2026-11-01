"use client";

import {
	type StreamingSource,
	StreamingText,
	StreamingTextContent,
	StreamingTextCopy,
	StreamingTextFollowUps,
	StreamingTextFooter,
	StreamingTextSources,
} from "@baby-ui/react";

export function Example({
	answer,
	sources,
	ask,
}: {
	answer: string;
	sources: StreamingSource[];
	ask: (text: string) => void;
}) {
	return (
		<StreamingText sources={sources}>
			<StreamingTextContent content={answer} />
			<StreamingTextFooter>
				<StreamingTextCopy />
				<StreamingTextSources />
			</StreamingTextFooter>
			<StreamingTextFollowUps items={["Tell me more"]} onSelect={ask} />
		</StreamingText>
	);
}
