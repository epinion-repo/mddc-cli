import z from "zod";
import { questionCoreSchema } from "./core";

export const infoQuestionSchema = questionCoreSchema
	.omit({ isOptional: true })
	.extend({
		type: z
			.literal("info")
			.describe("Identifies this as an informational question."),
	})
	.describe(
		"A non-interactive informational question block. Displays text/HTML content to the respondent without accepting any input.",
	);
