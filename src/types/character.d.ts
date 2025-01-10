import { ICharacterResistance } from "src/content/localdb"

export interface ICharacter {
	id: number
	specifications: ICharacterInfo
}

export interface ICharacterInfo {
	health: number

	maxArmor: number
	armor: number

	baseActionPoints: number
	maxActionPoints: number

	baseResistance: ICharacterResistance[]
}
