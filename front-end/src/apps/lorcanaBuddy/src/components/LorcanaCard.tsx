import React, { useEffect, useState } from "react";
import { TLorcanaCardData } from "../types/lorcana.types";
import { Button, Image, Input, Radio, Space, Tooltip } from "antd";
import {
	CheckCircleFilled,
	PlusCircleOutlined,
	PlusOutlined,
	StarFilled,
	StarOutlined,
} from "@ant-design/icons";
import { TCardStatus } from "../pages/browse/BrowsePage";
// import { TAmiiboCard } from "../types/types";

type TProps = {
	card: TLorcanaCardData;
	usersUpdatedCardStatuses: TCardStatus;
	setUsersUpdatedCardStatuses: React.Dispatch<
		React.SetStateAction<TCardStatus>
	>;
};

export const LorcanaCard = ({ card }: TProps) => {
	//
	const [quantityValue, setQuantityValue] = useState<number>(0);
	const handleQuantitySubtract = () => {
		if (quantityValue > 0) {
			setQuantityValue(quantityValue - 1);
		}
	};

	//current capped at 10
	const handleQuantityAdd = () => {
		if (quantityValue < 100) {
			setQuantityValue(quantityValue + 1);
		}
	};
	const handleQuantityChange = (event: any) => {
		setQuantityValue(Number(event.target.value));
	};
	// const [amiiboNameSize, setAmiiboNameSize] = useState("");

	// useEffect(() => {
	// 	if (card.name.length < 15) {
	// 		setAmiiboNameSize("");
	// 	} else if (name.length < 30) {
	// 		setAmiiboNameSize("two-lines");
	// 	} else {
	// 		setAmiiboNameSize("three-lines");
	// 	}
	// }, [name]);

	const [foilQuantityValue, setFoilQuantityValue] = useState<number>(0);
	const handleFoilQuantitySubtract = () => {
		if (foilQuantityValue > 0) {
			setFoilQuantityValue(foilQuantityValue - 1);
		}
	};
	//current capped at 10
	const handleFoilQuantityAdd = () => {
		if (foilQuantityValue < 100) {
			setFoilQuantityValue(foilQuantityValue + 1);
		}
	};
	const handleFoilQuantityChange = (event: any) => {
		setFoilQuantityValue(Number(event.target.value));
	};
	const [isFoilWishlist, setIsFoilWishList] = useState<boolean>(false);
	const [isWishlist, setIsWishlist] = useState<boolean>(false);

	return (
		<div className="lorcana-card">
			<Image
				src={
					foilQuantityValue > 0
						? card["image-urls"].foil
						: card["image-urls"].small
				}
				placeholder={
					<Image
						preview={false}
						src={
							foilQuantityValue > 0
								? card["image-urls"].foil
								: card["image-urls"].small
						}
						width={200}
					/>
				}
			/>
			<div className="quantity-buttons">
				<Tooltip title="Regular Card Counter" placement="top">
					<Space.Compact>
						<Button value="rv1" onClick={handleQuantitySubtract}>
							-
						</Button>
						<Input
							value={quantityValue}
							className="quantity-button"
							onChange={(event) => handleQuantityChange(event)}
						/>
						<Button value="rv3" onClick={handleQuantityAdd}>
							+
						</Button>
					</Space.Compact>
				</Tooltip>
			</div>
			<div className="foil-quantity-buttons">
				<Tooltip title="Foil Card Counter" placement="bottom">
					<Space.Compact>
						<Button
							value="fv1"
							onClick={handleFoilQuantitySubtract}
						>
							-
						</Button>
						<Input
							value={foilQuantityValue}
							className="foil-quantity-button"
							onChange={(event) =>
								handleFoilQuantityChange(event)
							}
						/>
						<Button value="fv3" onClick={handleFoilQuantityAdd}>
							+
						</Button>
					</Space.Compact>
				</Tooltip>
			</div>
			<div className="wishlist-buttons">
				<Button
					type="primary"
					className={`add-to-wishlist-button ${
						isWishlist ? "add-to-wishlist" : ""
					}`}
					// size="small"
					// ghost={isWishlist}
					onClick={() => setIsWishlist(!isWishlist)}
				>
					{isWishlist ? (
						<CheckCircleFilled />
					) : (
						<PlusCircleOutlined />
					)}
				</Button>
				<Button
					type="primary"
					onClick={() => setIsFoilWishList(!isFoilWishlist)}
					className={`add-foil-to-wishlist-button ${
						isFoilWishlist ? "add-to-foil-wishlist" : ""
					}`}
				>
					{isFoilWishlist ? <StarFilled /> : <StarOutlined />}
				</Button>
			</div>
		</div>
	);
};
