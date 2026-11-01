<script lang="ts">
import { cn } from "../../lib/cn";
import { inlineEditState } from "./context";

let { class: classProp }: { class?: string } = $props();
const edit = inlineEditState("InlineEditInput");
</script>

{#if edit.editing}
	<span data-slot="inline-edit-input" class={cn(edit.styles.field(), classProp)}>
		<span aria-hidden="true" class={edit.styles.sizer()}>{`${edit.draft || edit.placeholder} `}</span>
		<!-- A textarea even for one line, so a long value wraps the way the preview did. -->
		<textarea
			{@attach (element) => {
				edit.registerInput(element);
				return () => edit.registerInput(undefined);
			}}
			bind:value={edit.draft}
			rows="1"
			cols="1"
			aria-label={edit.label}
			aria-invalid={edit.error !== null || undefined}
			aria-describedby={edit.hasMessage ? edit.messageId : undefined}
			placeholder={edit.placeholder}
			class={edit.styles.input()}
			oninput={() => edit.clearError()}
			onblur={() => edit.submit("blur")}
			onkeydown={(event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					edit.cancel();
				} else if (event.key === "Enter" && !(edit.multiline && event.shiftKey)) {
					event.preventDefault();
					edit.submit("key");
				}
			}}
		></textarea>
	</span>
{/if}
