import { checkAttackPotential, checkTypes } from "../../database";
import { SmallButton } from "../button/SmallButton";

export function ResistantTo(props) {
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

	// // {
	// 	"superEffective": [
	// 		"Dark",
	// 		"Ice",
	// 		"Normal",
	// 		"Rock",
	// 		"Steel"
	// 	],
	// 	"notVeryEffective": [
	// 		"Bug",
	// 		"Fairy",
	// 		"Flying",
	// 		"Poison",
	// 		"Psychic"
	// 	],
	// 	"weakEffective": [
	// 		"Ghost"
	// 	]
	// }
	if (type1) {
		const effectiveness = checkTypes(type1, type2);
		return (
			<div className="stat-box resistant">
				<h4>Resistant to </h4>
				<p>(dont be)</p>
				<h5>0.244x damage from</h5>
				<div className="extra-resistant-types types-box">
					{effectiveness.extraResistant &&
						effectiveness.extraResistant.map((type, index) => {
							const effectiveness =
								addAttackEffectivenessToType(type);
							return (
								<SmallButton
									typeName={type}
									key={`${index}-${type}`}
									effectiveness={
										isShowSTAB ? effectiveness : "no-stab"
									}
								/>
							);
						})}
				</div>
				<h5>0.391x damage from</h5>
				<div className="very-resistant-types types-box">
					{effectiveness.veryResistant &&
						effectiveness.veryResistant.map((type, index) => {
							return (
								<SmallButton
									typeName={type}
									key={`${index}-${type}`}
									effectiveness={
										isShowSTAB ? effectiveness : "no-stab"
									}
								/>
							);
						})}
				</div>
				<h5>0.625x damage from</h5>
				<div className="resistant-types types-box">
					{effectiveness.resistant &&
						effectiveness.resistant.map((type, index) => {
							const effectiveness =
								addAttackEffectivenessToType(type);
							return (
								<SmallButton
									typeName={type}
									key={`${index}-${type}`}
									effectiveness={
										isShowSTAB ? effectiveness : "no-stab"
									}
								/>
							);
						})}
				</div>
			</div>
		);
	} else {
		return (
			<div className="stat-box resistant">
				<h4>Resistant to </h4>
				<p>(dont be)</p>
				<h5>0.244x damage from</h5>
				<div className="extra-resistant-types types-box"></div>
				<h5>0.391x damage from</h5>
				<div className="very-resistant-types types-box"></div>
				<h5>0.625x damage from</h5>
				<div className="resistant-types types-box"></div>
			</div>
		);
	}
}
