import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import lorcanaMickey from "../../../../../images/lorcanaMickey.avif";
import { getLorcanaCards } from "../../../../workoutBuddy/src/api/api";
import lorcanaData from "./../../public/lorcanaCards.json";
import { LorcanaCard } from "../../components/LorcanaCard";
import "./../../styles/index.css";
import { FloatButton, Tooltip, message } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useRequest } from "../../../../../hooks/useRequest";
import { getAllLorcanaCardsAPI } from "../../api";

export type TCardStatus = {
	[cardname: string]: {
		quantity: number;
		"foil-quanity": number;
		wishlist: boolean;
		"foil-wishlist": boolean;
	};
};

export const BrowsePage = () => {
	const { auth, userId, session, supabase } = useContext(AuthContext);
	const [lorcanaAllCards, setLorcanaAllCards] = useState<any[]>(lorcanaData);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [usersUpdatedCardStatuses, setUsersUpdatedCardStatuses] =
		useState<TCardStatus>({});
	// const [usersCardStatuses, setUsersCardStatuses] = useState<TCardStatus>({});
	const [messageApi, contextHolder] = message.useMessage();

	const [
		getAllLorcanaCardsResponse,
		getAllLorcanaCardsLoading,
		getAllLorcanaCardsError,
		getAllLorcanaCardsRequest,
	] = useRequest(getAllLorcanaCardsAPI);

	const warningMessage = () => {
		messageApi.open({
			type: "warning",
			content: "you must log in first to save cards",
			duration: 6,
		});
	};

	const getUsersCardStatuses = async () => {
		let { data, error } = await supabase
			.from("lorb_cards_statuses")
			.select("cards_statuses")
			.single();
		if (error) {
			console.log("Error getting card statuses", error);
		} else if (data) {
			console.log("GET card statuses", data);
			// setUsersCardStatuses(data.cards_statuses);
			setUsersUpdatedCardStatuses(data.cards_statuses);
		}
	};

	useEffect(() => {
		getUsersCardStatuses();
		getAllLorcanaCardsRequest(session!);
	}, []);
	useEffect(() => {
		getUsersCardStatuses();
	}, []);

	// useEffect(() => {
	// 	console.log("SATUS", usersCardStatuses);
	// }, [usersCardStatuses]);

	useEffect(() => {
		console.log("updated Card MEga status", usersUpdatedCardStatuses);
	}, [usersUpdatedCardStatuses]);

	useEffect(() => {
		console.log(lorcanaAllCards);
	}, [lorcanaAllCards]);

	const handleFloatSave = async () => {
		if (!auth) {
			warningMessage();
		} else {
			setIsUploading(true);
			const { data, error } = await supabase
				.from("lorb_cards_statuses")
				.update({ cards_statuses: usersUpdatedCardStatuses })
				.eq("user_id", userId)
				.select();
			if (data) {
				console.log("upload success", data);
				setIsUploading(false);
			} else {
				console.log(error);
				setIsUploading(false);
			}
		}
	};

	return (
		<>
			{contextHolder}
			<div className="page-heading">
				<h2>Lorcana Buddy Browse</h2>
				<div className="card-grid">
					{lorcanaAllCards.map((card, index) => (
						<LorcanaCard
							disabled={isUploading}
							key={index}
							card={card}
							setUsersUpdatedCardStatuses={
								setUsersUpdatedCardStatuses
							}
							usersUpdatedCardStatuses={usersUpdatedCardStatuses}
							// status={usersCardStatuses}
						/>
					))}
				</div>
				<div className="save-float-button">
					<FloatButton
						tooltip={<div>Save Updates</div>}
						icon={<SaveFilled />}
						type="primary"
						style={{ right: 24 }}
						onClick={handleFloatSave}
					/>
				</div>
			</div>
		</>
	);
};
