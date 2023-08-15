import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../src/components/loading/LoadingIcon";
import { amiiboFetchApi } from "../api/api";
import { supabase } from "../../src/supabaseClient";
import { AmiiboCard } from "../components/AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";
import {
	AutoComplete,
	Button,
	Form,
	Input,
	InputNumber,
	Radio,
	Rate,
	Select,
	Space,
	Upload,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import {
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { UploadImage } from "./UploadImage";
import { uuid } from "@supabase/supabase-js/src/lib/helpers";
type TAmiiboCache = {
	[concatName: string]: TAmiiboCard;
};
import { v4 as uuidv4 } from "uuid";
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

	if (!isLoading) {
		return (
			<>
				<h2 className="page-heading"> Add Amiibo To COllection </h2>;
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
					{/* <FormItem
						name="isCombo"
						label="Combo Pack?"
						className="white-font"
						style={{
							height: "32px",
							justifyContent: "space-between",
							flexWrap: "nowrap",
						}}
						labelCol={{ span: 5 }}
						initialValue={false}
					>
						<Space>
							<Radio.Group
								style={{
									display: "flex",
									width: "125px",
									height: "32px",
									float: "left",
								}}
								onChange={(e) => setIsCombo(e.target.value)}
								defaultValue={false}
							>
								<Radio
									value={true}
									style={{
										alignSelf: "center",
									}}
								>
									{" "}
									Yes{" "}
								</Radio>
								<Radio
									style={{
										alignSelf: "center",
									}}
									value={false}
								>
									{" "}
									No{" "}
								</Radio>
							</Radio.Group>

							<Form.Item
								name="count"
								label="# in pack"
								rules={[{ required: true }]}
								style={{
									width: "200px",
									paddingBottom: "0px",
								}}
								wrapperCol={{ span: 2 }}
								className="white-font"
								hidden={!isCombo}
								initialValue={1}
							>
								<Select
									allowClear
									defaultValue={1}
									style={{
										width: "auto",
										paddingBottom: "0px",
									}}
									className="black-font"
									onSelect={(e) => setCombo(e)}
								>
									<Option value="1">1</Option>
									<Option value="2">2</Option>
									<Option value="3">3</Option>
									<Option value="4">4</Option>
								</Select>
							</Form.Item>
						</Space> */}
					{/* </FormItem> */}
					{/* {isCombo && combo > 1 && (
						<>
							<FormItem name="amiibo" label="Amiibo">
								{options && (
									<AutoComplete
										options={options}
										placeholder="try to type `b`"
										filterOption={(inputValue, option) =>
											option!.value
												.toUpperCase()
												.indexOf(
													inputValue.toUpperCase()
												) !== -1
										}
										onSelect={(value) =>
											handleSelect(value)
										}
										style={{ color: "black" }}
									/>
								)}
								<h1 style={{ textAlign: "center" }}>
									{amiibo.name} - {amiibo.amiiboSeries}
								</h1>

								<img
									src={amiibo.image}
									style={{ width: "100px", padding: "10px" }}
								/>
							</FormItem> */}
					<FormItem name="condition" label="Condition">
						<Input.TextArea showCount />
					</FormItem>
					{/* </> */}
					{/* )}{" "} */}
					{/* <FormItem name= label= ></FormItem> */}
					{/* <FormItem name= label= ></FormItem> */}
					{/* <FormItem name= label= ></FormItem> */}
					{/* <FormItem name= label= ></FormItem> */}
					{/* // <h3>{amiibo.type}</h3> */}
					{/* <h1>{amiibo.id}</h1> */}
					{/* <Form.Item
						name="images"
						label="Images"
						valuePropName="fileList"
						getValueFromEvent={normFile}
					>
						<Upload
							name="logo"
							action="/upload.do"
							listType="picture"
						>
							<Button icon={<UploadOutlined />}>
								Click to upload
							</Button>
						</Upload>
					</Form.Item> */}
				</Form>
			</>
		);
	} else {
		return <></>;
	}
};

// description
// name
// equipment API CALL
// muscles

// } else {
// 	return <SpiningLoadingIcon />;
// }
//
