// DATA

export const positiveEffects: TEffects[] = ["heal", "armor"]
export const negativeEffects: TEffects[] = ["poison", "ice", "fire", "blood"]

// TYPES

export type TEffects = "blood" | "heal" | "poison" | "ice" | "fire" | "armor"

export type TGetEffectResult = "blocked" | "applied"

export type TActions = "attack" | "heal" | "armor"

export type TCharacterPassives = ""

export interface ICharacterEffect {
	effect: TEffects
	duration: number
	value: number
	new?: boolean
}

export interface ICharacterResistance {
	effect: TEffects
	resistance: number
}

export interface IEffectWithResult {
	effect: TEffects
	result: TGetEffectResult
}

export interface IDoDamageProps {
	damage: number
	ignoreArmor: boolean
}
