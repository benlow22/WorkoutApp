import { CloseOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, Space, Switch } from "antd";
import { useContext, useState } from "react";
import { NewSmallCardImageAboveInput } from "./NewSmallCardImageAboutInput";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
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
}: TProps) => {
	const [cardNumber, setCardNumber] = useState<string>();
	const [imageUrl, setimageUrl] = useState<string>("/lorcanaRarity/lorcana-cardback.jpg");
	const [isFoil, setIsFoil] = useState<boolean>(false);

	const { lorcanaCards } = useContext(AuthContext);

	const getimageUrl = (cardNumber: string) => {
		if (cardNumber) {
			const card = lorcanaCards.filter((card) => card.card_num === cardNumber && card.set_num === wave);
			setimageUrl(card[0] ? card[0].image : "/lorcanaRarity/lorcana-cardback.jpg");
		} else {
			setimageUrl("/lorcanaRarity/lorcana-cardback.jpg");
		}
	};

	return (
		<Space key={field.key} style={{ display: "flex", width: "100px", flexWrap: "wrap", justifyContent: "center", margin: "10px 15px" }}>
			<div
				style={{
					textAlign: "start",
				}}
			>
				{isFoil && imageUrl !== "/lorcanaRarity/lorcana-cardback.jpg" && (
					<img
						src="/lorcanaRarity/foilFilter.png"
						style={{ position: "absolute", width: "100px", zIndex: "3", opacity: "0.45", filter: "contrast(100%)" }}
					/>
				)}
				<NewSmallCardImageAboveInput imageUrl={imageUrl} />
			</div>
			<Form.Item noStyle name={[field.name, "card_number"]}>
				<Input
					placeholder="Card #"
					id={`card${index}`}
					onFocus={() => {
						console.log("this card is focus #", index + 1, "# of card", numberOfCards, "currentCardIndex", currentCardIndex),
							setCurrentCardIndex(index);
					}}
					onChange={(e) => {
						setCardNumber(e.target.value);
						getimageUrl(e.target.value);
					}}
				/>
			</Form.Item>
			<Form.Item noStyle name={[field.name, "is_foil"]} initialValue={false}>
				<Switch checkedChildren="foil" style={{ width: "100px" }} unCheckedChildren="non-foil" onChange={() => setIsFoil(!isFoil)}></Switch>
			</Form.Item>
			<>
				<CloseOutlined
					onClick={() => {
						remove(field.name);
						setNumberOfCards(numberOfCards - 1);
					}}
					style={{ color: "red" }}
				/>
			</>
		</Space>
	);
};
