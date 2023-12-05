import { CloseOutlined, StarFilled } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TLorcanaCard } from "../types/lorcana.types";
import { TCardCache } from "../pages/addItems/addItems";

type TProps = {
	wave: number;
	number: number;
	advanced: boolean;
	allCards: TCardCache;
};
export const BoosterPack = ({ wave, number, advanced, allCards }: TProps) => {
	const boosterPackId = uuidv4();
	const [image1, setImage1] = useState<string>("");

	const findMiniImage = (
		setter: React.Dispatch<React.SetStateAction<string>>,
		cardNumber: string
	) => {
		console.log("cardId", `${wave}-${cardNumber}`);
		console.log("FATA", allCards);
		// setImage1();
	};
	return (
		<Form>
			<Form.Item
				label={`${number + 1}`}
				name={boosterPackId}
				style={{
					width: "800px",
					justifyContent: "space-evenly",
					textAlign: "center",
					margin: "auto",
				}}
				labelCol={{ span: 1 }}
			>
				<Space>
					<Form.Item
						name="character"
						label="Cover Character"
						hidden={true}
					>
						<Input />
					</Form.Item>
					<Form.Item name="booster code" label="Code" hidden={true}>
						<Input />
					</Form.Item>
				</Space>
				<Space>
					<Form.Item
						name="card 1"
						style={{ textAlign: "center" }}
						hidden={advanced}
					>
						<Image
							src={image1}
							style={{
								width: "20px",
							}}
							preview={false}
							placeholder={true}
						/>
						<Input
							style={{ width: "50px" }}
							onChange={(e) => {
								findMiniImage(setImage1, e.target.value);
							}}
						/>
						<Image
							src="/lorcanaRarity/commonIcon.jpeg"
							style={{
								width: "20px",
							}}
							preview={false}
						/>
					</Form.Item>
					<Form.Item
						name="card 2"
						style={{ textAlign: "center" }}
						hidden={advanced}
					>
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
					<Form.Item style={{ paddingBottom: "22px" }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
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
		</Form>
	);
};
