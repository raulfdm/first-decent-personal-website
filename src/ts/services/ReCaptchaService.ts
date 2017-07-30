declare const grecaptcha: any

export class ReCaptchaService {
	private _siteKey: string = '6LfxYykUAAAAALVAFyBMLq4WD5xExENrFCk7YDam'
	private _size: string = 'invisible'

	constructor(window: Window, private callbackAction: Function) {
		(<any>window).renderReCaptcha = this.render.bind(this)
	}

	static execute() {
		grecaptcha.execute()
	}

	static reset() {
		grecaptcha.reset()
	}

	render() {
		grecaptcha.render(
			'grecaptcha',
			{
				'size': this._size,
				'sitekey': this._siteKey,
				'callback': this.callbackAction
			}
		)
	}

}
