import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache, getAllCards } from "../pages/addItems/addItems";
import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

type TProps = {
	isFoil?: boolean;
	rarities: string[];
	wave?: number;
	index: number;
};

const getIconUrlsFromRarities = (rarities: string[]) => {
	return rarities.map((rarity) => {
		if (rarity === "unknown ") {
			// unknown image url TBD
			return ``;
		}
		if (rarity === "foil") {
			return `/lorcanaRarity/${rarity}Icon.png`;
		}
		return `/lorcanaRarity/${rarity}Icon.jpeg`;
	});
};
export const getImageUrlFromCardNumber = (setter: React.Dispatch<React.SetStateAction<string>>, cardNumber: number, wave: number, allCardsCache: TCardCache, isFoil: boolean) => {
	const cardId = `${wave}-${cardNumber}`;
	if (cardId in allCardsCache) {
		if (isFoil && wave === 1) {
			const regImageUrl = allCardsCache[cardId].imageUrl;
			const foilImageUrl = regImageUrl.replace("large", "foil");
			setter(foilImageUrl);
		} else {
			setter(allCardsCache[cardId].imageUrl);
		}
	} else {
		setter(`/lorcanaRarity/lorcana-cardback.jpg`);
	}
};

export const SingleCardInput = ({ rarities, isFoil, wave, index }: TProps) => {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [allCardsCache, setAllCardsCache] = useState<TCardCache>({});
	const [cardNumber, setCardNumber] = useState<number>();
	const iconUrls = getIconUrlsFromRarities(rarities);

	const getImageUrlFromCardNumber = (setter: React.Dispatch<React.SetStateAction<string>>, cardNumber: number, wave: number, allCardsCache: TCardCache) => {
		const cardId = `${wave}-${cardNumber}`;
		if (cardId in allCardsCache) {
			if (isFoil && wave === 1) {
				const regImageUrl = allCardsCache[cardId].imageUrl;
				const foilImageUrl = regImageUrl.replace("large", "foil");
				setter(foilImageUrl);
			} else {
				setter(allCardsCache[cardId].imageUrl);
			}
		} else {
			setter(`/lorcanaRarity/redXIcon.png`);
		}
	};

	const style = iconUrls.length > 2 ? { width: "15px" } : { width: "20px" };

	useEffect(() => {
		async function fetchAllCards() {
			let response = getAllCards();
			const retrievedCards = await response;
			if (retrievedCards) {
				setAllCardsCache(retrievedCards);
			}
		}
		fetchAllCards();
	}, []);

	const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		wave && getImageUrlFromCardNumber(setImageUrl, Number(e.target.value), wave, allCardsCache);
		setCardNumber(Number(e.target.value));
	};
	return (
		<>
			<SmallCardImageAboveInput
				imageUrl={imageUrl}
				imageWidth="50px"
			/>
			<Form.Item
				name={["boosterPack", "cards", `${index}`]}
				style={{ textAlign: "center" }}
			>
				<Input
					style={{ width: "50px", paddingBottom: "0px" }}
					onChange={(e) => handleCardNumberInput(e)}
					maxLength={3}
					value={cardNumber}
					className="card-number-input"
				/>
			</Form.Item>
			{iconUrls.map((iconUrl, index) => (
				<Image
					src={iconUrl}
					style={style}
					preview={false}
					key={index}
				/>
			))}
		</>
	);
};
