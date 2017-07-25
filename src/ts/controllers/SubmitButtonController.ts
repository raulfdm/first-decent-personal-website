import { disable, enable } from '../helpers/disableEnableElements'

export default class SubmitButtonController {
	private _inputSubmitButton: JQuery<Element>

	constructor() {
		this._inputSubmitButton = $('.js-form__submit')
	}

	click(action: Function): void {
		this._inputSubmitButton.on('click', <JQuery.EventStatic>action)
	}

	disable(): void {
		disable(this._inputSubmitButton)
	}
	enable(): void {
		enable(this._inputSubmitButton)
	}
}
