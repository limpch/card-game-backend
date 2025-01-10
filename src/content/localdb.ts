// DATA

export const positiveEffects: TEffects[] = ["heal", "armor"]
export const negativeEffects: TEffects[] = ["poison", "ice", "fire", "blood"]

// TYPES

export type TEffects = "blood" | "heal" | "poison" | "ice" | "fire" | "armor" | "lower_ap"

export type TCharacterPassives = ""

export interface ICharacterEffect {
	effect: TEffects
	duration: number
	value: number
}

export interface ICharacterResistance {
	effect: TEffects
	resistance: number
}
