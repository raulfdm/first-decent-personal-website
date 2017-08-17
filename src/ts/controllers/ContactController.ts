import { Contact } from '../models/index'
import { disable, enable } from '../helpers/index'
import { ErrorFormController, SubmitButtonController, } from './index'
import { MailService, ReCaptchaService } from '../services/index'
import { domInjection } from '../helpers/decoratos/index';

export class ContactController {

  @domInjection('.js-form__name')
  private _inputName: JQuery<Element>

  @domInjection('.js-form__subject')
  private _inputSubject: JQuery<Element>

  @domInjection('.js-form__email')
  private _inputMailFrom: JQuery<Element>

  @domInjection('.js-form__message')
  private _inputMessage: JQuery<Element>

  private _errorController: ErrorFormController = new ErrorFormController()
  private _button: SubmitButtonController = new SubmitButtonController()


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

}
