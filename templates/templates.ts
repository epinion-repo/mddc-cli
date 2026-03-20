import type { Templates } from "../types";
import { categoricalTemplate } from "./categorical";
import { infoTemplate } from "./info";
import { loopTemplate } from "./loop";
import { textboxTemplate } from "./textbox";

export const templates: Templates = {
	info: infoTemplate,
	openTextbox: textboxTemplate,
	categorical: categoricalTemplate,
	loop: loopTemplate,
};
