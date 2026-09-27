<script lang="ts">
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	type InputGroupSize,
	InputGroupText,
	InputGroupTextarea,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as InputGroupSize) ?? "md");
let domain = $state("");
let note = $state("");
let copied = $state(false);
</script>

<div class="flex w-full max-w-sm flex-col gap-4">
	<InputGroup {size}>
		<InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
		<InputGroupInput aria-label="Domain" placeholder="acme" bind:value={domain} />
		<InputGroupAddon align="inline-end"><InputGroupText>.dev</InputGroupText></InputGroupAddon>
	</InputGroup>
	<InputGroup {size}>
		<InputGroupInput aria-label="Invite link" readonly value="https://acme.dev/join/7fk2" />
		<InputGroupAddon align="inline-end">
			<InputGroupButton onclick={() => (copied = true)}>{copied ? "Copied" : "Copy"}</InputGroupButton>
		</InputGroupAddon>
	</InputGroup>
	<InputGroup>
		<InputGroupTextarea aria-label="Release note" placeholder="What changed?" bind:value={note} rows={3} />
		<InputGroupAddon align="block-end">
			<InputGroupText class="ml-auto tabular-nums">{note.length}/280</InputGroupText>
		</InputGroupAddon>
	</InputGroup>
</div>
