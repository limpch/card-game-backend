import { ICharacterEffect, IEffectWithResult } from "src/content/localdb"
import { ICardAction, ICardEffect } from "src/types/card"
import GameCharacterProcess from "./GameCharacterProcess.model"
import { checkEffectStatus } from "src/helpers/checkEffectStatus"

// Хотел сделать одну функцию по нанесению урона с действий и эффектов с просчетом сопротивлений

class GameCharacterProcessService {
	doAction(characterProcess: GameCharacterProcess, action: ICardAction) {
		switch (action.action) {
			case "armor":
				this.doArmor(characterProcess, action.value)
				break
			case "heal":
				const effectStatus = checkEffectStatus(characterProcess.resistance, "heal")
				if (effectStatus.status === "positive") this.doHeal(characterProcess, action.value)
				else this.doDamage(characterProcess, action.value)
				break
			case "attack":
				if (action.type) {
					this.doEffect(characterProcess, {
						duration: 1,
						effect: action.type,
						value: action.value,
					})
				} else {
					this.doDamage(characterProcess, action.value)
				}
				break
		}
	}

	roundEnd(characterProcess: GameCharacterProcess) {
		const effectsResult = []

		const newEffects: ICharacterEffect[] = []
		characterProcess.effects.forEach(effect => {
			const doEffect = this.doEffect(characterProcess, effect)

			effectsResult.push(doEffect)

			if (effect.new) {
				effect.new = false
				newEffects.push(effect)
			} else {
				effect.duration--
				if (effect.duration > 0) newEffects.push(effect)
			}
		})

		characterProcess.effects = newEffects

		return effectsResult
	}

	addEffect(characterProcess: GameCharacterProcess, effect: ICardEffect) {
		const effectWithResult: IEffectWithResult = {
			effect: effect.effect,
			result: "applied",
		}

		const effectStatus = checkEffectStatus(characterProcess.resistance, effect.effect)

		if (characterProcess.armor > 0 && effectStatus.status === "negative") {
			effectWithResult.result = "blocked"
		} else {
			const _effect: ICharacterEffect = {
				effect: effect.effect,
				duration: effect.duration,
				value: effect.value,
				new: true,
			}

			characterProcess.effects.push(_effect)
		}

		return effectWithResult
	}

	private doEffect(characterProcess: GameCharacterProcess, effect: ICharacterEffect) {
		const effectStatus = checkEffectStatus(characterProcess.resistance, effect.effect)

		let damage = effect.value

		if (effectStatus.resistance) damage = damage * (1 - effectStatus.resistance / 100)

		this.doDamage(characterProcess, damage)

		return effectStatus
	}

	private doDamage(
		characterProcess: GameCharacterProcess,
		damage: number,
		ignoreArmor: boolean = false
	) {
		let _damage = damage

		if (!ignoreArmor) {
			const leftDamage = _damage - characterProcess.armor
			if (leftDamage >= 0) {
				characterProcess.armor = 0
				characterProcess.health -= leftDamage
			} else characterProcess.armor -= _damage
		} else {
			characterProcess.health -= _damage
		}
	}

	private doHeal(characterProcess: GameCharacterProcess, heal: number) {
		characterProcess.health += heal
	}

	private doArmor(characterProcess: GameCharacterProcess, armor: number) {
		characterProcess.armor += armor
	}
}

export default new GameCharacterProcessService()
