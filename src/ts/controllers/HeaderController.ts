export default class HeaderController {
	private _elementMenuItems: JQuery<Element>

	constructor() {
		this._elementMenuItems = $('.header__menu__list__item__link')
	}

	click(action: Function): void {
		setTimeout(action, 500)
	}
}
