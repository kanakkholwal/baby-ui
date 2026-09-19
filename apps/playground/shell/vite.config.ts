import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	server: { fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
});
