import type { Templates } from "../types";

export const loopTemplate: Templates["loop"] = ({
	name,
	label,
	subQuestions,
	options,
	isMultiple,
	isRandom,
}) => {
	const subQuestionsString = subQuestions
		.map((subQuestion) => `\t${subQuestion.name} "${subQuestion.label}"`)
		.join(",\n");

	const optionsString = options
		.map(
			(option) =>
				`\t\t${option.name} "${option.label}"${option.openTextbox ? ` other(${option.openTextbox.name} "" ${option.openTextbox.dataType === "long-text" ? 'style(control(type="MultiLineEdit"))' : ""}${option.openTextbox.dataType === "number" ? " long" : " text"} [${option.openTextbox.min}..${option.openTextbox.max}] )` : ""}${option.isExclusive ? " exclusive" : ""}`,
		)
		.join(",\n");

	return `${name} "${label}" loop\n{\n${subQuestionsString}\n}${isRandom ? " ran" : ""} fields\n(\n\tresp "@"\n\tcategorical [1]\n\t{\n${optionsString}\n\t};\n\n) expand grid;`;
};
