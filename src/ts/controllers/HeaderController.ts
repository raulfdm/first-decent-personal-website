export default class HeaderController {
	private _elementMenuItems: JQuery<Element>
	private _clickAction: Function

	constructor() {
		this._elementMenuItems = $('.header__menu__list__item__link')
	}

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
