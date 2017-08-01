import { domInjection } from '../helpers/decoratos/index'

export class ErrorFormController {

  @domInjection('.contact__form__feedback-message')
  private _elementError: JQuery<Element>
  private _message: string
  private _classFeedback: string

  private _addClass(className: string): void {
    this._elementError.addClass(className)
  }

  private _updateMessage(): void {
    this._elementError.text(this._message).addClass(this._classFeedback)
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


}
