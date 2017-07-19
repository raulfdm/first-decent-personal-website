;
(() => {
	emailjs.init("user_XDedmoeMTu9Eyl0FxOlTJ")

	const sendEmail = () => {
		return new Promise((resolve, reject) => {
			let a = 10
			if (a == 10) {
				resolve(true)
			} else {
				reject(false)
			}
		})
	}

	const callReCaptcha = () => {
		grecaptcha.execute()
	}

	const handleContactForm = () => {
		let error = ""

		const data = handleFormState.getData()

		new Promise((resolve, reject) => {
			hasErrorsInForm(data)
				.then(data => {
					callReCaptcha()
					lockForm()
					sendEmail(data)
				})
				.then(success => resolve(handleFeedbackMessage.success()))
				.then(() => handleFormState.clearData())
				.catch(e => handleFeedbackMessage.failure(e))
				.then(() => unlockForm())
		})

	}

	const lockForm = () => {
		handleButtonState.disable()
		handleFormState.disable()
	}

	const unlockForm = () => {
		handleButtonState.enable()
		handleFormState.enable()
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

			invalidProp ? reject(invalidProp + errorMessage) : resolve(data)

		})
	}

	const handleFeedbackMessage = {
		$feedbackElement: $('.contact__form__feedback-message'),
		failure(errorMessage = "") {
			if (!errorMessage)
				throw new Error('You must inform an error message')
			this.$feedbackElement.text('*' + errorMessage).addClass('is-failure')
		},
		success() {
			this.$feedbackElement.text('Message sent successfuly!').addClass(
				'is-success')
		},
		clean() {
			this.$feedbackElement.removeClass('is-failure').removeClass('is-success')
		}
	}

	const handleFormState = {
		fields: {
			name: $('.js-form__name'),
			subject: $('.js-form__subject'),
			message: $('.js-form__message'),
			mailFrom: $('.js-form__email')
		},
		getData() {
			return Object.getOwnPropertyNames(this.fields).reduce((result, fieldKey) => {
				result[fieldKey] = this.fields[fieldKey].val()
				return result
			}, {})
		},
		disable() {
			Object.getOwnPropertyNames(this.fields).map(fieldKey => this.fields[
				fieldKey].attr('disabled', true).addClass('is-disabled'))
		},
		enable() {
			Object.getOwnPropertyNames(this.fields).map(fieldKey => this.fields[
				fieldKey].attr('disabled', false).removeClass('is-disabled'))
		},
		clearData() {
			Object.getOwnPropertyNames(this.fields).map(fieldKey => this.fields[
				fieldKey].val(''))
		}
	}

	const handleButtonState = {
		$buttonElement: $('.js-form__submit'),
		clickEvent(action) {
			this.$buttonElement.on('click', action)
		},
		disable() {
			this.$buttonElement.addClass('is-disabled').attr('disabled', true)
		},
		enable() {
			this.$buttonElement.removeClass('is-disabled').attr('disabled', false)
		}
	}

	handleButtonState.clickEvent(handleContactForm)

	$('.contact__form').on('submit', e => e.preventDefault())

})()
