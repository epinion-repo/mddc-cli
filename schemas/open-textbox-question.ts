import z from "zod";
import { baseQuestionSchema } from "./base-question";

export const openTextboxQuestionSchema = baseQuestionSchema
	.extend({
		type: z.literal("openTextbox"),

		dataType: z
			.enum(["text", "long-text", "number"])
			.describe(
				"Specifies the expected input type. Use `number` for quantitative answers (e.g., age, income). Use `text` for short text responses. Use `long-text` for long text responses (e.g., comments, feedback, multi-line).",
			),

		min: z
			.number()
			.nullable()
			.describe(
				"Minimum allowed numeric value (for `number`) or minimum character length (for `text` and `long-text`). Defaults to `0` if not provided.",
			),

		max: z
			.number()
			.nullable()
			.describe(
				"Maximum allowed numeric value (for `number`) or maximum character length (for `text` and `long-text`). Defaults: `500` for `text`, `4000` for `long-text`, `null` (no limit) for `number`.",
			),
		isOptional: z
			.boolean()
			.describe(
				"Set to `true` if the respondent can skip this question without answering; `false` if an answer is required.",
			),
	})
	.describe(
		"An open-ended question where the respondent provides a free-form answer (text or number) via a textbox.",
	);
