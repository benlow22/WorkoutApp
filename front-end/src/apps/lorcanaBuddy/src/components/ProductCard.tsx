import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";

type TProps = {
	type: ProductTypes;
	wave: SetName;
	number: number;
};

export const ProductCard = ({ type, wave, number }: TProps) => {
	const [guaranteedCards, setGuaranteedCards] = useState<TLorcanaCard[]>([]);
	const [numberOfBoosterPacks, setNumberOfBoosterPacks] = useState<number>(0);
	const [boosterSection, setBoosterSection] = useState<any>();
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
			default:
			// code block
		}
	}, []);

	const boosterPackCalculator = () => {
		var boosterPackArr = [];
		for (let i = 0; i < numberOfBoosterPacks; i++) {
			boosterPackArr.push(
				<BoosterPack
					wave={wave}
					number={i}
					key={`${type}-${number}-${i}`}
				/>
			);
		}
		setBoosterSection(boosterPackArr);
	};

	useEffect(() => {
		boosterPackCalculator();
	}, [numberOfBoosterPacks]);

	// @ts-expect-error A const enum member can only be accessed using a string literal.ts(2476)
	const title = `${ProductTypes[type]} - ${number}`;

	return (
		<div>
			<h1>{title}</h1>
			<h2>Guaranteed Cards: </h2>
			<h2>Booster Packs</h2>
			{boosterSection}
		</div>
	);
};
