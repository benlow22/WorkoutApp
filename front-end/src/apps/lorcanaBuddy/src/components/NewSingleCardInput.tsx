import { CloseOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, Space, Switch } from "antd";

type TProps = {
	field: FormListFieldData;
	index: number;
	setCurrentCardIndex: (index: number) => void;
	numberOfCards: number;
	currentCardIndex: number;
	setNumberOfCards: (index: number) => void;
	remove: (index: number) => void;
};
export const NewSingleCardInput = ({ field, index, setCurrentCardIndex, numberOfCards, currentCardIndex, setNumberOfCards, remove }: TProps) => {
	return (
		<Space key={field.key}>
			<>{index}</>
			{/* <NewSmallCardImageAboveInput /> */}
			<Form.Item noStyle name={[field.name, "card_number"]}>
				<Input
					placeholder="Card #"
					id={`card${index}`}
					onFocus={() => {
						console.log("this card is focus #", index + 1, "# of card", numberOfCards, "currentCardIndex", currentCardIndex),
							setCurrentCardIndex(index);
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
