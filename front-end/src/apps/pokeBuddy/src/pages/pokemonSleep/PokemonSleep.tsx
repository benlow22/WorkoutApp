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
	Tooltip,
} from "antd";
import ingredientsJSON from "../../../public/pokemonSleepIngredients.json";
import { Option } from "antd/es/mentions";
import recipesJSON from "../../../public/pokemonSleepRecipes.json";
import { varFromDomainsJSON, varFromJSON } from "../../../../../utils/utils";
import { Recipe, TRecipe } from "../../components/Recipe";
import { Helmet } from "react-helmet";

type TIngredient = {
	id: number;
	name: string;
	description: string;
	baseStrength: number;
	sellValue: number;
	imageUrl: string;
};

export const PokemonSleep = () => {
	const { auth, username, supabase } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>(15);
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
	const getIngredients = async () => {
		let { data, error } = await supabase
			.from("pokemon_sleep_users_recipe_data")
			.select(
				"myUnlockedIngredients: unlocked_ingredients, myPotSize: pot_size, saladsLevel: salads_level, curriesLevel: curries_level, drinksLevel: drinks_level, currentCategory: current_weeks_category"
			)
			.single();
		if (data) {
			console.log("ingr data from supabase", data);
			setUnlockedIngredients(data.myUnlockedIngredients);
			setPotSize(data.myPotSize);
			setChosenCategories(data.currentCategory);
		} else {
			console.error("error", error);
		}
	};

	useEffect(() => {
		getIngredients();
	}, []);
	useEffect(() => {
		// console.log("unlockedIngredients ARR", showAll);
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
		// console.log("unlockedIngredients ARR", unlockedIngredients);
	}, [unlockedIngredients]);

	useEffect(() => {
		console.log("category", categories);
		if (categories && chosenCategories) {
			setRecipes(categories[chosenCategories]);
		}
	}, [chosenCategories]);

	useEffect(() => {
		// console.log("rec ARR", recipes);

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
			// console.log("cook ARR", cookableMeals);
			// console.log("uncook ARR", uncookableMeals);

			setCookableRecipes(cookableMeals);
			setUncookableRecipes(uncookableMeals);
		}
	}, [recipes, potSize, unlockedIngredients]);

	return (
		<div className="recipe-page">
			<Helmet>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
				></meta>
			</Helmet>
			<div className="page-heading">
				<h2>Pokemon Sleep HomePage</h2>
			</div>
			<Space className="pokemon-sleep-page">
				<p>Pot Size:</p>
				<Space.Compact>
					<Button
						type="primary"
						className="pot-size-adjuster decrease"
						onClick={() => {
							if (potSize >= 18) {
								setPotSize(potSize - 3);
							}
						}}
					>
						-
					</Button>

					<Input
						defaultValue={potSize}
						onChange={(e) => setPotSize(Number(e.target.value))}
						style={{ margin: "0px" }}
						value={potSize}
					/>
					<Button
						type="primary"
						className="pot-size-adjuster increase"
						onClick={() => {
							if (potSize < 81) {
								setPotSize(potSize + 3);
							}
						}}
					>
						+
					</Button>
				</Space.Compact>
			</Space>
			<Switch
				checkedChildren="Uncheck All"
				unCheckedChildren="Check All"
				onClick={() => {
					setShowAll(!showAll);
				}}
				className="uncheck-all-switch"
			/>
			<div className="ingredient-buttons-container">
				{ingredients.length > 0 &&
					ingredients.map((ingredient, index: number) => (
						<Button
							key={index}
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
				defaultValue={chosenCategories}
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
							{cookableRecipes.map(
								(recipe: TRecipe, index: number) => (
									<Recipe
										key={index}
										recipe={recipe}
										ingredients={ingredients}
									/>
								)
							)}
						</div>
					)}
					<div className="uncookable-recipes">
						{uncookableRecipes &&
							uncookableRecipes.map(
								(recipe: TRecipe, index: number) => (
									// <Tooltip
									<Recipe
										key={index}
										recipe={recipe}
										ingredients={ingredients}
									/>
								)
							)}
					</div>
				</div>
			)}
		</div>
	);
};
