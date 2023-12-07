import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

type TProps = {
	field: FormListFieldData;
	index: number;
	remove: (index: number) => void;
	setCurrentCardIndex: (index: number) => void;
	currentCardIndex: number;
};

export const DeckCardInput = ({ index, remove, setCurrentCardIndex, currentCardIndex }: TProps) => {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [cardInput, setCardInput] = useState<string>("");
	const [isFoil, setIsFoil] = useState<boolean>(false);

	const inputRef = useRef<InputRef>(null);

	useEffect(() => {
		console.log("card input:", cardInput);
	}, [cardInput]);

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
		<Form.Item required={false}>
			<SmallCardImageAboveInput imageUrl={imageUrl} />

			<Form.Item
				validateTrigger={["onChange", "onBlur"]}
				noStyle
			>
				<Input
					placeholder="Card #"
					ref={inputRef}
					style={{ width: "100px" }}
					onFocus={() => {
						setCurrentCardIndex(index);
					}}
					onChange={(e) => setCardInput(e.target.value)}
				/>
			</Form.Item>
			<MinusCircleOutlined
				className="dynamic-delete-button"
				style={{ color: "white", paddingLeft: "10px" }}
			/>
		</Form.Item>
	);
};
