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
import { SpiningLoadingIcon } from "../../../../components/loading/LoadingIcon";
// import { TAmiiboCard } from "../types/types";

type TProps = {
	card: TLorcanaCardData;
	usersUpdatedCardStatuses: TCardStatus;
	setUsersUpdatedCardStatuses: React.Dispatch<
		React.SetStateAction<TCardStatus>
	>;
	disabled: boolean;
	// status: TCardStatus;
};

export const LorcanaCard = ({
	card,
	usersUpdatedCardStatuses,
	// status,
	setUsersUpdatedCardStatuses,
	disabled,
}: TProps) => {
	//
	const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false);

	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [quantityValue, setQuantityValue] = useState<number>(0);
	const [foilQuantityValue, setFoilQuantityValue] = useState<number>(0);
	const [isFoilWishlist, setIsFoilWishlist] = useState<boolean>(false);
	const [isWishlist, setIsWishlist] = useState<boolean>(false);

	useEffect(() => {
		if (isUpdating) {
			const updatedCardStatus = {
				// [card.cardName]: {
				quantity: quantityValue,
				"foil-quanity": foilQuantityValue,
				wishlist: isWishlist,
				"foil-wishlist": isFoilWishlist,
				// },
			};
			console.log("Updated card status", updatedCardStatus);
			console.log("updating Obje", usersUpdatedCardStatuses);
			setIsUpdating(false);
			if (card.cardName in usersUpdatedCardStatuses) {
				const updatedStatus = {
					...usersUpdatedCardStatuses,
					[card.cardName]: updatedCardStatus,
				};
				setUsersUpdatedCardStatuses(updatedStatus);
			} else {
				const updatedStatusAddCard = {
					...usersUpdatedCardStatuses,
					[card.cardName]: updatedCardStatus,
				};
				setUsersUpdatedCardStatuses(updatedStatusAddCard);
			}
		}
	}, [quantityValue, foilQuantityValue, isWishlist, isFoilWishlist]);

	useEffect(() => {
		setIsInitialLoading(true);
		if (card.cardName in usersUpdatedCardStatuses) {
			setQuantityValue(usersUpdatedCardStatuses[card.cardName].quantity);
			setFoilQuantityValue(
				usersUpdatedCardStatuses[card.cardName]["foil-quanity"]
			);
			setIsFoilWishlist(
				usersUpdatedCardStatuses[card.cardName]["foil-wishlist"]
			);
			setIsWishlist(usersUpdatedCardStatuses[card.cardName].wishlist);
			setIsInitialLoading(false);
		} else {
			setIsInitialLoading(false);
		}
	}, [usersUpdatedCardStatuses]);

	//Handle Change in quantity
	const handleQuantitySubtract = () => {
		if (quantityValue > 0) {
			setIsUpdating(true);

			setQuantityValue(quantityValue - 1);
		}
	};
	//current capped at 100
	const handleQuantityAdd = () => {
		if (quantityValue < 100) {
			setIsUpdating(true);
			setQuantityValue(quantityValue + 1);
		}
	};
	const handleQuantityChange = (event: any) => {
		setIsUpdating(true);

		setQuantityValue(Number(event.target.value));
	};

	//Handle Change in foilQuantity
	const handleFoilQuantitySubtract = () => {
		if (foilQuantityValue > 0) {
			setIsUpdating(true);

			setFoilQuantityValue(foilQuantityValue - 1);
		}
	};
	//current capped at 100
	const handleFoilQuantityAdd = () => {
		if (foilQuantityValue < 100) {
			setIsUpdating(true);

			setFoilQuantityValue(foilQuantityValue + 1);
		}
	};
	const handleFoilQuantityChange = (event: any) => {
		setIsUpdating(true);

		setFoilQuantityValue(Number(event.target.value));
	};

	//handle wishlist toggles
	const handleWishlistToggle = () => {
		setIsUpdating(true);
		setIsWishlist(!isWishlist);
	};
	const handleFoilWishlistToggle = () => {
		setIsUpdating(false);
		setIsFoilWishlist(!isFoilWishlist);
	};

	return (
		<div className="lorcana-card">
			{!isInitialLoading ? (
				<>
					<Image
						src={
							foilQuantityValue > 0
								? card["image-urls"].foil
								: card["image-urls"].large
						}
						placeholder={
							<Image
								preview={false}
								src={
									foilQuantityValue > 0
										? card["image-urls"].foil
										: card["image-urls"].large
								}
								width={200}
							/>
						}
					/>
					<div className="quantity-buttons">
						<Tooltip title="Regular Card Counter" placement="top">
							<Space.Compact>
								<Button
									disabled={disabled}
									value="rv1"
									onClick={handleQuantitySubtract}
								>
									-
								</Button>
								<Input
									disabled={disabled}
									value={quantityValue}
									className="quantity-button"
									onChange={(event) =>
										handleQuantityChange(event)
									}
								/>
								<Button
									disabled={disabled}
									value="rv3"
									onClick={handleQuantityAdd}
								>
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
									disabled={disabled}
									onClick={handleFoilQuantitySubtract}
								>
									-
								</Button>
								<Input
									disabled={disabled}
									value={foilQuantityValue}
									className="foil-quantity-button"
									onChange={(event) =>
										handleFoilQuantityChange(event)
									}
								/>
								<Button
									disabled={disabled}
									value="fv3"
									onClick={handleFoilQuantityAdd}
								>
									+
								</Button>
							</Space.Compact>
						</Tooltip>
					</div>
					<div className="wishlist-buttons">
						<Button
							disabled={disabled}
							type="primary"
							className={`add-to-wishlist-button ${
								isWishlist ? "add-to-wishlist" : ""
							}`}
							// size="small"
							// ghost={isWishlist}
							onClick={handleWishlistToggle}
						>
							{isWishlist ? (
								<CheckCircleFilled />
							) : (
								<PlusCircleOutlined />
							)}
						</Button>
						<Button
							disabled={disabled}
							type="primary"
							onClick={handleFoilWishlistToggle}
							className={`add-foil-to-wishlist-button ${
								isFoilWishlist ? "add-to-foil-wishlist" : ""
							}`}
						>
							{isFoilWishlist ? <StarFilled /> : <StarOutlined />}
						</Button>
					</div>
				</>
			) : (
				<SpiningLoadingIcon />
			)}
		</div>
	);
};
