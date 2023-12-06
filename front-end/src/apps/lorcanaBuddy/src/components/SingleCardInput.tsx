import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache } from "../pages/addItems/addItems";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

type TProps = {
	isFoil?: boolean;
	rarities: string[];
	wave?: string;
};

const getIconUrlsFromRarities = (rarities: string[]) => {
	return rarities.map((rarity) => {
		if (rarity === "unknown ") {
			// unknown image url TBD
			return ``;
		}
		return `/lorcanaRarity/${rarity}Icon.jpeg`;
	});
};

export const SingleCardInput = ({ rarities, isFoil, wave }: TProps) => {
	const [imageUrl, setImageUrl] = useState<string>("");

	const iconUrls = getIconUrlsFromRarities(rarities);
	const getImage = (setter: React.Dispatch<React.SetStateAction<string>>, cardNumber: string) => {
		const cardId = `${wave}-${cardNumber}`;
		setter(allCards[cardId].imageUrl);
	};
	return (
		<Form.Item
			name="card 2"
			style={{ textAlign: "center" }}
		>
			<SmallCardImageAboveInput imageUrl={imageUrl} />
			<Input
				style={{ width: "50px" }}
				onChange={(e) => {
					getImage(setImageUrl, e.target.value);
				}}
			/>
			{iconUrls.map((iconUrl) => (
				<Image
					src={iconUrl}
					style={{
						width: "20px",
					}}
					preview={false}
				/>
			))}
		</Form.Item>
	);
};
