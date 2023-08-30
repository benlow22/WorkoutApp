import React, {
	MouseEventHandler,
	useContext,
	useEffect,
	useState,
} from "react";
import { TAmiiboCard } from "../types/types";
import { Button, Image, Modal } from "antd";
import {
	CheckCircleFilled,
	CheckCircleTwoTone,
	CheckOutlined,
	StarFilled,
	StarOutlined,
	StarTwoTone,
	TagFilled,
	TagOutlined,
	TagTwoTone,
} from "@ant-design/icons";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { useNavigate } from "react-router";

type TProps = {
	amiibo: TAmiiboCard;
};
export const AmiiboLine = ({
	amiibo: { name, image, character, amiiboSeries },
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const [isChecklist, setIsChecklist] = useState<boolean>(false);
	const [quantity, setQuantity] = useState(0);
	const [isWishlist, setIsWishlist] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { isLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();
	useEffect(() => {
		if (name.length < 15) {
			setAmiiboNameSize("");
		} else if (name.length < 30) {
			setAmiiboNameSize("two-lines");
		} else {
			setAmiiboNameSize("three-lines");
		}
	}, [name]);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		navigate("login");
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleWishlistClick = () => {
		console.log("wishlist clicked");
		if (!isLoggedIn) {
			setIsModalOpen(true);
		}
	};

	const handleChecklistClick = () => {
		console.log("wishlist clicked");
		if (!isLoggedIn) {
			setIsModalOpen(true);
		}
	};

	const handleInventoryClick = () => {
		console.log("wishlist clicked");
		if (!isLoggedIn) {
			setIsModalOpen(true);
		}
	};

	return (
		<div className="amiibo-line">
			<div className="amiibo-line-image-container">
				<Image
					src={image}
					alt={`${character} from ${amiiboSeries} amiibo`}
					className="amiibo-image-line"
				/>
			</div>
			<div style={{ width: "100%" }} className="amiibo-line-data">
				<div>
					<h3 className={`amiibo-name-line ${amiiboNameSize}`}>
						{name}
					</h3>
					<h5>{amiiboSeries}</h5>
				</div>
				<Modal
					title="Please login"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={handleCancel}
					okText="Login"
				>
					<p style={{ color: "black" }}>
						You will need to have an account and login in to add
						amiibos to your wishlist, checklist or inventory.
					</p>
				</Modal>
				<div
					className={`amiibo-line-buttons${
						isLoggedIn ? "" : "-disabled"
					}`}
				>
					<Button
						type="primary"
						ghost={!isLoggedIn}
						className="amiibo-status-button-wishlist"
						onClick={() =>
							isLoggedIn
								? setIsModalOpen(true)
								: handleWishlistClick()
						}
						value="wishlist"
					>
						<StarFilled />
					</Button>

					<Button
						type="primary"
						ghost={!isLoggedIn}
						className="amiibo-status-button-checklist"
						onClick={() =>
							isLoggedIn
								? setIsModalOpen(true)
								: handleChecklistClick()
						}
					>
						<CheckCircleFilled />
					</Button>
					<Button
						type="primary"
						ghost={!isLoggedIn}
						className="amiibo-status-button-inventory"
						onClick={() =>
							isLoggedIn
								? setIsModalOpen(true)
								: handleInventoryClick()
						}
					>
						<TagFilled />
					</Button>

					<div style={{ display: "flex", alignItems: "center" }}>
						{isLoggedIn && (
							<p className={`inventory-quantity inv-${quantity}`}>
								x {quantity}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
