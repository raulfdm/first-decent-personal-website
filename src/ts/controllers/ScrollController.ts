import { addClass, removeClass } from '../helpers/addAndRemoveClass'
export default class ScrollController {
	private _scrollPosition: number = 0
	private _elementWindow: JQuery<Element>
	private _elementHeader: JQuery<Element>
	private _classTransparent: string = 'is-transparent'
	private _classHidden: string = 'hidden'

	constructor() {
		this._elementWindow = $(window)
		this._elementHeader = $('.header')

		this._elementWindow.scroll(this.handleScroll)
	}

	hide(): void {
		addClass(this._elementHeader, this._classHidden)
	}

	show(): void {
		removeClass(this._elementHeader, this._classHidden)
	}

	transparencyOn(): void {
		addClass(this._elementHeader, this._classTransparent)
	}

	transparencyOff(): void {
		removeClass(this._elementHeader, this._classTransparent)
	}

	handleScroll = () => {
		const actualScrollPosition = this._elementWindow.scrollTop()

		actualScrollPosition === 0 ?
			this.transparencyOn() :
			this.transparencyOff()

		actualScrollPosition < this._scrollPosition || actualScrollPosition === 0 ?
			this.show() :
			this.hide()

		this._scrollPosition = actualScrollPosition
	}
}
