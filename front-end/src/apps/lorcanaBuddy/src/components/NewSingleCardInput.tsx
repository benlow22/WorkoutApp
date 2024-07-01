import { CloseOutlined } from "@ant-design/icons";
import { Form, FormInstance, FormListFieldData, Input, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { NewSmallCardImageAboveInput } from "./NewSmallCardImageAboutInput";

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
	const [isFoil, setIsFoil] = useState<boolean>(false);
	const isFoilFromField = form.getFieldValue(["deckInput", index, "isFoil"]);

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
				<NewSmallCardImageAboveInput wave={form.getFieldValue("wave")} num={form.getFieldValue(["deckInput", index, "cardNumber"])} />
			</div>
			<Form.Item noStyle name={[field.name, "cardNumber"]}>
				<Input
					placeholder="Card #"
					id={`card${index}`}
					maxLength={3}
					onFocus={(e) => {
						setCurrentCardIndex(index);
					}}
					onChange={(e) => {
						setCardNumber(e.target.value);
					}}
				/>
			</Form.Item>
			<Form.Item noStyle name={[field.name, "isFoil"]} initialValue={false}>
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
