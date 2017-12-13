import React from "react";
import { render } from "react-dom"; // eslint-disable-line no-unused-vars
import brace from "brace"; // eslint-disable-line no-unused-vars
import AceEditor from "react-ace";
import "brace/mode/css";
import "brace/theme/twilight";

export default class CSSPanel extends React.Component {
	componentDidMount() {
		var undo_manager = this.refs.ace.editor.getSession().getUndoManager();
		undo_manager.reset();
		this.refs.ace.editor.getSession().setUndoManager(undo_manager);
		this.refs.ace.editor.setAutoScrollEditorIntoView(true);
	}

	onChange = newValue => {
		this.props.handleChange("css", newValue);
	};

	render() {
		return (
			<AceEditor
				mode="css"
				theme="twilight"
				onChange={this.onChange}
				name="aceEditor"
				editorProps={{ $blockScrolling: Infinity }}
				ref="ace"
				width="100%"
				value={this.props.css}
				onLoad={editor => {
					editor.focus();
					editor.getSession().setUseWrapMode(false);
				}}
			/>
		);
	}
}
