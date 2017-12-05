import React from "react";
import HoneyCombComponent from "./HoneyCombComponent";

export default function HoneycombComponentGrid({ components }) {
	if (components.length) {
		let size = 3;
		let chunks = components
			.map((component, index, arr) => {
				return index % size === 0 ? arr.slice(index, index + size) : null;
			})
			.filter(c => c);
		return (
			<div className="userGrid">
				{chunks.map(function(chunk, index) {
					if (index % 2 !== 0) {
						return (
							<div className="oddGrid" key={index}>
								{chunk.map((component, id) =>
									<HoneyCombComponent component={component} key={component.id + index} />
								)}
							</div>
						);
					}
					if (index % 2 === 0) {
						return (
							<div className="evenGrid" key={index}>
								{chunk.map((component, id) =>
									<HoneyCombComponent component={component} key={component.id + index} />
								)}
							</div>
						);
					}
				})}
			</div>
		);
	} else {
		return null;
	}
}
