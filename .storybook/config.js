import { configure } from "@storybook/react";
function loadStories() {
	require("../src/index.css");
	require("../src/components/hive/HoneyCombUserComponent.story");
	require("../src/components/hive/HoneyCombUserGrid.story");
	require("../src/components/hive/HivePage.story");
	require("../src/components/nav/Navbar.story");
}

configure(loadStories, module);
