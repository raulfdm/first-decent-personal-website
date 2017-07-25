export default (window: Window) => {
	const replaceURL = () => history.replaceState({}, null, '/')

	window.onhashchange = replaceURL
}
