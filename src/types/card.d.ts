import { TActions, TEffects } from "src/content/localdb"

export interface ICard {
	id: number
	specifications: ICardSpecifications
}

export interface ICardSpecifications {
	ap: number

	onTarget?: ICastInfo

	onCaster?: ICastInfo
}

export interface ICastInfo {
	actions: ICardAction[]
	effects: ICardEffect[]
}

export interface ICardAction {
	action: TActions
	value: number
	type?: TEffects
	ignoreArmor?: boolean
}

export interface ICardEffect {
	effect: TEffects
	duration: number
	value: number
}
