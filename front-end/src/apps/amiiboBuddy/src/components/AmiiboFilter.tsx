import React, {
	ChangeEventHandler,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import {
	AutoComplete,
	Button,
	Checkbox,
	Dropdown,
	Form,
	Input,
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
import { TAmiiboCache } from "../pages/addAmiibo/AddAmiibo";
import Search from "antd/es/input/Search";

type TProps = {
	amiibos: TAmiiboWithStatus[];
	setFilteredAmiibos: React.Dispatch<
		React.SetStateAction<TAmiiboWithStatus[]>
	>;
};

export const AmiiboFilter = ({ amiibos, setFilteredAmiibos }: TProps) => {
	const [amiiboNameSize, setAmiiboNameSize] = useState("");
	const [amiibosArr, setAmiibosArr] = useState<TAmiiboCard[]>([]);
	const [amiibosArrBackup, setAmiibosArrBackup] = useState<TAmiiboCard[]>([]);
	const [amiibovalArr, setAmiibovalArr] = useState<string[]>([]);
	const [search, setSearch] = useState<string>("");
	const { userId, session, supabase, isLoggedIn } = useContext(AuthContext);
	const [sortAlphabetical, setSortAlphabetical] = useState<
		"asc" | "desc" | null
	>();
	const [filterBy, setFilterBy] = useState<
		"All" | "Owned" | "Wishlist" | "Multiples" | "Return"
	>("All");
	const [type, setType] = useState<CheckboxValueType[]>(["Figure"]);
	const [groupings, setGroupings] = useState<CheckboxValueType[]>([""]);
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const [cache, setCache] = useState<TAmiiboCache>();

	// initial sort, once amiibos have been fetched.
	useEffect(() => {
		if (amiibos) {
			const figures = amiibos.filter(
				(amiibo) => amiibo.type === "Figure"
			);
			setFilteredAmiibos(figures);
		}
		const amiiboCache: TAmiiboCache = {};
		const concatData = amiibos.map((amiibo, index: number) => {
			const concatName = `${amiibo.name} - ${amiibo.amiiboSeries} (${amiibo.type})`;
			amiiboCache[concatName] = amiibo;

			return {
				value: concatName,
				label: (
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<img
							src={amiibo.image}
							style={{ width: "40px", paddingRight: "10px" }}
						/>
						{amiibo.name} - {amiibo.amiiboSeries}
					</div>
				),
				key: index,
				children: amiibo,
			};
		});
		if (concatData) {
			setOptions(concatData);
			setCache(amiiboCache);
			// setIsLoading(false);
		}
	}, [amiibos]);

	useEffect(() => {
		let filterByStatus: TAmiiboWithStatus[] = [];
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
		if (search) {
			const withSearch = newAmiibosArr.filter((amiibo) => {
				if (
					amiibo.name.toUpperCase().indexOf(search.toUpperCase()) !==
					-1
				) {
					return amiibo;
				} else if (
					amiibo.amiiboSeries
						.toUpperCase()
						.indexOf(search.toUpperCase()) !== -1
				) {
					return amiibo;
				}
			});
			setFilteredAmiibos(withSearch);
		} else {
			setFilteredAmiibos(newAmiibosArr);
		}
	}, [filterBy, type, search]);

	const radioCategoryOnChange = (e: RadioChangeEvent) => {
		// console.log(`radio checked:${e.target.value}`);
		setFilterBy(e.target.value);
	};

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
	const handleAmiiboSelect = (value: string) => {
		if (cache) {
			if (value in cache) {
				let newAmiiboArr = new Array(...amiibosArr);
				let newAmiibovalArr = new Array(...amiibovalArr);
				setAmiibovalArr(newAmiibovalArr);
				setAmiibosArr(newAmiiboArr);
				setAmiibosArrBackup(newAmiiboArr);
			}
		}
	};

	const handleSearchChange = (e: any) => {
		console.log("TARGET:", e.target.value);
		setSearch(e.target.value);
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
				{/* <AutoComplete
					options={options.filter(
						(option) => !amiibovalArr.includes(option.value)
					)}
					placeholder={`pick an amiibo`}
					filterOption={(inputValue, option) =>
						option!.value
							.toUpperCase()
							.indexOf(inputValue.toUpperCase()) !== -1
					}
					onSelect={(value, index) => handleAmiiboSelect(value)}
					defaultActiveFirstOption
					style={{ color: "black", width: "400px" }}
				/> */}
				<Search
					placeholder="input search text"
					allowClear
					onChange={(e) => {
						handleSearchChange(e);
					}}
					style={{ width: 200 }}
				/>
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
