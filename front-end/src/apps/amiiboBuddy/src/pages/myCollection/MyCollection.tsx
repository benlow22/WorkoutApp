import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { AmiiboCard } from "../../components/AmiiboCard";
import { CollectionCard } from "../../components/CollectionCard";
import { ImageCarousel } from "../../components/ImageCarousel";

import { Button, Radio, Space, Switch, message } from "antd";
import { AmiiboInventory } from "./AmiiboInventory";
import { AmiiboChecklist } from "./AmiiboChecklist";
import { TAmiiboCard } from "../../types/types";

export const MyCollection = () => {
	const { auth, username, supabase, isLoggedIn } = useContext(AuthContext);
	const [myAmiibos, setMyAmiibos] = useState<any>([]);
	const [allAmiibos, setAllAmiibos] = useState<TAmiiboCard[]>([]);
	const [ready, setReady] = useState<any>(false);
	const [showPhotosAsThumnail, setShowPhotosAsThumbnail] =
		useState<boolean>(false);
	const [isInventory, setIsInventory] = useState<any>(true);
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
	const getAmiibos = async () => {
		let { data, error } = await supabase
			.from("users_amiibos")
			.select(
				"*, ...amiibo(image, name, series: amiibo_series), ...ab_pack_id_image_paths(photoPaths: photo_paths)"
			);
		if (data) {
			setMyAmiibos(data);
			console.log("my amiibo raw data", data);
		} else {
			console.error(error);
		}
	};
	// preload for faster checklist render
	const getAllAmiibos = async () => {
		let { data: allAmiibos, error } = await supabase
			.from("amiibo")
			.select("*");
		if (error) {
			console.error(error);
		} else {
			setAllAmiibos(allAmiibos);
		}
	};

	useEffect(() => {
		getAmiibos();
		setIsInventory(isLoggedIn);
	}, [isLoggedIn]);

	useEffect(() => {
		console.log("isInventory:", isInventory);
		console.log("isLoggedIn:", isLoggedIn);
	}, [isInventory]);

	useEffect(() => {
		console.log("MY", myAmiibos);
		setReady(true);
	}, [myAmiibos]);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<>
			{contextHolder}
			<h2 className="page-heading"> Amiibo Buddy My Collection</h2>
			<>
				<Switch
					checkedChildren="Inventory"
					unCheckedChildren="Checklist"
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
			</>
			{isLoggedIn ? (
				<>
					{isInventory ? (
						<AmiiboInventory myAmiibos={myAmiibos} />
					) : (
						<AmiiboChecklist amiibos={allAmiibos} />
					)}
				</>
			) : (
				<AmiiboChecklist amiibos={allAmiibos} />
			)}
		</>
	);
};
