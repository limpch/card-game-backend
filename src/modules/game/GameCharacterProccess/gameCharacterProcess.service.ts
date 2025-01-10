import { ICharacterEffect } from "src/content/localdb"
import { ICardAction, ICardEffect, ICardSpecifications, ICastInfo } from "src/types/card"
import GameCharacterProcess from "./GameCharacterProcess.model"
import { checkEffectStatus } from "src/helpers/checkEffectStatus"
import { IActionResult, ICastResult, IDamageResult, IEffectResult } from "src/types/cast"

// Хотел сделать одну функцию по нанесению урона с действий и эффектов с просчетом сопротивлений

class GameCharacterProcessService {
	castCard(characterProcess: GameCharacterProcess, ap: number, castInfo: ICastInfo): ICastResult {
		const result: ICastResult = {
			actions: [],
			newEffects: [],
			ap,
		}

		characterProcess.effects.forEach(effect => {
			if (effect.effect === "lower_ap") result.ap = Math.max(1, result.ap - effect.value)
		})

		castInfo.actions.forEach(action => {
			const _result = this.doAction(characterProcess, action)
			result.actions.push(_result)
		})

		castInfo.effects.forEach(effect => {
			const _result = this.addEffect(characterProcess, effect)
			result.newEffects.push(_result)
		})

		return result
	}

	roundEnd(characterProcess: GameCharacterProcess) {
		const effectsResult = []

		const newEffects: ICharacterEffect[] = []
		characterProcess.effects.forEach(effect => {
			const doEffect = this.doEffect(characterProcess, effect)

			effectsResult.push(doEffect)

			effect.duration--
			if (effect.duration > 0) newEffects.push(effect)
		})

		characterProcess.effects = newEffects

		return effectsResult
	}

	// Actions

	private doAction(characterProcess: GameCharacterProcess, action: ICardAction): IActionResult {
		const actionResult: IActionResult = {}

		switch (action.action) {
			case "armor":
				const addedArmor = this.doArmor(characterProcess, action.value)
				actionResult.armor = addedArmor
				break
			case "heal":
				const effectStatus = checkEffectStatus(characterProcess.resistance, "heal")
				if (effectStatus.status === "positive") {
					this.doHeal(characterProcess, action.value)
					actionResult.heal = action.value
				} else {
					this.doDamage(characterProcess, action.value)
					actionResult.damage = {
						value: action.value,
						type: action.type,
					}
				}
				break
			case "attack":
				if (action.type) {
					const _res = this.doEffect(characterProcess, {
						duration: 1,
						effect: action.type,
						value: action.value,
					})
				} else this.doDamage(characterProcess, action.value, action.ignoreArmor)
				break
		}

		return actionResult
	}

	// Effects

	private addEffect(characterProcess: GameCharacterProcess, effect: ICardEffect) {
		const effectWithResult: IEffectResult = {
			effect: effect.effect,
			result: "applied",
		}

		const effectStatus = checkEffectStatus(characterProcess.resistance, effect.effect)

		if (characterProcess.armor > 0 && effectStatus.status === "negative") {
			effectWithResult.result = "blocked"
		} else {
			const _effect: ICharacterEffect = { ...effect }
			characterProcess.effects.push(_effect)
		}

		return effectWithResult
	}

	private doEffect(
		characterProcess: GameCharacterProcess,
		effect: ICharacterEffect,
		ignoreArmor: boolean = false
	): IDamageResult {
		const effectStatus = checkEffectStatus(characterProcess.resistance, effect.effect)

		let damage = effect.value

		if (effectStatus.resistance) damage = damage * (1 - effectStatus.resistance / 100)

		const _damageRes = this.doDamage(characterProcess, damage, ignoreArmor)

		return {
			..._damageRes,
			type: effect.effect,
		}
	}

	// Actions

	private doDamage(
		characterProcess: GameCharacterProcess,
		damage: number,
		ignoreArmor: boolean = false
	): IDamageResult {
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

		return {
			value: _damage,
			throughArmor: ignoreArmor,
		}
	}

	private doHeal(characterProcess: GameCharacterProcess, heal: number) {
		let _heal = heal
		if (characterProcess.health + _heal > characterProcess.maxHealth)
			_heal = characterProcess.maxHealth - characterProcess.health

		characterProcess.health += _heal

		return _heal
	}

	private doArmor(characterProcess: GameCharacterProcess, armor: number) {
		let addedArmor = armor
		if (characterProcess.armor + addedArmor > characterProcess.maxArmor)
			addedArmor = characterProcess.maxArmor - characterProcess.armor

		characterProcess.armor += addedArmor
		return addedArmor
	}
}

export default new GameCharacterProcessService()
