import z from "zod";
import { categoricalQuestionSchema } from "./categorical-question";
import { infoQuestionSchema } from "./info-question";
import { loopQuestionSchema } from "./loop-question";
import { openTextboxQuestionSchema } from "./open-textbox-question";

export const questionSchema = z.discriminatedUnion("type", [
	infoQuestionSchema,
	openTextboxQuestionSchema,
	categoricalQuestionSchema,
	loopQuestionSchema,
]);
