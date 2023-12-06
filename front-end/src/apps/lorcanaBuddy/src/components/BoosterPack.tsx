import { CloseOutlined, StarFilled } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TLorcanaCard } from "../types/lorcana.types";
import { TCardCache } from "../pages/addItems/addItems";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { SingleCardInput } from "./SingleCardInput";

type TProps = {
	wave: number;
	number: number;
	advanced: boolean;
	allCards: TCardCache;
};
export const BoosterPack = ({ wave, number, advanced, allCards }: TProps) => {
	const boosterPackId = uuidv4();
	const [image1, setImage1] = useState<string>("");
	const [image2, setImage2] = useState<string>("");
	const [image3, setImage3] = useState<string>("");
	const [image4, setImage4] = useState<string>("");
	const [image5, setImage5] = useState<string>("");
	const [image6, setImage6] = useState<string>("");
	const [image7, setImage7] = useState<string>("");
	const [image8, setImage8] = useState<string>("");
	const [image9, setImage9] = useState<string>("");
	const [image10, setImage10] = useState<string>("");
	const [image11, setImage11] = useState<string>("");
	const [image12, setImage12] = useState<string>("");

	const getImage = (setter: React.Dispatch<React.SetStateAction<string>>, cardNumber: string) => {
		const cardId = `${wave}-${cardNumber}`;
		setter(allCards[cardId].imageUrl);
	};

	const getFoilImage = (setter: React.Dispatch<React.SetStateAction<string>>, cardNumber: string) => {
		const cardId = `${wave}-${cardNumber}`;
		const regImageUrl = allCards[cardId].imageUrl;
		const foilImageUrl = regImageUrl.replace("-large.png", "-foil.png");
		setter(foilImageUrl);
	};

	const onFinish = (values: any) => {
		console.log("Booster pack ", values);
	};
	return (
		<Form onFinish={(values) => onFinish(values)}>
			<Form.Item
				label={`${number + 1}`}
				style={{
					width: "800px",
					justifyContent: "space-evenly",
					textAlign: "center",
					margin: "auto",
				}}
				labelCol={{ span: 1 }}
			>
				<Form.List name="boosterPack">
					{(fields) => (
						<div>
							<Form.Item
								name="id"
								hidden={true}
							>
								<Input value={boosterPackId}></Input>
							</Form.Item>
							<Form.List name="cards">
								{(sub) => (
									<div>
										<Space>
											<Form.Item
												name="character"
												label="Cover Character"
												hidden={true}
											>
												<Input />
											</Form.Item>
											<Form.Item
												name="booster code"
												label="Code"
												hidden={true}
											>
												<Input />
											</Form.Item>
										</Space>
										<Form.Item>
											<Form.List name="Cards">
												{(card) => (
													<>
														<Space>
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["uncommon"]} />
															<SingleCardInput rarities={["uncommon"]} />
															<SingleCardInput rarities={["uncommon"]} />
															<SingleCardInput rarities={["rare", "superRare", "legendary"]} />
															<SingleCardInput rarities={["rare", "superRare", "legendary"]} />
															<SingleCardInput rarities={["foil", "enchanted"]} />
															{/* 
															<Form.Item
																name="card 1"
																style={{ textAlign: "center" }}
																hidden={advanced}
															>
																<div style={{ height: "70px" }}>
																	<Image
																		src={image1}
																		style={{ width: "50px" }}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{ width: "50px" }}
																	onChange={(e) => {
																		getImage(setImage1, e.target.value);
																	}}
																/>
																<Image
																	src="/lorcanaRarity/commonIcon.jpeg"
																	style={{ width: "20px" }}
																	preview={false}
																/>
															</Form.Item>
															<SingleCardInput rarities={["common"]} />
															<SingleCardInput rarities={["legendary", "common"]} />
															<SingleCardInput rarities={["legendary", "common"]} />
															<SingleCardInput rarities={["legendary", "common"]} />
															<SingleCardInput rarities={["legendary", "common"]} />
															<SingleCardInput rarities={["legendary", "common"]} />
															<Form.Item
																name="card 2"
																style={{ textAlign: "center" }}
																hidden={advanced}
															>
																<SmallCardImageAboveInput imageUrl={image2} />
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage2, e.target.value);
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
																name="card 3"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image3}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage3, e.target.value);
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
																name="card 4"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image4}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage4, e.target.value);
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
																name="card 5"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image5}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage5, e.target.value);
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
																name="card 6"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image6}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage6, e.target.value);
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
																name="card 7"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image7}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage7, e.target.value);
																	}}
																/>
																<Image
																	src="/lorcanaRarity/uncommonIcon.jpeg"
																	style={{
																		width: "20px",
																	}}
																	preview={false}
																/>
															</Form.Item>
															<Form.Item
																name="card 8"
																style={{
																	textAlign: "center",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image8}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage8, e.target.value);
																	}}
																/>
																<Image
																	src="/lorcanaRarity/uncommonIcon.jpeg"
																	style={{
																		width: "20px",
																	}}
																	preview={false}
																/>
															</Form.Item>
															<Form.Item
																name="card 9"
																style={{
																	textAlign: "center",
																}}
															>
																{" "}
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image9}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage9, e.target.value);
																	}}
																/>
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
																style={{
																	textAlign: "center",
																	width: "50px",
																}}
															>
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image10}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage10, e.target.value);
																	}}
																></Input>
																<Image
																	src="/lorcanaRarity/rareIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
																<Image
																	src="/lorcanaRarity/superRareIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
																<Image
																	src="/lorcanaRarity/legendaryIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
															</Form.Item>
															<Form.Item
																name="card 11"
																style={{
																	textAlign: "center",
																	width: "50px",
																}}
															>
																{" "}
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image11}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getImage(setImage11, e.target.value);
																	}}
																></Input>
																<Image
																	src="/lorcanaRarity/rareIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
																<Image
																	src="/lorcanaRarity/superRareIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
																<Image
																	src="/lorcanaRarity/legendaryIcon.jpeg"
																	style={{
																		width: "15px",
																	}}
																	preview={false}
																/>
															</Form.Item>
															<Form.Item
																name="card 12"
																style={{
																	textAlign: "center",
																}}
															>
																{" "}
																<div
																	style={{
																		height: "70px",
																	}}
																>
																	<Image
																		src={image12}
																		style={{
																			width: "50px",
																		}}
																		placeholder={true}
																	/>
																</div>
																<Input
																	style={{
																		boxSizing: "border-box",
																		border: "4px solid gold",
																		width: "50px",
																	}}
																	onChange={(e) => {
																		getFoilImage(setImage12, e.target.value);
																	}}
																></Input>
																<Image
																	src="/lorcanaRarity/enchantedIcon.jpeg"
																	style={{
																		width: "20px",
																		position: "relative",
																		// top: "-2px",
																	}}
																	preview={false}
																/>
																<Image
																	src="/lorcanaRarity/foilIcon.png"
																	style={{
																		width: "19px",
																		position: "relative",
																		// top: "-2px",
																	}}
																	preview={false}
																/>
															</Form.Item> */}
															<Form.Item
																style={{
																	paddingTop: "45px",
																}}
															>
																<Button
																	type="primary"
																	htmlType="submit"
																>
																	Submit
																</Button>
															</Form.Item>
														</Space>
													</>
												)}
											</Form.List>
										</Form.Item>
									</div>
								)}
							</Form.List>
						</div>
					)}
				</Form.List>
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
