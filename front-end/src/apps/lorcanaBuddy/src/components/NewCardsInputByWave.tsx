import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { DeckCardInput } from "./DeckCardInput";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { v4 as uuidv4, v4 } from "uuid";
import { NewDeckCardInput } from "./NewDeckCardInput";

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

export const NewCardsInputByWave = ({ wave }: TProps) => {
	const { auth, userId, refreshLorcanaCardImage, supabase } = useContext(AuthContext);
	const [numberOfCards, setNumberOfCards] = useState<number>(0);
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
	const [isSpaceClicked, setIsSpaceClicked] = useState<boolean>(false);
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		let validCardCounter = 0;
		const transactionId = uuidv4();
		const cardsToUpload = values.cards
			.filter((card: any) => card.cardNumber)
			.map((card: any) => {
				if (card.cardNumber) {
					validCardCounter += 1;
					return {
						user_id: userId,
						is_foil: card.isFoil,
						card_number: card.cardNumber,
						set_num: wave,
						card_id: `${wave}-${card.cardNumber}`,
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

		// uploadCards();
		// async function uploadTransaction( ) {}
		// if (auth) {
		// 	values.cards.map((card: any) => {
		// 		console.log(card);
		// 		const uploadCardToSupabase = async () => {
		// 			const { data, error } = await supabase
		// 				.from("lorcana_user_cards")
		// 				.insert([
		// 					{
		// 						user_id: userId,
		// 						is_foil: card.isFoil,
		// 						card_number: card.cardNumber,
		// 						wave: wave,
		// 						card_id: `${wave}-${card.cardNumber}`,
		// 					},
		// 				])
		// 				.select();
		// 			if (error) {
		// 				console.error(error);
		// 				console.error("card ERROR NEED TO RETRY", card.cardNumber);
		// 				failedToUploadCards.push(card.number);
		// 			} else {
		// 				uploadedCards.push(data);
		// 			}
		// 		};
		// 		uploadCardToSupabase();
		// 	});
		// }
		// console.log("Deck Input on Finish:");
		// console.log("Uploaded Cards", uploadedCards.length, uploadedCards);
		// console.log("Failed Cards", failedToUploadCards);
	};

	const spaceDownHandler = (event: KeyboardEvent) => {
		// console.log("before space clicked");
		if (
			event.code === "Space"
			//  || event.code === "KeyV"
		) {
			event.preventDefault();
			setIsSpaceClicked(true);
		}
	};

	// useEffect(() => {
	// 	// console.log("# of cards", numberOfCards);
	// }, [numberOfCards]);

	useEffect(() => {
		document.addEventListener("keydown", spaceDownHandler);
		return () => document.removeEventListener("keydown", spaceDownHandler);
	}, []);

	useEffect(() => {
		const deckForm = document.getElementById("deckForm");
		if (deckForm?.contains(document.activeElement) && isSpaceClicked) {
			setIsSpaceClicked(false);
			setCurrentCardIndex(currentCardIndex + 1);
			////
			// if (currentCardIndex === numberOfCards) {
			// 	const addButtonElement = document.getElementById("theAddButton");
			// 	addButtonElement?.click();
			// 	setNumberOfCards(numberOfCards + 1);
			// }
		}
	}, [isSpaceClicked]);

	useEffect(() => {
		console.log("currentCardIndex: ", currentCardIndex);
		if (currentCardIndex >= numberOfCards) {
			const addButtonElement = document.getElementById("theAddButton");
			addButtonElement?.click();
			setNumberOfCards(numberOfCards + 1);
		}
		console.log("CurrentCardIndex when space is pressed", currentCardIndex);
		console.log("current Cards", numberOfCards);
		// setRefreshLorcanaCardImage(!refreshLorcanaCardImage);
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
				name="dynamic_form_item"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{ maxWidth: "800px", margin: "auto" }}
				id="deckForm"
			>
				<Form.List name={"cards"}>
					{(fields, { add, remove }, { errors }) => (
						<>
							<Space style={{ width: "800px", flexWrap: "wrap" }}>
								{numberOfCards > 0 &&
									fields.map((field, index, name) => (
										<div key={index} name->
											<NewDeckCardInput
												wave={wave}
												field={field}
												index={index}
												remove={remove}
												setCurrentCardIndex={setCurrentCardIndex}
												currentCardIndex={currentCardIndex}
											/>

											{/* <MinusCircleOutlined
												className="dynamic-delete-button"
												style={{ color: "white", paddingLeft: "10px" }}
												onClick={() => {
													remove(field.name);
													setNumberOfCards(currentCardIndex - 1);
													setCurrentCardIndex(1);
												}}
											/> */}
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
									Add Card
								</Button>

								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit ---- {numberOfCards} Cards
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
