import { CloseOutlined, StarFilled } from "@ant-design/icons";
import { Button, Form, Image, Input, Space, message } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TLorcanaCard } from "../types/lorcana.types";
import { TCardCache } from "./AddItems";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";
import { SingleCardInput } from "./SingleCardInput";

type TProps = {
	wave: number;
	number: number;
	advanced: boolean;
	allCards: TCardCache;
};
export const BoosterPack = ({ wave, number, advanced, allCards }: TProps) => {
	const [boosterPackFormDisabled, setBoosterPackFormDisabled] = useState<boolean>(false);
	const [messageApi, contextHolder] = message.useMessage();
	const success = () => {
		messageApi.open({
			type: "success",
			content: "Cards have been saved",
		});
	};

	useEffect(() => {
		if (boosterPackFormDisabled) {
			success();
		}
	}, [boosterPackFormDisabled]);
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
		if (window.confirm("Please Confirm this boosterpack is correct")) {
			const boosterPackId = uuidv4();
			values.boosterPack.id = boosterPackId;
			console.log("Booster pack ", values);

			setBoosterPackFormDisabled(true);
		}
	};
	return (
		<Form
			onFinish={(values) => onFinish(values)}
			disabled={boosterPackFormDisabled}
		>
			{contextHolder}

			<Form.Item
				label={`${number + 1}`}
				style={{
					width: "800px",
					justifyContent: "space-evenly",
					textAlign: "center",
					margin: "auto",
					paddingBottom: "25px",
				}}
				labelCol={{ span: 1 }}
			>
				<Form.Item
					name={["boosterPack", "id"]}
					hidden={true}
				>
					<Input value={"1234134321341"}></Input>
				</Form.Item>
				<Space>
					<Form.Item
						name={["boosterPack", "coverCharacter"]}
						label="Cover Character"
						hidden={true}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["boosterPack", "code"]}
						label="Code"
						hidden={true}
					>
						<Input />
					</Form.Item>
				</Space>

				<Space className="booster-pack-12-cards">
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={1}
					/>
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={2}
					/>
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={3}
					/>
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={4}
					/>
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={5}
					/>
					<SingleCardInput
						rarities={["common"]}
						wave={wave}
						index={6}
					/>
					<SingleCardInput
						rarities={["uncommon"]}
						wave={wave}
						index={7}
					/>
					<SingleCardInput
						rarities={["uncommon"]}
						wave={wave}
						index={8}
					/>
					<SingleCardInput
						rarities={["uncommon"]}
						wave={wave}
						index={9}
					/>
					<SingleCardInput
						rarities={["rare", "superRare", "legendary"]}
						wave={wave}
						index={10}
					/>
					<SingleCardInput
						rarities={["rare", "superRare", "legendary"]}
						wave={wave}
						index={11}
					/>
					<SingleCardInput
						rarities={["foil", "enchanted"]}
						wave={wave}
						isFoil={true}
						index={12}
					/>
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
			</Form.Item>
		</Form>
	);
};
