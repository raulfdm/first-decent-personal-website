export class Contact {

	constructor(readonly name: string,
		readonly subject: string,
		readonly mailFrom: string,
		readonly message: string) { }


	get prepareToSend() {
		return {
			subject: this.subject,
			from: this.mailFrom,
			message: this.message,
			name: this.name
		}
	}
}
