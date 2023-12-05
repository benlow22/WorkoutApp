import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	wave: number;
	number: number;
};
export const BoosterPack = ({ wave, number }: TProps) => {
	const boosterPackId = uuidv4();
	return (
		<Form.Item label={`BoosterPack ${number}`} name={boosterPackId}>
			<Space>
				<Form.Item name="card 1">
					<Input prefix={<UserOutlined />}></Input>
				</Form.Item>
				<Form.Item name="card 2">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 3">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 4">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 5">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 6">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 7">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 8">
					<Input></Input>
				</Form.Item>
				<Form.Item name="card 9">
					<Input></Input>
				</Form.Item>
			</Space>
			{/* <Form.List name={[boosterPackId, "list"]}>
				{(subFields) => (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: 16,
						}}
					>
						<Space key={subField.key}>
							<Form.Item noStyle name={[subField.name, "first"]}>
								<Input placeholder="first" />
							</Form.Item>
							<Form.Item noStyle name={[subField.name, "second"]}>
								<Input placeholder="second" />
							</Form.Item>
							<CloseOutlined
								onClick={() => {
									subOpt.remove(subField.name);
								}}
							/>
						</Space>
					</div>
				)}
			</Form.List> */}
		</Form.Item>
	);
};
