import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const HELP = `Usage: pnpm release:cli [--dry-run] [--bump=patch|minor|major|none] [--tag=latest] [--otp=123456]

Publishes @baby-ui/cli, then create-baby-ui (which pins the CLI's exact version), from this machine.
Log in first with \`npm login\`. Same steps as the Release CLI workflow, minus provenance.

  --bump   used only when the CLI's version is already on npm; both packages move together (default patch)
  --dry-run  build, pack and \`npm publish --dry-run\`; nothing is written or published
  --tag    npm dist-tag (default latest)
  --otp    one-time password, when your npm account asks for one
`;

const ROOT = resolve(import.meta.dirname, "..");
const argv = process.argv.slice(2);
if (argv.includes("--help")) {
	console.log(HELP);
	process.exit(0);
}
const flag = (name, fallback) =>
	argv.find((a) => a.startsWith(`--${name}=`))?.split("=")[1] ?? fallback;
const dryRun = argv.includes("--dry-run");
const bump = flag("bump", "patch");
const tag = flag("tag", "latest");
const otp = flag("otp");
const DIRS = ["packages/cli", "packages/create-baby-ui"];

function run(cmd, args, cwd = ROOT, capture = false) {
	const result = spawnSync(cmd, args, {
		cwd,
		shell: process.platform === "win32",
		encoding: "utf8",
		stdio: capture ? "pipe" : "inherit",
	});
	if (!capture && result.status !== 0) {
		console.error(`\nrelease: \`${cmd} ${args.join(" ")}\` failed (${result.status}).`);
		process.exit(result.status ?? 1);
	}
	return result;
}

const manifest = (dir) =>
	JSON.parse(readFileSync(join(ROOT, dir, "package.json"), "utf8"));
const onNpm = (name, version) =>
	run("npm", ["view", `${name}@${version}`, "version"], ROOT, true).status === 0;

console.log("\n▸ Checking the npm login");
if (!dryRun) {
	const who = run("npm", ["whoami"], ROOT, true);
	if (who.status !== 0) {
		console.error("release: not logged in. Run `npm login` and try again.");
		process.exit(1);
	}
	console.log(`  logged in as ${who.stdout.trim()}`);
}

console.log("\n▸ Version");
const cli = manifest(DIRS[0]);
if (bump !== "none" && onNpm(cli.name, cli.version)) {
	if (dryRun) console.log(`  ${cli.version} is on npm; a real run would bump (${bump}).`);
	else {
		for (const dir of DIRS)
			run(
				"npm",
				["version", bump, "--no-git-tag-version", "--allow-same-version"],
				join(ROOT, dir),
				true,
			);
		console.log(`  bumped ${cli.version} to ${manifest(DIRS[0]).version}`);
	}
} else console.log(`  publishing ${cli.version} as it is`);

console.log("\n▸ Install and build");
run("pnpm", [
	"install",
	"--frozen-lockfile",
	"--filter",
	"@baby-ui/cli...",
	"--filter",
	"create-baby-ui...",
]);
run("pnpm", ["--filter", "@baby-ui/cli", "build"]);

console.log("\n▸ Test");
run("pnpm", ["--filter", "@baby-ui/cli", "test"]);

const packs = join(ROOT, ".scratchpad", "release-packs");
rmSync(packs, { recursive: true, force: true });
mkdirSync(packs, { recursive: true });
const published = [];
for (const dir of DIRS) {
	const { name, version } = manifest(dir);
	console.log(`\n▸ ${name}@${version}`);
	if (onNpm(name, version)) {
		console.log("  already on npm, skipped");
		continue;
	}
	const out = join(packs, dir.split("/").pop());
	run("pnpm", ["pack", "--pack-destination", out], join(ROOT, dir));
	const tarball = join(
		out,
		readdirSync(out).find((f) => f.endsWith(".tgz")),
	);
	const args = ["publish", tarball, "--access", "public", "--tag", tag];
	if (otp) args.push("--otp", otp);
	if (dryRun) args.push("--dry-run");
	run("npm", args);
	if (!dryRun) published.push(`${name}@${version}`);
}

if (published.length) {
	console.log(`\nPublished: ${published.join(", ")}`);
	console.log("Commit the version bump and tag it:");
	for (const release of published) console.log(`  git tag ${release}`);
	console.log("  git add packages/*/package.json && git commit -m 'chore(release): cli'");
	console.log("  git push origin main --tags");
} else
	console.log(dryRun ? "\nDry run done, nothing published." : "\nNothing to publish.");
