import type { Templates } from "../types";

export const categoricalTemplate: Templates["categorical"] = ({
	name,
	label,
	options,
	isMultiple,
	isRandom,
}) => {
	const optionsString = options
		.map((option) => {
			const { name, label, openTextbox, isExclusive } = option;
			return `\t${name} "${label}" ${openTextbox ? `other(${openTextbox.name} "" ${openTextbox.datatype === "number" ? "long" : "text"} [${openTextbox.min}..${openTextbox.max}])` : ""}${isExclusive ? "exclusive" : ""}`;
		})
		.join(",\n");

	return `${name} "${label}" 
categorical [1..${!isMultiple ? "1" : ""}]
{
${optionsString}
}${isRandom ? " ran" : ""};`;
};

