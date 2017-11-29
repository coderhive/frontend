import { configure } from "@storybook/react";
function loadStories() {
	require("../src/index.css");
	require("../src/components/hive/HoneycombUserComponent.story");
}

configure(loadStories, module);
