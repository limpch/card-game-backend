import {
	negativeEffects,
	positiveEffects,
	ICharacterResistance,
	TEffects,
} from "src/content/localdb"

export const checkEffectStatus = (
	characterResistance: ICharacterResistance[],
	effect: TEffects
) => {
	const effectStatus = {
		status: "positive",
		resistance: 0,
	}

	if (positiveEffects.includes(effect)) {
		effectStatus.resistance =
			characterResistance.find(resistance => resistance.effect === effect)?.resistance || 0

		if (effectStatus.resistance >= 100) effectStatus.status = "negative"

		return effectStatus
	}

	if (negativeEffects.includes(effect)) {
		effectStatus.resistance =
			characterResistance.find(resistance => resistance.effect === effect)?.resistance || 0

		if (effectStatus.resistance < 100) effectStatus.status = "negative"

		return effectStatus
	}
}
