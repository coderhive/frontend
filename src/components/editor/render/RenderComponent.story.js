import React from "react";
import { storiesOf } from "@storybook/react";
import RenderComponent from "./RenderComponent";

let codeString =
	"import React, { PureComponent } from 'react'; class MyComponent extends PureComponent {render() {return <div>hi</div>}}";

storiesOf("RenderComponent", module).add("Happy Path", () =>
	<RenderComponent
		content={codeString}
		stylesheets={["https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"]}
	/>
);
