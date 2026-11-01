<script lang="ts">
import { cn } from "../../lib/cn";
import { caretAt } from "../edit";
import { inlineEditState } from "./context";

let {
	as = "span",
	class: classProp,
}: {
	/** The element that holds the text, so a title can stay a heading. */
	as?: "span" | "p" | "h1" | "h2" | "h3";
	class?: string;
} = $props();
const edit = inlineEditState("InlineEditPreview");
let textEl = $state<HTMLSpanElement>();
</script>

{#if !edit.editing}
	<svelte:element this={as} data-slot="inline-edit-preview" class="my-0 -mx-1.5 min-w-0 font-[inherit] text-[length:inherit]">
		<button
			{@attach (element) => {
				edit.registerPreview(element);
				return () => edit.registerPreview(undefined);
			}}
			type="button"
			data-phase={edit.phase}
			aria-label="{edit.label}: {edit.shown || edit.placeholder}. Edit"
			class={cn(edit.styles.preview(), classProp)}
			onclick={(event) => {
				if (edit.phase === "saving") return;
				// A keyboard press selects all, ready to retype; a click puts the caret where it landed.
				edit.start(
					event.detail === 0
						? "all"
						: caretAt(textEl?.firstChild, event.clientX, event.clientY, edit.shown.length),
				);
			}}
		>
			{#key edit.shown}
				<span bind:this={textEl} class={cn(edit.styles.text(), !edit.shown && edit.styles.placeholder())}>{edit.shown || edit.placeholder}</span>
			{/key}
		</button>
	</svelte:element>
{/if}
