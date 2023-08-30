import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";
import "../../styles/style.css";
import { Button, Cascader, Input, InputNumber, Select, Space } from "antd";
import ingredientsJSON from "../../../public/pokemonSleepIngredients.json";
import { Option } from "antd/es/mentions";
import recipesJSON from "../../../public/pokemonSleepRecipes.json";
import { varFromDomainsJSON } from "../../../../../utils/utils";

type TIngredients = {
	id: number;
	name: string;
	description: string;
	baseStrength: number;
	sellValue: number;
	imageUrl: string;
};

export const PokemonSleep = () => {
	const { auth, username } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>(15);
	const [allRecipes, setAllRecipes] = useState();
	const [categories, setCategories] = useState();
	const [ingredients, setIngredients] = useState<TIngredients[]>([]);

	useEffect(() => {
		const categories = varFromDomainsJSON(recipesJSON, "categories");
		setCategories(categories);
		console.log("categories", categories);
		const ingredients = varFromDomainsJSON(ingredientsJSON, "ingredients");
		console.log("ingredients", ingredients);
		setIngredients(ingredients);
	}, []);

	return (
		<div className="recipe-page">
			<div className="page-heading">
				<h2>Pokemon Sleep HomePage</h2>
			</div>
			<Space className="pokemon-sleep-page">
				<p>Pot Size:</p>
				<InputNumber
					min={15}
					max={81}
					step={3}
					defaultValue={15}
					onChange={(value) => setPotSize(value!)}
					style={{ margin: "20px" }}
				/>
			</Space>
			<div className="ingredient-buttons-container">
				{ingredients.length > 0 &&
					ingredients.map((ingredient) => (
						<Button
							shape="circle"
							size="large"
							className="ingredient-button"
							icon={
								<img
									src={`/pokemonSleepIngredients/${ingredient.imageUrl}`}
									className="ingredient-button-icon"
								/>
							}
						/>
					))}
			</div>
		</div>
	);
};
