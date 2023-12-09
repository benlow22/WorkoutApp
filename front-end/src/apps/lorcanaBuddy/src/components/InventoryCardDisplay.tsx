import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache, getAllCards } from "../pages/addItems/AddItems";

import { SmallCardImageAboveInput } from "./SmallCardImageAboveInput";

type TProps = {
	quantity: number;
	imageUrl: string;
	cardNumber: number;
	isFoil: boolean;
	wave: number;
};

export const InventoryCardDisplay = ({ cardNumber, quantity, imageUrl, isFoil, wave }: TProps) => {
	const updatedUrl = isFoil && wave === 1 ? imageUrl.replace("large", "foil") : imageUrl.replace("large", "small");
	return (
		<div className="inventory-card-display">
			<SmallCardImageAboveInput imageUrl={updatedUrl} imageWidth="75px" />
			<div className="card-info">
				<h4>Card Number : {cardNumber}</h4>
				<h5>Quantity = {quantity}</h5>
				{quantity > 4 && <h5>Extra = {quantity - 4}</h5>}
			</div>
		</div>
	);
};
