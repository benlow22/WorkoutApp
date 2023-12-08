import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache } from "../pages/addItems/AddItems";
import { DeckInput } from "./DeckInput";

type TProps = {
	type: ProductTypes;
	wave: SetName;
	number: number;
	advanced: boolean;
	allCards: TCardCache;
};

export const ProductCard = ({ type, wave, number, advanced, allCards }: TProps) => {
	const [guaranteedCards, setGuaranteedCards] = useState<TLorcanaCard[]>();
	const [numberOfBoosterPacks, setNumberOfBoosterPacks] = useState<number>(0);
	const [boosterSection, setBoosterSection] = useState<any>();
	const [advancedInput, setAdvancedInput] = useState<boolean>(false);

	useEffect(() => {
		switch (type) {
			// booster pack
			case 0:
				setNumberOfBoosterPacks(1);
				break;
			//
			case 1:
				setNumberOfBoosterPacks(1);
				break;
			//starter deck
			case 2:
				setNumberOfBoosterPacks(1);
				break;
			// gift set
			case 3:
				setNumberOfBoosterPacks(4);
				break;
			case 7:
				setNumberOfBoosterPacks(0);
			default:
			// code block
		}
	}, []);

	const boosterPackCalculator = () => {
		var boosterPackArr = [];
		if (type.valueOf() === 7) {
			console.log("type", type.valueOf());
		}
		for (let i = 0; i < numberOfBoosterPacks; i++) {
			boosterPackArr.push(
				<BoosterPack
					wave={wave}
					number={i}
					key={`${type}-${number}-${i}`}
					advanced={advanced}
					allCards={allCards}
				/>
			);
		}
		setBoosterSection(boosterPackArr);
	};

	useEffect(() => {
		boosterPackCalculator();
	}, [numberOfBoosterPacks]);

	// @ts-expect-error A const enum member can only be accessed using a string literal.ts(2476)
	const title = `${ProductTypes[type]} #${number} : ${SetName[wave]}`;

	return (
		<div style={{ width: "800px", margin: "auto" }}>
			<h1>{title}</h1>
			{guaranteedCards && <h2>Guaranteed Cards: </h2>}
			{ProductTypes["Booster Pack"] !== type ? ProductTypes["Custom Deck"] !== type ? <h2>Booster Packs</h2> : <DeckInput wave={wave} /> : ""}
			{boosterSection}
			<div className="just-cards"></div>
		</div>
	);
};
