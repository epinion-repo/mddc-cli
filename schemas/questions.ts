import z from "zod";
import { categoricalQuestionSchema } from "./categorical";
import { infoQuestionSchema } from "./info";
import { loopQuestionSchema } from "./loop";
import { openTextboxQuestionSchema } from "./textbox";

export const questionSchema = z.discriminatedUnion("type", [
	infoQuestionSchema,
	openTextboxQuestionSchema,
	categoricalQuestionSchema,
	loopQuestionSchema,
]);
