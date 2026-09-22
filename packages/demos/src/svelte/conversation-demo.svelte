<script lang="ts">
import {
	CodeBlock,
	Conversation,
	ConversationContent,
	ConversationScrollButton,
	Message,
	Reasoning,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const INLINE_CODE =
	"rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs";
const USER_BUBBLE = "rounded-xl bg-input text-foreground";
</script>

<div
	class="w-96 rounded-xl border border-border bg-card/40 p-2"
	style="height: {(props.maxHeight as string) || '22rem'}"
>
	<Conversation class="h-full">
		<ConversationContent>
			<Message align="end" tone="raw" layout="compact" bubbleClass={USER_BUBBLE}>
				Investigate why checkout latency rose after 14:00 UTC. Focus on the latest
				release and give me a safe mitigation.
			</Message>

			<Reasoning duration={4.8}>Compared traces with the release timeline</Reasoning>

			<div class="flex flex-col gap-3 text-sm leading-relaxed">
				<h3 class="font-heading font-semibold text-base text-foreground">What changed</h3>
				<p class="text-muted-foreground">
					The latency increase starts in <code class={INLINE_CODE}>POST /checkout</code> immediately
					after release <code class={INLINE_CODE}>web-2418</code>.
				</p>
				<ul class="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
					<li>Address validation added <strong class="text-foreground">430 ms</strong> at p95.</li>
					<li>The provider timed out for 8% of non-US requests.</li>
					<li>Database and inventory spans stayed within baseline.</li>
				</ul>
				<blockquote class="border-border border-l-2 pl-3 text-muted-foreground">
					Roll back the synchronous validation call, then keep the rule behind the existing
					review queue.
				</blockquote>
			</div>

			<Message align="end" tone="raw" layout="compact" bubbleClass={USER_BUBBLE}>
				Show me the smallest rollback and how to verify it.
			</Message>

			<p class="text-foreground text-sm">Use the targeted flag first:</p>

			<CodeBlock
				language="ts"
				code={"await flags.disable('checkout.address-verification');\nawait assertLatencyBelow('checkout', { p95: 300 });"}
			/>
		</ConversationContent>
		<ConversationScrollButton />
	</Conversation>
</div>
