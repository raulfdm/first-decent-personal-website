import { domInjection } from '../helpers/decoratos/index'

export class HeaderController {

  @domInjection('.header__menu__list__item__link')
  private _elementMenuItems: JQuery<Element>

  private _clickAction: Function

	private _click(): void {
		this._elementMenuItems.click(()=>{
			setTimeout(this._clickAction, 500)
		})
	}

	set clickAction(action: Function) {
		this._clickAction = action
		this._click()
	}
}
