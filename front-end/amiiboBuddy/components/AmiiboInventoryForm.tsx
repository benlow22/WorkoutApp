import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../../src/supabaseClient";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";
import {
	AutoComplete,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Rate,
	Select,
	Space,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadImage } from "./UploadImage";
import Places from "./Places";
type TAmiiboCache = {
	[concatName: string]: TAmiiboCard;
};
const { Option } = Select;

export const AmiiboInventoryForm: React.FC<{}> = () => {
	// const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [userId, setUserId] = useState("");
	const [amiibos, setAmiibos] = useState<TAmiiboCard[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const [amiibo, setAmiibo] = useState<any>("");
	const [cache, setCache] = useState<TAmiiboCache>();
	const [isCombo, setIsCombo] = useState<boolean>(false);
	const [combo, setCombo] = useState<number>(2);
	const [numberOfAmiibos, setNumberOfAmiibos] = useState<number>(1);
	const [amiibosArr, setAmiibosArr] = useState<TAmiiboCard[]>([]);
	const [amiibosArrBackup, setAmiibosArrBackup] = useState<TAmiiboCard[]>([]);
	const [selected, setSelected] = useState();
	const [locationName, setLocationName] = useState();
	const [amiibovalArr, setAmiibovalArr] = useState<string[]>([]);
	const [currency, setCurrency] = useState("$");
	useEffect(() => {
		getAmiibos();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			console.log("amiiiii", amiibo);
		}
	}, [isLoading]);

	useEffect(() => {
		handleNumberOfAmiiboChange(numberOfAmiibos);
		// setAmiibosArr(amiibosArrBackup.slice(0, numberOfAmiibos + 1));
	}, [numberOfAmiibos]);

	useEffect(() => {
		console.log("CHECL", amiibosArr, "hi", amiibovalArr);
	}, [amiibosArr]);

	// useEffect(() => {
	// 	// set workouts from response
	// 	if (getAllUsersWorkoutsResponse) {
	// 		console.log(getAllUsersWorkoutsResponse);
	// 		setWorkouts(getAllUsersWorkoutsResponse);
	// 	}
	// }, [getAllUsersWorkoutsResponse]);

	const getAmiibos = async () => {
		let { data, error } = await supabase
			.from("amiibo")
			.select(
				" amiiboSeries :amiibo_series ,character, gameSeries: game_series , head, id, image, name,release_au,release_eu,release_jp,release_na,tail,type"
			)
			.eq("type", "Figure");
		if (data) {
			setAmiibos(data);
			// let series = {};
			const amiiboCache: TAmiiboCache = {};
			const concatData = data.map((amiibo) => {
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
					children: amiibo,
				};
			});
			if (concatData) {
				setOptions(concatData);
				setCache(amiiboCache);
				setIsLoading(false);
			}
		} else {
			console.error("ERROR", error);
		}
	};

	const handleSelect = (value: string, index: number) => {
		if (cache) {
			if (value in cache) {
				setAmiibo(cache[value]);
			}
		}
	};

	const handleAmiiboSelect = (value: string, index: number) => {
		if (cache) {
			if (value in cache) {
				let newAmiiboArr = new Array(...amiibosArr);
				console.log("actualval", newAmiiboArr);

				let newAmiibovalArr = new Array(...amiibovalArr);
				console.log("value", newAmiibovalArr);

				newAmiibovalArr[index] = value;
				newAmiiboArr[index] = cache[value];
				setAmiibovalArr(newAmiibovalArr);
				setAmiibosArr(newAmiiboArr);
				setAmiibosArrBackup(newAmiiboArr);
			}
		}
	};
	// const handleSearch = (input) => {
	// 	setSearchLocation(input);
	// };
	const currencySelector = (
		<Form.Item name="currency">
			<Select style={{ width: 80, color: "white" }}>
				<Option value="CAD">CAD</Option>
				<Option value="USD">USD</Option>
			</Select>
		</Form.Item>
	);
	// const response = amiiboFetchApi();
	const handleNumberOfAmiiboChange = (value: number) => {
		setNumberOfAmiibos(value);
		const amiiArr = new Array(Number(value));
		for (let i = 0; i < value; i++) {
			if (amiibosArrBackup[i]) {
				amiiArr[i] = amiibosArrBackup[i];
			}
		}
		setAmiibosArr(amiiArr);
	};

	// const amiiboPack = amiibosArr.map((spot, index) => {
	// 	console.log("hi");
	// 	return (
	// 		<Form.Item name="amiibo" label="Amiibo">
	// 			<AutoComplete
	// 				options={options}
	// 				placeholder="pick an amiibo"
	// 				filterOption={(inputValue, option) =>
	// 					option!.value
	// 						.toUpperCase()
	// 						.indexOf(inputValue.toUpperCase()) !== -1
	// 				}
	// 				onSelect={(value) => handleSelect(value, index)}
	// 				style={{ color: "black" }}
	// 			/>
	// 		</Form.Item>
	// 	);
	// });

	// const handleApiLoaded = (map, maps) => {};

	const handleCurrencyChange = (currencyAbr: string) => {
		switch (currencyAbr) {
			case "EUR":
				setCurrency("€");
				break;
			case "JPY":
				setCurrency("¥");
				break;

			case "CNY":
				setCurrency("¥");
				break;
			case "IDR":
				setCurrency("Rp");
				break;
			case "INR":
				setCurrency("₹");
				break;
			default:
				setCurrency("$");
		}
	};

	const normFile = (e: any) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	}; // if (!getAllUsersWorkoutsLoading) {

	const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

	if (!isLoading) {
		return (
			<>
				<h2 className="page-heading"> Add Amiibo To Collection </h2>;
				<Form
					style={{
						maxWidth: "500px",
						margin: "auto",
						padding: "20px",
						border: "4px grey solid",
						borderRadius: "10px",
					}}
					labelCol={{ span: 4 }}
				>
					{amiibosArr[0] ? (
						numberOfAmiibos > 1 ? (
							<Form.Item
								label="Pack Name"
								name="packName"
								labelCol={{ span: 6 }}
							>
								<Input />
							</Form.Item>
						) : (
							<p
								style={{
									height: "32px",
									fontSize: "14px",
									margin: "12px",
								}}
							>
								{amiibovalArr[0]}
							</p>
						)
					) : (
						<h1
							style={{
								height: "32px",
								fontSize: "14px",
								margin: "12px",
								textAlign: "center",
								borderBottom: "2px white solid",
							}}
						>
							Pick an Amiibo
						</h1>
					)}

					<Space
						style={{
							display: "flex",
							justifyContent: "space-between",
							flexFlow: "nowrap",
						}}
					>
						<Form.Item
							name="combo"
							label="# of amiibos in pack"
							labelCol={{ span: 17 }}
							wrapperCol={{ span: 7 }}
							initialValue={"1"}
						>
							<Select
								className="number-of-amiibo-packs"
								onChange={(value) =>
									handleNumberOfAmiiboChange(value)
								}
							>
								<Option value="1">1</Option>
								<Option value="2">2</Option>
								<Option value="3">3</Option>
								<Option value="4">4</Option>
							</Select>
						</Form.Item>
						<Form.Item
							label="Price"
							name="price"
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							className="price-input-number"
						>
							<InputNumber<string> step="0.01" stringMode />
						</Form.Item>

						<Form.Item
							name="currency"
							label={currency}
							colon={false}
							initialValue={"CAD"}
							style={{
								display: "inline-flex",
								color: "white",
								fontWeight: "lighter",
								flexWrap: "wrap",
							}}
							labelCol={{ span: 5 }}
							wrapperCol={{ span: 19 }}
						>
							<Select
								style={{ color: "white" }}
								onChange={(value) =>
									handleCurrencyChange(value)
								}
							>
								<Option value="CAD">CAD</Option>
								<Option value="USD">USD</Option>
								<Option value="EUR">EUR</Option>
								<Option value="JPY">JPY</Option>
								<Option value="AUD">AUD</Option>
								<Option value="HKD">HKD</Option>
								<Option value="CNY">CNY</Option>
								<Option value="IDR">IDR</Option>
								<Option value="INR">INR</Option>
							</Select>
						</Form.Item>
					</Space>

					{Array.from(amiibosArr, (amiibo, index) => (
						<Form.Item
							name={index > 0 ? `Amiibo ${index + 1}` : "Amiibo"}
							label={index > 0 ? `Amiibo ${index + 1}` : "Amiibo"}
							key={index}
						>
							{options && (
								<AutoComplete
									options={options.filter(
										(option) =>
											!amiibovalArr.includes(option.value)
									)}
									placeholder={`pick an amiibo ${index + 1}`}
									filterOption={(inputValue, option) =>
										option!.value
											.toUpperCase()
											.indexOf(
												inputValue.toUpperCase()
											) !== -1
									}
									onSelect={(value) =>
										handleAmiiboSelect(value, index)
									}
									style={{ color: "black" }}
								/>
							)}
						</Form.Item>
					))}
					<div className="amiibo-image-banner">
						{amiibosArr.map(
							(amiibo) =>
								amiibo && (
									<div className="amiibo-image-card">
										<h4 style={{ textAlign: "center" }}>
											{amiibo.name} -{" "}
											{amiibo.amiiboSeries}
										</h4>
										{/* <Space
										// style={{
										// 	display: "flex",
										// 	justifyContent: "space-between",
										// 	width: "450px",
										// }}
										> */}
										<img
											src={amiibo.image}
											style={{
												display: "flex",
												maxWidth: "100px",
												padding: "10px",
											}}
										/>
										{/* </Space> */}
									</div>
								)
						)}
					</div>

					<UploadImage />

					<Form.Item
						name="rate"
						label="Rate"
						style={{ color: "white", textAlign: "center" }}
					>
						Awful
						<Rate
							count={5}
							style={{
								backgroundColor: "grey",
								padding: "0px 10px",
								borderRadius: "10px",
								margin: "0px 10px",
							}}
						/>
						Perfect
					</Form.Item>

					<FormItem name="condition" label="Condition">
						<Input.TextArea showCount />
					</FormItem>
					{/* </> */}
					{/* )}{" "} */}

					<Space
						style={{
							width: "100%",
							justifyContent: "space-between",
						}}
					>
						<Form.Item
							name="return"
							label="Return?"
							colon={false}
							style={{ width: "200px" }}
							labelCol={{ span: 9 }}
							wrapperCol={{ span: 14 }}
						>
							<Select>
								<Option value="Y">Yes</Option>
								<Option value="N">No</Option>
								<Option value="M">Maybe</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="returnBy"
							label="Return By"
							labelCol={{ span: 10 }}
						>
							<DatePicker />
						</Form.Item>
					</Space>
					<Space
						style={{
							width: "100%",
							justifyContent: "space-between",
						}}
					>
						<FormItem
							name="version"
							label="Vers."
							colon={false}
							style={{ width: "200px" }}
							labelCol={{ span: 9 }}
							wrapperCol={{ span: 14 }}
						>
							<Select>
								<Option value="NA">NA</Option>
								<Option value="EU">EU</Option>
								<Option value="AU">AU</Option>
								<Option value="JP">JP</Option>

								<Option value="CH">CH</Option>
							</Select>
						</FormItem>
						<FormItem
							name="replace"
							label="Replace?"
							colon={false}
							labelCol={{ span: 9 }}
							style={{ width: "200px" }}
						>
							<Radio.Group className="white-font">
								<Radio value="true">Yes</Radio>
								<Radio value="false">No</Radio>
							</Radio.Group>
						</FormItem>
					</Space>
					<Form.Item
						name="purchaseDate"
						label="Purchased On"
						labelCol={{ span: 10 }}
					>
						<DatePicker />
					</Form.Item>
					<FormItem name="location" label="Bought at">
						<Places
							selected={selected}
							setSelected={setSelected}
							setLocationName={setLocationName}
						/>
						<Input value={locationName} className="hidden" />
					</FormItem>
				</Form>
			</>
		);
	} else {
		return <></>;
	}
};
