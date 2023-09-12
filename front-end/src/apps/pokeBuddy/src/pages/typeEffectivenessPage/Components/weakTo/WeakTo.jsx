import { checkAttackPotential, checkTypes } from "../../database";
import { SmallButton } from "../button/SmallButton";

export function WeakTo(props) {
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

	if (type1) {
		const effectiveness = checkTypes(type1, type2);

		return (
			<div className="stat-box weak">
				<h4>Weak to </h4>
				<p>(Use)</p>
				<h5>2.56x damage from</h5>
				<div className="very-weak-to-types types-box">
					{effectiveness.veryWeakTo &&
						effectiveness.veryWeakTo.map((type, index) => {
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
				<h5>1.60x damage from</h5>
				<div className="weak-to-types types-box">
					{effectiveness.weakTo &&
						effectiveness.weakTo.map((type, index) => {
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
			<div className="stat-box weak">
				<h4>Weak to </h4>
				<p>(Use)</p>
				<h5>2.56x damage from</h5>
				<div className="very-weak-to-types types-box"></div>
				<h5>1.60x damage from</h5>
				<div className="weak-to-types types-box"></div>
			</div>
		);
	}
}
