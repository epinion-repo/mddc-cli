import type { Templates } from "../types";

export const categoricalTemplate: Templates["categorical"] = ({
	name,
	label,
	options,
	isMultiple,
	isRandom,
}) => {
	const optionsString = options
		.map(
			(option) => `\t${option.name} "${option.label}"${option.openTextbox ? ` other(${option.openTextbox.name} "" ${option.openTextbox.dataType === "number" ? "long" : "text"} [${option.openTextbox.min}..${option.openTextbox.max}] )` : ""}${option.isExclusive ? " exclusive" : ""}`,
		)
		.join(",\n");

	return `${name} "${label}"\ncategorical [1..${!isMultiple ? "1" : ""}]\n{\n${optionsString}\n}${isRandom ? " ran" : ""};`;
};
