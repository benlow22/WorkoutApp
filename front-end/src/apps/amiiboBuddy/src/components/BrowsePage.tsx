import React, { useContext, useEffect, useState } from "react";
// import { supabase } from "../../../../supabaseClient";
import { AmiiboCard } from "./AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { AmiiboFilter } from "./AmiiboFilter";
import { Amiibos } from "./Amiibos";
import { Pagination, Switch } from "antd";
import { TAmiiboWithStatus } from "./AmiiboLine";

export const BrowsePage: React.FC<{}> = () => {
	const { supabase } = useContext(AuthContext);
	const [amiibos, setAmiibos] = useState<TAmiiboWithStatus[] | any>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [amiibosPerPage, setAmiibosPerPage] = useState<number>(50);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [filteredAmiibos, setFilteredAmiibos] = useState<
		TAmiiboWithStatus[] | any
	>([]);
	const [isList, setIsList] = useState<boolean>(false);

	useEffect(() => {}, []);

	useEffect(() => {
		const getAmiibos = async () => {
			setIsLoading(true);
			let { data, error } = await supabase
				.from("amiibo")
				.select(
					`amiiboSeries :amiibo_series ,character, gameSeries: game_series , head, id, image, name,release_au,release_eu,release_jp,release_na,tail, type, status: amiibo_buddy_amiibo_statuses(isWishlist: is_wishlist, isChecklist: is_checklist, statusId: id)`
				);
			// .order("amiibo_series");
			if (data) {
				setAmiibos(data);
				setFilteredAmiibos(data);
				console.log("Amiibo Data", data);
				setIsLoading(false);
			} else {
				console.error("ERROR", error);
			}
		};
		getAmiibos();
	}, []);

	//get current posts
	const indexOfLastAmiibo = currentPage * amiibosPerPage;
	const indexOfFirstAmiibo = indexOfLastAmiibo - amiibosPerPage;
	const currentFilteredAmiibos = filteredAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	const pageSizeOptions = [10, 20, 50, 100, filteredAmiibos.length];
	return (
		<div className="amiibo-homepage">
			<h2 className="page-heading">Amiibo Buddy</h2>
			<AmiiboFilter
				amiibos={amiibos}
				setFilteredAmiibos={setFilteredAmiibos}
			/>
			{!isLoading && (
				<>
					<Pagination
						size="small"
						className="amiibo-pagination"
						total={filteredAmiibos.length}
						showTotal={(total, range) =>
							`${range[0]}-${range[1]} of ${total} items`
						}
						defaultPageSize={50}
						defaultCurrent={1}
						pageSizeOptions={pageSizeOptions}
						onChange={(page, pageSize) => {
							setAmiibosPerPage(pageSize);
							setCurrentPage(page);
						}}
					/>
					<Switch
						checkedChildren="grid"
						unCheckedChildren="list"
						onChange={() => setIsList(!isList)}
					/>
				</>
			)}
			<Amiibos
				amiibos={currentFilteredAmiibos}
				loading={isLoading}
				isList={isList}
			/>
			{/* <div className="amiibo-grid">
				{!isLoading &&
					amiibos.map((amiibo, index) => (
						<AmiiboCard amiibo={amiibo} key={index} />
					))}
			</div> */}
		</div>
	);
};
