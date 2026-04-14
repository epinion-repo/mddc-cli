import z from "zod";
import { categoricalQuestionSchema } from "./categorical";
import { questionCoreSchema } from "./core";

export const loopQuestionSchema = categoricalQuestionSchema
	.omit({ type: true })
	.extend({
		type: z
			.literal("loop")
			.describe("Identifies this as a loop/grid/table question."),
		subQuestions: z
			.array(questionCoreSchema.omit({ isOptional: true }))
			.describe(
				"An array of sub-questions. Usually is the first column or the first row of the grid/table.",
			),
	})
	.describe(
		"A loop question where respondents select one or multiple options for each sub-question. The sub-questions are the rows and the options are the columns.",
	);
