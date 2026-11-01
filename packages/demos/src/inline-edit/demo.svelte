<script lang="ts">
import {
	InlineEdit,
	InlineEditArea,
	InlineEditInput,
	InlineEditMessage,
	InlineEditPreview,
	InlineEditStatus,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof InlineEdit>>(props));
// A name with "fail" in it rejects, so the rollback and Edit again can be tried.
const request = (next: string) =>
	new Promise<void>((resolve, reject) =>
		setTimeout(
			() => (/fail/i.test(next) ? reject(new Error("Rejected")) : resolve()),
			700,
		),
	);
let name = $state("Atlas redesign");
let about = $state("Checkout and account pages, rebuilt on the new components.");
</script>

<div class="flex w-full max-w-md flex-col gap-2">
	<InlineEdit
		label="Project name"
		value={name}
		placeholder="Untitled project"
		variant={p.variant}
		size={p.size}
		multiline={p.multiline}
		validate={(next) => (next ? null : "A project needs a name.")}
		onSave={async (next) => {
			await request(next);
			name = next;
		}}
	>
		<InlineEditArea>
			<InlineEditPreview as="h3" />
			<InlineEditInput />
			<InlineEditStatus />
		</InlineEditArea>
		<InlineEditMessage />
	</InlineEdit>
	<InlineEdit
		label="Description"
		value={about}
		placeholder="Add a description"
		variant="body"
		multiline
		onSave={async (next) => {
			await request(next);
			about = next;
		}}
	>
		<InlineEditArea>
			<InlineEditPreview as="p" />
			<InlineEditInput />
			<InlineEditStatus />
		</InlineEditArea>
		<InlineEditMessage />
	</InlineEdit>
</div>
