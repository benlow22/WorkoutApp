import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { Pagination, Switch, message } from "antd";
import { AmiiboInventory } from "../myCollection/AmiiboInventory";
import { AmiiboChecklist } from "../myCollection/AmiiboChecklist";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";
import { TAmiiboWithStatus } from "../../components/AmiiboLine";
import { AmiiboFilter } from "../../components/AmiiboFilter";
import { ChecklistAmiibos } from "../../components/ChecklistAmiibos";

export const Checklist = () => {
	const { auth, username, supabase, isLoggedIn } = useContext(AuthContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [allAmiibos, setAllAmiibos] = useState<TAmiiboWithStatus[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [amiibosPerPage, setAmiibosPerPage] = useState<number>(50);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [filteredAmiibos, setFilteredAmiibos] = useState<TAmiiboWithStatus[]>(
		[]
	);

	const indexOfLastAmiibo = currentPage * amiibosPerPage;
	const indexOfFirstAmiibo = indexOfLastAmiibo - amiibosPerPage;
	const currentFilteredAmiibos = filteredAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);
	const [isList, setIsList] = useState<boolean>(false);

	const pageSizeOptions = [10, 20, 50, 100, filteredAmiibos.length];

	useEffect(() => {
		// console.log("amiibos to filter", filteredAmiibos);
		if (filteredAmiibos.length > 0) {
			setIsLoading(false);
		}
	}, [filteredAmiibos]);

	const warningMessage = () => {
		messageApi.open({
			type: "warning",
			content:
				"you must log in first before you can access your inventory",
			duration: 6,
		});
	};

	const getAllAmiibos = async () => {
		let { data, error } = await supabase
			.from("amiibo")
			.select(
				`amiiboSeries :amiibo_series ,character, gameSeries: game_series , head, id, image, name,release_au,release_eu,release_jp,release_na,tail, type, status: amiibo_buddy_amiibo_statuses (isWishlist: is_wishlist, isChecklist: is_checklist)`
			);
		if (data) {
			console.log("all amiibos + statuses", data);
			setAllAmiibos(data as TAmiiboWithStatus[]);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllAmiibos();
	}, [isLoggedIn]);

	return (
		<>
			<h3 className="page-heading">AmiiboChecklist</h3>
			<AmiiboFilter
				amiibos={allAmiibos}
				setFilteredAmiibos={setFilteredAmiibos}
			/>
			{!isLoading && (
				<>
					<Pagination
						size="small"
						className="amiibo-pagination"
						total={filteredAmiibos.length}
						showTotal={(total, range) =>
							`${range[0]} - ${range[1]} of ${total} items`
						}
						defaultPageSize={50}
						defaultCurrent={1}
						pageSizeOptions={pageSizeOptions}
						onChange={(page, pageSize) => {
							setAmiibosPerPage(pageSize);
							setCurrentPage(page);
						}}
					/>
					<ChecklistAmiibos
						amiibos={currentFilteredAmiibos}
						loading={isLoading}
						isList={isList}
					/>
				</>
			)}
		</>
	);
};
