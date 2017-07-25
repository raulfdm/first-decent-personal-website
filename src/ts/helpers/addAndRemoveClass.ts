export const addClass = (element: JQuery<Element>, cssClass: string):void => {
	element.addClass(cssClass)
}

export const removeClass = (element: JQuery<Element>, cssClass: string):void => {
	element.removeClass(cssClass)
}
