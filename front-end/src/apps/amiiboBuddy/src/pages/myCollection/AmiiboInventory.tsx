import { useState } from "react";
import { Switch } from "antd";
import { CollectionCard } from "../../components/CollectionCard";
// import { AmiiboFilter } from "../../components/AmiiboFilter";
import { TAmiiboWithStatus } from "../../components/AmiiboLine";

type TProps = {
	myAmiibos: any;
};

export const AmiiboInventory = ({ myAmiibos }: TProps) => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [filteredAmiibos, setFilteredAmiibos] = useState<TAmiiboWithStatus[]>(
		[]
	);

	console.log(myAmiibos);
	return (
		<div className="amiibo-inventory-page">
			<p>A collection of all your amiibos</p>
			{/* <AmiiboFilter
				amiibos={myAmiibos}
				setFilteredAmiibos={setFilteredAmiibos}
			/> */}
			<p style={{ float: "left" }}>
				Amiibo
				<Switch
					style={{ margin: "10px" }}
					onClick={(checked) => {
						console.log("checked", checked);
						checked ? setSlideNumber(1) : setSlideNumber(0);
					}}
					defaultChecked={false}
				/>
				Photos
			</p>

			{myAmiibos ? (
				<div className="my-collection-grid">
					{myAmiibos.map((amiibo: any, index: number) => (
						<CollectionCard
							amiibo={amiibo}
							key={index}
							slideNumber={slideNumber}
						/>
					))}
				</div>
			) : (
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
