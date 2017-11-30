import React from "react";
import HoneyCombUserComponent from "./HoneyCombUserComponent";

export default function HoneyCombUserGrid({ users }) {
	if (users) {
		let size = 3;
		let chunks = users
			.map((user, index, arr) => {
				return index % size === 0 ? arr.slice(index, index + size) : null;
			})
			.filter(u => u);
		return (
			<div className="userGrid">
				{chunks.map((chunk, index) => {
					if (index % 2 !== 0) {
						return (
							<div className="oddGrid">
								{chunk.map((user, id) => <HoneyCombUserComponent user={user} id={(index, id)} />)}
							</div>
						);
					}
					if (index % 2 === 0) {
						return (
							<div className="evenGrid">
								{chunk.map((user, id) => <HoneyCombUserComponent user={user} id={(index, id)} />)}
							</div>
						);
					}
				})}
			</div>
		);
	}
}
