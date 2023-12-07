import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache, getAllCards } from "../pages/addItems/addItems";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { DeckCardInput } from "./DeckCardInput";
import { ButtonHTMLType, ButtonType } from "antd/es/button";
import { FieldData } from "rc-field-form/lib/interface";

type TProps = {
	isFoil?: boolean;
	rarities?: string[];
	wave: number;
	index?: number;
};

export const DeckInput = ({ wave }: TProps) => {
	const [numberOfCards, setNumberOfCards] = useState<number>(0);
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
	const [isSpaceClicked, setIsSpaceClicked] = useState<boolean>(false);
	const [arrOfInputs, setArrOfInputs] = useState<number[]>([]);
	const addButton = useRef<any>(null);
	const onFinish = (values: any) => {
		console.log("Deck Input onFINISH:", values);
	};
	// const handleSpacePress = (e: any, addFn: () => void, movefn: (from: number, to: number) => void, x: number, y: number, index: number) => {
	// 	document.addEventListener("keyup", (event) => {
	// 		if (event.code === "Space" || event.code === "KeyV") {
	// 			addFn();
	// 			console.log(index);
	// 			let current = e;
	// 			console.log(current);
	// 			// event.preventDefault();
	// 			var lastCard = e.target.id.split("_").pop();
	// 			// document.getElementById(`deckInput_deck_card_${lastCard}`).focus();
	// 			// console.log("Current", lastCard);
	// 			// console.log("space has been pressed");
	// 		}
	// 	});

	// };
	// const handleChange = (e: any, addFn: () => void) => {
	// 	e.preventDefault();
	// 	const { value, name } = e.target;
	// 	const cardIndex = Number(name);
	// 	//press space
	// 	console.log("CArdout", cardIndex, numberOfCards, name);
	// 	document.addEventListener("keyup", (event) => {
	// 		if (event.code === "Space" || event.code === "KeyV") {
	// 			//if last card add new card
	// 			console.log("CArdin", cardIndex, numberOfCards, name);
	// 			if (cardIndex === numberOfCards) {
	// 				addFn();
	// 				setNumberOfCards(numberOfCards + 1);
	// 				setCurrentCardIndex(cardIndex + 1);
	// 			}
	// 		}
	// 	});
	// 	document.removeEventListener("keyup", (event) => {
	// 		if (event.code === "Space" || event.code === "KeyV") {
	// 			//if last card add new card
	// 			console.log("CArdin", cardIndex, numberOfCards, name);
	// 			if (cardIndex === numberOfCards) {
	// 				addFn();
	// 				setNumberOfCards(numberOfCards + 1);
	// 				setCurrentCardIndex(cardIndex + 1);
	// 			}
	// 		}
	// 	});
	// 	console.log("numberOfCards", numberOfCards);
	// };

	const spaceUpHandler = (event: KeyboardEvent) => {
		console.log("before space clicked");
		if (event.code === "Space" || event.code === "KeyV") {
			event.preventDefault();
			setIsSpaceClicked(true);
		}
	};

	const clickAdd = (fn: () => void) => {};
	useEffect(() => {
		console.log("# of cards", numberOfCards);
	}, [numberOfCards]);

	useEffect(() => {
		document.addEventListener("keydown", spaceUpHandler);

		return () => document.removeEventListener("keydown", spaceUpHandler);
	}, []);

	useEffect(() => {
		if (isSpaceClicked) {
			console.log("Curremt and #", currentCardIndex, numberOfCards);
			console.log('field"', myFields);
			if (currentCardIndex + 1 === numberOfCards) {
				console.log("this is the last element", addButton.current);
			}
			// check if last index
			// if last = add new input
			// focus on next input
			console.log("SPACE HAS BEEN CLICKED", currentCardIndex);
			setIsSpaceClicked(false);
			setCurrentCardIndex(currentCardIndex + 1);
		}
	}, [isSpaceClicked]);

	useEffect(() => {
		console.log("currentCardIndex: ", currentCardIndex);
	}, [currentCardIndex]);

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 20 },
		},
	};

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};

	return (
		<div>
			<h1>Set {wave}</h1>
			<Form
				name="dynamic_form_item"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				fields={myFields}
				style={{ maxWidth: 600 }}
			>
				<Form.List
					name="names"
					rules={[
						{
							validator: async (_, names) => {
								if (!names || names.length < 2) {
									return Promise.reject(new Error("At least 2 passengers"));
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<DeckCardInput
									field={field}
									index={index}
									remove={remove}
									setCurrentCardIndex={setCurrentCardIndex}
									currentCardIndex={currentCardIndex}
								/>
							))}
							<Form.Item>
								<Button
									ref={addButton}
									type="dashed"
									onClick={() => {
										add();
										setNumberOfCards(numberOfCards + 1);
										setArrOfInputs(arrOfInputs.concat([currentCardIndex + 1]));
									}}
									style={{ width: "60%" }}
									icon={<PlusOutlined />}
								>
									Add field
								</Button>

								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
