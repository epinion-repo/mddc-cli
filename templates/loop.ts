import type { Templates } from "../types";

export const loopTemplate: Templates["loop"] = ({
	name,
	label,
	subQuestions,
	options,
	isMultiple,
	isRandom,
	isReversed,
}) => {
	const subQuestionsString = subQuestions
		.map((subQuestion) => `\t${subQuestion.name} "${subQuestion.label}"`)
		.join(",\n");

	const optionsString = options
		.map((option) => {
			const { name, label, openTextbox, isExclusive } = option;

			return `\t\t${name} "${label}" ${openTextbox ? `other(${openTextbox.name} "" ${openTextbox.datatype === "long-text" ? 'style(control(type="MultiLineEdit"))' : ""} ${openTextbox.datatype === "number" ? "long" : "text"} [${openTextbox.min}..${openTextbox.max}])` : ""}${isExclusive ? "exclusive" : ""}`;
		})
		.join(",\n");

	return `${name} "${label}" 
loop 
{
${subQuestionsString}
}${isRandom ? " ran" : ""} fields (
    resp "@" categorical[1${isMultiple ? ".." : ""}] {
${optionsString}
    };
)${isReversed ? " column" : ""} expand grid;`;
};
