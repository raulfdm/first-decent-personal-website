import { ContactController, HeaderController, ScrollController, UrlController } from './controllers/index'
import { ReCaptchaService } from './services/index'
import './vendor/smooths-scroll.min.js'
import './vendor/bootConfig.js'

const contactForm = new ContactController()
const recaptcha = new ReCaptchaService(window, contactForm.sendSMTP.bind(contactForm))

$(document).ready(function () {
  const header = new HeaderController()
  const scroll = new ScrollController()

  //-> set URL event on change URI
  UrlController(window)
  //-> handle header off/on
  header.clickAction = scroll.hide.bind(scroll)
  $('.contact__form').on('submit', contactForm.submit.bind(contactForm))
})
