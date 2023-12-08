import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache } from "./AddItems";

type TProps = {
	imageUrl: string;
	imageWidth: string;
};

export const SmallCardImageAboveInput = ({ imageUrl, imageWidth }: TProps) => {
	return (
		<div style={{ minHeight: "70px" }}>
			<Image
				src={imageUrl}
				style={{
					width: imageWidth,
					borderRadius: "3px",
				}}
			/>
		</div>
	);
};
