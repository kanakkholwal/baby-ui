import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	// Tokens and components resolve through symlinks outside this app's root.
	server: { cors: true, fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
