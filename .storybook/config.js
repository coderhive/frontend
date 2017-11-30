import { configure } from "@storybook/react";
function loadStories() {
	require("../src/index.css");
	require("../src/components/hive/HoneyCombUserComponent.story");
	require("../src/components/hive/HoneyCombUserGrid.story");
}

configure(loadStories, module);
