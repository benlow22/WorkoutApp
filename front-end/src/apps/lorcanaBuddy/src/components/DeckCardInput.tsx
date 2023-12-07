import { MinusCircleOutlined } from "@ant-design/icons";
import { Form, FormListFieldData, Input, InputRef } from "antd";
import { useEffect, useRef } from "react";

type TProps = {
	field: FormListFieldData;
	index: number;
	remove: (index: number) => void;
	setCurrentCardIndex: (index: number) => void;
	currentCardIndex: number;
};

export const DeckCardInput = ({ field, index, remove, setCurrentCardIndex, currentCardIndex }: TProps) => {
	const inputRef = useRef<InputRef>(null);

	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 4 },
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 20 },
		},
	};

	const formItemLayoutWithOutLabel = {
		wrapperCol: {
			xs: { span: 24, offset: 0 },
			sm: { span: 20, offset: 4 },
		},
	};
	useEffect(() => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	useEffect(() => {
		if (currentCardIndex === index) {
			inputRef.current?.focus();
		}
	}, [currentCardIndex, inputRef]);

	return (
		<Form.Item
			{...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
			label={index === 0 ? "Passengers" : ""}
			required={false}
			key={field.key}
		>
			<Form.Item
				{...field}
				validateTrigger={["onChange", "onBlur"]}
				rules={[
					{
						required: true,
						whitespace: true,
						message: "Please input passenger's name or delete this field.",
					},
				]}
				noStyle
			>
				<Input
					placeholder="passenger name"
					ref={inputRef}
					style={{ width: "60%" }}
					onFocus={() => {
						setCurrentCardIndex(index);
					}}
				/>
			</Form.Item>
			<MinusCircleOutlined
				className="dynamic-delete-button"
				onClick={() => remove(field.name)}
				style={{ color: "white" }}
			/>
		</Form.Item>
	);
};
