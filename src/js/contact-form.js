$('.contact__form').on('submit', event => {
	event.preventDefault()
})

$('.contact__form__input-container__submit').on('click', function (event) {

	if (!checkButtonAndReCaptcha(this)) {
		event.preventDefault()
		return false
	}

	alert('válido')

})

const enableButton = (e) => {
	const $button = $('.contact__form__input-container__submit');

	$button.removeClass('is-disabled')
	$button.attr('data-key', e)
}

const submitContact = () => {

	const data = {
		me: "melo.raulf@gmail.com",
		name: $('.js-form__name').val(),
		subject: $('.js-form__subject').val(),
		email: 'devtesteapps@gmail.com',
		message: $('.js-form__message').val(),
		token: 'e2b8d5d2-cd2c-4b19-b292-db72965ff884'
	}

	try {
		Email.send(
			data.email,
			data.me,
			data.subject,
			`email from: ${data.email}\nMensagem: \n${data.message}`, {
				token: data.token
			}
		)
	} catch (error) {
		console.log(error)
	}

}

const checkButtonAndReCaptcha = (button) => {
	let checked = false
	if (button.dataset.key && !button.classList.value.includes('is-disabled'))
		checked = true
	return checked
}
