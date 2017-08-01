import { disable, enable } from '../helpers/disableEnableElements'
import { domInjection } from "../helpers/decoratos/index";

export class SubmitButtonController {

  @domInjection('.js-form__submit')
  private _inputSubmitButton: JQuery<Element>

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
