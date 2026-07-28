import { describe, expect, it } from "vitest";
import { searchSchema } from "@/schemas/search";

describe("searchSchema", () => {
	it("accepts a valid username", () => {
		const result = searchSchema.safeParse({ username: "octocat" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.username).toBe("octocat");
		}
	});

	it("rejects empty username", () => {
		const result = searchSchema.safeParse({ username: "   " });
		expect(result.success).toBe(false);
	});

	it("rejects invalid characters", () => {
		const result = searchSchema.safeParse({ username: "bad user!" });
		expect(result.success).toBe(false);
	});
});
