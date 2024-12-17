export default class UpdateCardDto {
	readonly name?: string
	readonly description?: string
	readonly icon?: string
	readonly color?: string
	readonly price?: number
	readonly specifications?: string
	readonly public?: boolean
	readonly active?: boolean

	constructor(body: any) {
		this.name = body.name
		this.description = body.description
		this.icon = body.icon
		this.color = body.color
		this.price = body.price
		this.specifications = body.specifications
		this.public = body.public
		this.active = body.active
	}
}
