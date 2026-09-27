<script lang="ts">
import { Button, type CardValue, CreditCardInput } from "@baby-ui/svelte";

let card = $state<CardValue>({ number: "", expiry: "", cvc: "" });
let ready = $state(false);
</script>

<form class="flex flex-col gap-4">
	<CreditCardInput bind:value={card} onValueChange={(_, validity) => (ready = validity.valid)} />
	<Button type="submit" disabled={!ready}>Pay</Button>
</form>
