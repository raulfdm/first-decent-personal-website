(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact_1 = require("../models/Contact");
var disableEnableElements_1 = require("../helpers/disableEnableElements");
var ErrorFormController_1 = require("./ErrorFormController");
var SubmitButtonController_1 = require("./SubmitButtonController");
var ReCaptchaService_1 = require("../services/ReCaptchaService");
var MailService_1 = require("../services/MailService");
var ContactController = (function () {
    function ContactController() {
        this._errorController = new ErrorFormController_1.default();
        this._button = new SubmitButtonController_1.default();
        this._inputName = $('.js-form__name');
        this._inputSubject = $('.js-form__subject');
        this._inputMailFrom = $('.js-form__email');
        this._inputMessage = $('.js-form__message');
    }
    ContactController.prototype.getData = function () {
        return new Contact_1.default(this._inputName.val(), this._inputSubject.val(), this._inputMailFrom.val(), this._inputMessage.val());
    };
    ContactController.prototype.disableForm = function () {
        disableEnableElements_1.disable(this._inputName);
        disableEnableElements_1.disable(this._inputSubject);
        disableEnableElements_1.disable(this._inputMailFrom);
        disableEnableElements_1.disable(this._inputMessage);
        this._button.disable();
    };
    ContactController.prototype.enableForm = function () {
        disableEnableElements_1.enable(this._inputName);
        disableEnableElements_1.enable(this._inputSubject);
        disableEnableElements_1.enable(this._inputMailFrom);
        disableEnableElements_1.enable(this._inputMessage);
        this._button.enable();
    };
    ContactController.prototype.clearData = function () {
        this._inputName.val('');
        this._inputSubject.val('');
        this._inputMailFrom.val('');
        this._inputMessage.val('');
    };
    ContactController.prototype.submit = function (event) {
        event.preventDefault();
        this._errorController.cleanClass();
        var error = this.validateForm();
        error
            ? this._errorController.failure(error)
            : ReCaptchaService_1.default.execute();
    };
    ContactController.prototype.sendSMTP = function () {
        var _this = this;
        this.disableForm();
        MailService_1.default.sendEmail(this.getData().prepareToSend)
            .then(function (sucess) {
            _this.clearData();
            ReCaptchaService_1.default.reset();
            _this._errorController.success('Your message was sent successfuly');
        })
            .catch(function (err) {
            _this._errorController.failure('Something went wrong! Please, try later');
            console.log(err);
        })
            .then(function () { return _this.enableForm(); });
    };
    ContactController.prototype.validateForm = function () {
        var data = this.getData();
        var errorMessage = "";
        if (!data.name)
            errorMessage = "Name is Required!";
        else if (!data.mailFrom)
            errorMessage = "Email is Required!";
        else if (!data.subject)
            errorMessage = "Subject is Required!";
        else if (!data.message)
            errorMessage = "Message is Required!";
        return errorMessage;
    };
    ContactController.prototype.insertButton = function () {
    };
    return ContactController;
}());
exports.default = ContactController;

},{"../helpers/disableEnableElements":8,"../models/Contact":10,"../services/MailService":11,"../services/ReCaptchaService":12,"./ErrorFormController":2,"./SubmitButtonController":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorFormController = (function () {
    function ErrorFormController() {
        this._elementError = $('.contact__form__feedback-message');
    }
    ErrorFormController.prototype._addClass = function (className) {
        this._elementError.addClass(className);
    };
    ErrorFormController.prototype.cleanClass = function () {
        this._elementError.removeClass(this._classFeedback);
    };
    ErrorFormController.prototype.success = function (message) {
        this._message = message;
        this._classFeedback = 'is-success';
        this._updateMessage();
    };
    ErrorFormController.prototype.failure = function (message) {
        this._message = message;
        this._classFeedback = 'is-failure';
        this._updateMessage();
    };
    ErrorFormController.prototype._updateMessage = function () {
        this._elementError.text(this._message).addClass(this._classFeedback);
    };
    return ErrorFormController;
}());
exports.default = ErrorFormController;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HeaderController = (function () {
    function HeaderController() {
        this._elementMenuItems = $('.header__menu__list__item__link');
    }
    HeaderController.prototype._click = function () {
        var _this = this;
        this._elementMenuItems.click(function () {
            setTimeout(_this._clickAction, 500);
        });
    };
    Object.defineProperty(HeaderController.prototype, "clickAction", {
        set: function (action) {
            this._clickAction = action;
            this._click();
        },
        enumerable: true,
        configurable: true
    });
    return HeaderController;
}());
exports.default = HeaderController;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addAndRemoveClass_1 = require("../helpers/addAndRemoveClass");
var ScrollController = (function () {
    function ScrollController() {
        var _this = this;
        this._scrollPosition = 0;
        this._classTransparent = 'is-transparent';
        this._classHidden = 'hidden';
        this.handleScroll = function () {
            var actualScrollPosition = _this._elementWindow.scrollTop();
            actualScrollPosition === 0 ?
                _this.transparencyOn() :
                _this.transparencyOff();
            actualScrollPosition < _this._scrollPosition || actualScrollPosition === 0 ?
                _this.show() :
                _this.hide();
            _this._scrollPosition = actualScrollPosition;
        };
        this._elementWindow = $(window);
        this._elementHeader = $('.header');
        this._elementWindow.scroll(this.handleScroll);
    }
    ScrollController.prototype.hide = function () {
        addAndRemoveClass_1.addClass(this._elementHeader, this._classHidden);
    };
    ScrollController.prototype.show = function () {
        addAndRemoveClass_1.removeClass(this._elementHeader, this._classHidden);
    };
    ScrollController.prototype.transparencyOn = function () {
        addAndRemoveClass_1.addClass(this._elementHeader, this._classTransparent);
    };
    ScrollController.prototype.transparencyOff = function () {
        addAndRemoveClass_1.removeClass(this._elementHeader, this._classTransparent);
    };
    return ScrollController;
}());
exports.default = ScrollController;

},{"../helpers/addAndRemoveClass":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var disableEnableElements_1 = require("../helpers/disableEnableElements");
var SubmitButtonController = (function () {
    function SubmitButtonController() {
        this._inputSubmitButton = $('.js-form__submit');
    }
    SubmitButtonController.prototype.click = function (action) {
        this._inputSubmitButton.on('click', action);
    };
    SubmitButtonController.prototype.disable = function () {
        disableEnableElements_1.disable(this._inputSubmitButton);
    };
    SubmitButtonController.prototype.enable = function () {
        disableEnableElements_1.enable(this._inputSubmitButton);
    };
    return SubmitButtonController;
}());
exports.default = SubmitButtonController;

},{"../helpers/disableEnableElements":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (window) {
    var replaceURL = function () { return history.replaceState({}, null, '/'); };
    window.onhashchange = replaceURL;
};

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClass = function (element, cssClass) {
    element.addClass(cssClass);
};
exports.removeClass = function (element, cssClass) {
    element.removeClass(cssClass);
};

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable = function (element) {
    element.addClass('is-disabled').prop('disabled', true);
};
exports.enable = function (element) {
    element.removeClass('is-disabled').prop('disabled', false);
};

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContactController_1 = require("./controllers/ContactController");
var HeaderController_1 = require("./controllers/HeaderController");
var ReCaptchaService_1 = require("./services/ReCaptchaService");
var ScrollController_1 = require("./controllers/ScrollController");
var UrlController_1 = require("./controllers/UrlController");
require("./vendor/smooths-scroll.min.js");
require("./vendor/bootConfig.js");
var contactForm = new ContactController_1.default();
var recaptcha = new ReCaptchaService_1.default(window, contactForm.sendSMTP.bind(contactForm));
$(document).ready(function () {
    var header = new HeaderController_1.default();
    var scroll = new ScrollController_1.default();
    UrlController_1.default(window);
    header.clickAction = scroll.hide.bind(scroll);
    $('.contact__form').on('submit', contactForm.submit.bind(contactForm));
});

},{"./controllers/ContactController":1,"./controllers/HeaderController":3,"./controllers/ScrollController":4,"./controllers/UrlController":6,"./services/ReCaptchaService":12,"./vendor/bootConfig.js":13,"./vendor/smooths-scroll.min.js":14}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact = (function () {
    function Contact(_name, _subject, _mailFrom, _message) {
        this._name = _name;
        this._subject = _subject;
        this._mailFrom = _mailFrom;
        this._message = _message;
    }
    Object.defineProperty(Contact.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "subject", {
        get: function () {
            return this._subject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "mailFrom", {
        get: function () {
            return this._mailFrom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "prepareToSend", {
        get: function () {
            return {
                subject: this._subject,
                from: this._mailFrom,
                message: this._message,
                name: this._name
            };
        },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
exports.default = Contact;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MailService = (function () {
    function MailService() {
    }
    MailService.sendEmail = function (data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: 'https://mail-raulfdm.herokuapp.com/mail',
                method: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data)
            })
                .done(function (response) { return resolve(response); })
                .fail(function (error) { return reject(error); });
        });
    };
    return MailService;
}());
exports.default = MailService;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReCaptchaService = (function () {
    function ReCaptchaService(window, callbackAction) {
        this.callbackAction = callbackAction;
        this._siteKey = '6LfxYykUAAAAALVAFyBMLq4WD5xExENrFCk7YDam';
        this._size = 'invisible';
        window.renderReCaptcha = this.render.bind(this);
    }
    ReCaptchaService.execute = function () {
        grecaptcha.execute();
    };
    ReCaptchaService.reset = function () {
        grecaptcha.reset();
    };
    ReCaptchaService.prototype.render = function () {
        grecaptcha.render('grecaptcha', {
            'size': this._size,
            'sitekey': this._siteKey,
            'callback': this.callbackAction
        });
    };
    return ReCaptchaService;
}());
exports.default = ReCaptchaService;

},{}],13:[function(require,module,exports){
$('.home__title').typeIt({
	strings: ['Front-end Developer', 'Curious Guy',
		'Passionate About Coding'
	],
	breakLines: false,
	loop: true,
	deleteSpeed: 50,
	deleteDelay: 2000,
	loopDelay: 2000
})

$('html').smoothScroll(400)

},{}],14:[function(require,module,exports){
/*! http://mths.be/smoothscroll v1.5.2 by @mathias */
(function(a,c){var b=(function(){var d=c(a.documentElement),f=c(a.body),e;if(d.scrollTop()){return d}else{e=f.scrollTop();if(f.scrollTop(e+1).scrollTop()==e){return d}else{return f.scrollTop(e)}}}());c.fn.smoothScroll=function(d){d=~~d||400;return this.find('a[href*="#"]').click(function(f){var g=this.hash,e=c(g);if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname===this.hostname){if(e.length){f.preventDefault();b.stop().animate({scrollTop:e.offset().top},d,function(){location.hash=g})}}}).end()}}(document,jQuery));

},{}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIudHMiLCJzcmMvdHMvY29udHJvbGxlcnMvRXJyb3JGb3JtQ29udHJvbGxlci50cyIsInNyYy90cy9jb250cm9sbGVycy9IZWFkZXJDb250cm9sbGVyLnRzIiwic3JjL3RzL2NvbnRyb2xsZXJzL1Njcm9sbENvbnRyb2xsZXIudHMiLCJzcmMvdHMvY29udHJvbGxlcnMvU3VibWl0QnV0dG9uQ29udHJvbGxlci50cyIsInNyYy90cy9jb250cm9sbGVycy9VcmxDb250cm9sbGVyLnRzIiwic3JjL3RzL2hlbHBlcnMvYWRkQW5kUmVtb3ZlQ2xhc3MudHMiLCJzcmMvdHMvaGVscGVycy9kaXNhYmxlRW5hYmxlRWxlbWVudHMudHMiLCJzcmMvdHMvaW5kZXgudHMiLCJzcmMvdHMvbW9kZWxzL0NvbnRhY3QudHMiLCJzcmMvdHMvc2VydmljZXMvTWFpbFNlcnZpY2UudHMiLCJzcmMvdHMvc2VydmljZXMvUmVDYXB0Y2hhU2VydmljZS50cyIsInNyYy90cy92ZW5kb3IvYm9vdENvbmZpZy5qcyIsInNyYy90cy92ZW5kb3Ivc21vb3Rocy1zY3JvbGwubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSw2Q0FBdUM7QUFDdkMsMEVBQWtFO0FBQ2xFLDZEQUF1RDtBQUN2RCxtRUFBNkQ7QUFDN0QsaUVBQTJEO0FBQzNELHVEQUFpRDtBQUVqRDtJQVFDO1FBSFEscUJBQWdCLEdBQXdCLElBQUksNkJBQW1CLEVBQUUsQ0FBQTtRQUNqRSxZQUFPLEdBQTJCLElBQUksZ0NBQXNCLEVBQUUsQ0FBQTtRQUdyRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFD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VTtRQUhwRCxhQUFRLEdBQVcsMENBQTBDLENBQUE7UUFDN0QsVUFBSyxHQUFXLFdBQVcsQ0FBQTtRQUc1QixNQUFPLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3ZELENBQUM7SUFFTSx3QkFBTyxHQUFkO1FBQ0MsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxzQkFBSyxHQUFaO1FBQ0MsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFRCxpQ0FBTSxHQUFOO1FBQ0MsVUFBVSxDQUFDLE1BQU0sQ0FDaEIsWUFBWSxFQUNaO1lBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7U0FDL0IsQ0FDRCxDQUFBO0lBQ0YsQ0FBQztJQUVGLHVCQUFDO0FBQUQsQ0EzQkEsQUEyQkMsSUFBQTs7OztBQzdCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IENvbnRhY3QgZnJvbSAnLi4vbW9kZWxzL0NvbnRhY3QnXG5pbXBvcnQgeyBkaXNhYmxlLCBlbmFibGUgfSBmcm9tICcuLi9oZWxwZXJzL2Rpc2FibGVFbmFibGVFbGVtZW50cydcbmltcG9ydCBFcnJvckZvcm1Db250cm9sbGVyIGZyb20gJy4vRXJyb3JGb3JtQ29udHJvbGxlcidcbmltcG9ydCBTdWJtaXRCdXR0b25Db250cm9sbGVyIGZyb20gJy4vU3VibWl0QnV0dG9uQ29udHJvbGxlcidcbmltcG9ydCBSZUNhcHRjaGFTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1JlQ2FwdGNoYVNlcnZpY2UnXG5pbXBvcnQgTWFpbFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvTWFpbFNlcnZpY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3RDb250cm9sbGVyIHtcblx0cHJpdmF0ZSBfaW5wdXROYW1lOiBKUXVlcnk8RWxlbWVudD5cblx0cHJpdmF0ZSBfaW5wdXRTdWJqZWN0OiBKUXVlcnk8RWxlbWVudD5cblx0cHJpdmF0ZSBfaW5wdXRNZXNzYWdlOiBKUXVlcnk8RWxlbWVudD5cblx0cHJpdmF0ZSBfaW5wdXRNYWlsRnJvbTogSlF1ZXJ5PEVsZW1lbnQ+XG5cdHByaXZhdGUgX2Vycm9yQ29udHJvbGxlcjogRXJyb3JGb3JtQ29udHJvbGxlciA9IG5ldyBFcnJvckZvcm1Db250cm9sbGVyKClcblx0cHJpdmF0ZSBfYnV0dG9uOiBTdWJtaXRCdXR0b25Db250cm9sbGVyID0gbmV3IFN1Ym1pdEJ1dHRvbkNvbnRyb2xsZXIoKVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2lucHV0TmFtZSA9ICQoJy5qcy1mb3JtX19uYW1lJylcblx0XHR0aGlzLl9pbnB1dFN1YmplY3QgPSAkKCcuanMtZm9ybV9fc3ViamVjdCcpXG5cdFx0dGhpcy5faW5wdXRNYWlsRnJvbSA9ICQoJy5qcy1mb3JtX19lbWFpbCcpXG5cdFx0dGhpcy5faW5wdXRNZXNzYWdlID0gJCgnLmpzLWZvcm1fX21lc3NhZ2UnKVxuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IENvbnRhY3QoXG5cdFx0XHQoPHN0cmluZz50aGlzLl9pbnB1dE5hbWUudmFsKCkpLFxuXHRcdFx0KDxzdHJpbmc+dGhpcy5faW5wdXRTdWJqZWN0LnZhbCgpKSxcblx0XHRcdCg8c3RyaW5nPnRoaXMuX2lucHV0TWFpbEZyb20udmFsKCkpLFxuXHRcdFx0KDxzdHJpbmc+dGhpcy5faW5wdXRNZXNzYWdlLnZhbCgpKSxcblx0XHQpXG5cdH1cblxuXHRkaXNhYmxlRm9ybSgpIHtcblx0XHRkaXNhYmxlKHRoaXMuX2lucHV0TmFtZSlcblx0XHRkaXNhYmxlKHRoaXMuX2lucHV0U3ViamVjdClcblx0XHRkaXNhYmxlKHRoaXMuX2lucHV0TWFpbEZyb20pXG5cdFx0ZGlzYWJsZSh0aGlzLl9pbnB1dE1lc3NhZ2UpXG5cdFx0dGhpcy5fYnV0dG9uLmRpc2FibGUoKVxuXHR9XG5cblx0ZW5hYmxlRm9ybSgpIHtcblx0XHRlbmFibGUodGhpcy5faW5wdXROYW1lKVxuXHRcdGVuYWJsZSh0aGlzLl9pbnB1dFN1YmplY3QpXG5cdFx0ZW5hYmxlKHRoaXMuX2lucHV0TWFpbEZyb20pXG5cdFx0ZW5hYmxlKHRoaXMuX2lucHV0TWVzc2FnZSlcblx0XHR0aGlzLl9idXR0b24uZW5hYmxlKClcblx0fVxuXG5cdGNsZWFyRGF0YSgpIHtcblx0XHR0aGlzLl9pbnB1dE5hbWUudmFsKCcnKVxuXHRcdHRoaXMuX2lucHV0U3ViamVjdC52YWwoJycpXG5cdFx0dGhpcy5faW5wdXRNYWlsRnJvbS52YWwoJycpXG5cdFx0dGhpcy5faW5wdXRNZXNzYWdlLnZhbCgnJylcblxuXHR9XG5cblx0c3VibWl0KGV2ZW50OiBKUXVlcnkuRXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0dGhpcy5fZXJyb3JDb250cm9sbGVyLmNsZWFuQ2xhc3MoKVxuXG5cdFx0Y29uc3QgZXJyb3I6IHN0cmluZyA9IHRoaXMudmFsaWRhdGVGb3JtKClcblxuXHRcdGVycm9yXG5cdFx0XHQ/IHRoaXMuX2Vycm9yQ29udHJvbGxlci5mYWlsdXJlKGVycm9yKVxuXHRcdFx0OiBSZUNhcHRjaGFTZXJ2aWNlLmV4ZWN1dGUoKVxuXG5cdH1cblxuXHRzZW5kU01UUCgpIHtcblx0XHR0aGlzLmRpc2FibGVGb3JtKClcblxuXHRcdE1haWxTZXJ2aWNlLnNlbmRFbWFpbCh0aGlzLmdldERhdGEoKS5wcmVwYXJlVG9TZW5kKVxuXHRcdFx0LnRoZW4oKHN1Y2VzczogYW55KSA9PiB7XG5cdFx0XHRcdHRoaXMuY2xlYXJEYXRhKClcblx0XHRcdFx0UmVDYXB0Y2hhU2VydmljZS5yZXNldCgpXG5cdFx0XHRcdHRoaXMuX2Vycm9yQ29udHJvbGxlci5zdWNjZXNzKCdZb3VyIG1lc3NhZ2Ugd2FzIHNlbnQgc3VjY2Vzc2Z1bHknKVxuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcblx0XHRcdFx0dGhpcy5fZXJyb3JDb250cm9sbGVyLmZhaWx1cmUoJ1NvbWV0aGluZyB3ZW50IHdyb25nISBQbGVhc2UsIHRyeSBsYXRlcicpXG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycilcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiB0aGlzLmVuYWJsZUZvcm0oKSlcblx0fVxuXG5cdHZhbGlkYXRlRm9ybSgpOiBzdHJpbmcge1xuXHRcdGNvbnN0IGRhdGE6IENvbnRhY3QgPSB0aGlzLmdldERhdGEoKVxuXHRcdGxldCBlcnJvck1lc3NhZ2U6IHN0cmluZyA9IFwiXCJcblxuXHRcdGlmICghZGF0YS5uYW1lKVxuXHRcdFx0ZXJyb3JNZXNzYWdlID0gXCJOYW1lIGlzIFJlcXVpcmVkIVwiXG5cdFx0ZWxzZSBpZiAoIWRhdGEubWFpbEZyb20pXG5cdFx0XHRlcnJvck1lc3NhZ2UgPSBcIkVtYWlsIGlzIFJlcXVpcmVkIVwiXG5cdFx0ZWxzZSBpZiAoIWRhdGEuc3ViamVjdClcblx0XHRcdGVycm9yTWVzc2FnZSA9IFwiU3ViamVjdCBpcyBSZXF1aXJlZCFcIlxuXHRcdGVsc2UgaWYgKCFkYXRhLm1lc3NhZ2UpXG5cdFx0XHRlcnJvck1lc3NhZ2UgPSBcIk1lc3NhZ2UgaXMgUmVxdWlyZWQhXCJcblxuXHRcdHJldHVybiBlcnJvck1lc3NhZ2Vcblx0fVxuXG5cdGluc2VydEJ1dHRvbigpIHtcblxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBFcnJvckZvcm1Db250cm9sbGVyIHtcblx0cHJpdmF0ZSBfZWxlbWVudEVycm9yOiBKUXVlcnk8RWxlbWVudD5cblx0cHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nXG5cdHByaXZhdGUgX2NsYXNzRmVlZGJhY2s6IHN0cmluZ1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2VsZW1lbnRFcnJvciA9ICQoJy5jb250YWN0X19mb3JtX19mZWVkYmFjay1tZXNzYWdlJylcblx0fVxuXG5cdHByaXZhdGUgX2FkZENsYXNzKGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy5fZWxlbWVudEVycm9yLmFkZENsYXNzKGNsYXNzTmFtZSlcblx0fVxuXG5cdGNsZWFuQ2xhc3MoKTogdm9pZCB7XG5cdFx0dGhpcy5fZWxlbWVudEVycm9yLnJlbW92ZUNsYXNzKHRoaXMuX2NsYXNzRmVlZGJhY2spXG5cdH1cblxuXHRzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuX21lc3NhZ2UgPSBtZXNzYWdlXG5cdFx0dGhpcy5fY2xhc3NGZWVkYmFjayA9ICdpcy1zdWNjZXNzJ1xuXHRcdHRoaXMuX3VwZGF0ZU1lc3NhZ2UoKVxuXHR9XG5cdGZhaWx1cmUobWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0dGhpcy5fbWVzc2FnZSA9IG1lc3NhZ2Vcblx0XHR0aGlzLl9jbGFzc0ZlZWRiYWNrID0gJ2lzLWZhaWx1cmUnXG5cdFx0dGhpcy5fdXBkYXRlTWVzc2FnZSgpXG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVNZXNzYWdlKCk6IHZvaWQge1xuXHRcdHRoaXMuX2VsZW1lbnRFcnJvci50ZXh0KHRoaXMuX21lc3NhZ2UpLmFkZENsYXNzKHRoaXMuX2NsYXNzRmVlZGJhY2spXG5cdH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyQ29udHJvbGxlciB7XG5cdHByaXZhdGUgX2VsZW1lbnRNZW51SXRlbXM6IEpRdWVyeTxFbGVtZW50PlxuXHRwcml2YXRlIF9jbGlja0FjdGlvbjogRnVuY3Rpb25cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9lbGVtZW50TWVudUl0ZW1zID0gJCgnLmhlYWRlcl9fbWVudV9fbGlzdF9faXRlbV9fbGluaycpXG5cdH1cblxuXHRwcml2YXRlIF9jbGljaygpOiB2b2lkIHtcblx0XHR0aGlzLl9lbGVtZW50TWVudUl0ZW1zLmNsaWNrKCgpPT57XG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMuX2NsaWNrQWN0aW9uLCA1MDApXG5cdFx0fSlcblx0fVxuXG5cdHNldCBjbGlja0FjdGlvbihhY3Rpb246IEZ1bmN0aW9uKSB7XG5cdFx0dGhpcy5fY2xpY2tBY3Rpb24gPSBhY3Rpb25cblx0XHR0aGlzLl9jbGljaygpXG5cdH1cbn1cbiIsImltcG9ydCB7IGFkZENsYXNzLCByZW1vdmVDbGFzcyB9IGZyb20gJy4uL2hlbHBlcnMvYWRkQW5kUmVtb3ZlQ2xhc3MnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxDb250cm9sbGVyIHtcblx0cHJpdmF0ZSBfc2Nyb2xsUG9zaXRpb246IG51bWJlciA9IDBcblx0cHJpdmF0ZSBfZWxlbWVudFdpbmRvdzogSlF1ZXJ5PEVsZW1lbnQ+XG5cdHByaXZhdGUgX2VsZW1lbnRIZWFkZXI6IEpRdWVyeTxFbGVtZW50PlxuXHRwcml2YXRlIF9jbGFzc1RyYW5zcGFyZW50OiBzdHJpbmcgPSAnaXMtdHJhbnNwYXJlbnQnXG5cdHByaXZhdGUgX2NsYXNzSGlkZGVuOiBzdHJpbmcgPSAnaGlkZGVuJ1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2VsZW1lbnRXaW5kb3cgPSAkKHdpbmRvdylcblx0XHR0aGlzLl9lbGVtZW50SGVhZGVyID0gJCgnLmhlYWRlcicpXG5cblx0XHR0aGlzLl9lbGVtZW50V2luZG93LnNjcm9sbCh0aGlzLmhhbmRsZVNjcm9sbClcblx0fVxuXG5cdGhpZGUoKTogdm9pZCB7XG5cdFx0YWRkQ2xhc3ModGhpcy5fZWxlbWVudEhlYWRlciwgdGhpcy5fY2xhc3NIaWRkZW4pXG5cdH1cblxuXHRzaG93KCk6IHZvaWQge1xuXHRcdHJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRIZWFkZXIsIHRoaXMuX2NsYXNzSGlkZGVuKVxuXHR9XG5cblx0dHJhbnNwYXJlbmN5T24oKTogdm9pZCB7XG5cdFx0YWRkQ2xhc3ModGhpcy5fZWxlbWVudEhlYWRlciwgdGhpcy5fY2xhc3NUcmFuc3BhcmVudClcblx0fVxuXG5cdHRyYW5zcGFyZW5jeU9mZigpOiB2b2lkIHtcblx0XHRyZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50SGVhZGVyLCB0aGlzLl9jbGFzc1RyYW5zcGFyZW50KVxuXHR9XG5cblx0aGFuZGxlU2Nyb2xsID0gKCkgPT4ge1xuXHRcdGNvbnN0IGFjdHVhbFNjcm9sbFBvc2l0aW9uID0gdGhpcy5fZWxlbWVudFdpbmRvdy5zY3JvbGxUb3AoKVxuXG5cdFx0YWN0dWFsU2Nyb2xsUG9zaXRpb24gPT09IDAgP1xuXHRcdFx0dGhpcy50cmFuc3BhcmVuY3lPbigpIDpcblx0XHRcdHRoaXMudHJhbnNwYXJlbmN5T2ZmKClcblxuXHRcdGFjdHVhbFNjcm9sbFBvc2l0aW9uIDwgdGhpcy5fc2Nyb2xsUG9zaXRpb24gfHwgYWN0dWFsU2Nyb2xsUG9zaXRpb24gPT09IDAgP1xuXHRcdFx0dGhpcy5zaG93KCkgOlxuXHRcdFx0dGhpcy5oaWRlKClcblxuXHRcdHRoaXMuX3Njcm9sbFBvc2l0aW9uID0gYWN0dWFsU2Nyb2xsUG9zaXRpb25cblx0fVxufVxuIiwiaW1wb3J0IHsgZGlzYWJsZSwgZW5hYmxlIH0gZnJvbSAnLi4vaGVscGVycy9kaXNhYmxlRW5hYmxlRWxlbWVudHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1Ym1pdEJ1dHRvbkNvbnRyb2xsZXIge1xuXHRwcml2YXRlIF9pbnB1dFN1Ym1pdEJ1dHRvbjogSlF1ZXJ5PEVsZW1lbnQ+XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5faW5wdXRTdWJtaXRCdXR0b24gPSAkKCcuanMtZm9ybV9fc3VibWl0Jylcblx0fVxuXG5cdGNsaWNrKGFjdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcblx0XHR0aGlzLl9pbnB1dFN1Ym1pdEJ1dHRvbi5vbignY2xpY2snLCA8SlF1ZXJ5LkV2ZW50U3RhdGljPmFjdGlvbilcblx0fVxuXG5cdGRpc2FibGUoKTogdm9pZCB7XG5cdFx0ZGlzYWJsZSh0aGlzLl9pbnB1dFN1Ym1pdEJ1dHRvbilcblx0fVxuXHRlbmFibGUoKTogdm9pZCB7XG5cdFx0ZW5hYmxlKHRoaXMuX2lucHV0U3VibWl0QnV0dG9uKVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCAod2luZG93OiBXaW5kb3cpID0+IHtcblx0Y29uc3QgcmVwbGFjZVVSTCA9ICgpID0+IGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBudWxsLCAnLycpXG5cblx0d2luZG93Lm9uaGFzaGNoYW5nZSA9IHJlcGxhY2VVUkxcbn1cbiIsImV4cG9ydCBjb25zdCBhZGRDbGFzcyA9IChlbGVtZW50OiBKUXVlcnk8RWxlbWVudD4sIGNzc0NsYXNzOiBzdHJpbmcpOnZvaWQgPT4ge1xuXHRlbGVtZW50LmFkZENsYXNzKGNzc0NsYXNzKVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSAoZWxlbWVudDogSlF1ZXJ5PEVsZW1lbnQ+LCBjc3NDbGFzczogc3RyaW5nKTp2b2lkID0+IHtcblx0ZWxlbWVudC5yZW1vdmVDbGFzcyhjc3NDbGFzcylcbn1cbiIsImV4cG9ydCBjb25zdCBkaXNhYmxlID0gKGVsZW1lbnQ6SlF1ZXJ5PEVsZW1lbnQ+KTp2b2lkID0+e1xuXHRlbGVtZW50LmFkZENsYXNzKCdpcy1kaXNhYmxlZCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSlcbn1cblxuZXhwb3J0IGNvbnN0IGVuYWJsZSA9IChlbGVtZW50OkpRdWVyeTxFbGVtZW50Pik6dm9pZCA9Pntcblx0ZWxlbWVudC5yZW1vdmVDbGFzcygnaXMtZGlzYWJsZWQnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKVxufVxuIiwiaW1wb3J0IENvbnRhY3RDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXInXG5pbXBvcnQgSGVhZGVyQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL0hlYWRlckNvbnRyb2xsZXInXG5pbXBvcnQgUmVDYXB0Y2hhU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL1JlQ2FwdGNoYVNlcnZpY2UnXG5pbXBvcnQgU2Nyb2xsQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL1Njcm9sbENvbnRyb2xsZXInXG5pbXBvcnQgVXJsSGFuZGxlIGZyb20gJy4vY29udHJvbGxlcnMvVXJsQ29udHJvbGxlcidcbmltcG9ydCAnLi92ZW5kb3Ivc21vb3Rocy1zY3JvbGwubWluLmpzJ1xuaW1wb3J0ICcuL3ZlbmRvci9ib290Q29uZmlnLmpzJ1xuXG5jb25zdCBjb250YWN0Rm9ybSA9IG5ldyBDb250YWN0Q29udHJvbGxlcigpXG5jb25zdCByZWNhcHRjaGEgPSBuZXcgUmVDYXB0Y2hhU2VydmljZSh3aW5kb3csIGNvbnRhY3RGb3JtLnNlbmRTTVRQLmJpbmQoY29udGFjdEZvcm0pKVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJDb250cm9sbGVyKClcblx0Y29uc3Qgc2Nyb2xsID0gbmV3IFNjcm9sbENvbnRyb2xsZXIoKVxuXG5cdC8vLT4gc2V0IFVSTCBldmVudCBvbiBjaGFuZ2UgVVJJXG5cdFVybEhhbmRsZSh3aW5kb3cpXG5cdC8vLT4gaGFuZGxlIGhlYWRlciBvZmYvb25cblx0aGVhZGVyLmNsaWNrQWN0aW9uID0gc2Nyb2xsLmhpZGUuYmluZChzY3JvbGwpXG5cdCQoJy5jb250YWN0X19mb3JtJykub24oJ3N1Ym1pdCcsIGNvbnRhY3RGb3JtLnN1Ym1pdC5iaW5kKGNvbnRhY3RGb3JtKSlcbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0IHtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYW1lOiBzdHJpbmcsXG5cdFx0cHJpdmF0ZSBfc3ViamVjdDogc3RyaW5nLFxuXHRcdHByaXZhdGUgX21haWxGcm9tOiBzdHJpbmcsXG5cdFx0cHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nKSB7IH1cblxuXHRnZXQgbmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5fbmFtZVxuXHR9XG5cdGdldCBzdWJqZWN0KCkge1xuXHRcdHJldHVybiB0aGlzLl9zdWJqZWN0XG5cdH1cblx0Z2V0IG1haWxGcm9tKCkge1xuXHRcdHJldHVybiB0aGlzLl9tYWlsRnJvbVxuXHR9XG5cdGdldCBtZXNzYWdlKCkge1xuXHRcdHJldHVybiB0aGlzLl9tZXNzYWdlXG5cdH1cblxuXHRnZXQgcHJlcGFyZVRvU2VuZCgpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzdWJqZWN0OiB0aGlzLl9zdWJqZWN0LFxuXHRcdFx0ZnJvbTogdGhpcy5fbWFpbEZyb20sXG5cdFx0XHRtZXNzYWdlOiB0aGlzLl9tZXNzYWdlLFxuXHRcdFx0bmFtZTogdGhpcy5fbmFtZVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IENvbnRhY3QgZnJvbSAnLi4vbW9kZWxzL0NvbnRhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haWxTZXJ2aWNlIHtcblxuXHRzdGF0aWMgc2VuZEVtYWlsID0gKGRhdGE6IE9iamVjdCk6IFByb21pc2U8YW55PiA9PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdCQuYWpheCh7XG5cdFx0XHRcdHVybDogJ2h0dHBzOi8vbWFpbC1yYXVsZmRtLmhlcm9rdWFwcC5jb20vbWFpbCcsXG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuXHRcdFx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuXHRcdFx0XHRkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxuXHRcdFx0fSlcblx0XHRcdFx0LmRvbmUocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG5cdFx0XHRcdC5mYWlsKGVycm9yID0+IHJlamVjdChlcnJvcikpXG5cdFx0fSlcblxuXHR9XG59XG4iLCJkZWNsYXJlIGNvbnN0IGdyZWNhcHRjaGE6IGFueVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZUNhcHRjaGFTZXJ2aWNlIHtcblx0cHJpdmF0ZSBfc2l0ZUtleTogc3RyaW5nID0gJzZMZnhZeWtVQUFBQUFMVkFGeUJNTHE0V0Q1eEV4RU5yRkNrN1lEYW0nXG5cdHByaXZhdGUgX3NpemU6IHN0cmluZyA9ICdpbnZpc2libGUnXG5cblx0Y29uc3RydWN0b3Iod2luZG93OiBXaW5kb3csIHByaXZhdGUgY2FsbGJhY2tBY3Rpb246IEZ1bmN0aW9uKSB7XG5cdFx0KDxhbnk+d2luZG93KS5yZW5kZXJSZUNhcHRjaGEgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpXG5cdH1cblxuXHRzdGF0aWMgZXhlY3V0ZSgpIHtcblx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUoKVxuXHR9XG5cblx0c3RhdGljIHJlc2V0KCkge1xuXHRcdGdyZWNhcHRjaGEucmVzZXQoKVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGdyZWNhcHRjaGEucmVuZGVyKFxuXHRcdFx0J2dyZWNhcHRjaGEnLFxuXHRcdFx0e1xuXHRcdFx0XHQnc2l6ZSc6IHRoaXMuX3NpemUsXG5cdFx0XHRcdCdzaXRla2V5JzogdGhpcy5fc2l0ZUtleSxcblx0XHRcdFx0J2NhbGxiYWNrJzogdGhpcy5jYWxsYmFja0FjdGlvblxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG59XG4iLCIkKCcuaG9tZV9fdGl0bGUnKS50eXBlSXQoe1xuXHRzdHJpbmdzOiBbJ0Zyb250LWVuZCBEZXZlbG9wZXInLCAnQ3VyaW91cyBHdXknLFxuXHRcdCdQYXNzaW9uYXRlIEFib3V0IENvZGluZydcblx0XSxcblx0YnJlYWtMaW5lczogZmFsc2UsXG5cdGxvb3A6IHRydWUsXG5cdGRlbGV0ZVNwZWVkOiA1MCxcblx0ZGVsZXRlRGVsYXk6IDIwMDAsXG5cdGxvb3BEZWxheTogMjAwMFxufSlcblxuJCgnaHRtbCcpLnNtb290aFNjcm9sbCg0MDApXG4iLCIvKiEgaHR0cDovL210aHMuYmUvc21vb3Roc2Nyb2xsIHYxLjUuMiBieSBAbWF0aGlhcyAqL1xuKGZ1bmN0aW9uKGEsYyl7dmFyIGI9KGZ1bmN0aW9uKCl7dmFyIGQ9YyhhLmRvY3VtZW50RWxlbWVudCksZj1jKGEuYm9keSksZTtpZihkLnNjcm9sbFRvcCgpKXtyZXR1cm4gZH1lbHNle2U9Zi5zY3JvbGxUb3AoKTtpZihmLnNjcm9sbFRvcChlKzEpLnNjcm9sbFRvcCgpPT1lKXtyZXR1cm4gZH1lbHNle3JldHVybiBmLnNjcm9sbFRvcChlKX19fSgpKTtjLmZuLnNtb290aFNjcm9sbD1mdW5jdGlvbihkKXtkPX5+ZHx8NDAwO3JldHVybiB0aGlzLmZpbmQoJ2FbaHJlZio9XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oZil7dmFyIGc9dGhpcy5oYXNoLGU9YyhnKTtpZihsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJyk9PT10aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSYmbG9jYXRpb24uaG9zdG5hbWU9PT10aGlzLmhvc3RuYW1lKXtpZihlLmxlbmd0aCl7Zi5wcmV2ZW50RGVmYXVsdCgpO2Iuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDplLm9mZnNldCgpLnRvcH0sZCxmdW5jdGlvbigpe2xvY2F0aW9uLmhhc2g9Z30pfX19KS5lbmQoKX19KGRvY3VtZW50LGpRdWVyeSkpO1xuIl19
