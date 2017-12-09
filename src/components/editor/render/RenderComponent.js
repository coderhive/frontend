import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class extends PureComponent {
	static propTypes = {
		content: PropTypes.string.isRequired,
		stylesheets: PropTypes.arrayOf(PropTypes.string)
	};

	componentDidMount() {
		this._updateIframe();
	}

	componentDidUpdate() {
		this._updateIframe();
	}

	_updateIframe() {
		const iframe = this.refs.iframe;
		const document = iframe.contentDocument;
		const head = document.getElementsByTagName("head")[0];
		document.body.innerHTML = this.props.content;
		let scriptReact = document.createElement("script");
		scriptReact.src = "https://unpkg.com/react@16/umd/react.production.min.js";
		let scriptReactDOM = document.createElement("script");
		scriptReactDOM.src = "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";
		head.appendChild(scriptReact);
		head.appendChild(scriptReactDOM);
		this.props.stylesheets.forEach(url => {
			const ref = document.createElement("link");
			ref.rel = "stylesheet";
			ref.type = "text/css";
			ref.href = url;
			head.appendChild(ref);
		});
	}

	render() {
		return <iframe ref="iframe" title="iframe" style={{ width: "400px", height: "400px" }} />;
	}
}
