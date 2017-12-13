import React from "react";
import { render } from "react-dom";
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/twilight";

function onChange(newValue) {
	console.log("change", newValue);
}

export default class CodeEditor extends React.Component {
	render() {
		return (
			<AceEditor
				mode="javascript"
				theme="twilight"
				onChange={onChange}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{ $blockScrolling: true }}
				className="aceEditor"
			/>
		);
	}
}
