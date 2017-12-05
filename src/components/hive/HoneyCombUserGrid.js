import React from "react";
import HoneyCombUserComponent from "./HoneyCombUserComponent";

export default function HoneyCombUserGrid({ users, history }) {
	if (users.length) {
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
								{chunk.map((user, id) =>
									<HoneyCombUserComponent user={user} key={user.id + index} history={history} />
								)}
							</div>
						);
					}
					if (index % 2 === 0) {
						return (
							<div className="evenGrid" key={index}>
								{chunk.map((user, id) =>
									<HoneyCombUserComponent user={user} key={user.id + index} history={history} />
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
