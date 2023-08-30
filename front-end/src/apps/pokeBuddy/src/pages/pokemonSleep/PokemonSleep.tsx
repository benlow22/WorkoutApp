import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";
import "../../styles/style.css";
import { Button, Cascader, Input, InputNumber, Select, Space } from "antd";
import ingredientsJSON from "../../../public/pokemonSleepIngredients.json";
import { Option } from "antd/es/mentions";
import recipesJSON from "../../../public/pokemonSleepRecipes.json";
import { varFromDomainsJSON, varFromJSON } from "../../../../../utils/utils";

type TIngredient = {
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
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [unlockedIngredients, setUnlockedIngredients] = useState<string[]>(
		[]
	);

	useEffect(() => {
		const categories = varFromJSON(recipesJSON, "categories");
		setCategories(categories);
		console.log("categories", categories);
		const ingredients = varFromJSON(ingredientsJSON, "ingredients");
		console.log("ingredients", ingredients);
		setIngredients(ingredients);
	}, []);

	const handleIconClick = (ingredient: TIngredient) => {
		console.log("icon clicked", ingredient.name);
		const newIngredientArray = new Array(...unlockedIngredients);
		if (newIngredientArray.includes(ingredient.name)) {
			const ingredientToRemoveArrIndex = newIngredientArray.indexOf(
				ingredient.name
			);
			newIngredientArray.splice(ingredientToRemoveArrIndex, 1);
			console.log("newIngredientArray", newIngredientArray);
			setUnlockedIngredients(newIngredientArray);
		} else {
			newIngredientArray.push(ingredient.name);
			setUnlockedIngredients(newIngredientArray);
		}
	};

	useEffect(() => {
		console.log("unlockedIngredients ARR", unlockedIngredients);
	}, [unlockedIngredients]);
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
							className={`ingredient-button ${
								unlockedIngredients.includes(ingredient.name)
									? "unlocked-ingredient"
									: ""
							}`}
							icon={
								<img
									src={`/pokemonSleepIngredients/${ingredient.imageUrl}`}
									className="ingredient-button-icon"
								/>
							}
							onClick={() => handleIconClick(ingredient)}
						/>
					))}
			</div>
		</div>
	);
};
