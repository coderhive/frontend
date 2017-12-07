import { configure } from "@storybook/react";
function loadStories() {
	require("../src/index.css");
	require("../src/components/hive/HoneyCombUserComponent.story");
	require("../src/components/hive/HoneyCombUserGrid.story");
	require("../src/components/hive/HivePage.story");
	require("../src/components/nav/Navbar.story");
	require("../src/components/hive/HoneyCombComponent.story");
	require("../src/components/hive/HoneyCombComponentGrid.story");
	require("../src/components/login/LoginComponent.story");
	require("../src/components/login/SignupForm.story");
}

configure(loadStories, module);
