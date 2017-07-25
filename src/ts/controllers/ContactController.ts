import Contact from '../models/Contact'
import { disable, enable } from '../helpers/disableEnableElements'
import ErrorFormController from './ErrorFormController'
import SubmitButtonController from './SubmitButtonController'
import ReCaptchaService from '../services/ReCaptchaService'
import MailService from '../services/MailService'

export default class ContactController {
	private _inputName: JQuery<Element>
	private _inputSubject: JQuery<Element>
	private _inputMessage: JQuery<Element>
	private _inputMailFrom: JQuery<Element>
	private _errorController: ErrorFormController = new ErrorFormController()
	private _button: SubmitButtonController = new SubmitButtonController()

	constructor() {
		this._inputName = $('.js-form__name')
		this._inputSubject = $('.js-form__subject')
		this._inputMailFrom = $('.js-form__email')
		this._inputMessage = $('.js-form__message')
	}

	getData() {
		return new Contact(
			(<string>this._inputName.val()),
			(<string>this._inputSubject.val()),
			(<string>this._inputMailFrom.val()),
			(<string>this._inputMessage.val()),
		)
	}

	disableForm() {
		disable(this._inputName)
		disable(this._inputSubject)
		disable(this._inputMailFrom)
		disable(this._inputMessage)
		this._button.disable()
	}

	enableForm() {
		enable(this._inputName)
		enable(this._inputSubject)
		enable(this._inputMailFrom)
		enable(this._inputMessage)
		this._button.enable()
	}

	clearData() {
		this._inputName.val('')
		this._inputSubject.val('')
		this._inputMailFrom.val('')
		this._inputMessage.val('')

	}

	submit(event: JQuery.Event) {
		event.preventDefault()
		this._errorController.cleanClass()

		const error: string = this.validateForm()

		error
			? this._errorController.failure(error)
			: ReCaptchaService.execute()

	}

	sendSMTP() {
		this.disableForm()

		MailService.sendEmail(this.getData().prepareToSend)
			.then((sucess: any) => {
				this.clearData()
				ReCaptchaService.reset()
				this._errorController.success('Your message was sent successfuly')
			})
			.catch((err: any) => {
				this._errorController.failure('Something went wrong! Please, try later')
				console.log(err)
			})
			.then(() => this.enableForm())
	}

	validateForm(): string {
		const data: Contact = this.getData()
		let errorMessage: string = ""

		if (!data.name)
			errorMessage = "Name is Required!"
		else if (!data.mailFrom)
			errorMessage = "Email is Required!"
		else if (!data.subject)
			errorMessage = "Subject is Required!"
		else if (!data.message)
			errorMessage = "Message is Required!"

		return errorMessage
	}

	insertButton() {

	}
}
