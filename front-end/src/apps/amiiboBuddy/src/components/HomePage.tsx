import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../../components/loading/LoadingIcon";
import { amiiboFetchApi } from "../api/api";
import { supabase } from "../../../../supabaseClient";
import { AmiiboCard } from "./AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";

export const AmiiboBuddyHomePage: React.FC<{}> = () => {
	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">Welcome to Amiibo Buddy</h2>
		</div>
	);
};
