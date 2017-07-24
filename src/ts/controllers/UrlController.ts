export default class UrlController{
	private _window: JQuery<Element>
	constructor(){
		this._window = $('window')

		this._window.on('hashchange',this.handleURL)
	}

	handleURL():void{
		history.replaceState({}, null, '/')
	}
}
