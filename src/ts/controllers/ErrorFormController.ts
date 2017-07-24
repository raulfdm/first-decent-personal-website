export default class ErrorFormController {
	private _elementError: JQuery<Element>
	private _message: string
	private _classFeedback: string

	constructor() {
		this._elementError = $('.contact__form__feedback-message')
	}

	private _addClass(className: string): void {
		this._elementError.addClass(className)
	}

	cleanClass(): void {
		this._elementError.removeClass(this._classFeedback)
	}

	success(message: string): void {
		this._message = message
		this._classFeedback = 'is-success'
		this._updateMessage()
	}
	failure(message: string): void {
		this._message = message
		this._classFeedback = 'is-failure'
		this._updateMessage()
	}

	private _updateMessage(): void {
		this._elementError.text(this._message).addClass(this._classFeedback)
	}

}
