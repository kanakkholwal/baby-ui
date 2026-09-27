<script lang="ts">
import { EmailReceipt } from "@baby-ui/svelte";
</script>

<EmailReceipt
	productName="Acme"
	receiptNumber="INV-1042"
	date="Sep 27, 2026"
	items={[{ label: "Pro plan, monthly", value: "$24.00" }]}
	total="$24.00"
	paymentMethod="Visa ending 4242"
	companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
/>
