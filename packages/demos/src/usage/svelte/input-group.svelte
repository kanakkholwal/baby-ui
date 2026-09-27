<script lang="ts">
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@baby-ui/svelte";

let domain = $state("");
</script>

<InputGroup>
	<InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
	<InputGroupInput aria-label="Domain" placeholder="acme" bind:value={domain} />
	<InputGroupAddon align="inline-end">
		<InputGroupButton>Check</InputGroupButton>
	</InputGroupAddon>
</InputGroup>
