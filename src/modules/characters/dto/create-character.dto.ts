class CreateCharacterDto {
	readonly name: string
	readonly description: string
	readonly image: string
	readonly price: number
	readonly specifications: string
	readonly public: boolean
	readonly active: boolean

	constructor(body: any) {
		this.name = body.name
		this.description = body.description
		this.image = body.image
		this.price = body.price
		this.specifications = body.specifications
		this.public = body.public
		this.active = body.active
	}
}

export default CreateCharacterDto
