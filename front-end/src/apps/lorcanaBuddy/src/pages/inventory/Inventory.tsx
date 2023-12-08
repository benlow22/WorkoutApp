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

// export type TCardStatus = {
// 	[cardname: string]: {
// 		quantity: number;
// 		"foil-quanity": number;
// 		wishlist: boolean;
// 		"foil-wishlist": boolean;
// 	};
// };

export const Inventory = () => {
	const { auth, userId, session, supabase } = useContext(AuthContext);

	return <></>;
};
