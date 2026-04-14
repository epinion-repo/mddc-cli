import z from "zod";

export const questionCoreSchema = z.object({
	name: z
		.string()
		.describe(
			"Unique identifier for the question. Must follow the pattern `_N` where N is a sequential integer starting from 1 (e.g., `_1`, `_2`, `_3`).",
		),
	label: z
		.string()
		.describe(
			"The raw text of the question presented to the respondent. May include HTML tags for formatting. Must use `\n` for line breaks.",
		),
	isOptional: z
		.boolean()
		.describe(
			"Set to `true` if the respondent can skip this question without answering; `false` if an answer is required.",
		),
});