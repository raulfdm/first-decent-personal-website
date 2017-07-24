export const disable = (element:JQuery<Element>):void =>{
	element.addClass('is-disabled').prop('disabled', true)
}

export const enable = (element:JQuery<Element>):void =>{
	element.removeClass('is-disabled').prop('disabled', false)
}
