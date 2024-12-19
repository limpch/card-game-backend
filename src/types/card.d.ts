import { TActions, TEffects } from "src/content/localdb"

export interface ICard {
	id: number
	specifications: ICardSpecifications
}

export interface ICardSpecifications {
	ap: number
	actions: ICardAction[]
	effects: ICardEffect[]
}

export interface ICardAction {
	action: TActions
	value: number
	type?: TEffects
}

export interface ICardEffect {
	effect: TEffects
	duration: number
	value: number
}
