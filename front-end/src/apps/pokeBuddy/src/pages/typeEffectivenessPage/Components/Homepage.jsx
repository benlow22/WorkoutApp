import React, { useEffect, useState, useRef } from "react";
import { TypeList } from "./typeList/TypeList";
import { TypeIndicator } from "./typeIndicators/TypeIndicators";
import { pokemonTypes, keys } from "../database";
import { ResistantTo } from "./resistantTo/ResistantTo";
import { WeakTo } from "./weakTo/WeakTo";
import { STABbutton } from "./button/STABbutton";
import "./../../../styles/typeEffectiveness.css";
import { Tour, FloatButton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export function Homepage() {
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	const ref5 = useRef(null);
	const ref6 = useRef(null);
	const [open, setOpen] = useState(false);

	const steps = [
		{
			title: "Select Pokemon's Type",
			description:
				"Click on one or two types. You can also use hotkeys to choose. The first click will be the main typing. Any subsequent choices will toggle the secondary typing.",
			cover: <img alt="hotkeys.png" src="/hotkeysTyping.png" />,
			target: () => ref1.current,
		},
		{
			title: "Clear Types",
			description:
				"Use the reset button to clear both typings. You can also use the spacebar as a hotkey",
			target: () => ref2.current,
		},
		{
			title: "Weaknesses!! you want to attack with these types",
			description:
				"Move types that the pokemon is weak to will show up here. The more effective types will be higher on this list at x2.56 damage",
			cover: <img alt="weak to.png" src="/Weak to.png" />,
			placement: "left",
			target: () => ref3.current,
		},
		{
			title: "Resistances",
			description:
				"The pokemon will be resistant to these moves, taking the least amount of damage higher on this list.",
			cover: <img alt="resistant.png" src="/Resistant.png" />,
			placement: "right",
			target: () => ref4.current,
		},
		{
			title: "STAB bonus",
			description:
				"When a pokemon attacks with the same type that it is, it does bonus damage. This prepares for those attacks, by showing you which pokemon you should be to minimize damage. ie. if a dark pokemon is attacking with a dark move, you want to be fairy or fighting (highlighted in green) as they are resistant to dark moves. You would not want to be ghost (highlighted in red), as you would take extra damage and are weak to dark",
			cover: <img alt="stab.png" src="/stab.png" />,
			placement: "top",
			target: () => ref5.current,
		},
		{
			title: "RECAP: BE GREEN and AVOID RED!!",
			description:
				"After you choose your opponent's typing, attack with moves in the WEAK TO section, avoid RESISTANT TO moves. On the defense you want to BE the GREEN highlighted type and AVOID the RED types.",
			target: () => ref6.current,
		},
	];

	const [type1, setType1] = useState(undefined);
	const [type2, setType2] = useState(undefined);
	const [showSTAB, setShowSTAB] = useState(false);

	const handleAdd = (type) => {
		if (!type1) {
			setType1(type);
		} else {
			if (type1 !== type) {
				setType2(type);
			}
		}
	};
	// used API to get ATTACK stats
	// const attackStats = async () => {
	// 	fetch("https://pogoapi.net/api/v1/type_effectiveness.json")
	// 		.then(
	// 			(response) => {
	// 				if (response.ok) {
	// 					return response.json();
	// 				}
	// 				throw new Error("Request failed!");
	// 			},
	// 			(networkError) => {
	// 				console.log(networkError.message);
	// 			}
	// 		)
	// 		.then((jsonResponse) => {
	// 			console.log(jsonResponse);
	// 			for (const [key, value] of Object.entries(jsonResponse)) {
	// 				// console.log("key", key);

	// 				if (key === 1) {
	// 					console.log(value);
	// 				}
	// 				const attackStats = Object.values(jsonResponse[key]);
	// 				// console.log('att stats in arr"', attackStats);
	// 				Object.defineProperty(jsonResponse, key, {
	// 					value: attackStats,
	// 				});
	// 				// console.log("updating json", jsonResponse);
	// 			}
	// 			return jsonResponse;
	// 		});
	// };

	// const stats = attackStats();

	const clearButtons = () => {
		setType1(undefined);
		setType2(undefined);
	};

	useEffect(() => {
		document.addEventListener("keyup", (event) => {
			if (event.code === "Space" || event.code === "KeyV") {
				clearButtons();
			}
		});
	}); // use [] because you only want to add the listener once at the beginning

	const handleAllKeysArray = (event) => {
		if (keys.includes(event.code)) {
			// checks if code is in array
			let index = keys.findIndex((key) => key === event.code); // returns index in keys array
			handleAdd(pokemonTypes[index - 1]); // uses index to add type to state
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleAllKeysArray);
		document.addEventListener("click", () =>
			document.getElementById("resetButton").focus()
		);
		return () => {
			document.removeEventListener("keydown", handleAllKeysArray);
			document.removeEventListener("click", () =>
				document.getElementById("resetButton").focus()
			);
		};
	});

	const refReset = React.useRef();

	return (
		<div>
			<div className="type-effectiveness-page">
				<div className="opponent-Stats" ref={ref6}>
					<div ref={ref4}>
						<ResistantTo
							type1={type1}
							type2={type2}
							isShowSTAB={showSTAB}
						/>
					</div>
					<div className="two-types">
						<TypeIndicator type={type1} placeholder={"Type 1"} />
						<TypeIndicator type={type2} placeholder={"Type 2"} />
						<button
							className="reset-button"
							onClick={clearButtons}
							id="resetButton"
							ref={ref2}
						>
							RESET
						</button>
						<div className="settings-bar" ref={ref5}>
							<STABbutton
								onClick={() => setShowSTAB(!showSTAB)}
							/>
						</div>
					</div>
					<div ref={ref3}>
						<WeakTo
							type1={type1}
							type2={type2}
							isShowSTAB={showSTAB}
						/>
					</div>
				</div>
				<div className="list-Of-Buttons" ref={ref1}>
					<TypeList
						onAdd={handleAdd}
						type1={type1}
						type2={type2}
						isShowSTAB={showSTAB}
					/>
				</div>
			</div>
			<FloatButton
				icon={<QuestionCircleOutlined />}
				type="primary"
				style={{ right: 24 }}
				onClick={() => setOpen(true)}
			/>
			<Tour open={open} onClose={() => setOpen(false)} steps={steps} />
		</div>
	);
}
