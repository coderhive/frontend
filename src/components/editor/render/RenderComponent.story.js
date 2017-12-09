import React from "react";
import { storiesOf } from "@storybook/react";
import RenderComponent from "./RenderComponent";

let codeString =
	"<div className='first'><p>Hi <mark>there</mark> friend.</p><MyComponent><div>hi</div></MyComponent></div>";

storiesOf("RenderComponent", module).add("Happy Path", () =>
	<RenderComponent
		content={codeString}
		stylesheets={["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"]}
	/>
);
