import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { getImageUrlFromCardNumber } from "./SingleCardInput";
import { TCardCache, getAllCards } from "../pages/addItems/addItems";

type TProps = {
	field: FormListFieldData;
	index: number;
	remove: (index: number) => void;
	setCurrentCardIndex: (index: number) => void;
	currentCardIndex: number;
	wave: number;
};

export const DeckCardInput = ({ index, remove, setCurrentCardIndex, currentCardIndex, wave }: TProps) => {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [cardInput, setCardInput] = useState<string>("");
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
		console.log("THE INDEX", index);
		fetchAllCards();
	}, []);

	useEffect(() => {
		getImageUrlFromCardNumber(setImageUrl, Number(cardInput), wave, allCardsCache, isFoil);
		console.log("card input:", cardInput);
	}, [cardInput, index]);

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
		}
	}, [currentCardIndex, inputRef]);

	return (
		<Form.Item
			required={false}
			style={{ display: "flex", justifyContent: "center" }}
		>
			<SmallCardImageAboveInput
				imageUrl={imageUrl}
				imageWidth="100px"
			/>
			<>
				<Form.Item
					validateTrigger={["onChange", "onBlur"]}
					noStyle
					name={index}
				>
					<Input
						key={index}
						placeholder="Card #"
						ref={inputRef}
						style={{ width: "100px" }}
						onFocus={() => {
							setCurrentCardIndex(index);
						}}
						maxLength={3}
						onChange={(e) => setCardInput(e.target.value)}
						value={cardInput}
					/>
				</Form.Item>
			</>
		</Form.Item>
	);
};
