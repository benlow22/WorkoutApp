import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { Switch, message } from "antd";
import { AmiiboInventory } from "../myCollection/AmiiboInventory";
import { AmiiboChecklist } from "../myCollection/AmiiboChecklist";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";

export const Checklist = () => {
	const { auth, username, supabase, isLoggedIn } = useContext(AuthContext);
	return (
		<>
			{contextHolder}
			<h2 className="page-heading"> Amiibo Buddy Checklist</h2>
			<AmiiboChecklist amiibos={allAmiibos} />
		</>
	);
};
