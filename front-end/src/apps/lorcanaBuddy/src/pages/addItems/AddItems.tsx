import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { TLorcanaCard } from "../../types/lorcana.types";
import { supabase } from "../../../../../supabase/supabaseClient";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";

export const AddItems = () => {
	// store all the cards as state
	const [allCards, setAllCards] = useState<TLorcanaCard[]>([]);

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
	// initial form values

	// Submitting function
	const onFinish = (values: any) => {
		console.log(values);
	};

	return (
		<div>
			<h1>Hello</h1>
			<Form onFinish={(values: any) => onFinish(values)}>
				<Form.Item name="date">
					<DatePicker format={dateFormat} />
				</Form.Item>
				<Form.Item
					name="location"
					label="Location"
					style={{ width: "600px", margin: "auto" }}
				>
					<Space.Compact>
						<Form.Item name="store" label="Store">
							<Input></Input>
						</Form.Item>
					</Space.Compact>
					<Space.Compact>
						<Form.Item name="city" label="City">
							<Input></Input>
						</Form.Item>
					</Space.Compact>
					<Space.Compact>
						<Form.Item name="region" label={regionName}>
							<Input></Input>
						</Form.Item>
					</Space.Compact>
					<Space.Compact>
						<Form.Item name="country" label="Country">
							<Input></Input>
						</Form.Item>
					</Space.Compact>
				</Form.Item>
				{/* <BoosterPack
						boosterPackId="12873461239"
						number={1}
					></BoosterPack> */}
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
