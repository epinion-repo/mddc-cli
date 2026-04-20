import type { Templates } from "../types";
import { categoricalTemplate } from "./categorical-template";
import { infoTemplate } from "./info-template";
import { loopTemplate } from "./loop-template";
import { textboxTemplate } from "./open-textbox-template";

export const templates: Templates = {
	info: infoTemplate,
	openTextbox: textboxTemplate,
	categorical: categoricalTemplate,
	loop: loopTemplate,
};
