import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { ProductTypes, SetName, TLorcanaCard } from "../../types/lorcana.types";
import { supabase } from "../../../../../supabase/supabaseClient";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BoosterPack } from "../../components/BoosterPack";
import { ProductCard } from "../../components/ProductCard";

const productTypes = [
	{ value: 0, label: "Booster Pack" },
	{ value: 1, label: "Blister Pack" },
	{ value: 2, label: "Starter Deck" },
	{ value: 3, label: "Gift Set" },
	{ value: 4, label: "Illumineers Trove" },
	{ value: 5, label: "Booster Box" },
	{ value: 6, label: "D100" },
	{ value: 7, label: "Other" },
];

type TBoughtProducts = {
	type: ProductTypes;
	quantity: number;
	wave: number;
};
const waveNames = [
	{ value: 1, label: "The First Chapter" },
	{ value: 2, label: "Rise of the Floodborn" },
];
export const AddItems = () => {
	// store all the cards as state
	const [allCards, setAllCards] = useState<TLorcanaCard[]>([]);
	const [productCardSection, setProductCardSection] = useState<any>();
	// get all cards from supabase
	const getCards = async () => {
		let { data, error } = await supabase
			.from("lorcana_cards")
			.select(
				"id, cardNumber: card_number, colour, inkable, rarity, type, name, classification, cost, strength, willpower, lore, abilities, bodyText:body_text, flavourText:flavour_text, setName:set_name, set, artist, imageUrl: image,setId:set_id "
			);
		if (data) {
			setAllCards(data);
		} else {
			console.error(error);
		}
	};

	useEffect(() => {
		getCards();
	}, []);
	// component for each Type of purchase!!! starting with booster packs

	/* Form
- Checkbox.Group = choose what you bought (trove, d100, gift set, booster pack, cards) 
- Number input (active once checkboxed)= choose quantity of each 
- = date
- = total price 
- = gives estimated price with tax. 

*/
	//receipt date
	dayjs.extend(customParseFormat);
	const dateFormat = "YYYY/MM/DD";

	// location
	const [regionName, setRegionName] = useState<string>("Province");
	const locationInput = { width: "100px" };
	// initial form values

	// display booster half (second part)
	const [showSecondHalf, setShowSecondHalf] = useState<boolean>();

	// display booster packs
	const [productsQuantity, setProductsQuantity] = useState<TBoughtProducts[]>(
		[]
	);

	const createArrayOfProductCards = (productsQuantity: TBoughtProducts[]) => {
		let productCardArr: JSX.Element[] = new Array();
		productsQuantity.map((product: TBoughtProducts) => {
			for (let i = 1; i < product.quantity + 1; i++) {
				productCardArr.push(
					<ProductCard
						type={product.type}
						wave={product.wave}
						number={i}
						key={`${product.type}-i`}
					/>
				);
			}
		});
		setProductCardSection(productCardArr);
	};

	// Submitting function
	const onFinish = (values: any) => {
		console.log("PRODUCTS", values.products);
		setShowSecondHalf(true);
		setProductsQuantity(values.products);
	};

	useEffect(() => {
		createArrayOfProductCards(productsQuantity);
	}, [productsQuantity]);
	const productCard = (type: ProductTypes, wave: SetName) => {
		let card = "";
		switch (type) {
			case 0:
				<BoosterPack wave={wave} number={1} />;
				break;
			case 1:
				// code block
				break;
			default:
			// code block
		}
		// console.log(ProductTypes[product.type]);
	};

	return (
		<div>
			<h1>Hello</h1>
			<Form
				onFinish={(values: any) => onFinish(values)}
				labelCol={{ span: 4 }}
				labelAlign="right"
				style={{
					margin: "auto",
					maxWidth: "800px",
					textAlign: "start",
				}}
				initialValues={{ products: [{}] }}
			>
				<Form.Item name="date" label="Date">
					<DatePicker format={dateFormat} />
				</Form.Item>
				<Form.Item label="Location">
					<Form.List name="location">
						{(fields) => (
							<div>
								<Form.Item noStyle name={["store"]}>
									<Input
										placeholder="Store"
										style={locationInput}
									/>
								</Form.Item>
								<Form.Item noStyle name={["street"]}>
									<Input
										placeholder="Street"
										style={{ width: "150px" }}
									/>
								</Form.Item>
								<Form.Item noStyle name={["city"]}>
									<Input
										placeholder="City"
										style={locationInput}
									/>
								</Form.Item>
								<Form.Item noStyle name={regionName}>
									<Input
										placeholder={regionName}
										style={{ width: "50px" }}
									/>
								</Form.Item>
								<Form.Item noStyle name={"country"}>
									<Input
										placeholder="Country"
										style={locationInput}
									/>
								</Form.Item>
							</div>
						)}
					</Form.List>
				</Form.Item>
				<Form.Item name="price" label="Paid Price">
					<InputNumber
						placeholder="$$$"
						style={{ width: "100px" }}
						min={0}
					/>
				</Form.Item>
				<Form.Item label="Products">
					<Form.List name={"products"}>
						{(fields, subOpt) => (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									rowGap: 16,
								}}
							>
								{fields.map((field) => (
									<Space key={field.key}>
										<Form.Item
											wrapperCol={{ span: 8, offset: 4 }}
											noStyle
											name={[field.name, "type"]}
											rules={[
												{
													required: true,
													message: "Input item",
												},
											]}
											id="1"
										>
											<Select
												options={productTypes}
												style={{ width: "150px" }}
												placeholder="Booster Pack"
											/>
										</Form.Item>
										<Form.Item
											rules={[
												{
													required: true,
													message: "Quantity needed",
												},
											]}
											id="2"
											noStyle
											name={[field.name, "quantity"]}
										>
											<InputNumber
												placeholder="Quantity"
												min={0}
												style={{ width: "80px" }}
											/>
										</Form.Item>
										<Form.Item
											id="3"
											rules={[
												{
													required: true,
													message: "Set ",
												},
											]}
											noStyle
											name={[field.name, "wave"]}
										>
											<Select
												placeholder="Wave"
												options={waveNames}
												style={{ width: "200px" }}
											/>
										</Form.Item>
										<CloseOutlined
											onClick={() => {
												subOpt.remove(field.name);
											}}
											style={{ color: "red" }}
										/>
									</Space>
								))}
								<Button
									type="dashed"
									onClick={() => subOpt.add()}
									block
								>
									+ Add Product
								</Button>
							</div>
						)}
					</Form.List>
				</Form.Item>

				{/* <BoosterPack
						boosterPackId="12873461239"
						number={1}
					></BoosterPack> */}
				<Button type="primary" htmlType="submit">
					{productsQuantity.length < 1 ? "Next" : "Update"}
				</Button>
				{/* <Button type="primary" htmlType="submit">
					{productsQuantity.length < 1 ? "Next" : "Update"}
				</Button> */}
			</Form>
				{showSecondHalf && (
					<>
						<h1>Second Half</h1>
						{productCardSection}
					</>
				)}
		</div>
	);
};
