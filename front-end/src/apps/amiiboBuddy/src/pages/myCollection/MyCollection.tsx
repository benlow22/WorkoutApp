import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { AmiiboCard } from "../../components/AmiiboCard";
import { CollectionCard } from "../../components/CollectionCard";
import { ImageCarousel } from "../../components/ImageCarousel";

import { Button, Image, Radio, Space, Switch, message } from "antd";
import { AmiiboInventory } from "./AmiiboInventory";
import { AmiiboChecklist } from "./AmiiboChecklist";
import { TAmiiboCard } from "../../types/types";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";

export const MyCollection = () => {
	const { auth, username, supabase, isLoggedIn } = useContext(AuthContext);
	const [myAmiibos, setMyAmiibos] = useState<any>([]);
	const [allAmiibos, setAllAmiibos] = useState<any[] | null>([]);
	const [ready, setReady] = useState<any>(false);
	const [isInventory, setIsInventory] = useState<any>(false);
	const [switchIsDisabled, setSwitchIsDisabled] = useState<any>(false);

	const [messageApi, contextHolder] = message.useMessage();
	const warningMessage = () => {
		messageApi.open({
			type: "warning",
			content:
				"you must log in first before you can access your inventory",
			duration: 6,
		});
	};
	// create type for amiibo with image.
	const getMyAmiibos = async () => {
		let { data, error } = await supabase
			.from("users_amiibos")
			.select(
				"*, ...amiibo(image, name, series: amiibo_series), ...ab_pack_id_image_paths(photoPaths: photo_paths)"
			);
		if (data) {
			// console.log(myAmiibos);
			setMyAmiibos(data);
		} else {
			console.error(error);
		}
	};
	// preload for faster checklist render
	const getAllAmiibos = async () => {
		let { data: allAmiibos, error } = await supabase
			.from("amiibo")
			.select(
				"*, status: amiibo_buddy_amiibo_statuses(isChecklist: is_checklist, isWishlist: is_wishlist)"
			);
		if (error) {
			console.error(error);
		} else {
			console.log("all amiibos + statuses", allAmiibos);
			setAllAmiibos(allAmiibos);
		}
	};

	useEffect(() => {
		getMyAmiibos();
		getAllAmiibos();
		setIsInventory(isLoggedIn);
	}, [isLoggedIn]);

	useEffect(() => {
		if (myAmiibos) {
			setReady(true);
		}
	}, [myAmiibos]);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			{contextHolder}
			<h2 className="page-heading"> Amiibo Buddy My Collection</h2>
			<Switch
				checkedChildren="Checklist"
				unCheckedChildren="Inventory"
				defaultChecked={isInventory}
				checked={isInventory}
				disabled={switchIsDisabled}
				onClick={(checked, event) => {
					if (isLoggedIn) {
						setIsInventory(checked);
					} else {
						setSwitchIsDisabled(true);
						setTimeout(() => setSwitchIsDisabled(false), 5000);
						warningMessage();
					}
				}}
			/>
			<AmiiboInventory myAmiibos={myAmiibos} />
			{!isLoggedIn && (
				<h2
					style={{
						color: "red",
						backgroundColor: "yellow",
						padding: "20px",
					}}
				>
					You need to login to access your inventory
				</h2>
			)}
		</>
	);
};
