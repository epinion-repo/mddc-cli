import type z from "zod";
import type { questionSchema } from "./schemas/questions";

export type Question = z.infer<typeof questionSchema>;
export type QuestionType = Question["type"];
export type Template = (question: Question) => string;
export type Templates = {
	[K in QuestionType]: (question: Extract<Question, { type: K }>) => string;
};