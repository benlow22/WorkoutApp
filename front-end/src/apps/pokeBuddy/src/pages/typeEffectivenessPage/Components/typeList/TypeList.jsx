import { Button } from "../button/Button";
import React from "react";
import { checkAttackPotential, pokemonTypes } from "../../database.js";

export function TypeList(props) {
	let type1 = props.type1;
	let type2 = props.type2;
	let isShowSTAB = props.isShowSTAB;
	const attackEffectiveness = checkAttackPotential(type1, type2);
	const addAttackEffectivenessToType = (type) => {
		let effectiveness;
		if (attackEffectiveness["superEffective"].includes(type)) {
			effectiveness = "super-effective";
		} else if (attackEffectiveness["notVeryEffective"].includes(type)) {
			effectiveness = "not-very-effective";
		} else if (attackEffectiveness["weakEffective"].includes(type)) {
			effectiveness = "weak-effective";
		}
		console.log("type:", type, "effect", effectiveness);
		return effectiveness;
	};

	const handleClick = (type) => {
		props.onAdd(type);
	};

	return (
		<div className="full-List">
			{pokemonTypes.map((type, index) => {
				const effectiveness = addAttackEffectivenessToType(type);
				return (
					<Button
						typeName={type}
						onClick={handleClick}
						//id={type}
						effectiveness={isShowSTAB ? effectiveness : "no-stab"}
						key={`${type}-${index}`}
					/>
				);
			})}
		</div>
	);
}
