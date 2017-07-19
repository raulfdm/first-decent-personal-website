;
(() => {
	emailjs.init("user_XDedmoeMTu9Eyl0FxOlTJ")
	const $buttonSubmit = $('.js-form__submit')

	const sendEmail = () => {}

	const callReCaptcha = event => {
		//grecaptcha.execute();
		getFormValues()
	}

	const getFormValues = () => {
		let error = ""

		const data = {
			name: $('.js-form__name').val(),
			subject: $('.js-form__subject').val(),
			message: $('.js-form__message').val(),
			mailFrom: $('.js-form__email').val()
		}

		hasErrorsInForm(data)
			.then(s => handleFeedbackMessage(true))
			.catch(e => handleFeedbackMessage(false,e))

	}

	const hasErrorsInForm = data => {
		return new Promise((resolve, reject) => {
			let errorMessage = " is required"
			let invalidProp = ""

			if (!data.name)
				invalidProp = "Name"
			else if (!data.mailFrom)
				invalidProp = "Email"
			else if (!data.subject)
				invalidProp = "Subject"
			else if (!data.message)
				invalidProp = "Message"

			invalidProp ? reject(invalidProp + errorMessage) : resolve(true)

		})
	}

	const handleFeedbackMessage = function(isPostive, errorMessage = "") {
		if(!isPostive && (arguments.length !== 2 || errorMessage === ""))
			throw new Error('Number of Arguments Invalid or error message not passed! Please, if you send "false", you must need to send second argument(error message)')

		const $feedbackElement = $('.contact__form__feedback-message')


		if (isPostive) {
			$feedbackElement.text('Message sent successfuly!').addClass('is-success')
		}else{
			$feedbackElement.text('*'+errorMessage).addClass('is-failure')
		}
	}

	const formControl = {
		fields: {
			name: $('.js-form__name'),
			subject: $('.js-form__subject'),
			message: $('.js-form__message'),
			mailFrom: $('.js-form__email')
		},
		getData(){
			return Object.getOwnPropertyNames(this.fields).reduce((result, actual) => {
				console.log(result,actual)
				return result[actual] = this.fields[actual]
			},{})
		}
	}

	const handleButtonState = () => {

	}

	$buttonSubmit.on('click', callReCaptcha)
	$('.contact__form').on('submit', e => e.preventDefault())

	console.log(formControl.getData())
})()
