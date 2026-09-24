import { tv, type VariantProps } from "tailwind-variants";

export const typewriter = tv({
	slots: {
		root: "relative",
		text: "whitespace-pre-wrap",
		caret: "typewriter-caret",
		srOnly: "sr-only",
	},
	variants: {
		cursor: {
			bar: {
				caret: "ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-current",
			},
			block: {
				caret:
					"ml-px inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-current/70",
			},
			none: { caret: "hidden" },
		},
	},
	defaultVariants: { cursor: "bar" },
});

export type TypewriterCursor = NonNullable<VariantProps<typeof typewriter>["cursor"]>;

const WRONG_CHARS = "!@#$%^&*()QWERTY";

export type TypewriterStep = { text: string; wait: number };

/** Seeded so a string always types the same way, on the server and the client. */
function random(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Every frame of one typing pass: typos appear and get corrected before the right key. */
export function typewriterSteps(text: string, seed = 0): TypewriterStep[] {
	const rand = random(seed + text.length * 7919);
	const wrong = () => WRONG_CHARS[Math.floor(rand() * WRONG_CHARS.length)] ?? "";
	const steps: TypewriterStep[] = [{ text: "", wait: 500 }];
	let typed = "";
	for (const char of text) {
		if (char !== " " && rand() > 0.6) {
			steps.push({ text: typed + wrong(), wait: 100 + rand() * 150 });
			steps.push({ text: typed, wait: 80 });
			if (rand() > 0.5) {
				steps.push({ text: typed + wrong(), wait: 120 });
				steps.push({ text: typed, wait: 80 });
			}
			typed += char;
			steps.push({ text: typed, wait: 50 + rand() * 100 });
		} else {
			typed += char;
			steps.push({ text: typed, wait: 40 + rand() * 80 });
		}
	}
	return steps;
}
