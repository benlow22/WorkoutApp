import React, { useContext, useEffect, useMemo, useState } from "react";
// import { supabase } from "../../../../supabase/supabaseClient";
import { TAmiiboCard } from "../../types/types";
import "../../styles/amiibos.css";
import {
	AutoComplete,
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Rate,
	Select,
	Space,
	UploadFile,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { UploadImage } from "../../components/UploadImage";
import Places from "../../components/Places";
type TAmiiboCache = {
	[concatName: string]: TAmiiboCard;
};
const { Option } = Select;
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { SubmitFormButton } from "./submitButtonPopUp";

export const AddAmiibo: React.FC<{}> = () => {
	const { workouts, setWorkouts, userId, session, supabase } =
		useContext(AuthContext);
	const [amiibos, setAmiibos] = useState<TAmiiboCard[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [options, setOptions] = useState<{ value: string }[]>([]);
	// const [amiibo, setAmiibo] = useState<any>("");
	const [cache, setCache] = useState<TAmiiboCache>();
	// const [isCombo, setIsCombo] = useState<boolean>(false);
	// const [combo, setCombo] = useState<number>(2);
	const [numberOfAmiibos, setNumberOfAmiibos] = useState<number>(1);
	const [amiibosArr, setAmiibosArr] = useState<TAmiiboCard[]>([]);
	const [amiibosArrBackup, setAmiibosArrBackup] = useState<TAmiiboCard[]>([]);
	const [selected, setSelected] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [locationName, setLocationName] = useState<any>(null);
	const [amiibovalArr, setAmiibovalArr] = useState<string[]>([]);
	const [currency, setCurrency] = useState("$");
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [rating, setRating] = useState<number>();
	const [submit, setSubmit] = useState<boolean>(false);
	const [packId, setPackId] = useState<string>("");
	const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	const handleSubmitLoading = () => {
		setSubmitLoading(true);
	};
	const [form] = Form.useForm();
	const onReset = () => {
		form.resetFields();
	};
	useEffect(() => {
		getAmiibos();
	}, []);

	useEffect(() => {
		if (uploadSuccess) {
			console.log("time to clear the form or redirect");
			onReset();
		}
	}, [uploadSuccess]);

	useEffect(() => {
		handleNumberOfAmiiboChange(numberOfAmiibos);
	}, [numberOfAmiibos]);

	// useEffect(() => {
	// 	console.log("CHECL", amiibosArr, "hi", amiibovalArr);
	// }, [amiibosArr]);

	const getAmiibos = async () => {
		let { data, error } = await supabase
			.from("amiibo")
			.select(
				" amiiboSeries :amiibo_series ,character, gameSeries: game_series , head, id, image, name,release_au,release_eu,release_jp,release_na,tail,type"
			)
			.eq("type", "Figure");
		if (data) {
			setAmiibos(data);
			const amiiboCache: TAmiiboCache = {};
			const concatData = data.map((amiibo, index) => {
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
				setIsLoading(false);
			}
		} else {
			console.error("ERROR", error);
		}
	};

	const handleAmiiboSelect = (value: string, index: number) => {
		if (cache) {
			if (value in cache) {
				let newAmiiboArr = new Array(...amiibosArr);
				let newAmiibovalArr = new Array(...amiibovalArr);
				newAmiibovalArr[index] = value;
				newAmiiboArr[index] = cache[value];
				setAmiibovalArr(newAmiibovalArr);
				setAmiibosArr(newAmiiboArr);
				setAmiibosArrBackup(newAmiiboArr);
			}
		}
	};

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

	const concatAmiiboNameAndSeries = (amiibo: TAmiiboCard) => {
		return amiibo.name + " - " + amiibo.amiiboSeries;
	};

	const amiiboNameSizeFormater = (amiibo: TAmiiboCard) => {
		const concatNameAndSeries = concatAmiiboNameAndSeries(amiibo);

		if (concatNameAndSeries.length < 15) {
			return "";
		} else if (concatNameAndSeries.length < 30) {
			return "two-lines";
		} else {
			return "three-lines";
		}
	};

	const handleRateChange = (value: number) => {
		setRating(value);
	};

	const onFinish = (values: any) => {
		console.log("FL:", fileList);
		console.log("values from form:", values);
		console.log("FL no photo:", fileList[0]?.uid);

		const amiiboPackageId = uuidv4();
		setPackId(amiiboPackageId);

		const finishedFormValues = {
			...values,
			rating: rating,
			location: locationName,
			amiiboPackageId,
			amiibos: amiibosArr,
			photos: fileList,
			userId,
		};

		const packData = finishedFormValues.amiibos.map(
			(amiibo: TAmiiboCard) => ({
				user_id: userId,
				amiibo_id: amiibo.id,
				location: locationName,
				price: values.price,
				purchase_date: values.purchaseDate,
				price_currency: values.currency,
				version: values.version,
				replace: values.replace,
				return: values.return,
				return_by_date: values.returnBy,
				rating: rating,
				condition: values.condition,
				pack_id: amiiboPackageId,
				thumbnail_url: fileList[0].uid ? fileList[0].uid : null, // null for no photo provided
			})
		);

		if (fileList.length > 0) {
			const photoPaths = fileList.map((file) => file.uid);
			setSubmit(true);
			try {
				uploadPhotoPathsToSupabase(amiiboPackageId, photoPaths);
				console.log("FINISHED AMIIBO INPUT FORM", finishedFormValues);
				throw new Error();
			} catch (e) {
				console.error(e);
			}
		}
		try {
			uploadAmiiboToSupabase(packData);
		} catch (e) {
			console.error(e);
		}
	};

	//can update amiibodata type later
	const uploadAmiiboToSupabase = async (amiibodata: any) => {
		const { data, error } = await supabase
			.from("users_amiibos")
			.insert(amiibodata)
			.select();
		if (data) {
			console.log("upload is a success", data);
			setUploadSuccess(true);
		} else {
			console.error(error);
		}
	};

	const uploadPhotoPathsToSupabase = async (
		packId: string,
		pathsArr: string[]
	) => {
		const { data, error } = await supabase
			.from("ab_pack_id_image_paths")
			.insert([
				{ pack_id: packId, photo_paths: pathsArr, user_id: userId },
			])
			.select();
		if (data) {
			console.log("upload photo paths is a success", data);
		} else {
			console.error(error);
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const handleSubmit = () => {};

	if (!isLoading) {
		return (
			<>
				<h2 className="page-heading"> Add Amiibo To Collection </h2>;
				<Form
					form={form}
					style={{
						maxWidth: "500px",
						margin: "auto",
						padding: "20px",
						border: "4px grey solid",
						borderRadius: "10px",
					}}
					initialValues={{
						"input-number": 3,
						"checkbox-group": ["A", "B"],
						rate: 3.5,
						"color-picker": null,
					}}
					labelCol={{ span: 4 }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					{numberOfAmiibos > 1 ? (
						<Form.Item
							label="Pack Name"
							name="packName"
							labelCol={{ span: 6 }}
						>
							<Input />
						</Form.Item>
					) : amiibosArr[0] ? (
						<p
							style={{
								height: "32px",
								fontSize: "14px",
								margin: "12px",
							}}
						>
							{amiibovalArr[0]}
						</p>
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
							width: "100%",
						}}
					>
						<Form.Item
							name="combo"
							label="# of amiibos in pack"
							labelCol={{ span: 17 }}
							wrapperCol={{ span: 7 }}
							style={{ width: "100%" }}
							initialValue={"1"}
							className="amiibo-pack-selector"
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
						<Space className="currency-price">
							<Form.Item
								label="Price"
								name="price"
								labelCol={{ span: 8 }}
								wrapperCol={{ span: 16 }}
								className="price-input-number"
								style={{
									display: "inline-block",
								}}
							>
								<InputNumber<string>
									step="0.01"
									stringMode
									defaultValue="0.00"
									parser={(value) =>
										parseFloat(value!).toFixed(2).toString()
									}
									prefix={<>{currency}</>}
								/>
							</Form.Item>

							<Form.Item
								name="currency"
								colon={false}
								label=" "
								initialValue={"CAD"}
								labelCol={{ span: 0 }}
								wrapperCol={{ span: 24 }}
								style={{
									display: "inline-block",

									color: "white",
									fontWeight: "lighter",
								}}
							>
								<Select
									style={{ color: "white" }}
									onChange={(value) =>
										handleCurrencyChange(value)
									}
									className="currency"
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
									defaultActiveFirstOption
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
										<h4
											style={{ fontWeight: "lighter" }}
											className={
												"amiibo-input-form-image-name " +
												amiiboNameSizeFormater(amiibo)
											}
										>
											{concatAmiiboNameAndSeries(amiibo)}
										</h4>
										<div className="amiibo-input-form-image-container">
											<img
												src={amiibo.image}
												style={{
													padding: "10px",
												}}
												className="amiibo-input-image"
											/>
										</div>
									</div>
								)
						)}
					</div>

					<UploadImage
						fileList={fileList}
						setFileList={setFileList}
						submit={submit}
						packId={packId}
					/>

					<Form.Item
						name="rating"
						label="Rate"
						style={{ color: "white", textAlign: "center" }}
					>
						<div>
							Awful
							<Rate
								count={5}
								style={{
									backgroundColor: "grey",
									padding: "0px 10px",
									borderRadius: "10px",
									margin: "0px 10px",
								}}
								allowHalf
								onChange={(value) => handleRateChange(value)}
							/>
							Perfect
						</div>
					</Form.Item>

					<FormItem name="condition" label="Condition">
						<Input.TextArea showCount />
					</FormItem>

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
								<Option value="Yes">Yes</Option>
								<Option value="No">No</Option>
								<Option value="Maybe">Maybe</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="returnBy"
							label="Return By"
							labelCol={{ span: 10 }}
						>
							<DatePicker
								showTime={false}
								// format={"YYYY-MM-DD"}
							/>
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
						<DatePicker showTime={false} />
					</Form.Item>
					<FormItem name="location" label="Bought at">
						<>
							<Places
								selected={selected}
								setSelected={setSelected}
								setLocationName={setLocationName}
							/>
							<Input value={locationName} className="hidden" />
						</>
					</FormItem>
					<Form.Item wrapperCol={{ span: 24 }}>
						<SubmitFormButton />
					</Form.Item>
				</Form>
			</>
		);
	} else {
		return <></>;
	}
};
