import { describe, expect, it } from "bun:test";
import { isLoaded, type LoadedModel, overallState } from "../loaded-models/model";

const model = (state: LoadedModel["state"]): LoadedModel => ({
	id: state,
	name: state,
	kind: "Chat",
	state,
});

describe("loaded models", () => {
	it("counts loading and ready as in memory", () => {
		expect(isLoaded(model("loading"))).toBe(true);
		expect(isLoaded(model("ready"))).toBe(true);
		expect(isLoaded(model("idle"))).toBe(false);
	});
	it("shows the busiest state on the trigger", () => {
		expect(overallState([])).toBe("idle");
		expect(overallState([model("idle")])).toBe("idle");
		expect(overallState([model("ready"), model("idle")])).toBe("ready");
		expect(overallState([model("ready"), model("loading")])).toBe("loading");
	});
});
