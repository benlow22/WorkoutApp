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
	Select,
	Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TAmiiboCard } from "../types/types";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Amiibos } from "./Amiibos";
import { TAmiiboWithStatus } from "./AmiiboLine";

type TProps = {
	amiibos: TAmiiboWithStatus[];
	setFilteredAmiibos: React.Dispatch<
		React.SetStateAction<TAmiiboWithStatus[]>
	>;
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
	const [groupings, setGroupings] = useState<CheckboxValueType[]>([""]);
	const [filteredList, setFilteredList] = useState([]);

	// initial sort, once amiibos have been fetched.
	useEffect(() => {
		if (amiibos) {
			const figures = amiibos.filter(
				(amiibo) => amiibo.type === "Figure"
			);
			setFilteredAmiibos(figures);
		}
	}, [amiibos]);

	useEffect(() => {
		let filterByStatus = [];
		switch (filterBy) {
			case "Multiples":
				break;
			case "Owned":
				const filterByCollectioned = amiibos.filter((amiibo) => {
					if (amiibo.status.length > 0) {
						if (amiibo.status[0].isChecklist === true) {
							return amiibo;
						}
					}
				});
				filterByStatus = filterByCollectioned;
				break;
			case "Return":
				break;
			case "Wishlist":
				const newAmiibosArr = amiibos.filter((amiibo) => {
					if (amiibo.status.length > 0) {
						if (amiibo.status[0].isWishlist === true) {
							// console.log(amiibo.status);
							return amiibo;
						}
					}
				});
				filterByStatus = newAmiibosArr;

				break;
			case "All":
				filterByStatus = amiibos;
				break;
		}

		const newAmiibosArr = filterByStatus.filter((amiibo) => {
			if (type.includes(amiibo.type)) {
				return amiibo;
			}
		});
		setFilteredAmiibos(newAmiibosArr);
	}, [filterBy, type]);

	const radioCategoryOnChange = (e: RadioChangeEvent) => {
		// console.log(`radio checked:${e.target.value}`);
		setFilterBy(e.target.value);
	};

	// useEffect(() => {
	// 	switch (filterBy) {
	// 		case "Multiples":
	// 			break;
	// 		case "Owned":
	// 			const newAmiibosArrCollection = amiibos.filter((amiibo) => {
	// 				if (amiibo.status.length > 0) {
	// 					if (amiibo.status[0].isChecklist === true) {
	// 						// console.log(amiibo.status);
	// 						return amiibo;
	// 					}
	// 				}
	// 			});
	// 			setFilteredList(newAmiibosArrCollection);
	// 			break;
	// 			break;
	// 		case "Return":
	// 			break;
	// 		case "Wishlist":
	// 			const newAmiibosArr = amiibos.filter((amiibo) => {
	// 				if (amiibo.status.length > 0) {
	// 					if (amiibo.status[0].isWishlist === true) {
	// 						// console.log(amiibo.status);
	// 						return amiibo;
	// 					}
	// 				}
	// 			});
	// 			setFilteredList(newAmiibosArr);
	// 			break;
	// 		case "All":
	// 			setFilteredList(amiibos);
	// 			break;
	// 	}
	// }, [filterBy]);

	const typeOptions = [
		{ label: "All", value: "All" },
		{ label: "Figures", value: "Figure" },
		{ label: "Cards", value: "Card" },
		{ label: "Yarn", value: "Yarn" },
		{ label: "Band", value: "Band" },
	];

	const groupingOptions = [
		{ label: "Type", value: "type" },
		{ label: "Series", value: "amiiboSeries" },
		{ label: "Game Series", value: "gameSeries" },
		{ label: "Character", value: "Charcter" },
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

	const handleGroupingChange = (checkedValue: CheckboxValueType[]) => {
		setGroupings(checkedValue);
		// if (!type.includes("All") && checkedValue.includes("All")) {
		// 	setType(["All", "Figure", "Card", "Yarn", "Band"]);
		// } else if (type.includes("All") && !checkedValue.includes("All")) {
		// 	setType(["Figure"]);
		// } else if (
		// 	["Figure", "Card", "Yarn", "Band"].every((type) =>
		// 		checkedValue.includes(type)
		// 	)
		// ) {
		// 	setType(["All", "Figure", "Card", "Yarn", "Band"]);
		// } else if (
		// 	type.includes("All") &&
		// 	type !== checkedValue &&
		// 	checkedValue.includes("All")
		// ) {
		// 	const newTypes = checkedValue.shift();
		// 	setType(checkedValue);
		// } else if (checkedValue.length > 0) {
		// 	setType(checkedValue);
		// }
		// const newTypes = new Array();
	};
	return (
		<div className="amiibo-filter-nav">
			{/* <h3>Sort By</h3>
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

			<h3>Filter By</h3> */}
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
				<Form.Item label="Group By">
					{/* <Checkbox.Group
						options={groupingOptions}
						className="white-font"
						style={{
							display: "flex",
							justifyContent: "space-evenly",
						}}
						value={groupings}
						onChange={handleGroupingChange}
					/> */}
					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="Please select in order of grouping"
						onChange={(checkedValue) => setGroupings(checkedValue)}
						options={groupingOptions}
					/>
				</Form.Item>
			</Form>

			<p>type</p>

			<h1>{`FILTERS: ${filterBy} > ${type} > ${groupings} `}</h1>
		</div>
	);
};
