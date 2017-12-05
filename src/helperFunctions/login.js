export default function login({ email, password }, baseUrl) {
	console.log(baseUrl);
	return fetch(`${baseUrl}/token/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email, password })
	})
		.then(response => response.json())
		.catch(error => console.log(error));
}
