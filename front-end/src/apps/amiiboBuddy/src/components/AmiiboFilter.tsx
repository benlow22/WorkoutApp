import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import {
	Button,
	Checkbox,
	Dropdown,
	Form,
	MenuProps,
	Radio,
	RadioChangeEvent,
	Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TAmiiboCard } from "../types/types";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Amiibos } from "./Amiibos";

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
	const [type, setType] = useState<CheckboxValueType[]>(["Figure"]);

	// initial sort, once amiibos have been fetched.
	useEffect(() => {
		const figures = amiibos.filter((amiibo) => amiibo.type === "Figure");
		setFilteredAmiibos(figures);
	}, [amiibos]);

	useEffect(() => {
		if (type) {
			const newAmiibosArr = amiibos.filter((amiibo) => {
				if (type.includes(amiibo.type)) {
					return amiibo;
				}
			});
			setFilteredAmiibos(newAmiibosArr);
		}

		// console.log("new", newAmiibosArr);
	}, [type]);

	const radioCategoryOnChange = (e: RadioChangeEvent) => {
		// console.log(`radio checked:${e.target.value}`);
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

	const typeOptions = [
		{ label: "All", value: "All" },
		{ label: "Figures", value: "Figure" },
		{ label: "Cards", value: "Card" },
		{ label: "Yarn", value: "Yarn" },
		{ label: "Band", value: "Band" },
	];

	const handleAmiiboTypeChange = (checkedValue: CheckboxValueType[]) => {
		console.log("TC", type, checkedValue);
		if (!type.includes("All") && checkedValue.includes("All")) {
			setType(["All", "Figure", "Card", "Yarn", "Band"]);
		} else if (type.includes("All") && !checkedValue.includes("All")) {
			setType(["Figure"]);
		} else if (
			["Figure", "Card", "Yarn", "Band"].every((type) =>
				checkedValue.includes(type)
			)
		) {
			setType(["All", "Figure", "Card", "Yarn", "Band"]);
		} else if (
			type.includes("All") &&
			type !== checkedValue &&
			checkedValue.includes("All")
		) {
			const newTypes = checkedValue.shift();
			setType(checkedValue);
		} else if (checkedValue.length > 0) {
			setType(checkedValue);
		}
		// const newTypes = new Array();
	};
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
				<Form.Item label="Amiibo Type">
					<Checkbox.Group
						options={typeOptions}
						defaultValue={["Figure"]}
						className="white-font"
						style={{
							display: "flex",
							justifyContent: "space-evenly",
						}}
						value={type}
						onChange={handleAmiiboTypeChange}
					/>
				</Form.Item>
			</Form>

			<p>type</p>

			<h1>FILTERS: {filterBy} </h1>
		</div>
	);
};
