<script lang="ts">
import { tick, untrack } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { type ApprovalArgs, formatArgs, parseArgs } from "../approval-core";
import Section from "./approval-gate-section.svelte";
import { approvalGateState } from "./context";

let { onEdit }: { onEdit?: (args: ApprovalArgs) => void } = $props();

const ctx = approvalGateState("ApprovalGateEditor");
let draft = $state("");
const parsed = $derived(parseArgs(draft));
let editorEl = $state<HTMLTextAreaElement | null>(null);

$effect(() => {
	if (ctx.status !== "editing") return;
	untrack(() => {
		draft = formatArgs(ctx.request.args);
		void tick().then(() => editorEl?.focus());
	});
});
</script>

<!-- A JSON editor for the arguments, open while `status` is "editing"; `onEdit` gets a parsed object. -->
<Section open={ctx.status === "editing"}>
	<div class={ctx.styles.stack()}>
		<label for="{ctx.id}-editor" class="sr-only">{ctx.labels.args}</label>
		<textarea
			bind:this={editorEl}
			id="{ctx.id}-editor"
			bind:value={draft}
			spellcheck={false}
			aria-invalid={!parsed.ok}
			aria-describedby={parsed.ok ? undefined : `${ctx.id}-error`}
			class={ctx.styles.editor()}
		></textarea>
		{#if !parsed.ok}
			<p id="{ctx.id}-error" class={ctx.styles.error()}>
				{ctx.labels.invalidArgs}{parsed.line ? ` ${ctx.labels.line} ${parsed.line}.` : ""}
			</p>
		{/if}
		<div class={ctx.styles.actions()}>
			<Button
				size="sm"
				disabled={!parsed.ok}
				loading={ctx.busy}
				onclick={() => {
					if (parsed.ok && !ctx.busy) onEdit?.(parsed.args);
				}}
			>
				{ctx.labels.save}
			</Button>
			<Button size="sm" variant="ghost" onclick={() => ctx.onEditingChange?.(false)}>
				{ctx.labels.cancel}
			</Button>
		</div>
	</div>
</Section>
