import { ICharacterResistance } from "src/content/localdb"

export interface ICharacter {
	id: number
	specifications: ICharacterInfo
}

export interface ICharacterInfo {
	health: number
	armor: number

	baseActionPoints: number
	maxActionPoints: number

	baseResistance: ICharacterResistance[]
}

const testCharacter: ICharacter = {
	id: 1,
	specifications: {
		health: 100,
		armor: 10,
		baseActionPoints: 2,
		maxActionPoints: 2,
		baseResistance: {},
	},
}
