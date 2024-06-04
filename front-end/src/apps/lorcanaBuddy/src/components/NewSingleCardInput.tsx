import { CloseOutlined } from "@ant-design/icons";
import { Form, FormInstance, FormListFieldData, Input, Space, Switch } from "antd";
import { useContext, useEffect, useState } from "react";
import { NewSmallCardImageAboveInput } from "./NewSmallCardImageAboutInput";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
// import { getImageUrl } from "../utils/image-util";
// import { LorcanaCards } from "./LorcanaCards";

type TProps = {
	field: FormListFieldData;
	index: number;
	setCurrentCardIndex: (index: number) => void;
	numberOfCards: number;
	currentCardIndex: number;
	setNumberOfCards: (index: number) => void;
	remove: (index: number) => void;
	wave: number;
	move: (index: number, moveToIndex: number) => void;
	form: FormInstance<any>;
};
export const NewSingleCardInput = ({
	field,
	index,
	setCurrentCardIndex,
	numberOfCards,
	currentCardIndex,
	setNumberOfCards,
	remove,
	wave,
	move,
	form,
}: TProps) => {
	const [cardNumber, setCardNumber] = useState<string>();
	const [imageUrl, setimageUrl] = useState<string>("/lorcanaRarity/lorcana-cardback.jpg");
	const [isFoil, setIsFoil] = useState<boolean>(false);
	const cardNumberFromField = form.getFieldValue(["deck_input", index, "card_number"]);
	const isFoilFromField = form.getFieldValue(["deck_input", index, "is_foil"]);

	const { lorcanaCards } = useContext(AuthContext);

	useEffect(() => {
		console.log("getting value after delete", form.getFieldValue(["deck_input", index, "card_number"]));
		// getImageUrl(cardNumberFromField);
	}, [form.getFieldValue(["deck_input", index, "card_number"]), index]);

	return (
		<Space key={field.key} style={{ display: "flex", width: "100px", flexWrap: "wrap", justifyContent: "center", margin: "10px 15px" }}>
			<div
				style={{
					textAlign: "start",
				}}
			>
				{isFoilFromField && (
					<img
						src="/lorcanaRarity/foilFilter.png"
						style={{ position: "absolute", width: "100px", zIndex: "3", opacity: "0.45", filter: "contrast(100%)", borderRadius: "5px" }}
					/>
				)}
				<NewSmallCardImageAboveInput wave={wave} num={form.getFieldValue(["deck_input", index, "card_number"])} />
			</div>
			<Form.Item noStyle name={[field.name, "card_number"]}>
				<Input
					placeholder="Card #"
					id={`card${index}`}
					onFocus={(e) => {
						setCurrentCardIndex(index);
						console.log(
							"this card is focus #",
							index + 1,
							"# of card",
							numberOfCards,
							"currentCardIndex",
							currentCardIndex,
							"current value",
							e.target.value
						);
					}}
					onChange={(e) => {
						setCardNumber(e.target.value);
					}}
				/>
			</Form.Item>
			<p>WOAHS {form.getFieldValue(["deck_input", index, "card_number"])}</p>
			<Form.Item noStyle name={[field.name, "is_foil"]} initialValue={false}>
				<Switch
					checkedChildren="foil"
					style={{ width: "100px" }}
					unCheckedChildren="non-foil"
					onChange={() => setIsFoil(!isFoil)}
					defaultChecked={isFoilFromField}
				></Switch>
			</Form.Item>
			<>
				<CloseOutlined
					onClick={() => {
						remove(field.name);
						move(index, numberOfCards);
						setNumberOfCards(numberOfCards - 1);
					}}
					style={{ color: "red" }}
				/>
			</>
		</Space>
	);
};
