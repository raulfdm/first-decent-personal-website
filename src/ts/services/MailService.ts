import Contact from '../models/Contact'
declare const emailJsService: any
declare const emailjs: any

export default class MailService {
	private _userID: string = 'user_XDedmoeMTu9Eyl0FxOlTJ'

	constructor(){
		emailjs.init(this._userID)
	}

	sendEmail = (data: Contact): Promise<any> => {
		return (<Promise<any>>emailJsService(data))
	}
}
