import React, { useContext, useEffect, useState } from "react";
import { SpiningLoadingIcon } from "../../src/components/loading/LoadingIcon";
import { amiiboFetchApi } from "../api/api";
import { supabase } from "../../src/supabaseClient";
import { AmiiboCard } from "../components/AmiiboCard";
import { TAmiiboCard } from "../types/types";
import "../styles/amiibos.css";
import { AutoComplete, Button, Form, Input, Rate, Select, Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
import { UploadImages } from "./UploadImages";
type TAmiiboCache = {
	[concatName: string]: TAmiiboCard;
};

export const AmiiboInventoryForm: React.FC<{}> = () => {
	// const { workouts, setWorkouts, userId, session } = useContext(AuthContext);
	const [userId, setUserId] = useState("");
	const [amiibos, setAmiibos] = useState<TAmiiboCard[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [options, setOptions] = useState<{ value: string }[]>([]);
	const [amiibo, setAmiibo] = useState<any>("");
	const [cache, setCache] = useState<TAmiiboCache>();

	useEffect(() => {
		getAmiibos();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			console.log("amiiiii", amiibo);
		}
	}, [isLoading]);

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

	const handleSelect = (value: string) => {
		if (cache) {
			if (value in cache) {
				setAmiibo(cache[value]);
			}
		}
	};
	// const response = amiiboFetchApi();

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
					<FormItem name="amiibo" label="Amiibo">
						{options && (
							<AutoComplete
								options={options}
								placeholder="try to type `b`"
								filterOption={(inputValue, option) =>
									option!.value
										.toUpperCase()
										.indexOf(inputValue.toUpperCase()) !==
									-1
								}
								onSelect={(value) => handleSelect(value)}
								style={{ color: "black" }}
							/>
						)}
					</FormItem>
					{amiibo && (
						<h1 style={{ textAlign: "center" }}>
							{amiibo.name} - {amiibo.amiiboSeries}
						</h1>
					)}
					<img
						src={amiibo.image}
						style={{ width: "100px", padding: "10px" }}
					/>
					<FormItem name="condition" label="Condition">
						<Input.TextArea showCount />
					</FormItem>
					<Form.Item
						name="rate"
						label="Rate"
						style={{ color: "grey", textAlign: "center" }}
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
					<FormItem label="Price">
						<div className="amiibo-inventory-form-price">
							<FormItem>
								<Input />
							</FormItem>
							<FormItem
								name="currency"
								label="Currency"
								style={{ width: "200px", paddingLeft: "20px" }}
							>
								<Select className="currency-select">
									<Option key="CAD" value="CAD">
										CAD
									</Option>
									<Option key="USD" value="USD">
										USD
									</Option>
								</Select>
							</FormItem>
						</div>
					</FormItem>
					<UploadImages />
					{/* <FormItem name= label= ></FormItem> */}
					{/* <FormItem name= label= ></FormItem> */}
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
