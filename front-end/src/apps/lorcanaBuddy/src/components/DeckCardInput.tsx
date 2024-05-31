import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, InputNumber, InputRef, Switch } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { getImageUrlFromCardNumber } from "./SingleCardInput";
import { TCardCache, getAllCards } from "../pages/addItems/AddItems";
import { AuthContext } from "../../../../contexts/AuthProvider";
import set4cards from "./wave4.json";
type TProps = {
	field: FormListFieldData;
	index: number;
	remove: (index: number) => void;
	setCurrentCardIndex: (index: number) => void;
	currentCardIndex: number;
	wave: number;
};

export const DeckCardInput = ({ field, index, remove, setCurrentCardIndex, currentCardIndex, wave }: TProps) => {
	const { auth, userId, refreshLorcanaCardImage } = useContext(AuthContext);

	const [imageUrl, setImageUrl] = useState<string | undefined>("");
	const [cardInput, setCardInput] = useState<number | null>();

	const [isFoil, setIsFoil] = useState<boolean>(false);
	const [allCardsCache, setAllCardsCache] = useState<TCardCache>({});

	const inputRef = useRef<InputRef>(null);

	useEffect(() => {
		async function fetchAllCards() {
			let response = getAllCards();
			const retrievedCards = await response;
			if (retrievedCards) {
				setAllCardsCache(retrievedCards);
			}
		}
		fetchAllCards();
	}, []);

	useEffect(() => {
		// getImageUrlFromCardNumber(setImageUrl, Number(cardInput), wave, allCardsCache, isFoil);
		// console.log("card input:", cardInput);
		// console.log("WAVE", wave);
		if (cardInput && cardInput > 0 && cardInput < 216) {
			const newTestImage = set4cards.filter((card) => card.Set_Num === wave && card.Card_Num === cardInput);
			// console.log("NEW test image:", newTestImage[0].Image);
			cardInput ? setImageUrl(newTestImage[0].Image) : setImageUrl("");
		} else {
			setImageUrl("/public/lorcanaRarity/lorcana-cardback.jpg");
		}
	}, [cardInput, isFoil, refreshLorcanaCardImage]);

	// focus on input when component is made
	useEffect(() => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	// used when space is pressed to dynamically change focus to next input
	useEffect(() => {
		if (currentCardIndex === index) {
			inputRef.current?.focus();
			inputRef.current!.focus({
				preventScroll: true,
			});
		}
	}, [currentCardIndex, inputRef]);

	const handleCardNumberInput = (value: number | null) => {
		// console.log("ASDF, ", value);
		if (value && value > 216) {
			setCardInput(0);
		} else {
			setCardInput(value);
		}
	};

	const validateMessage = {
		required: "card # between 1 and 216 required",
	};
	return (
		<Form.Item
			required
			style={{
				display: "flex",
				justifyContent: "center",
				marginBottom: "0px",
				marginTop: "10px",
				width: "125px",
			}}
			className="deck-card"
			name={field.key}
		>
			<>
				<SmallCardImageAboveInput imageUrl={imageUrl} imageWidth="100px" wave={wave} />

				<div style={{ padding: "0px" }}>
					<Form.Item validateTrigger={["onChange", "onBlur"]} noStyle required name={[field.key, "cardNumber"]}>
						<Input
							ref={inputRef}
							key={index}
							placeholder="Card #"
							style={{ width: "100px", marginBottom: "0px" }}
							onFocus={() => {
								setCurrentCardIndex(index),
									inputRef.current!.focus({
										cursor: "all",
									});
							}}
							status={cardInput ? (cardInput > 216 ? "error" : "") : "warning"}
							maxLength={3}
							onChange={(e) => handleCardNumberInput(Number(e.target.value))}
							max={217}
						/>
					</Form.Item>
					<Form.Item style={{ width: "100px", marginBottom: "0px" }} name={[field.key, "isFoil"]} initialValue={false}>
						<Switch checkedChildren="foil" unCheckedChildren="non-foil" onClick={() => setIsFoil(!isFoil)} />
					</Form.Item>

					<Form.Item hidden={true} name={[field.key, "wave"]} initialValue={wave}>
						<Input />
					</Form.Item>
					{auth && (
						<Form.Item hidden={true} name={[field.key, "user_id"]} initialValue={userId}>
							<Input />
						</Form.Item>
					)}
				</div>
			</>
		</Form.Item>
	);
};
