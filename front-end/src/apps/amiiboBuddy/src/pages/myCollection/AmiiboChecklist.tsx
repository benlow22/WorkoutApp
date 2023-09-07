import React, { useContext, useEffect, useState } from "react";

import { Pagination, Switch } from "antd";
import { TAmiiboCard } from "../../types/types";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { AmiiboFilter } from "../../components/AmiiboFilter";
import { Amiibos } from "../../components/Amiibos";
import { TAmiiboWithStatus } from "../../components/AmiiboLine";
import { ChecklistAmiibos } from "../../components/ChecklistAmiibos";

type TProps = {
	amiibos: TAmiiboWithStatus[];
};

export const AmiiboChecklist = ({ amiibos }: TProps) => {
	const { auth, username, supabase, isLoggedIn } = useContext(AuthContext);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [amiibosPerPage, setAmiibosPerPage] = useState<number>(50);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [filteredAmiibos, setFilteredAmiibos] = useState<
		TAmiiboWithStatus[] | any
	>([]);
	const [isList, setIsList] = useState<boolean>(false);

	const indexOfLastAmiibo = currentPage * amiibosPerPage;
	const indexOfFirstAmiibo = indexOfLastAmiibo - amiibosPerPage;
	const currentFilteredAmiibos = filteredAmiibos.slice(
		indexOfFirstAmiibo,
		indexOfLastAmiibo
	);

	useEffect(() => {
		console.log("amiibos to filter", amiibos);
		setIsLoading(false);
	}, [filteredAmiibos]);

	const pageSizeOptions = [10, 20, 50, 100, filteredAmiibos.length];

	return (
		<>
			<h3>AmiiboChecklist</h3>
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
						checkedChildren="list"
						unCheckedChildren="grid"
						onChange={() => setIsList(!isList)}
					/>
				</>
			)}
			<ChecklistAmiibos
				amiibos={currentFilteredAmiibos}
				loading={isLoading}
				isList={isList}
			/>
		</>
	);
};
