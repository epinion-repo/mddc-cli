import z from "zod";

export const questionCoreSchema = z.object({
	name: z
		.string()
		.describe(
			"Unique identifier for the question. Usually defined in the questionnaire. If not, must follow the pattern `QN` where N is a sequential integer starting from 1 (e.g., `Q1`, `Q2`, `Q3`).",
		),
	label: z
		.string()
		.describe(
			"The raw text of the question presented to the respondent. May include HTML tags for formatting.",
		),
	isOptional: z
		.boolean()
		.describe(
			"Set to `true` if the respondent can skip this question without answering; `false` if an answer is required.",
		),
});