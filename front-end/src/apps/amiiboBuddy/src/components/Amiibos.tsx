import React from "react";
import { SpiningLoadingIcon } from "../../../../components/loading/LoadingIcon";
import { TAmiiboCard } from "../types/types";
import { AmiiboCard } from "./AmiiboCard";
import { AmiiboLine } from "./AmiiboLine";

type TProps = {
	amiibos: TAmiiboCard[];
	loading: boolean;
	isList: boolean;
};

export const Amiibos = ({ amiibos, loading, isList }: TProps) => {
	if (loading) {
		return <SpiningLoadingIcon />;
	}

	return (
		<ul className="list-group mb-4">
			{amiibos.map((amiibo, index: number) => (
				<li key={amiibo.id} className="list-group-item">
					{isList ? (
						<AmiiboCard amiibo={amiibo} key={index} />
					) : (
						<AmiiboLine amiibo={amiibo} key={index} />
					)}
				</li>
			))}
		</ul>
	);
};
