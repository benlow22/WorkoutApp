import { CloseOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, Select, Space, Switch, Typography } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { DeckCardInput } from "./DeckCardInput";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { v4 as uuidv4, v4 } from "uuid";
import { NewDeckCardInput } from "./NewDeckCardInput";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { SingleCardInput } from "./SingleCardInput";
import { NewSingleCardInput } from "./NewSingleCardInput";

type TProps = {
	wave: number;
};

type TCardsToUpload = {
	user_id: string;
	is_foil: boolean;
	card_number: string;
	set_num: number;
	card_id: string;
	transaction_id: string;
};
export const createTransaction = (transactionType: string, numberOfCards: number, userId: string) => {
	return { transaction_type: transactionType, number_of_cards: numberOfCards, user_id: userId };
};

export const NewInputFormList = () => {
	const { auth, userId, supabase } = useContext(AuthContext);
	const [numberOfCards, setNumberOfCards] = useState<number>(1);
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(1);
	const [isSpaceClicked, setIsSpaceClicked] = useState<boolean>(false);
	const [waveFilter, setWaveFilter] = useState<number>(0);

	const addButtonHtml = document.getElementById("addButton");

	const [form] = Form.useForm();
	const transactionId = v4();

	const onFinish = (values: any) => {
		let validCardCounter = 0;
		const cardsToUpload = values.cards
			.filter((card: any) => card.cardNumber)
			.map((card: any) => {
				if (card.cardNumber) {
					validCardCounter += 1;
					return {
						user_id: userId,
						is_foil: card.isFoil,
						card_number: card.cardNumber,
						set_num: waveFilter,
						card_id: `${waveFilter}-${card.cardNumber}`,
						transaction_id: transactionId,
					};
				}
			});
		// const transaction = createTransaction("addCards", numberOfCards, userId);
		console.log("cards to upload", cardsToUpload);
		// let uploadedCards: any[] = [];
		// let failedToUploadCards: any[] = [];
		const uploadCards = async (cards: TCardsToUpload[]) => {
			try {
				const { data, error } = await supabase.from("new_user_cards").insert(cards).select();
				if (data) {
					console.log("Cards made it through:", data);
				} else {
					console.log("CARD UPLOAD", error);
				}
			} catch (err) {
				console.log(err);
			}
		};
		const uploadTransaction = async () => {
			if (auth) {
				try {
					const { data, error } = await supabase
						.from("new_transactions")
						.insert([{ transaction_type: "addCards", number_of_cards: validCardCounter, user_id: userId, id: transactionId }])
						.select();
					if (data) {
						console.log("Transaction uploaded ", data);
						const transactionId = data[0].id;

						uploadCards(cardsToUpload);
					} else {
						console.log("ERRRROR", error);
					}
				} catch (err) {
					console.log(err);
					console.log("asdfadsdfasdf");
				}
			}
		};

		uploadTransaction();
	};

	const spaceDownHandler = (event: KeyboardEvent) => {
		if (event.code === "Space") {
			event.preventDefault();
			setIsSpaceClicked(true);
		}
	};

	useEffect(() => {
		// add spacebar listener
		document.addEventListener("keydown", spaceDownHandler);
		return () => document.removeEventListener("keydown", spaceDownHandler);
	}, []);

	useEffect(() => {
		// check if input is selected; will not break if space is pressed outside of form
		const deckForm = document.getElementById("deckForm");
		if (deckForm?.contains(document.activeElement) && isSpaceClicked) {
			// if the last input is selected
			if (currentCardIndex === numberOfCards - 1) {
				// add another input via space
				if (addButtonHtml) addButtonHtml.click();
				setNumberOfCards(numberOfCards + 1);
			}
			// focus new element
			setCurrentCardIndex(currentCardIndex + 1);
		}
		setIsSpaceClicked(false);
	}, [isSpaceClicked]);

	useEffect(() => {
		// focus new element made
		const nextInputToFocus = document.getElementById(`card${currentCardIndex}`);
		if (nextInputToFocus) {
			nextInputToFocus.focus();
		}
	}, [currentCardIndex]);

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};

	return (
		<div>
			<Form
				form={form}
				name="deck_card_input"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{ maxWidth: "800px", margin: "auto", color: "black" }}
				id="deckForm"
				initialValues={{ deck_input: [{}], transaction_id: transactionId, deck_list: [], user_id: userId }}
			>
				<Form.Item name="user_id" hidden></Form.Item>
				<Form.Item name="transaction_id" hidden></Form.Item>
				<Form.Item name="wave">
					<Select
						placeholder="Select Wave"
						style={{ width: 220 }}
						onChange={(value: number) => {
							setWaveFilter(value);
						}}
						options={[
							{ value: 1, label: "1. The First Chapter" },
							{ value: 2, label: "2. Rise of the Floodborn" },
							{ value: 3, label: "3. Into the Inklands" },
							{ value: 4, label: "4. Ursula's Return" },
						]}
					/>
					{/* <InputNumber value={wave} /> */}
				</Form.Item>
				{waveFilter > 0 && (
					<Form.List name="deck_input">
						{(fields, { add, remove, move }) => (
							<div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
								<div style={{ flexDirection: "row", display: "flex", width: "800px", flexWrap: "wrap" }}>
									{fields.map((field, index) => (
										<NewSingleCardInput
											field={field}
											index={index}
											setCurrentCardIndex={setCurrentCardIndex}
											numberOfCards={numberOfCards}
											currentCardIndex={currentCardIndex}
											setNumberOfCards={setNumberOfCards}
											remove={remove}
											wave={waveFilter}
											key={index}
											move={move}
											form={form}
										/>
									))}
								</div>
								<Button
									id="addButton"
									type="dashed"
									onClick={() => {
										add(), setNumberOfCards(numberOfCards + 1);
									}}
									block
								>
									+ Add Card
								</Button>
							</div>
						)}
					</Form.List>
				)}
				<Form.Item noStyle shouldUpdate>
					{() => (
						<Typography style={{ color: "white", textAlign: "start" }}>
							<pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
						</Typography>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit ---- {numberOfCards} Cards {}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
