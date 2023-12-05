import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

type TProps = {
	boosterPackId: string;
	number: number;
};
export const BoosterPack = ({ boosterPackId, number }: TProps) => {
	return (
		<Form.Item label={`BoosterPack ${number}`} name={boosterPackId}>
			<Space>
				<Form.Item name="card 1">
					<Input></Input>
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
