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
				{chunks.map(function(chunk, index) {
					if (index % 2 !== 0) {
						return (
							<div className="oddGrid" key={index}>
								{chunk.map((user, id) => <HoneyCombUserComponent user={user} key={user.id} />)}
							</div>
						);
					}
					if (index % 2 === 0) {
						return (
							<div className="evenGrid" key={index}>
								{chunk.map((user, id) => <HoneyCombUserComponent user={user} key={user.id} />)}
							</div>
						);
					}
					return null;
				})}
			</div>
		);
	} else {
		return null;
	}
}
