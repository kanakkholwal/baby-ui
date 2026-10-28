<script lang="ts">
import { EmailMagicLink } from "@baby-ui/svelte";
</script>

<EmailMagicLink
	productName="Acme"
	signInUrl="https://acme.com/auth/magic?token=..."
	expiresIn="10 minutes"
	code="730 184"
	requestDetails={[{ label: "Device", value: "Chrome on macOS" }]}
	companyLines={["Acme, Inc.", "1 Main St, Springfield"]}
/>
