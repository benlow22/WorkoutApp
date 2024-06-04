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
	const [imageurl, setImageUrl] = useState<string>("/lorcanaRarity/lorcana-cardback.jpg");

	const { auth, userId, refreshLorcanaCardImage, lorcanaCards } = useContext(AuthContext);

	const getImageUrl = (cardNumber: string) => {
		if (cardNumber) {
			const card = lorcanaCards.filter((card) => card.card_num === cardNumber && card.set_num === wave);
			setImageUrl(card[0] ? card[0].image : "/lorcanaRarity/lorcana-cardback.jpg");
		} else {
			setImageUrl("/lorcanaRarity/lorcana-cardback.jpg");
		}
	};

	return (
		<Space key={field.key}>
			<>{index}</>
			<NewSmallCardImageAboveInput imageUrl={imageurl} />
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
						getImageUrl(e.target.value);
					}}
				/>
			</Form.Item>
			<Form.Item noStyle name={[field.name, "is_foil"]} initialValue={false}>
				<Switch checkedChildren="foil" unCheckedChildren="non-foil"></Switch>
			</Form.Item>
			<CloseOutlined
				onClick={() => {
					remove(field.name);
					setNumberOfCards(numberOfCards - 1);
				}}
			/>
		</Space>
	);
};
