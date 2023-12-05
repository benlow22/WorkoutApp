import { CloseOutlined, StarFilled } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	wave: number;
	number: number;
};
export const BoosterPack = ({ wave, number }: TProps) => {
	const boosterPackId = uuidv4();
	return (
		<Form.Item
			label={`${number + 1}`}
			name={boosterPackId}
			style={{ width: "800px", justifyContent: "space-evenly" }}
			labelCol={{ span: 1 }}
		>
			<Space>
				<Form.Item name="card 1" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 2" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 3" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 4" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 5" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 6" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/commonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 7" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/uncommonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 8" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/uncommonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 9" style={{ textAlign: "center" }}>
					<Input style={{ width: "50px" }} />
					<Image
						src="/lorcanaRarity/uncommonIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item
					name="card 10"
					style={{ textAlign: "center", width: "75px" }}
				>
					<Input></Input>
					<Image
						src="/lorcanaRarity/rareIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
					<Image
						src="/lorcanaRarity/superRareIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
					<Image
						src="/lorcanaRarity/legendaryIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item
					name="card 11"
					style={{ textAlign: "center", width: "75px" }}
				>
					<Input></Input>
					<Image
						src="/lorcanaRarity/rareIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
					<Image
						src="/lorcanaRarity/superRareIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
					<Image
						src="/lorcanaRarity/legendaryIcon.jpeg"
						style={{
							width: "20px",
						}}
						preview={false}
					/>
				</Form.Item>
				<Form.Item name="card 12" style={{ textAlign: "center" }}>
					<Input
						style={{
							boxSizing: "border-box",
							border: "4px solid gold",
							width: "75px",
						}}
					></Input>
					<StarFilled style={{ color: "white" }} />
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
