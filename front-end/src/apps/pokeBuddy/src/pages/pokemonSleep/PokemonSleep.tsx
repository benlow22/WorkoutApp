import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";
import "../../styles/style.css";
import {
	Button,
	Cascader,
	Input,
	InputNumber,
	Radio,
	Select,
	Space,
	Switch,
} from "antd";
import ingredientsJSON from "../../../public/pokemonSleepIngredients.json";
import { Option } from "antd/es/mentions";
import recipesJSON from "../../../public/pokemonSleepRecipess.json";
import { varFromDomainsJSON, varFromJSON } from "../../../../../utils/utils";
import { Recipe, TRecipe } from "../../components/Recipe";

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
	const [potSize, setPotSize] = useState<number | null>(15);
	const [allRecipes, setAllRecipes] = useState();
	const [categories, setCategories] = useState<{ category: TRecipe[] }>();
	const [chosenCategories, setChosenCategories] = useState();
	const [recipes, setRecipes] = useState<TRecipe[]>([]);
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [unlockedIngredients, setUnlockedIngredients] = useState<string[]>(
		[]
	);
	const [showAll, setShowAll] = useState<boolean>(false);

	const [cookableRecipes, setCookableRecipes] = useState<TRecipe[]>([]);
	const [uncookableRecipes, setUncookableRecipes] = useState<TRecipe[]>([]);

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
		console.log("unlockedIngredients ARR", showAll);
		if (showAll) {
			setUnlockedIngredients([
				"Large Leek",
				"Tasty Mushroom",
				"Fancy Egg",
				"Honey",
				"Soft Potato",
				"Fancy Apple",
				"Pure Oil",
				"Greengrass Soybeans",
				"Slowpoke Tail",
				"Soothing Cacao",
				"Moomoo Milk",
				"Bean Sausage",
				"Snoozy Tomato",
				"Warming Ginger",
				"Fiery Herb",
			]);
		} else {
			setUnlockedIngredients([]);
		}
	}, [showAll]);

	useEffect(() => {
		console.log("unlockedIngredients ARR", unlockedIngredients);
	}, [unlockedIngredients]);

	useEffect(() => {
		console.log("category", categories);
		if (categories && chosenCategories) {
			setRecipes(categories[chosenCategories]);
		}
	}, [chosenCategories]);

	useEffect(() => {
		console.log("rec ARR", recipes);

		if (recipes) {
			let cookableMeals: TRecipe[] = recipes.filter(
				(recipe) =>
					recipe.minimumPotSize <= potSize! &&
					recipe.ingredients.every((ingredient) =>
						unlockedIngredients.includes(ingredient.name)
					)
			);
			let uncookableMeals: TRecipe[] = recipes.filter(
				(recipe) =>
					recipe.minimumPotSize > potSize! &&
					recipe.ingredients.every((ingredient) =>
						unlockedIngredients.includes(ingredient.name)
					)
			);
			console.log("cook ARR", cookableMeals);
			console.log("uncook ARR", uncookableMeals);

			setCookableRecipes(cookableMeals);
			setUncookableRecipes(uncookableMeals);
		}
	}, [recipes, potSize, unlockedIngredients]);

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
					onChange={(value) => setPotSize(value)}
					style={{ margin: "20px" }}
				/>
			</Space>
			<Switch
				checkedChildren="Check All"
				unCheckedChildren="Uncheck All"
				onClick={() => {
					setShowAll(!showAll);
				}}
			/>
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
			<Radio.Group
				onChange={(e) => {
					setChosenCategories(e.target.value);
				}}
				style={{ marginTop: 16 }}
			>
				<Radio.Button value="Curries and Stews">
					Curries and Stews
				</Radio.Button>
				<Radio.Button value="Salads">Salads</Radio.Button>
				<Radio.Button value="Desserts and Drinks">
					Desserts and Drink
				</Radio.Button>
			</Radio.Group>

			{recipes && (
				<div className="recipes">
					{/* <div className="cookable-recipes">
						{recipes &&
							recipes.map((recipe: TRecipe) => (
								<Recipe recipe={recipe} />
							))}
					</div> */}
					{cookableRecipes.length > 0 && (
						<div className="cookable-recipes">
							<h3 className="cookable-recipes-header">
								Cookable Recipes
							</h3>
							{cookableRecipes.map((recipe: TRecipe) => (
								<Recipe
									recipe={recipe}
									ingredients={ingredients}
								/>
							))}
						</div>
					)}
					<div className="uncookable-recipes">
						{uncookableRecipes &&
							uncookableRecipes.map((recipe: TRecipe) => (
								<Recipe
									recipe={recipe}
									ingredients={ingredients}
								/>
							))}
					</div>
				</div>
			)}
		</div>
	);
};
