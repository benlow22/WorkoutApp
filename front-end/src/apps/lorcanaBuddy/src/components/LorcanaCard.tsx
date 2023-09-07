import React, { useEffect, useState } from "react";
import { TLorcanaCardData } from "../types/lorcana.types";
import { Button, Image, Input, Radio, Space, Tooltip } from "antd";
// import { TAmiiboCard } from "../types/types";

type TProps = {
	card: TLorcanaCardData;
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
	const handleQuantityChange = (event) => {
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
	const handleFoilQuantityChange = (event) => {
		setFoilQuantityValue(Number(event.target.value));
	};

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
		</div>
	);
};
