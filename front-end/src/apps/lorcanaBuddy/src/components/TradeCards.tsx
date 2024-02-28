import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { DeckCardInput } from "./DeckCardInput";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { supabase } from "../../../../supabase/supabaseClient";
const { TextArea } = Input;

type TProps = {
	wave: number;
};

export const TradeCards = ({ wave }: TProps) => {
	const { auth, userId, refreshLorcanaCardImage, setRefreshLorcanaCardImage } =
		useContext(AuthContext);
	const [numberOfCards, setNumberOfCards] = useState<number>(0);
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
	const [isSpaceClicked, setIsSpaceClicked] = useState<boolean>(false);
	const [cardImageUrl, setCardImageUrl] = useState<string>("");
	const [form] = Form.useForm();
	const [newCards, setNewCards] = useState<string[]>([]);

	const handleExcelInput = (input: string) => {
		const values = input.split("\n");
		console.log("INPUT", values);
		setNewCards(values);
	};
	const handleSubmit = () => {
		console.log("userIDDD", userId);
		let uploadedCards: any[] = [];
		let failedToUploadCards: any[] = [];
		if (auth) {
			newCards.map((card: any) => {
				const uploadCardToSupabase = async () => {
					const { data, error } = await supabase
						.from("lorcana_user_cards")
						.insert([
							{
								user_id: userId,
								is_foil: true,
								card_number: Number(card),
								wave: 3,
								card_id: `3-${card}`,
							},
						])
						.select();
					if (error) {
						console.error(error);
						console.error("card ERROR NEED TO RETRY", card.cardNumber);
						failedToUploadCards.push(card.number);
					} else {
						uploadedCards.push(data);
					}
				};
				uploadCardToSupabase();
			});
		}
		console.log("Deck Input on Finish:");
		console.log("Uploaded Cards", uploadedCards.length, uploadedCards);
		console.log("Failed Cards", failedToUploadCards);
	};
	const onFinish = (values: any) => {
		console.log("userIDDD", userId);
		let uploadedCards: any[] = [];
		let failedToUploadCards: any[] = [];
		if (auth) {
			values.cards.map((card: any) => {
				const uploadCardToSupabase = async () => {
					const { data, error } = await supabase
						.from("lorcana_user_cards_trade_away")
						.insert([
							{
								user_id: userId,
								is_foil: card.isFoil,
								card_number: card.cardNumber,
								wave: wave,
								card_id: `${wave}-${card.cardNumber}`,
							},
						])
						.select();
					if (error) {
						console.error(error);
						console.error("card ERROR NEED TO RETRY", card.cardNumber);
						failedToUploadCards.push(card.number);
					} else {
						uploadedCards.push(data);
					}
				};
				uploadCardToSupabase();
			});
		}
		console.log("Deck Input on Finish:");
		console.log("Uploaded Cards", uploadedCards.length, uploadedCards);
		console.log("Failed Cards", failedToUploadCards);
	};

	// const spaceDownHandler = (event: KeyboardEvent) => {
	// 	// console.log("before space clicked");
	// 	if (event.code === "Space" || event.code === "KeyV") {
	// 		event.preventDefault();
	// 		setIsSpaceClicked(true);
	// 	}
	// };

	// useEffect(() => {
	// 	// console.log("# of cards", numberOfCards);
	// }, [numberOfCards]);

	// useEffect(() => {
	// 	document.addEventListener("keydown", spaceDownHandler);
	// 	return () => document.removeEventListener("keydown", spaceDownHandler);
	// }, []);

	// useEffect(() => {
	// 	const deckForm = document.getElementById("deckForm");
	// 	if (deckForm?.contains(document.activeElement) && isSpaceClicked) {
	// 		setIsSpaceClicked(false);
	// 		setCurrentCardIndex(currentCardIndex + 1);
	// 	}
	// }, [isSpaceClicked]);

	// useEffect(() => {
	// 	console.log("currentCardIndex: ", currentCardIndex);
	// 	if (currentCardIndex >= numberOfCards) {
	// 		const addButtonElement = document.getElementById("theAddButton");
	// 		addButtonElement?.click();
	// 	}
	// 	setRefreshLorcanaCardImage(!refreshLorcanaCardImage);
	// }, [currentCardIndex]);

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};

	return (
		<div>
			{/* <h1>Set {wave}</h1> */}
			<Form
				form={form}
				name="dynamic_form_item"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{ maxWidth: "800px", margin: "auto" }}
				id="deckForm"
			>
				{/* <Form.List name={"cards"}>
					{(fields, { add, remove }, { errors }) => (
						<>
							<Space style={{ width: "800px", flexWrap: "wrap" }}>
								{numberOfCards > 0 &&
									fields.map((field, index) => (
										<div key={index}>
											<DeckCardInput
												wave={wave}
												field={field}
												index={index}
												remove={remove}
												setCurrentCardIndex={setCurrentCardIndex}
												currentCardIndex={currentCardIndex}
											/>

											<MinusCircleOutlined
												className="dynamic-delete-button"
												style={{
													color: "white",
													paddingLeft: "10px",
												}}
												onClick={() => {
													remove(field.name);
													setNumberOfCards(numberOfCards - 1);
												}}
											/>
										</div>
									))}
							</Space>
							<Form.Item>
								<Button
									id="theAddButton"
									type="dashed"
									onClick={() => {
										add();
										setNumberOfCards(numberOfCards + 1);
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
				</Form.Item> */}

				<TextArea
					placeholder="excel input"
					onChange={(e) => handleExcelInput(e.target.value)}
				/>
				<Button onClick={() => handleSubmit()}>Submit</Button>
			</Form>
		</div>
	);
};
