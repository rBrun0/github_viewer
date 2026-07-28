import { describe, expect, it } from "vitest";
import { colorDictionary } from "@/lib/color-dictionary";
import { pastelFromText } from "@/lib/pastel-from-text";

describe("pastelFromText", () => {
	it("uses known color from dictionary (case-insensitive)", () => {
		const known = colorDictionary.typescript;
		expect(known).toBeDefined();

		const colors = pastelFromText("TypeScript");
		expect(colors.backgroundColor).toContain(known);
		expect(colors.color).toContain(known);
	});

	it("returns stable hash colors for unknown text", () => {
		const a = pastelFromText("SomeUnknownLang");
		const b = pastelFromText("someunknownlang");
		expect(a).toEqual(b);
		expect(a.backgroundColor).toContain("oklch");
	});
});
