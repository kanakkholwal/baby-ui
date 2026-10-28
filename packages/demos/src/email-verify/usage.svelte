<script lang="ts">
import { EmailVerify } from "@baby-ui/svelte";
</script>

<EmailVerify
	productName="Acme"
	recipientEmail="ada@acme.com"
	verifyUrl="https://acme.com/verify?token=..."
	expiresIn="24 hours"
	code="482913"
	companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
/>
