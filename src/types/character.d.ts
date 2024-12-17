export interface ICharacter {
	id: number
	specifications: ICharacterInfo
}

export interface ICharacterInfo {
	damage: [number, number]

	health: number
	armor: number

	maxActionPoints: number
	baseActionPoints: number
}
