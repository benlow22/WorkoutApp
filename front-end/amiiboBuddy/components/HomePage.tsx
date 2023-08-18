import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../src/components/loading/LoadingIcon";
import { amiiboFetchApi } from "../api/api";
import { supabase } from "../../src/supabaseClient";
import { AmiiboCard } from "../components/AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";

export const AmiiboBuddyHomePage: React.FC<{}> = () => {
	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">Welcome to Amiibo Buddy</h2>
		</div>
	);
};
