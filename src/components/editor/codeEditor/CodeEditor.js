import React from "react";
import MonacoEditor from "react-monaco-editor";

// Using with webpack
export default class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: this.props.code
		};
	}

	onChange = (newValue, e) => {
		console.log("onChange", newValue, e); // eslint-disable-line no-console
	};

	editorDidMount = editor => {
		// eslint-disable-next-line no-console
		console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
		this.editor = editor;
	};

	changeEditorValue = () => {
		if (this.editor) {
			this.editor.setValue("// code changed! \n");
		}
	};

	changeBySetState = () => {
		this.setState({ code: "// code changed by setState! \n" });
	};

	render() {
		const code = this.state.code;
		const options = {
			selectOnLineNumbers: true,
			roundedSelection: false,
			readOnly: false,
			cursorStyle: "line",
			automaticLayout: false
		};
		return (
			<div>
				<div>
					<button onClick={this.changeEditorValue}>Change value</button>
					<button onClick={this.changeBySetState}>Change by setState</button>
				</div>
				<hr />
				<MonacoEditor
					height="500"
					language="javascript"
					value={code}
					options={options}
					onChange={this.onChange}
					editorDidMount={this.editorDidMount}
				/>
			</div>
		);
	}
}
