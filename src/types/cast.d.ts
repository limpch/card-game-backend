export interface ICastPayload {
	cardId: number
	target: "me" | "enemy"
}

export type TActions = "attack" | "heal" | "armor"

export interface ICastResult {
	actions: IActionResult[]
	newEffects: IEffectResult[]
	ap: number
}

export interface IActionResult {
	damage?: IDamageResult
	armor?: number
	heal?: number
}

export interface IDamageResult {
	value: number
	type?: TEffects
	throughArmor?: boolean
}

export interface IEffectResult {
	effect: TEffects
	result: TGetEffectResult
}

export type TGetEffectResult = "blocked" | "applied"

export interface IDoDamageProps {
	damage: number
	ignoreArmor: boolean
}
