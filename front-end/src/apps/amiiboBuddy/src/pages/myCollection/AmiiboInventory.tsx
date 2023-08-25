import React, { useEffect, useState } from "react";

import { Image, Switch } from "antd";
import { CollectionCard } from "../../components/CollectionCard";
import fuecoco from "../../../../../images/fuecoco.jpeg";

type TProps = {
	myAmiibos: any;
};
export const AmiiboInventory = ({ myAmiibos }: TProps) => {
	const [slideNumber, setSlideNumber] = useState(0);
	return (
		<div className="amiibo-inventory-page">
			<p>A collection of all your amiibos</p>

			<p style={{ float: "left" }}>
				Amiibo
				<Switch
					style={{ margin: "10px" }}
					onClick={(checked) => {
						checked ? setSlideNumber(0) : setSlideNumber(1);
					}}
					defaultChecked={false}
				/>{" "}
				Photos
			</p>

			{myAmiibos && (
				<div className="my-collection-grid">
					{myAmiibos.map((amiibo: any, index: number) => (
						<CollectionCard
							amiibo={amiibo}
							key={index}
							slideNumber={slideNumber}
						/>
					))}
				</div>
			)}
		</div>
	);
};
