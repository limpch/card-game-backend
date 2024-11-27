import { IRoomCard } from "src/types/room"
import { IRoomCharacter } from "src/types/character"

export default class PlayerSetup {
	private deck: IRoomCard[]
	private character: IRoomCharacter

	setDeck(deck: IRoomCard[]) {
		this.deck = deck
	}

	setCharacter(character: IRoomCharacter) {
		this.character = character
	}

	getDeck() {
		return this.deck
	}

	getCharacter() {
		return this.character
	}

	haveCard(cardId: number) {
		return this.deck.find(card => card.id === cardId) !== undefined
	}

	useCard(cardId: number) {
		const card = this.deck.find(card => card.id === cardId)
		if (!card) return

		card.effects.forEach(([effectName, effectValue]) => {
			switch (effectName) {
				case "damage":
					this.character.health -= Number(effectValue)
					break
			}
		})
	}

	isFull() {
		return this.deck.length > 0 && this.character !== null
	}
}
