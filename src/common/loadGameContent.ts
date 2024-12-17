import excelToJson from "convert-excel-to-json"
import { Card } from "src/models/Card.model"
import { Character } from "src/models/Character.model"
import fs from "fs"

const loadToDb = async () => {
	const data = excelToJson({
		sourceFile: "./src/content/game.xlsx",
		header: {
			rows: 1,
		},

		includeEmptyLines: false,
		sheets: [
			{
				name: "Cards",
				columnToKey: {
					A: "name",
					B: "description",
					C: "icon",
					D: "color",
					E: "price",
					F: "active",
					G: "public",
					H: "specifications",
				},
			},
			{
				name: "Characters",
				columnToKey: {
					A: "name",
					B: "description",
					C: "image",
					D: "price",
					E: "active",
					F: "public",
					G: "specifications",
				},
			},
		],
	})

	console.log(data)

	const cards = data.Cards || []

	for (const card of cards) {
		const [createdCard, created] = await Card.findOrCreate({
			where: {
				name: card.name,
			},
			defaults: {
				name: card.name,
				description: card.description,
				icon: card.icon,
				color: card.color,
				price: Number(card.price),
				specifications: card.specifications,
				public: !!Number(card.public),
				active: !!Number(card.active),
			},
		})

		if (!created) {
			if (createdCard.description !== card.description) {
				createdCard.description = card.description
			} else if (createdCard.icon !== card.icon) {
				createdCard.icon = card.icon
			} else if (createdCard.color !== card.color) {
				createdCard.color = card.color
			} else if (createdCard.price !== Number(card.price)) {
				createdCard.price = Number(card.price)
			} else if (createdCard.specifications !== card.specifications) {
				createdCard.specifications = card.specifications
			} else if (createdCard.active !== !!Number(card.active)) {
				createdCard.active = !!Number(card.active)
			} else if (createdCard.public !== !!Number(card.public)) {
				createdCard.public = !!Number(card.public)
			}

			await createdCard.save()
		}
	}

	const characters = data.Characters || []

	for (const character of characters) {
		const [createdCharacter, created] = await Character.findOrCreate({
			where: {
				name: character.name,
			},
			defaults: {
				name: character.name,
				description: character.description,
				image: character.image,
				price: Number(character.price),
				specifications: character.specifications,
				public: !!Number(character.public),
				active: !!Number(character.active),
			},
		})

		if (!created) {
			if (createdCharacter.description !== character.description) {
				createdCharacter.description = character.description
			} else if (createdCharacter.image !== character.image) {
				createdCharacter.image = character.image
			} else if (createdCharacter.price !== Number(character.price)) {
				createdCharacter.price = Number(character.price)
			} else if (createdCharacter.specifications !== character.specifications) {
				createdCharacter.specifications = character.specifications
			} else if (createdCharacter.public !== !!Number(character.public)) {
				createdCharacter.public = !!Number(character.public)
			} else if (createdCharacter.active !== !!Number(character.active)) {
				createdCharacter.active = !!Number(character.active)
			}

			await createdCharacter.save()
		}
	}
}

export const loadGameContent = async () => {
	const file = await fetch(
		"https://docs.google.com/spreadsheets/d/15lIkzr8d208nfnEbt7E9eddbK79iEwulO1Wb7IVMgw0/export?format=xlsx"
	).then(res => res.arrayBuffer())

	fs.writeFileSync("./src/content/game.xlsx", Buffer.from(file))

	loadToDb()
}
