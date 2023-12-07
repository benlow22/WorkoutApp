import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
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
	const [arrOfInputs, setArrOfInputs] = useState<number[]>([]);

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
		if (isSpaceClicked) {
			setIsSpaceClicked(false);
			setCurrentCardIndex(currentCardIndex + 1);
		}
	}, [isSpaceClicked]);

	useEffect(() => {
		console.log("currentCardIndex: ", currentCardIndex);
		if (currentCardIndex >= numberOfCards) {
			const buttty = document.getElementById("theAddButton");
			buttty?.click();
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
			<h1>Set {wave}</h1>
			<Form
				name="dynamic_form_item"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				style={{ maxWidth: 600 }}
			>
				<Form.List
					name="names"
					rules={[
						{
							validator: async (_, names) => {
								if (!names || names.length < 2) {
									return Promise.reject(new Error("At least 2 passengers"));
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<DeckCardInput
									field={field}
									index={index}
									remove={remove}
									setCurrentCardIndex={setCurrentCardIndex}
									currentCardIndex={currentCardIndex}
								/>
							))}
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
