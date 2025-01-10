import { ICharacterEffect, ICharacterResistance } from "src/content/localdb"
import { ICharacter } from "src/types/character"

export default class GameCharacterProcess {
	maxHealth: number = 0
	private _health: number = 0

	maxArmor: number = 0
	private _armor: number = 0

	maxAp: number = 0
	ap: number = 0

	effects: ICharacterEffect[] = []
	resistance: ICharacterResistance[] = []

	constructor(character: ICharacter) {
		return

		this.maxHealth = character.specifications.health
		this.health = character.specifications.health

		this.maxArmor = character.specifications.maxArmor
		this.armor = character.specifications.armor

		this.maxAp = character.specifications.maxActionPoints
		this.ap = character.specifications.baseActionPoints

		this.effects = []
		this.resistance = character.specifications.baseResistance.map(resistance => ({
			effect: resistance.effect,
			resistance: resistance.resistance,
		}))
	}

	public set health(n: number) {
		const newHealth = this._health + n
		if (newHealth > this.maxHealth) this._health = this.maxHealth
		else if (newHealth < 0) this._health = 0
		else this._health = newHealth
	}

	public get health() {
		return this._health
	}

	public set armor(n: number) {
		const newArmor = this._armor + n
		if (newArmor > this.maxArmor) this._armor = this.maxArmor
		else if (newArmor < 0) this._armor = 0
		else this._armor = newArmor
	}

	public get armor() {
		return this._armor
	}
}
