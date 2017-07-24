declare const grecaptcha: any

export default class ReCaptchaService {
	private _siteKey: string = '6LfxYykUAAAAALVAFyBMLq4WD5xExENrFCk7YDam'
	private _size: string = 'invisible'
	private _callback: Function

	constructor(callbackAction: Function) {
		console.log(callbackAction)
		this._callback = callbackAction
	}

	execute() {
		grecaptcha.execute()
	}

	render(): void {
		grecaptcha.render(
			'grecaptcha',
			{
				'size': this._size,
				'sitekey': this._siteKey,
				'callback': this._callback
			}
		)
	}

}
