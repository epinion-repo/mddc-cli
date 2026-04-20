import type { Templates } from "../types";

export const categoricalTemplate: Templates["categorical"] = ({
	name,
	label,
	options,
	isMultiple,
	isRandom,
}) => {
	const optionsString = options
		.map(({ name, label, openTextbox, isExclusive, isFixed }) => {
			let openTextboxString = null;
			if (openTextbox) {
				const openTextboxDataTypeString = 
				openTextboxString = !openTextbox ? "" : `other(${openTextbox.name} "" `;
			}

			const dataTypeMap = {
				"single-line-text": `text[0..500]`,
				"multi-line-text": `style(control(type="MultiLineEdit")) text[0..4000]`,
				long: `long[${option.openTextbox.min}..${option.openTextbox.max}]`,
				double: "double",
			};
			return `\t${name} "${label}"${openTextbox ? ` other(${option.openTextbox.name} "" ${option.openTextbox.dataType === "" ? "long" : "text"} [${option.openTextbox.min}..${option.openTextbox.max}] )` : ""}${option.isExclusive ? " exclusive" : ""}`;
		})
		.join(",\n");

	return `${name} "${label}"\ncategorical [1..${isMultiple ? "" : "1"}]\n{\n${optionsString}\n}${isRandom ? " ran" : ""};`;
};
