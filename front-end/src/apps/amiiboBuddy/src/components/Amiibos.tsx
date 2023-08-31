import React from "react";
import { SpiningLoadingIcon } from "../../../../components/loading/LoadingIcon";
import { TAmiiboCard } from "../types/types";
import { AmiiboCard } from "./AmiiboCard";
import { AmiiboLine, TAmiiboWithStatus } from "./AmiiboLine";
import { Grid } from "antd";

type TProps = {
	amiibos: TAmiiboWithStatus[];
	loading: boolean;
	isList: boolean;
};

export const Amiibos = ({ amiibos, loading, isList }: TProps) => {
	if (loading) {
		return <SpiningLoadingIcon />;
	}

	return (
		<ul className={`list-group-${isList ? "grid" : "grid"} mb-4`}>
			{amiibos.map((amiibo, index: number) =>
				isList ? (
					<li key={amiibo.id} className="list-group-item">
						<AmiiboCard amiibo={amiibo} key={index} />
					</li>
				) : (
					<li key={amiibo.id} className="list-group-item">
						<AmiiboLine amiibo={amiibo} key={index} />
					</li>
				)
			)}
		</ul>
	);
};
