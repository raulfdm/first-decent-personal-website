(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../models/index");
var index_2 = require("../helpers/index");
var index_3 = require("./index");
var index_4 = require("../services/index");
var index_5 = require("../helpers/decoratos/index");
var ContactController = (function () {
    function ContactController() {
        this._errorController = new index_3.ErrorFormController();
        this._button = new index_3.SubmitButtonController();
    }
    ContactController.prototype.getData = function () {
        return new index_1.Contact(this._inputName.val(), this._inputSubject.val(), this._inputMailFrom.val(), this._inputMessage.val());
    };
    ContactController.prototype.disableForm = function () {
        index_2.disable(this._inputName);
        index_2.disable(this._inputSubject);
        index_2.disable(this._inputMailFrom);
        index_2.disable(this._inputMessage);
        this._button.disable();
    };
    ContactController.prototype.enableForm = function () {
        index_2.enable(this._inputName);
        index_2.enable(this._inputSubject);
        index_2.enable(this._inputMailFrom);
        index_2.enable(this._inputMessage);
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
            : index_4.ReCaptchaService.execute();
    };
    ContactController.prototype.sendSMTP = function () {
        var _this = this;
        this.disableForm();
        index_4.MailService.sendEmail(this.getData().prepareToSend)
            .then(function (sucess) {
            _this.clearData();
            index_4.ReCaptchaService.reset();
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
    __decorate([
        index_5.domInjection('.js-form__name')
    ], ContactController.prototype, "_inputName", void 0);
    __decorate([
        index_5.domInjection('.js-form__subject')
    ], ContactController.prototype, "_inputSubject", void 0);
    __decorate([
        index_5.domInjection('.js-form__email')
    ], ContactController.prototype, "_inputMailFrom", void 0);
    __decorate([
        index_5.domInjection('.js-form__message')
    ], ContactController.prototype, "_inputMessage", void 0);
    return ContactController;
}());
exports.ContactController = ContactController;

},{"../helpers/decoratos/index":10,"../helpers/index":12,"../models/index":15,"../services/index":18,"./index":7}],2:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../helpers/decoratos/index");
var ErrorFormController = (function () {
    function ErrorFormController() {
    }
    ErrorFormController.prototype._addClass = function (className) {
        this._elementError.addClass(className);
    };
    ErrorFormController.prototype._updateMessage = function () {
        this._elementError.text(this._message).addClass(this._classFeedback);
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
    __decorate([
        index_1.domInjection('.contact__form__feedback-message')
    ], ErrorFormController.prototype, "_elementError", void 0);
    return ErrorFormController;
}());
exports.ErrorFormController = ErrorFormController;

},{"../helpers/decoratos/index":10}],3:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../helpers/decoratos/index");
var HeaderController = (function () {
    function HeaderController() {
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
    __decorate([
        index_1.domInjection('.header__menu__list__item__link')
    ], HeaderController.prototype, "_elementMenuItems", void 0);
    return HeaderController;
}());
exports.HeaderController = HeaderController;

},{"../helpers/decoratos/index":10}],4:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var addAndRemoveClass_1 = require("../helpers/addAndRemoveClass");
var index_1 = require("../helpers/decoratos/index");
var ScrollController = (function () {
    function ScrollController() {
        var _this = this;
        this._scrollPosition = 0;
        this._classTransparent = 'is-transparent';
        this._classHidden = 'hidden';
        this.handleScroll = function () {
            var actualScrollPosition = _this._elementWindow.scrollTop() || 0;
            actualScrollPosition === 0 ?
                _this.transparencyOn() :
                _this.transparencyOff();
            actualScrollPosition < _this._scrollPosition || actualScrollPosition === 0 ?
                _this.show() :
                _this.hide();
            _this._scrollPosition = actualScrollPosition;
        };
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
    __decorate([
        index_1.domInjection(window)
    ], ScrollController.prototype, "_elementWindow", void 0);
    __decorate([
        index_1.domInjection('.header')
    ], ScrollController.prototype, "_elementHeader", void 0);
    return ScrollController;
}());
exports.ScrollController = ScrollController;

},{"../helpers/addAndRemoveClass":8,"../helpers/decoratos/index":10}],5:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var disableEnableElements_1 = require("../helpers/disableEnableElements");
var index_1 = require("../helpers/decoratos/index");
var SubmitButtonController = (function () {
    function SubmitButtonController() {
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
    __decorate([
        index_1.domInjection('.js-form__submit')
    ], SubmitButtonController.prototype, "_inputSubmitButton", void 0);
    return SubmitButtonController;
}());
exports.SubmitButtonController = SubmitButtonController;

},{"../helpers/decoratos/index":10,"../helpers/disableEnableElements":11}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = function (window) {
    var replaceURL = function () { return history.replaceState({}, "", '/'); };
    window.onhashchange = replaceURL;
};

},{}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ErrorFormController"));
__export(require("./ContactController"));
__export(require("./HeaderController"));
__export(require("./ScrollController"));
__export(require("./SubmitButtonController"));
__export(require("./UrlController"));

},{"./ContactController":1,"./ErrorFormController":2,"./HeaderController":3,"./ScrollController":4,"./SubmitButtonController":5,"./UrlController":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClass = function (element, cssClass) {
    element.addClass(cssClass);
};
exports.removeClass = function (element, cssClass) {
    element.removeClass(cssClass);
};

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function domInjection(selector) {
    return function (target, key) {
        var element;
        var getter = function () {
            if (!element) {
                element = $(selector);
            }
            return element;
        };
        Object.defineProperty(target, key, {
            get: getter
        });
    };
}
exports.domInjection = domInjection;

},{}],10:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./domInject"));

},{"./domInject":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disable = function (element) {
    element.addClass('is-disabled').prop('disabled', true);
};
exports.enable = function (element) {
    element.removeClass('is-disabled').prop('disabled', false);
};

},{}],12:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./addAndRemoveClass"));
__export(require("./disableEnableElements"));

},{"./addAndRemoveClass":8,"./disableEnableElements":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./controllers/index");
var index_2 = require("./services/index");
require("./vendor/smooths-scroll.min.js");
require("./vendor/bootConfig.js");
var contactForm = new index_1.ContactController();
var recaptcha = new index_2.ReCaptchaService(window, contactForm.sendSMTP.bind(contactForm));
$(document).ready(function () {
    var header = new index_1.HeaderController();
    var scroll = new index_1.ScrollController();
    index_1.UrlController(window);
    header.clickAction = scroll.hide.bind(scroll);
    $('.contact__form').on('submit', contactForm.submit.bind(contactForm));
});

},{"./controllers/index":7,"./services/index":18,"./vendor/bootConfig.js":19,"./vendor/smooths-scroll.min.js":20}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact = (function () {
    function Contact(name, subject, mailFrom, message) {
        this.name = name;
        this.subject = subject;
        this.mailFrom = mailFrom;
        this.message = message;
    }
    Object.defineProperty(Contact.prototype, "prepareToSend", {
        get: function () {
            return {
                subject: this.subject,
                from: this.mailFrom,
                message: this.message,
                name: this.name
            };
        },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
exports.Contact = Contact;

},{}],15:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./Contact"));

},{"./Contact":14}],16:[function(require,module,exports){
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
exports.MailService = MailService;

},{}],17:[function(require,module,exports){
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
exports.ReCaptchaService = ReCaptchaService;

},{}],18:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./MailService"));
__export(require("./ReCaptchaService"));

},{"./MailService":16,"./ReCaptchaService":17}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
/*! http://mths.be/smoothscroll v1.5.2 by @mathias */
(function(a,c){var b=(function(){var d=c(a.documentElement),f=c(a.body),e;if(d.scrollTop()){return d}else{e=f.scrollTop();if(f.scrollTop(e+1).scrollTop()==e){return d}else{return f.scrollTop(e)}}}());c.fn.smoothScroll=function(d){d=~~d||400;return this.find('a[href*="#"]').click(function(f){var g=this.hash,e=c(g);if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname===this.hostname){if(e.length){f.preventDefault();b.stop().animate({scrollTop:e.offset().top},d,function(){location.hash=g})}}}).end()}}(document,jQuery));

},{}]},{},[13])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIudHMiLCJzcmMvdHMvY29udHJvbGxlcnMvRXJyb3JGb3JtQ29udHJvbGxlci50cyIsInNyYy90cy9jb250cm9sbGVycy9IZWFkZXJDb250cm9sbGVyLnRzIiwic3JjL3RzL2NvbnRyb2xsZXJzL1Njcm9sbENvbnRyb2xsZXIudHMiLCJzcmMvdHMvY29udHJvbGxlcnMvU3VibWl0QnV0dG9uQ29udHJvbGxlci50cyIsInNyYy90cy9jb250cm9sbGVycy9VcmxDb250cm9sbGVyLnRzIiwic3JjL3RzL2NvbnRyb2xsZXJzL2luZGV4LnRzIiwic3JjL3RzL2hlbHBlcnMvYWRkQW5kUmVtb3ZlQ2xhc3MudHMiLCJzcmMvdHMvaGVscGVycy9kZWNvcmF0b3MvZG9tSW5qZWN0LnRzIiwic3JjL3RzL2hlbHBlcnMvZGVjb3JhdG9zL2luZGV4LnRzIiwic3JjL3RzL2hlbHBlcnMvZGlzYWJsZUVuYWJsZUVsZW1lbnRzLnRzIiwic3JjL3RzL2hlbHBlcnMvaW5kZXgudHMiLCJzcmMvdHMvaW5kZXgudHMiLCJzcmMvdHMvbW9kZWxzL0NvbnRhY3QudHMiLCJzcmMvdHMvbW9kZWxzL2luZGV4LnRzIiwic3JjL3RzL3NlcnZpY2VzL01haWxTZXJ2aWNlLnRzIiwic3JjL3RzL3NlcnZpY2VzL1JlQ2FwdGNoYVNlcnZpY2UudHMiLCJzcmMvdHMvc2VydmljZXMvaW5kZXgudHMiLCJzcmMvdHMvdmVuZG9yL2Jvb3RDb25maWcuanMiLCJzcmMvdHMvdmVuZG9yL3Ntb290aHMtc2Nyb2xsLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUEseUNBQXlDO0FBQ3pDLDBDQUFrRDtBQUNsRCxpQ0FBc0U7QUFDdEUsMkNBQWlFO0FBQ2pFLG9EQUEwRDtBQUUxRDtJQUFBO1FBY1UscUJBQWdCLEdBQXdCLElBQUks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O0FBQ0E7O0FDWkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IENvbnRhY3QgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnXG5pbXBvcnQgeyBkaXNhYmxlLCBlbmFibGUgfSBmcm9tICcuLi9oZWxwZXJzL2luZGV4J1xuaW1wb3J0IHsgRXJyb3JGb3JtQ29udHJvbGxlciwgU3VibWl0QnV0dG9uQ29udHJvbGxlciwgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgTWFpbFNlcnZpY2UsIFJlQ2FwdGNoYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9pbmRleCdcbmltcG9ydCB7IGRvbUluamVjdGlvbiB9IGZyb20gJy4uL2hlbHBlcnMvZGVjb3JhdG9zL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIENvbnRhY3RDb250cm9sbGVyIHtcblxuICBAZG9tSW5qZWN0aW9uKCcuanMtZm9ybV9fbmFtZScpXG4gIHByaXZhdGUgX2lucHV0TmFtZTogSlF1ZXJ5PEVsZW1lbnQ+XG5cbiAgQGRvbUluamVjdGlvbignLmpzLWZvcm1fX3N1YmplY3QnKVxuICBwcml2YXRlIF9pbnB1dFN1YmplY3Q6IEpRdWVyeTxFbGVtZW50PlxuXG4gIEBkb21JbmplY3Rpb24oJy5qcy1mb3JtX19lbWFpbCcpXG4gIHByaXZhdGUgX2lucHV0TWFpbEZyb206IEpRdWVyeTxFbGVtZW50PlxuXG4gIEBkb21JbmplY3Rpb24oJy5qcy1mb3JtX19tZXNzYWdlJylcbiAgcHJpdmF0ZSBfaW5wdXRNZXNzYWdlOiBKUXVlcnk8RWxlbWVudD5cblxuICBwcml2YXRlIF9lcnJvckNvbnRyb2xsZXI6IEVycm9yRm9ybUNvbnRyb2xsZXIgPSBuZXcgRXJyb3JGb3JtQ29udHJvbGxlcigpXG4gIHByaXZhdGUgX2J1dHRvbjogU3VibWl0QnV0dG9uQ29udHJvbGxlciA9IG5ldyBTdWJtaXRCdXR0b25Db250cm9sbGVyKClcblxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIG5ldyBDb250YWN0KFxuICAgICAgKDxzdHJpbmc+dGhpcy5faW5wdXROYW1lLnZhbCgpKSxcbiAgICAgICg8c3RyaW5nPnRoaXMuX2lucHV0U3ViamVjdC52YWwoKSksXG4gICAgICAoPHN0cmluZz50aGlzLl9pbnB1dE1haWxGcm9tLnZhbCgpKSxcbiAgICAgICg8c3RyaW5nPnRoaXMuX2lucHV0TWVzc2FnZS52YWwoKSksXG4gICAgKVxuICB9XG5cbiAgZGlzYWJsZUZvcm0oKSB7XG4gICAgZGlzYWJsZSh0aGlzLl9pbnB1dE5hbWUpXG4gICAgZGlzYWJsZSh0aGlzLl9pbnB1dFN1YmplY3QpXG4gICAgZGlzYWJsZSh0aGlzLl9pbnB1dE1haWxGcm9tKVxuICAgIGRpc2FibGUodGhpcy5faW5wdXRNZXNzYWdlKVxuICAgIHRoaXMuX2J1dHRvbi5kaXNhYmxlKClcbiAgfVxuXG4gIGVuYWJsZUZvcm0oKSB7XG4gICAgZW5hYmxlKHRoaXMuX2lucHV0TmFtZSlcbiAgICBlbmFibGUodGhpcy5faW5wdXRTdWJqZWN0KVxuICAgIGVuYWJsZSh0aGlzLl9pbnB1dE1haWxGcm9tKVxuICAgIGVuYWJsZSh0aGlzLl9pbnB1dE1lc3NhZ2UpXG4gICAgdGhpcy5fYnV0dG9uLmVuYWJsZSgpXG4gIH1cblxuICBjbGVhckRhdGEoKSB7XG4gICAgdGhpcy5faW5wdXROYW1lLnZhbCgnJylcbiAgICB0aGlzLl9pbnB1dFN1YmplY3QudmFsKCcnKVxuICAgIHRoaXMuX2lucHV0TWFpbEZyb20udmFsKCcnKVxuICAgIHRoaXMuX2lucHV0TWVzc2FnZS52YWwoJycpXG5cbiAgfVxuXG4gIHN1Ym1pdChldmVudDogSlF1ZXJ5LkV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMuX2Vycm9yQ29udHJvbGxlci5jbGVhbkNsYXNzKClcblxuICAgIGNvbnN0IGVycm9yOiBzdHJpbmcgPSB0aGlzLnZhbGlkYXRlRm9ybSgpXG5cbiAgICBlcnJvclxuICAgICAgPyB0aGlzLl9lcnJvckNvbnRyb2xsZXIuZmFpbHVyZShlcnJvcilcbiAgICAgIDogUmVDYXB0Y2hhU2VydmljZS5leGVjdXRlKClcblxuICB9XG5cbiAgc2VuZFNNVFAoKSB7XG4gICAgdGhpcy5kaXNhYmxlRm9ybSgpXG5cbiAgICBNYWlsU2VydmljZS5zZW5kRW1haWwodGhpcy5nZXREYXRhKCkucHJlcGFyZVRvU2VuZClcbiAgICAgIC50aGVuKChzdWNlc3M6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyRGF0YSgpXG4gICAgICAgIFJlQ2FwdGNoYVNlcnZpY2UucmVzZXQoKVxuICAgICAgICB0aGlzLl9lcnJvckNvbnRyb2xsZXIuc3VjY2VzcygnWW91ciBtZXNzYWdlIHdhcyBzZW50IHN1Y2Nlc3NmdWx5JylcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuX2Vycm9yQ29udHJvbGxlci5mYWlsdXJlKCdTb21ldGhpbmcgd2VudCB3cm9uZyEgUGxlYXNlLCB0cnkgbGF0ZXInKVxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5lbmFibGVGb3JtKCkpXG4gIH1cblxuICB2YWxpZGF0ZUZvcm0oKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRhOiBDb250YWN0ID0gdGhpcy5nZXREYXRhKClcbiAgICBsZXQgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSBcIlwiXG5cbiAgICBpZiAoIWRhdGEubmFtZSlcbiAgICAgIGVycm9yTWVzc2FnZSA9IFwiTmFtZSBpcyBSZXF1aXJlZCFcIlxuICAgIGVsc2UgaWYgKCFkYXRhLm1haWxGcm9tKVxuICAgICAgZXJyb3JNZXNzYWdlID0gXCJFbWFpbCBpcyBSZXF1aXJlZCFcIlxuICAgIGVsc2UgaWYgKCFkYXRhLnN1YmplY3QpXG4gICAgICBlcnJvck1lc3NhZ2UgPSBcIlN1YmplY3QgaXMgUmVxdWlyZWQhXCJcbiAgICBlbHNlIGlmICghZGF0YS5tZXNzYWdlKVxuICAgICAgZXJyb3JNZXNzYWdlID0gXCJNZXNzYWdlIGlzIFJlcXVpcmVkIVwiXG5cbiAgICByZXR1cm4gZXJyb3JNZXNzYWdlXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgZG9tSW5qZWN0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9kZWNvcmF0b3MvaW5kZXgnXG5cbmV4cG9ydCBjbGFzcyBFcnJvckZvcm1Db250cm9sbGVyIHtcblxuICBAZG9tSW5qZWN0aW9uKCcuY29udGFjdF9fZm9ybV9fZmVlZGJhY2stbWVzc2FnZScpXG4gIHByaXZhdGUgX2VsZW1lbnRFcnJvcjogSlF1ZXJ5PEVsZW1lbnQ+XG4gIHByaXZhdGUgX21lc3NhZ2U6IHN0cmluZ1xuICBwcml2YXRlIF9jbGFzc0ZlZWRiYWNrOiBzdHJpbmdcblxuICBwcml2YXRlIF9hZGRDbGFzcyhjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRFcnJvci5hZGRDbGFzcyhjbGFzc05hbWUpXG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVNZXNzYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRFcnJvci50ZXh0KHRoaXMuX21lc3NhZ2UpLmFkZENsYXNzKHRoaXMuX2NsYXNzRmVlZGJhY2spXG4gIH1cblxuICBjbGVhbkNsYXNzKCk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnRFcnJvci5yZW1vdmVDbGFzcyh0aGlzLl9jbGFzc0ZlZWRiYWNrKVxuICB9XG5cbiAgc3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMuX2NsYXNzRmVlZGJhY2sgPSAnaXMtc3VjY2VzcydcbiAgICB0aGlzLl91cGRhdGVNZXNzYWdlKClcbiAgfVxuICBmYWlsdXJlKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX21lc3NhZ2UgPSBtZXNzYWdlXG4gICAgdGhpcy5fY2xhc3NGZWVkYmFjayA9ICdpcy1mYWlsdXJlJ1xuICAgIHRoaXMuX3VwZGF0ZU1lc3NhZ2UoKVxuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgZG9tSW5qZWN0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9kZWNvcmF0b3MvaW5kZXgnXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb250cm9sbGVyIHtcblxuICBAZG9tSW5qZWN0aW9uKCcuaGVhZGVyX19tZW51X19saXN0X19pdGVtX19saW5rJylcbiAgcHJpdmF0ZSBfZWxlbWVudE1lbnVJdGVtczogSlF1ZXJ5PEVsZW1lbnQ+XG5cbiAgcHJpdmF0ZSBfY2xpY2tBY3Rpb246IEZ1bmN0aW9uXG5cblx0cHJpdmF0ZSBfY2xpY2soKTogdm9pZCB7XG5cdFx0dGhpcy5fZWxlbWVudE1lbnVJdGVtcy5jbGljaygoKT0+e1xuXHRcdFx0c2V0VGltZW91dCh0aGlzLl9jbGlja0FjdGlvbiwgNTAwKVxuXHRcdH0pXG5cdH1cblxuXHRzZXQgY2xpY2tBY3Rpb24oYWN0aW9uOiBGdW5jdGlvbikge1xuXHRcdHRoaXMuX2NsaWNrQWN0aW9uID0gYWN0aW9uXG5cdFx0dGhpcy5fY2xpY2soKVxuXHR9XG59XG4iLCJpbXBvcnQgeyBhZGRDbGFzcywgcmVtb3ZlQ2xhc3MgfSBmcm9tICcuLi9oZWxwZXJzL2FkZEFuZFJlbW92ZUNsYXNzJ1xuaW1wb3J0IHsgZG9tSW5qZWN0aW9uIH0gZnJvbSAnLi4vaGVscGVycy9kZWNvcmF0b3MvaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgU2Nyb2xsQ29udHJvbGxlciB7XG5cbiAgQGRvbUluamVjdGlvbih3aW5kb3cpXG4gIHByaXZhdGUgX2VsZW1lbnRXaW5kb3c6IEpRdWVyeTxFbGVtZW50PlxuXG4gIEBkb21JbmplY3Rpb24oJy5oZWFkZXInKVxuXHRwcml2YXRlIF9lbGVtZW50SGVhZGVyOiBKUXVlcnk8RWxlbWVudD5cblxuXHRwcml2YXRlIF9zY3JvbGxQb3NpdGlvbjogbnVtYmVyID0gMFxuICBwcml2YXRlIF9jbGFzc1RyYW5zcGFyZW50OiBzdHJpbmcgPSAnaXMtdHJhbnNwYXJlbnQnXG5cdHByaXZhdGUgX2NsYXNzSGlkZGVuOiBzdHJpbmcgPSAnaGlkZGVuJ1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2VsZW1lbnRXaW5kb3cuc2Nyb2xsKHRoaXMuaGFuZGxlU2Nyb2xsKVxuXHR9XG5cblx0aGlkZSgpOiB2b2lkIHtcblx0XHRhZGRDbGFzcyh0aGlzLl9lbGVtZW50SGVhZGVyLCB0aGlzLl9jbGFzc0hpZGRlbilcblx0fVxuXG5cdHNob3coKTogdm9pZCB7XG5cdFx0cmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudEhlYWRlciwgdGhpcy5fY2xhc3NIaWRkZW4pXG5cdH1cblxuXHR0cmFuc3BhcmVuY3lPbigpOiB2b2lkIHtcblx0XHRhZGRDbGFzcyh0aGlzLl9lbGVtZW50SGVhZGVyLCB0aGlzLl9jbGFzc1RyYW5zcGFyZW50KVxuXHR9XG5cblx0dHJhbnNwYXJlbmN5T2ZmKCk6IHZvaWQge1xuXHRcdHJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnRIZWFkZXIsIHRoaXMuX2NsYXNzVHJhbnNwYXJlbnQpXG5cdH1cblxuXHRoYW5kbGVTY3JvbGwgPSAoKSA9PiB7XG5cdFx0Y29uc3QgYWN0dWFsU2Nyb2xsUG9zaXRpb24gPSB0aGlzLl9lbGVtZW50V2luZG93LnNjcm9sbFRvcCgpIHx8IDBcblxuXHRcdGFjdHVhbFNjcm9sbFBvc2l0aW9uID09PSAwID9cblx0XHRcdHRoaXMudHJhbnNwYXJlbmN5T24oKSA6XG5cdFx0XHR0aGlzLnRyYW5zcGFyZW5jeU9mZigpXG5cblx0XHRhY3R1YWxTY3JvbGxQb3NpdGlvbiA8IHRoaXMuX3Njcm9sbFBvc2l0aW9uIHx8IGFjdHVhbFNjcm9sbFBvc2l0aW9uID09PSAwID9cblx0XHRcdHRoaXMuc2hvdygpIDpcblx0XHRcdHRoaXMuaGlkZSgpXG5cblx0XHR0aGlzLl9zY3JvbGxQb3NpdGlvbiA9IGFjdHVhbFNjcm9sbFBvc2l0aW9uXG5cdH1cbn1cbiIsImltcG9ydCB7IGRpc2FibGUsIGVuYWJsZSB9IGZyb20gJy4uL2hlbHBlcnMvZGlzYWJsZUVuYWJsZUVsZW1lbnRzJ1xuaW1wb3J0IHsgZG9tSW5qZWN0aW9uIH0gZnJvbSBcIi4uL2hlbHBlcnMvZGVjb3JhdG9zL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJtaXRCdXR0b25Db250cm9sbGVyIHtcblxuICBAZG9tSW5qZWN0aW9uKCcuanMtZm9ybV9fc3VibWl0JylcbiAgcHJpdmF0ZSBfaW5wdXRTdWJtaXRCdXR0b246IEpRdWVyeTxFbGVtZW50PlxuXG4gIGNsaWNrKGFjdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dFN1Ym1pdEJ1dHRvbi5vbignY2xpY2snLCA8SlF1ZXJ5LkV2ZW50U3RhdGljPmFjdGlvbilcbiAgfVxuXG4gIGRpc2FibGUoKTogdm9pZCB7XG4gICAgZGlzYWJsZSh0aGlzLl9pbnB1dFN1Ym1pdEJ1dHRvbilcbiAgfVxuICBlbmFibGUoKTogdm9pZCB7XG4gICAgZW5hYmxlKHRoaXMuX2lucHV0U3VibWl0QnV0dG9uKVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgVXJsQ29udHJvbGxlciA9ICh3aW5kb3c6IFdpbmRvdykgPT4ge1xuICBjb25zdCByZXBsYWNlVVJMID0gKCkgPT4gaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIFwiXCIsICcvJylcblxuICB3aW5kb3cub25oYXNoY2hhbmdlID0gcmVwbGFjZVVSTFxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9FcnJvckZvcm1Db250cm9sbGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9Db250YWN0Q29udHJvbGxlcidcbmV4cG9ydCAqIGZyb20gJy4vSGVhZGVyQ29udHJvbGxlcidcbmV4cG9ydCAqIGZyb20gJy4vU2Nyb2xsQ29udHJvbGxlcidcbmV4cG9ydCAqIGZyb20gJy4vU3VibWl0QnV0dG9uQ29udHJvbGxlcidcbmV4cG9ydCAqIGZyb20gJy4vVXJsQ29udHJvbGxlcidcbiIsImV4cG9ydCBjb25zdCBhZGRDbGFzcyA9IChlbGVtZW50OiBKUXVlcnk8RWxlbWVudD4sIGNzc0NsYXNzOiBzdHJpbmcpOnZvaWQgPT4ge1xuXHRlbGVtZW50LmFkZENsYXNzKGNzc0NsYXNzKVxufVxuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSAoZWxlbWVudDogSlF1ZXJ5PEVsZW1lbnQ+LCBjc3NDbGFzczogc3RyaW5nKTp2b2lkID0+IHtcblx0ZWxlbWVudC5yZW1vdmVDbGFzcyhjc3NDbGFzcylcbn1cbiIsIi8vY3JlYXRpbmcgYSBkZWN0b3JhdGlvbiB0byBkbyBMYXp5IGxvYWRpbmdcbmV4cG9ydCBmdW5jdGlvbiBkb21JbmplY3Rpb24oc2VsZWN0b3I6IHN0cmluZyB8IFdpbmRvdykge1xuXG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgLypcbiAgICAgIHdlIG11c3QgcmV0dXJuIGEgZnVuY3Rpb25cbiAgICAgIFRoaXMgZnVuY3Rpb24gcmVjZWl2ZXMgMiBwYXJhbWV0ZXJzOlxuICAgICAgICAxLiB0YXJnZXQ6IHdpbGwgYmUgdGhlIFwidGhpc1wiIGNvbnRleHQgZnJvbSB3aG8gYXJlIGJlZW4gZGVjb3JhdGVkXG4gICAgICAgIDIuIGtleTogd2lsbCBiZSB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcbiAgICAgKi9cbiAgICBsZXQgZWxlbWVudDogSlF1ZXJ5XG5cbiAgICAvKlxuICAgICAgSGVyZSB3ZSd2ZSBjcmVhdGVkIGdldHRlciBmdW5jdGlvbiB3aG8gd2lsbCBjaGVjayBpZlxuICAgICAgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBmaWxsZWQuIElmIG5vdCwgd2UnbGwgZG8gaXQgcmVxdWlyaW5nIGl0IGZyb20gRE9NIHRyZWUuXG4gICAgICBUaGVuLCB3ZSdsbCByZXR1cm4gdGhpcyBlbGVtZW50XG4gICAgKi9cbiAgICBjb25zdCBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudCA9ICQoc2VsZWN0b3IpXG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudFxuICAgIH1cblxuICAgIC8qXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGFrZXMgYW4gb2JqZWN0IHRvIGluc2VydCBhIG5ldyBwcm9wZXJ0eSB2YWx1ZWQgb24gaXQuXG4gICAgICBUaGUga2V5IHdpbGwgYmUgdGhlIG5hbWUgb2YgdGhpcyBwcm9wZXJ0eSwgYW5kIGluIGl0IHZhbHVlIHdpbGwgYmUgYSBnZXQgZnVuY3Rpb24gdGhhdFxuICAgICAgd2UnbGwgcGFzcyBvdXIgZ2V0dGVyIGZ1bmN0aW9uLlxuICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7XG4gICAgICBnZXQ6IGdldHRlclxuICAgIH0pXG5cbiAgICAvKlxuICAgICAgRG9pbmcgdGhhdCwgd2hlbiB3ZSB3b3VsZCB1c2UgY29uc3VsdCB0aGUgcHJvcGVydHkgaW4gaXQgbG9jYWwsIHdpbGwgY2FsbCBhIGdldCBtZXRob2RcbiAgICAgIHdobyB3aWxsIGludm9rZSBvdXIgZnVuY3Rpb24gdG8gbG9vayBhdCBET00gYW5kIHJldHVybiB0aGUgZWxlbWVudFxuICAgICovXG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vZG9tSW5qZWN0J1xuIiwiZXhwb3J0IGNvbnN0IGRpc2FibGUgPSAoZWxlbWVudDpKUXVlcnk8RWxlbWVudD4pOnZvaWQgPT57XG5cdGVsZW1lbnQuYWRkQ2xhc3MoJ2lzLWRpc2FibGVkJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKVxufVxuXG5leHBvcnQgY29uc3QgZW5hYmxlID0gKGVsZW1lbnQ6SlF1ZXJ5PEVsZW1lbnQ+KTp2b2lkID0+e1xuXHRlbGVtZW50LnJlbW92ZUNsYXNzKCdpcy1kaXNhYmxlZCcpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpXG59XG4iLCJleHBvcnQgKiBmcm9tICcuL2FkZEFuZFJlbW92ZUNsYXNzJ1xuZXhwb3J0ICogZnJvbSAnLi9kaXNhYmxlRW5hYmxlRWxlbWVudHMnXG4iLCJpbXBvcnQgeyBDb250YWN0Q29udHJvbGxlciwgSGVhZGVyQ29udHJvbGxlciwgU2Nyb2xsQ29udHJvbGxlciwgVXJsQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcnMvaW5kZXgnXG5pbXBvcnQgeyBSZUNhcHRjaGFTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9pbmRleCdcbmltcG9ydCAnLi92ZW5kb3Ivc21vb3Rocy1zY3JvbGwubWluLmpzJ1xuaW1wb3J0ICcuL3ZlbmRvci9ib290Q29uZmlnLmpzJ1xuXG5jb25zdCBjb250YWN0Rm9ybSA9IG5ldyBDb250YWN0Q29udHJvbGxlcigpXG5jb25zdCByZWNhcHRjaGEgPSBuZXcgUmVDYXB0Y2hhU2VydmljZSh3aW5kb3csIGNvbnRhY3RGb3JtLnNlbmRTTVRQLmJpbmQoY29udGFjdEZvcm0pKVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGhlYWRlciA9IG5ldyBIZWFkZXJDb250cm9sbGVyKClcbiAgY29uc3Qgc2Nyb2xsID0gbmV3IFNjcm9sbENvbnRyb2xsZXIoKVxuXG4gIC8vLT4gc2V0IFVSTCBldmVudCBvbiBjaGFuZ2UgVVJJXG4gIFVybENvbnRyb2xsZXIod2luZG93KVxuICAvLy0+IGhhbmRsZSBoZWFkZXIgb2ZmL29uXG4gIGhlYWRlci5jbGlja0FjdGlvbiA9IHNjcm9sbC5oaWRlLmJpbmQoc2Nyb2xsKVxuICAkKCcuY29udGFjdF9fZm9ybScpLm9uKCdzdWJtaXQnLCBjb250YWN0Rm9ybS5zdWJtaXQuYmluZChjb250YWN0Rm9ybSkpXG59KVxuIiwiZXhwb3J0IGNsYXNzIENvbnRhY3Qge1xuXG5cdGNvbnN0cnVjdG9yKHJlYWRvbmx5IG5hbWU6IHN0cmluZyxcblx0XHRyZWFkb25seSBzdWJqZWN0OiBzdHJpbmcsXG5cdFx0cmVhZG9ubHkgbWFpbEZyb206IHN0cmluZyxcblx0XHRyZWFkb25seSBtZXNzYWdlOiBzdHJpbmcpIHsgfVxuXG5cblx0Z2V0IHByZXBhcmVUb1NlbmQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHN1YmplY3Q6IHRoaXMuc3ViamVjdCxcblx0XHRcdGZyb206IHRoaXMubWFpbEZyb20sXG5cdFx0XHRtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG5cdFx0XHRuYW1lOiB0aGlzLm5hbWVcblx0XHR9XG5cdH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vQ29udGFjdCciLCJpbXBvcnQgeyBDb250YWN0IH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4J1xuXG5leHBvcnQgY2xhc3MgTWFpbFNlcnZpY2Uge1xuICBzdGF0aWMgc2VuZEVtYWlsID0gKGRhdGE6IE9iamVjdCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vbWFpbC1yYXVsZmRtLmhlcm9rdWFwcC5jb20vbWFpbCcsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgfSlcbiAgICAgICAgLmRvbmUocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgIC5mYWlsKGVycm9yID0+IHJlamVjdChlcnJvcikpXG4gICAgfSlcblxuICB9XG59XG4iLCJkZWNsYXJlIGNvbnN0IGdyZWNhcHRjaGE6IGFueVxuXG5leHBvcnQgY2xhc3MgUmVDYXB0Y2hhU2VydmljZSB7XG5cdHByaXZhdGUgX3NpdGVLZXk6IHN0cmluZyA9ICc2TGZ4WXlrVUFBQUFBTFZBRnlCTUxxNFdENXhFeEVOckZDazdZRGFtJ1xuXHRwcml2YXRlIF9zaXplOiBzdHJpbmcgPSAnaW52aXNpYmxlJ1xuXG5cdGNvbnN0cnVjdG9yKHdpbmRvdzogV2luZG93LCBwcml2YXRlIGNhbGxiYWNrQWN0aW9uOiBGdW5jdGlvbikge1xuXHRcdCg8YW55PndpbmRvdykucmVuZGVyUmVDYXB0Y2hhID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKVxuXHR9XG5cblx0c3RhdGljIGV4ZWN1dGUoKSB7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKClcblx0fVxuXG5cdHN0YXRpYyByZXNldCgpIHtcblx0XHRncmVjYXB0Y2hhLnJlc2V0KClcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRncmVjYXB0Y2hhLnJlbmRlcihcblx0XHRcdCdncmVjYXB0Y2hhJyxcblx0XHRcdHtcblx0XHRcdFx0J3NpemUnOiB0aGlzLl9zaXplLFxuXHRcdFx0XHQnc2l0ZWtleSc6IHRoaXMuX3NpdGVLZXksXG5cdFx0XHRcdCdjYWxsYmFjayc6IHRoaXMuY2FsbGJhY2tBY3Rpb25cblx0XHRcdH1cblx0XHQpXG5cdH1cblxufVxuIiwiZXhwb3J0ICogZnJvbSAnLi9NYWlsU2VydmljZSdcbmV4cG9ydCAqIGZyb20gJy4vUmVDYXB0Y2hhU2VydmljZSciLCIkKCcuaG9tZV9fdGl0bGUnKS50eXBlSXQoe1xuXHRzdHJpbmdzOiBbJ0Zyb250LWVuZCBEZXZlbG9wZXInLCAnQ3VyaW91cyBHdXknLFxuXHRcdCdQYXNzaW9uYXRlIEFib3V0IENvZGluZydcblx0XSxcblx0YnJlYWtMaW5lczogZmFsc2UsXG5cdGxvb3A6IHRydWUsXG5cdGRlbGV0ZVNwZWVkOiA1MCxcblx0ZGVsZXRlRGVsYXk6IDIwMDAsXG5cdGxvb3BEZWxheTogMjAwMFxufSlcblxuJCgnaHRtbCcpLnNtb290aFNjcm9sbCg0MDApXG4iLCIvKiEgaHR0cDovL210aHMuYmUvc21vb3Roc2Nyb2xsIHYxLjUuMiBieSBAbWF0aGlhcyAqL1xuKGZ1bmN0aW9uKGEsYyl7dmFyIGI9KGZ1bmN0aW9uKCl7dmFyIGQ9YyhhLmRvY3VtZW50RWxlbWVudCksZj1jKGEuYm9keSksZTtpZihkLnNjcm9sbFRvcCgpKXtyZXR1cm4gZH1lbHNle2U9Zi5zY3JvbGxUb3AoKTtpZihmLnNjcm9sbFRvcChlKzEpLnNjcm9sbFRvcCgpPT1lKXtyZXR1cm4gZH1lbHNle3JldHVybiBmLnNjcm9sbFRvcChlKX19fSgpKTtjLmZuLnNtb290aFNjcm9sbD1mdW5jdGlvbihkKXtkPX5+ZHx8NDAwO3JldHVybiB0aGlzLmZpbmQoJ2FbaHJlZio9XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oZil7dmFyIGc9dGhpcy5oYXNoLGU9YyhnKTtpZihsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJyk9PT10aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKSYmbG9jYXRpb24uaG9zdG5hbWU9PT10aGlzLmhvc3RuYW1lKXtpZihlLmxlbmd0aCl7Zi5wcmV2ZW50RGVmYXVsdCgpO2Iuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDplLm9mZnNldCgpLnRvcH0sZCxmdW5jdGlvbigpe2xvY2F0aW9uLmhhc2g9Z30pfX19KS5lbmQoKX19KGRvY3VtZW50LGpRdWVyeSkpO1xuIl19
