declare const grecaptcha: any

export default class ReCaptchaService{

	static execute(){
		grecaptcha.execute()
	}
}
