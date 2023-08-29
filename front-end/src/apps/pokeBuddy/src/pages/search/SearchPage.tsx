import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";

type TProps = {};

export const SearchPage = ({}: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const { userId, session, supabase } = useContext(AuthContext);

	useEffect(() => {}, []);

	return (
		<div className="amiibo-filter-nav">
			<h3>Sort By</h3>
			<p>series</p>
			<p>Owned</p>
			<p>Wishlist</p>
			<p>Return</p>
			<p>multiples</p>
			<p>release date</p>
			<p>alphabetical</p>
		</div>
	);
};
