export default (() => {
	console.log('notWorking')
	const _window: JQuery<Element> = $('window')
	_window.on('hashchange', () => history.replaceState({}, null, '/'))
})()
