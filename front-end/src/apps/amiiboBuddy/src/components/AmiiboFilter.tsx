import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import {
	Button,
	Dropdown,
	Form,
	MenuProps,
	Radio,
	RadioChangeEvent,
	Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TAmiiboCard } from "../types/types";

type TProps = {
	amiibos: TAmiiboCard[];
	setFilteredAmiibos: React.Dispatch<React.SetStateAction<TAmiiboCard[]>>;
};

export const AmiiboFilter = ({ amiibos, setFilteredAmiibos }: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const { userId, session, supabase, isLoggedIn } = useContext(AuthContext);
	const [sortAlphabetical, setSortAlphabetical] = useState<
		"asc" | "desc" | null
	>();
	const [filterBy, setFilterBy] = useState<
		"All" | "Owned" | "Wishlist" | "Multiples" | "Return"
	>("All");
	// const [filterTypeBy, setFilterTypeBy] = useState<
	// 	"All" | "Figure" | "Card" | "Yarn"
	// >();
	const [type, setType] = useState<string>("Figures");

	useEffect(() => {}, []);
	const radioCategoryOnChange = (e: RadioChangeEvent) => {
		console.log(`radio checked:${e.target.value}`);
		setFilterBy(e.target.value);
	};

	useEffect(() => {
		switch (filterBy) {
			case "Multiples":
				break;
			case "Owned":
				break;
			case "Return":
				break;
			case "Wishlist":
				break;
			default:
				setFilteredAmiibos(amiibos);
		}
	}, [filterBy]);

	return (
		<div className="amiibo-filter-nav">
			<h3>Sort By</h3>
			<p>release date</p>
			<p>alphabetical</p>
			<p>series</p>
			<p>___</p>

			<h3>Show </h3>
			<p>list</p>
			<p>grid</p>
			<p>SIZE</p>
			<h3>Group By</h3>
			<p>type</p>
			<p>___</p>

			<h3>Filter By</h3>
			<Form className="amiibo-filter-menu">
				<Form.Item>
					<Radio.Group
						onChange={radioCategoryOnChange}
						defaultValue="All"
						style={{ marginTop: 16 }}
					>
						<Radio.Button
							value="All"
							defaultChecked
							style={{ width: "75px" }}
						>
							All
						</Radio.Button>
						<Radio.Button value="Owned" disabled={!isLoggedIn}>
							Owned
						</Radio.Button>
						<Radio.Button value="Wishlist" disabled={!isLoggedIn}>
							Wishlist
						</Radio.Button>
						<Radio.Button value="Multiples" disabled={!isLoggedIn}>
							Multiples
						</Radio.Button>
						<Radio.Button value="Return" disabled={!isLoggedIn}>
							Return
						</Radio.Button>
						{/* <Radio.Button value="e">Beijing</Radio.Button>
				<Radio.Button value="f"> as</Radio.Button> */}
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<Radio.Group></Radio.Group>
				</Form.Item>
			</Form>

			<p>type</p>

			<h1>FILTERS: {filterBy} </h1>
		</div>
	);
};
