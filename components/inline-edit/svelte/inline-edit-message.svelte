<script lang="ts">
import { cn } from "../../lib/cn";
import { inlineEditState } from "./context";

let {
	failedText = "Couldn't save.",
	retryText = "Edit again",
	class: classProp,
}: {
	/** Shown when the save rejected and the text rolled back. */
	failedText?: string;
	retryText?: string;
	class?: string;
} = $props();
const edit = inlineEditState("InlineEditMessage");
</script>

{#if edit.error !== null}
	<span id={edit.messageId} data-slot="inline-edit-message" role="alert" data-tone="error" class={cn(edit.styles.message(), classProp)}>{edit.error}</span>
{:else if edit.phase === "failed"}
	<span id={edit.messageId} data-slot="inline-edit-message" role="status" data-tone="failed" class={cn(edit.styles.message(), classProp)}>
		{failedText}
		{#if edit.failed !== null}
			{@const draft = edit.failed}
			<button type="button" class={edit.styles.retry()} onclick={() => edit.start(draft.length, draft)}>{retryText}</button>
		{/if}
	</span>
{/if}
