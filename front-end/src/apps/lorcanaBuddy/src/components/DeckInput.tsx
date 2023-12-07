import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { DeckCardInput } from "./DeckCardInput";

type TProps = {
	isFoil?: boolean;
	rarities?: string[];
	wave: number;
	index?: number;
};

export const DeckInput = ({ wave }: TProps) => {
	const [numberOfCards, setNumberOfCards] = useState<number>(0);
	const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
	const [isSpaceClicked, setIsSpaceClicked] = useState<boolean>(false);
	const [cardImageUrl, setCardImageUrl] = useState<string>("");

	const onFinish = (values: any) => {
		console.log("Deck Input onFINISH:", values);
	};

	const spaceDownHandler = (event: KeyboardEvent) => {
		console.log("before space clicked");
		if (event.code === "Space" || event.code === "KeyV") {
			event.preventDefault();
			setIsSpaceClicked(true);
		}
	};

	useEffect(() => {
		console.log("# of cards", numberOfCards);
	}, [numberOfCards]);

	useEffect(() => {
		document.addEventListener("keydown", spaceDownHandler);
		return () => document.removeEventListener("keydown", spaceDownHandler);
	}, []);

	useEffect(() => {
		const deckForm = document.getElementById("deckForm");
		if (deckForm?.contains(document.activeElement) && isSpaceClicked) {
			setIsSpaceClicked(false);
			setCurrentCardIndex(currentCardIndex + 1);
		}
	}, [isSpaceClicked]);

	useEffect(() => {
		console.log("currentCardIndex: ", currentCardIndex);
		if (currentCardIndex >= numberOfCards) {
			const addButtonElement = document.getElementById("theAddButton");
			addButtonElement?.click();
		}
	}, [currentCardIndex]);

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
				name="dynamic_form_item"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{ maxWidth: "800px", margin: "auto" }}
				id="deckForm"
			>
				<Form.List name={"Cards"}>
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
												style={{ color: "white", paddingLeft: "10px" }}
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
				</Form.Item>
			</Form>
		</div>
	);
};
