export function getParams(key) {
	console.log(window.location.search);
	const params = new URLSearchParams(window.location.search);
	return params.get(key);
}