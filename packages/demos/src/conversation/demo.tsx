"use client";

import {
	CodeBlock,
	Conversation,
	ConversationContent,
	ConversationScrollButton,
	Message,
	MessageBubble,
	MessageContent,
	Reasoning,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

const INLINE_CODE =
	"rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs";
const USER_BUBBLE = "rounded-xl bg-input text-foreground px-4 py-2.5";

export function ConversationDemo({ props }: { props: Props }) {
	return (
		<div
			className="w-full max-w-96 rounded-xl border border-border bg-card/40 p-2"
			style={{ height: typeof props.maxHeight === "string" ? props.maxHeight : "22rem" }}
		>
			<Conversation className="h-full">
				<ConversationContent>
					<Message align="end" animated={false}>
						<MessageContent>
							<MessageBubble variant="ghost" className={USER_BUBBLE}>
								Investigate why checkout latency rose after 14:00 UTC. Focus on the latest
								release and give me a safe mitigation.
							</MessageBubble>
						</MessageContent>
					</Message>

					<Reasoning duration={4.8}>Compared traces with the release timeline</Reasoning>

					<div className="flex flex-col gap-3 text-sm leading-relaxed">
						<h3 className="font-heading font-semibold text-base text-foreground">
							What changed
						</h3>
						<p className="text-muted-foreground">
							The latency increase starts in{" "}
							<code className={INLINE_CODE}>POST /checkout</code> immediately after
							release <code className={INLINE_CODE}>web-2418</code>.
						</p>
						<ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
							<li>
								Address validation added{" "}
								<strong className="text-foreground">430 ms</strong> at p95.
							</li>
							<li>The provider timed out for 8% of non-US requests.</li>
							<li>Database and inventory spans stayed within baseline.</li>
						</ul>
						<blockquote className="border-border border-l-2 pl-3 text-muted-foreground">
							Roll back the synchronous validation call, then keep the rule behind the
							existing review queue.
						</blockquote>
					</div>

					<Message align="end" animated={false}>
						<MessageContent>
							<MessageBubble variant="ghost" className={USER_BUBBLE}>
								Show me the smallest rollback and how to verify it.
							</MessageBubble>
						</MessageContent>
					</Message>

					<p className="text-foreground text-sm">Use the targeted flag first:</p>

					<CodeBlock
						language="ts"
						code={
							"await flags.disable('checkout.address-verification');\nawait assertLatencyBelow('checkout', { p95: 300 });"
						}
					/>
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</div>
	);
}
