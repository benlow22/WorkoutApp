import React, { useState } from "react";
import { SpiningLoadingIcon } from "../../../../components/loading/LoadingIcon";
import { TAmiiboCard } from "../types/types";
import { AmiiboCard } from "./AmiiboCard";
import { AmiiboLine, TAmiiboWithStatus } from "./AmiiboLine";
import { Button, Grid } from "antd";
import { ChecklistAmiiboCard } from "./ChecklistAmiiboCard";

type TProps = {
	amiibos: TAmiiboWithStatus[];
	loading: boolean;
	isList: boolean;
};

export const ChecklistAmiibos = ({ amiibos, loading, isList }: TProps) => {
	if (loading) {
		return <SpiningLoadingIcon />;
	}

	return (
		<ul className={`list-group-${isList ? "grid" : "grid"} mb-4`}>
			{amiibos.map((amiibo, index: number) => (
				// isList ? (
				<li key={amiibo.id} className="list-group-item">
					<ChecklistAmiiboCard
						amiibo={amiibo}
						key={index}
						// isChecked={amiibo.status.isChecklist ? true : null}

						// setIsChecked={function (value: React.SetStateAction<boolean>): void {
						// 	throw new Error("Function not implemented.");
						// } }
					/>
				</li>
			))}
			{/* ) : (
					<li key={amiibo.id} className="list-group-item">
						<AmiiboLine amiibo={amiibo} key={index} />
					</li>
				) */}
			{/* )} */}
		</ul>
	);
};
