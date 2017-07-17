const submitContact = e => {
	alert('oi')
	console.log(e)
	/* const data = {
		me: "melo.raulf@gmail.com",
		name: ,
		subject: ,
		email: 'devtesteapps@gmail.com',
		.val(),
		token: 'e2b8d5d2-cd2c-4b19-b292-db72965ff884'
	} */

	/* 	try {
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
	 */
}

const confirma = (e) => {
	e.preventDefault()
	if (confirm('tem certeza?')) {
		debugger;
		grecaptcha.execute()
	} else {
		alert('nao')
	}

}

function onSubmit(token) {
	alert('thanks ' + document.getElementById('field').value);
}

const getFieldValues = () => {
	return {
		name: $('.js-form__name').val(),
		subject: $('.js-form__subject').val(),
		message: $('.js-form__message').val(),
		mailFrom: $('.js-form__email').val()
	}
}

document.querySelector('.js-form__submit').addEventListener('click', confirma)

function onLoad(e) {
	console.log(e)
}
