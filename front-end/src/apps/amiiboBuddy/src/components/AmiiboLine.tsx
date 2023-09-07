import React, {
	MouseEventHandler,
	useContext,
	useEffect,
	useState,
} from "react";
import { TAmiiboCard } from "../types/types";
import { Button, Image, Modal, Tooltip, message } from "antd";
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
import ErrorList from "antd/es/form/ErrorList";
import { v4 as uuidv4 } from "uuid";

type TProps = {
	amiibo: TAmiiboWithStatus;
};
export type TAmiiboWithStatus = TAmiiboCard & {
	status: {
		isWishlist: boolean;
		isChecklist: boolean;
		statusId: string;
	}[];
};
export const AmiiboLine = ({
	amiibo: { id, name, image, character, amiiboSeries, status },
}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const [isChecklist, setIsChecklist] = useState<boolean>(false);
	const [quantity, setQuantity] = useState(0);
	const [isWishlist, setIsWishlist] = useState<boolean>();
	const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [statusId, setStatusId] = useState<string>("");
	const [messageApi, contextHolder] = message.useMessage();
	const [messageKey, setMessageKey] = useState<string>("");

	useEffect(() => {
		if (status.length > 0) {
			setIsWishlist(status[0].isWishlist);
			setIsChecklist(status[0].isChecklist);
			setStatusId(status[0].statusId);
		}
	}, [status]);

	useEffect(() => {
		if (wishlistLoading) {
			const newMessageKey = uuidv4();
			setMessageKey(newMessageKey);
			messageApi.open({
				type: "loading",
				content: "updating",
				key: newMessageKey,
			});
			// Dismiss manually and asynchronously
		} else {
			messageApi.destroy(messageKey);
		}
	}, [wishlistLoading]);

	const { auth, supabase, userId } = useContext(AuthContext);

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
		navigate("login", { state: { previousPath: location.pathname } });
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleWishlistClick = () => {
		setIsWishlist(!isWishlist);
		setWishlistLoading(true);
		setTimeout(async () => {
			if (statusId) {
				try {
					const { data, error } = await supabase
						.from("amiibo_buddy_amiibo_statuses")
						.update({ is_wishlist: !isWishlist })
						.eq("id", statusId)
						.select();
					if (data) {
						console.log(data);
						setWishlistLoading(false);
					}
					if (error) {
						console.error(error);
						setWishlistLoading(false);
						setIsWishlist(isWishlist);
					}
				} catch (error) {
					// @ts-expect-error
					console.error(error.cause);
				}
			} else {
				try {
					const { data, error } = await supabase
						.from("amiibo_buddy_amiibo_statuses")
						.insert({
							is_wishlist: !isWishlist,
							user_id: userId,
							amiibo_id: id,
						})
						.select();
					if (data) {
						console.log(data);
						setWishlistLoading(false);
					}
					if (error) {
						console.error(error);
						setWishlistLoading(false);
						setIsWishlist(isWishlist);
					}
				} catch (error) {
					// @ts-expect-error
					console.error(error.cause);
				}
			}
		});
	};
	const handleChecklistClick = () => {
		setIsChecklist(!isChecklist);
		setWishlistLoading(true);
		setTimeout(async () => {
			if (statusId) {
				try {
					const { data, error } = await supabase
						.from("amiibo_buddy_amiibo_statuses")
						.update({ is_checklist: !isChecklist })
						.eq("id", statusId)
						.select();
					if (data) {
						console.log(data);
						setWishlistLoading(false);
					}
					if (error) {
						console.error(error);
						setWishlistLoading(false);
						setIsChecklist(isChecklist);
					}
				} catch (error) {
					// @ts-expect-error
					console.error(error.cause);
				}
			} else {
				try {
					const { data, error } = await supabase
						.from("amiibo_buddy_amiibo_statuses")
						.insert({
							is_checklist: !isChecklist,
							user_id: userId,
							amiibo_id: id,
						})
						.select();
					if (data) {
						console.log(data);
						setWishlistLoading(false);
					}
					if (error) {
						console.error(error);
						setWishlistLoading(false);
						setIsChecklist(isChecklist);
					}
				} catch (error) {
					// @ts-expect-error
					console.error(error.cause);
				}
			}
		});
	};

	// const handleChecklistClick = () => {
	// 	console.log("checklist clicked");
	// 	setIsChecklist(!isChecklist);
	// 	setQuantity(!isChecklist ? 1 : 0);
	// };

	const handleInventoryClick = () => {
		// console.log("wishlist clicked");
		setQuantity(isChecklist ? 1 : 0);
	};

	return (
		<div className="amiibo-line">
			{contextHolder}

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
					className={`amiibo-line-buttons${auth ? "" : "-disabled"}`}
				>
					<Tooltip title="add to wishlist" placement="bottomLeft">
						<Button
							type="primary"
							disabled={wishlistLoading}
							ghost={!auth || !isWishlist}
							className={`amiibo-status-button-wishlist${
								isWishlist ? "-added" : ""
							}`}
							onClick={() =>
								auth
									? handleWishlistClick()
									: setIsModalOpen(true)
							}
							value="wishlist"
						>
							<StarFilled />
						</Button>
					</Tooltip>

					<Tooltip title="add to checklist" placement="bottomLeft">
						<Button
							type="primary"
							ghost={!auth || !isChecklist}
							disabled={wishlistLoading}
							className="amiibo-status-button-checklist"
							onClick={() =>
								auth
									? handleChecklistClick()
									: setIsModalOpen(true)
							}
						>
							<CheckCircleFilled />
						</Button>
					</Tooltip>
					<Tooltip title="add to inventory" placement="bottomLeft">
						<Button
							type="primary"
							ghost={!auth || !quantity}
							className="amiibo-status-button-inventory"
							onClick={() =>
								auth
									? handleInventoryClick()
									: setIsModalOpen(true)
							}
						>
							<TagFilled />
						</Button>{" "}
					</Tooltip>

					<div
						style={{
							display: "flex",
							alignItems: "center",
							width: "30px",
						}}
					>
						{auth && (
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
