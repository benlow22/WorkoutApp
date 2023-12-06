import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ProductTypes, SetName, TLorcanaCard } from "../types/lorcana.types";
import { useEffect, useState } from "react";
import { BoosterPack } from "./BoosterPack";
import { TCardCache } from "../pages/addItems/addItems";

type TProps = {
	imageUrl: string;
};

export const SmallCardImageAboveInput = ({ imageUrl }: TProps) => {
	return (
		<div style={{ height: "70px" }}>
			<Image
				src={imageUrl}
				style={{
					width: "50px",
					borderRadius: "3px",
				}}
			/>
		</div>
	);
};
