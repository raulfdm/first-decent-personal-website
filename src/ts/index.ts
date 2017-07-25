import ContactController from './controllers/ContactController'
import ScrollController from './controllers/ScrollController'
import HeaderController from './controllers/HeaderController'
import './controllers/UrlController'
import './vendor/email.min.js'
import './vendor/smooths-scroll.min.js'
import './vendor/bootConfig.js'

$(document).ready(function () {
	const contactForm = new ContactController()
	const header = new HeaderController()
	const scroll = new ScrollController()

	header.clickAction = scroll.hide.bind(scroll)


	$('.contact__form').on('submit', contactForm.submit.bind(contactForm))
})
