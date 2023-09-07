import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import fuecoco from "../../../../../images/fuecoco.jpeg";
import { Button, Pagination, Switch, message } from "antd";
import { AmiiboInventory } from "../myCollection/AmiiboInventory";
import { AmiiboChecklist } from "../myCollection/AmiiboChecklist";
import { SpiningLoadingIcon } from "../../../../../components/loading/LoadingIcon";
import { TAmiiboWithStatus } from "../../components/AmiiboLine";
import { AmiiboFilter } from "../../components/AmiiboFilter";
import { ChecklistAmiibos } from "../../components/ChecklistAmiibos";

export const Checklist = () => {
	const { auth, userId, supabase, isLoggedIn } = useContext(AuthContext);
	const [messageApi, contextHolder] = message.useMessage();
	const [allAmiibos, setAllAmiibos] = useState<TAmiiboWithStatus[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [amiibosPerPage, setAmiibosPerPage] = useState<number>(50);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isUpsertLoading, setIsUpsertLoading] = useState<boolean>(false);

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
		if (!isUpsertLoading) {
			getAllAmiibos();
		}
	}, [isLoggedIn, isUpsertLoading]);

	const handleCheckAll = async () => {
		setIsUpsertLoading(true);
		const checkAll = filteredAmiibos.map((amiibo) => ({
			amiibo_id: amiibo.id,
			user_id: userId,
			is_checklist: true,
		}));

		const { data, error } = await supabase
			.from("amiibo_buddy_amiibo_statuses")
			.upsert(checkAll)
			.select();
		if (data) {
			console.log(data);
			setIsUpsertLoading(false);
		}
		if (error) {
			console.error(error);
			setIsUpsertLoading(false);
		}
	};

	const handleCheckPage = async () => {
		setIsUpsertLoading(true);
		const checkPage = currentFilteredAmiibos.map((amiibo) => ({
			amiibo_id: amiibo.id,
			user_id: userId,
			is_checklist: true,
		}));

		const { data, error } = await supabase
			.from("amiibo_buddy_amiibo_statuses")
			.upsert(checkPage)
			.select();
		if (data) {
			console.log(data);
			setIsUpsertLoading(false);
		}
		if (error) {
			console.error(error);
			setIsUpsertLoading(false);
		}
	};
	const handleUncheckPage = async () => {
		setIsUpsertLoading(true);
		const uncheckPage = currentFilteredAmiibos.map((amiibo) => ({
			amiibo_id: amiibo.id,
			user_id: userId,
			is_checklist: false,
		}));

		const { data, error } = await supabase
			.from("amiibo_buddy_amiibo_statuses")
			.upsert(uncheckPage)
			.select();
		if (data) {
			console.log(data);
			setIsUpsertLoading(false);
		}
		if (error) {
			console.error(error);
			setIsUpsertLoading(false);
		}
	};

	const handleUncheckAll = async () => {
		setIsUpsertLoading(true);
		const uncheckAll = filteredAmiibos.map((amiibo) => ({
			amiibo_id: amiibo.id,
			user_id: userId,
			is_checklist: false,
		}));

		const { data, error } = await supabase
			.from("amiibo_buddy_amiibo_statuses")
			.upsert(uncheckAll)
			.select();
		if (data) {
			console.log(data);
			setIsUpsertLoading(false);
		}
		if (error) {
			console.error(error);
			setIsUpsertLoading(false);
		}
	};
	return (
		<>
			<h3 className="page-heading">AmiiboChecklist</h3>
			<div className="filter-nav-section">
				<AmiiboFilter
					amiibos={allAmiibos}
					setFilteredAmiibos={setFilteredAmiibos}
				/>
				<div style={{ margin: "20px" }}>
					<Button
						onClick={() => handleCheckAll()}
						disabled={isUpsertLoading}
					>
						Check All
					</Button>
					<Button
						disabled={isUpsertLoading}
						onClick={() => handleUncheckPage()}
					>
						Uncheck Page
					</Button>
					<Button
						disabled={isUpsertLoading}
						onClick={() => handleCheckPage()}
					>
						Check Page
					</Button>
					<Button
						disabled={isUpsertLoading}
						onClick={() => handleUncheckAll()}
					>
						Uncheck All
					</Button>
				</div>
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
					</>
				)}
			</div>
			<ChecklistAmiibos
				amiibos={currentFilteredAmiibos}
				loading={isLoading}
				isList={isList}
			/>
		</>
	);
};
