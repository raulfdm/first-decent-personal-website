import ContactController from './controllers/ContactController'
import HeaderController from './controllers/HeaderController'
import ReCaptchaService from './services/ReCaptchaService'
import ScrollController from './controllers/ScrollController'
import UrlHandle from './controllers/UrlController'
import './vendor/smooths-scroll.min.js'
import './vendor/bootConfig.js'

const contactForm = new ContactController()
const recaptcha = new ReCaptchaService(window, contactForm.sendSMTP.bind(contactForm))

$(document).ready(function () {
	const header = new HeaderController()
	const scroll = new ScrollController()

	//-> set URL event on change URI
	UrlHandle(window)
	//-> handle header off/on
	header.clickAction = scroll.hide.bind(scroll)
	$('.contact__form').on('submit', contactForm.submit.bind(contactForm))
})
