import z from "zod";
import { baseQuestionSchema } from "./base-question";

export const infoQuestionSchema = baseQuestionSchema
	.extend({ type: z.literal("info") })
	.describe(
		"A non-interactive informational question block. Displays text/HTML content to the respondent without accepting any input.",
	);
