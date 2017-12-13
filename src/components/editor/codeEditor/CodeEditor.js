import React from "react";
import { render } from "react-dom"; // eslint-disable-line no-unused-vars
import brace from "brace"; // eslint-disable-line no-unused-vars
import AceEditor from "react-ace";
import "brace/mode/jsx";
import "brace/theme/twilight";

export default class CodeEditor extends React.Component {
	componentDidMount() {
		var undo_manager = this.refs.ace.editor.getSession().getUndoManager();
		undo_manager.reset();
		this.refs.ace.editor.getSession().setUndoManager(undo_manager);
		this.refs.ace.editor.setAutoScrollEditorIntoView(false);
	}

	onChange = newValue => {
		if (this.props.owner === this.props.authenticatedId) {
			this.props.handleChange("jsx", newValue);
		}
	};

	render() {
		return (
			<AceEditor
				mode="jsx"
				theme="twilight"
				onChange={this.onChange}
				name="aceEditor"
				editorProps={{ $blockScrolling: Infinity }}
				ref="ace"
				width="100%"
				value={this.props.code}
				onLoad={editor => {
					editor.focus();
					editor.getSession().setUseWrapMode(false);
				}}
			/>
		);
	}
}
