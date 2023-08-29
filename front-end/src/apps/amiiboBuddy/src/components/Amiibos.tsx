import React from "react";
import { SpiningLoadingIcon } from "../../../../components/loading/LoadingIcon";
import { TAmiiboCard } from "../types/types";
import { AmiiboCard } from "./AmiiboCard";

type TProps = {
	amiibos: TAmiiboCard[];
	loading: boolean;
};

export const Amiibos = ({ amiibos, loading }: TProps) => {
	if (loading) {
		return <SpiningLoadingIcon />;
	}

	return (
		<ul className="list-group mb-4">
			{amiibos.map((amiibo, index: number) => (
				<li key={amiibo.id} className="list-group-item">
					<AmiiboCard amiibo={amiibo} key={index} />
				</li>
			))}
		</ul>
	);
};
