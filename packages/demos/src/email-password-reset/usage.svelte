<script lang="ts">
import { EmailPasswordReset } from "@baby-ui/svelte";
</script>

<EmailPasswordReset
	productName="Acme"
	resetUrl="https://acme.com/reset?token=..."
	expiresIn="1 hour"
	recipientEmail="ada@acme.com"
	securityUrl="https://acme.com/settings/security"
	companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
/>
