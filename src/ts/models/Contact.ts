export default class Contact {

	constructor(private _name: string,
		private _subject: string,
		private _mailFrom: string,
		private _message: string) { }

	get name() {
		return this._name
	}
	get subject() {
		return this._subject
	}
	get mailFrom() {
		return this._mailFrom
	}
	get message() {
		return this._message
	}

	get prepareToSend(){
		return {
			subject: this._subject,
			from: this._mailFrom,
			message: this._message,
			name: this._name
		}
	}
}
