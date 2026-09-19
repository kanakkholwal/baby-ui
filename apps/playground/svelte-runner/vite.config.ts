import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	// Tokens and components resolve through symlinks outside this app's root.
	server: { cors: true, fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
