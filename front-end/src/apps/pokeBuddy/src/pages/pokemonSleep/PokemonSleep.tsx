import { Outlet } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";
import "../../styles/style.css";
import {
	Button,
	Cascader,
	Dropdown,
	Input,
	InputNumber,
	MenuProps,
	Radio,
	Select,
	Space,
	Switch,
	Tooltip,
	message,
} from "antd";
import ingredientsJSON from "../../../public/pokemonSleepIngredients.json";
import { Option } from "antd/es/mentions";
import recipesJSON from "../../../public/pokemonSleepRecipes.json";
import { varFromDomainsJSON, varFromJSON } from "../../../../../utils/utils";
import { Recipe, TRecipe } from "../../components/Recipe";
import { Helmet } from "react-helmet";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	FilterFilled,
	UserOutlined,
} from "@ant-design/icons";

type TIngredient = {
	id: number;
	name: string;
	description: string;
	baseStrength: number;
	sellValue: number;
	imageUrl: string;
};

export const PokemonSleep = () => {
	const { auth, username, supabase, userId } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>(15);
	const [allRecipes, setAllRecipes] = useState();
	const [categories, setCategories] = useState<{
		[category: string]: TRecipe[];
	}>();
	const [newRecipeLevel, setNewRecipeLevel] = useState<{
		name: string;
		level: number;
	}>();

	const [chosenCategories, setChosenCategories] = useState<string>("");
	const [recipes, setRecipes] = useState<TRecipe[]>([]);
	const [ingredients, setIngredients] = useState<TIngredient[]>([]);
	const [unlockedIngredients, setUnlockedIngredients] = useState<string[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [filterName, setFilterName] = useState<any>("Filter by");
	const [filterKey, setFilterKey] = useState<number>();
	const [showAll, setShowAll] = useState<boolean>(false);
	const [cookableRecipes, setCookableRecipes] = useState<TRecipe[]>([]);
	const [uncookableRecipes, setUncookableRecipes] = useState<TRecipe[]>([]);
	const [saladsLevels, setSaladLevels] = useState<
		{ name: string; level: number }[]
	>([]);
	const [curriesLevels, setCurriesLevels] = useState<
		{ name: string; level: number }[]
	>([]);
	const [drinksLevels, setDrinksLevels] = useState<
		{ name: string; level: number }[]
	>([]);

	const [messageApi, contextHolder] = message.useMessage();
	const warningMessage = () => {
		messageApi.open({
			type: "warning",
			content: "you must log in first to save settings",
			duration: 6,
		});
	};
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
		const { count, error: testError } = await supabase
			.from("pokemon_sleep_users_recipe_data")
			.select(`*`, { count: "exact", head: true });
		console.log("count", count);
		if (testError) {
			console.error(testError);
		}
		if (count) {
			let { data, error } = await supabase
				.from("pokemon_sleep_users_recipe_data")
				.select(
					"myUnlockedIngredients: unlocked_ingredients, myPotSize: pot_size, saladsLevel: salads_level, curriesLevel: curries_level, drinksLevel: drinks_level, currentCategory: current_weeks_category"
				);
			if (data) {
				console.log("ingr data from supabase", data);
				if (data[0].myUnlockedIngredients) {
					setUnlockedIngredients(data[0].myUnlockedIngredients);
				}
				if (data[0].myPotSize) {
					setPotSize(data[0].myPotSize);
				}
				if (data[0].currentCategory) {
					setChosenCategories(data[0].currentCategory);
				}
				if (data[0].curriesLevel) {
					setCurriesLevels(data[0].curriesLevel);
				}
				if (data[0].saladsLevel) {
					setSaladLevels(data[0].saladsLevel);
				}
				console.log("ingr data from curr", data[0].curriesLevel);

				// setCurriesLevels(JSON.stringify(data.curriesLevel));
				if (data[0].drinksLevel) {
					setDrinksLevels(data[0].drinksLevel);
				}
			} else {
				console.error("error", error);
			}
		}
	};
	useEffect(() => {
		switch (filterKey) {
			case 1:
				setFilterName("Ingredient Names");
		}
		console.log("filterKey", filterKey);
		console.log("filterKey", filterName);
	}, [filterKey]);

	const updateLevels = async (
		column_name: string,
		dataToUpdate: { name: string; level: number }[]
	) => {
		if (auth) {
			setIsLoading(true);
			const { data, error } = await supabase
				.from("pokemon_sleep_users_recipe_data")
				.update({ [column_name]: dataToUpdate })
				.eq("user_id", userId)
				.select();
			if (data) {
				console.log(data);
				setIsLoading(false);
			} else {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		if (newRecipeLevel) {
			console.log("startupload", newRecipeLevel);
			let dataToUpdate: { name: string; level: number }[] = [];
			if (chosenCategories === "Curries and Stews") {
				if (curriesLevels) {
					dataToUpdate = curriesLevels;
					console.log("dataToUpdate", dataToUpdate);
					let updatedDataIndex = dataToUpdate.findIndex(
						(oldRecipe) => oldRecipe.name === newRecipeLevel.name
					);
					console.log("indexxxx", updatedDataIndex);
					if (updatedDataIndex < 0) {
						dataToUpdate.push(newRecipeLevel);
					} else {
						dataToUpdate[updatedDataIndex] = newRecipeLevel;
					}
				} else {
					dataToUpdate = [newRecipeLevel];
					setCurriesLevels(dataToUpdate);
					console.log("update data", dataToUpdate);
				}
				updateLevels("curries_level", dataToUpdate);
			} else if (chosenCategories === "Salads" && saladsLevels) {
				if (saladsLevels) {
					dataToUpdate = saladsLevels;
					console.log("dataToUpdate", dataToUpdate);
					let updatedDataIndex = dataToUpdate.findIndex(
						(oldRecipe) => oldRecipe.name === newRecipeLevel.name
					);
					console.log("indexxxx", updatedDataIndex);
					if (updatedDataIndex < 0) {
						dataToUpdate.push(newRecipeLevel);
					} else {
						dataToUpdate[updatedDataIndex] = newRecipeLevel;
					}
				} else {
					let dataToUpdate = [newRecipeLevel];
					setSaladLevels(dataToUpdate);
					console.log("update data", dataToUpdate);
				}
				updateLevels("salads_level", dataToUpdate);
			} else if (chosenCategories === "Drinks and Desserts") {
				if (drinksLevels) {
					dataToUpdate = drinksLevels;
					console.log("dataToUpdate", dataToUpdate);
					let updatedDataIndex = dataToUpdate.findIndex(
						(oldRecipe) => oldRecipe.name === newRecipeLevel.name
					);
					console.log("indexxxx", updatedDataIndex);
					if (updatedDataIndex < 0) {
						dataToUpdate.push(newRecipeLevel);
					} else {
						dataToUpdate[updatedDataIndex] = newRecipeLevel;
					}
				} else {
					let dataToUpdate = [newRecipeLevel];
					setDrinksLevels(dataToUpdate);
					console.log("update data", dataToUpdate);
				}
				updateLevels("drinks_level", dataToUpdate);
			}

			// if (chosenCategories === "Curries and Stews") {
			// 	userOldData = curriesLevels;
			// 	console.log("old user data", userOldData);
			// 	let updatedDataIndex = userOldData.findIndex((oldRecipe) => {
			// 		oldRecipe.name === newRecipeLevel.name;
			// 	});
			// 	userOldData[updatedDataIndex] = newRecipeLevel;
			// } else if (chosenCategories === "Salads") {
			// 	userOldData = saladsLevels;
			// 	let updatedDataIndex = userOldData.findIndex((oldRecipe) => {
			// 		oldRecipe.name === newRecipeLevel.name;
			// 	});
			// 	userOldData[updatedDataIndex] = newRecipeLevel;
			// } else if (chosenCategories === "Drinks and Desserts") {
			// 	userOldData = drinksLevels;
			// 	let updatedDataIndex = userOldData.findIndex((oldRecipe) => {
			// 		oldRecipe.name === newRecipeLevel.name;
			// 	});
			// 	userOldData[updatedDataIndex] = newRecipeLevel;
			// }
			// // console.log("old user data", userOldData);
			// console.log("new user data", userOldData);
		}
	}, [newRecipeLevel]);

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
		if (categories && chosenCategories) {
			console.log("category", categories[chosenCategories]);
			setRecipes(categories[chosenCategories]);
		}
	}, [chosenCategories]);

	const handlesave = async () => {
		if (auth) {
			setIsLoading(true);
			console.log("unlockedIngredients", unlockedIngredients);
			const { data, error } = await supabase
				.from("pokemon_sleep_users_recipe_data")
				.upsert({
					user_id: userId,
					unlocked_ingredients: unlockedIngredients,
					pot_size: potSize,
					current_weeks_category: chosenCategories,
				})
				.select();
			if (data) {
				console.log(data);
				setIsLoading(false);
			} else {
				console.log(error);
			}
		} else {
			warningMessage();
		}
	};
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
			if (cookableMeals.length > 0) {
				console.log("cook ARR", cookableMeals);
			}
			// console.log("uncook ARR", uncookableMeals);
			if (curriesLevels.length > 0) {
				console.log("curryLVL", curriesLevels);
			}

			let cookableMealAndLevel = cookableMeals.map((cookableMeal) => {
				// console.log("cookable meal", cookableMeal);
				let level = 1;
				if (chosenCategories === "Curries and Stews" && curriesLevels) {
					for (let i = 0; i < curriesLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === curriesLevels[i].name) {
							level = curriesLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				} else if (chosenCategories === "Salads" && saladsLevels) {
					for (let i = 0; i < saladsLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === saladsLevels[i].name) {
							level = saladsLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				} else if (
					chosenCategories === "Drinks and Desserts" &&
					drinksLevels
				) {
					for (let i = 0; i < drinksLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === drinksLevels[i].name) {
							level = drinksLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				}
				return { ...cookableMeal, level: level };
			});
			console.log("cookableMealAndLevel", cookableMealAndLevel);

			let uncookableMealAndLevel = uncookableMeals.map((cookableMeal) => {
				// console.log("cookable meal", cookableMeal);
				let level = 1;
				if (chosenCategories === "Curries and Stews" && curriesLevels) {
					for (let i = 0; i < curriesLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === curriesLevels[i].name) {
							level = curriesLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				} else if (chosenCategories === "Salads" && saladsLevels) {
					for (let i = 0; i < saladsLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === curriesLevels[i].name) {
							level = curriesLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				} else if (
					chosenCategories === "Drinks and Desserts" &&
					drinksLevels
				) {
					for (let i = 0; i < curriesLevels.length; i++) {
						// console.log("CLPASD", curriesLevels[i]);
						if (cookableMeal.name === curriesLevels[i].name) {
							level = curriesLevels[i].level;
							// console.log("levelYP", cookableMeal, curriesLevels[i]);
							return {
								...cookableMeal,
								level: level,
							};
						}
					}
				}
				return { ...cookableMeal, level: level };
			});

			if (cookableMealAndLevel) {
				setCookableRecipes(cookableMealAndLevel);
			} else {
				setCookableRecipes(cookableMeals);
			}
			if (uncookableMealAndLevel) {
				setUncookableRecipes(uncookableMealAndLevel);
			} else {
				setUncookableRecipes(uncookableMeals);
			}
		}
	}, [recipes, potSize, unlockedIngredients, curriesLevels]);

	const items: MenuProps["items"] = [
		{
			label: "Ingredient Names",
			key: "1",
			icon: <ArrowUpOutlined />,
			onClick: () => {
				setFilterKey(1);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowUpOutlined />
						{" Ingredient Names"}
					</p>
				);
			},
		},

		{
			label: "Recipe Base Value",
			key: "2",
			icon: <ArrowUpOutlined />,
			onClick: () => {
				setFilterKey(2);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowUpOutlined />
						{" Recipe Base Value"}
					</p>
				);
			},
		},
		{
			label: "# of Ingredients",
			key: "3",
			icon: <ArrowUpOutlined />,
			onClick: () => {
				setFilterKey(3);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowUpOutlined />
						{" # of Ingredients"}
					</p>
				);
			},
		},
		{
			label: "Ingredient Names",
			key: "4",
			icon: <ArrowDownOutlined />,
			onClick: () => {
				setFilterKey(4);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowDownOutlined />
						{" Ingredient Names"}
					</p>
				);
			},
		},
		{
			label: "Recipe Base Value",
			key: "5",
			icon: <ArrowDownOutlined />,
			onClick: () => {
				setFilterKey(5);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowDownOutlined />
						{" Recipe Base Value"}
					</p>
				);
			},
		},

		{
			label: "# of Ingredients",
			key: "6",
			icon: <ArrowDownOutlined />,
			onClick: () => {
				setFilterKey(6);
				setFilterName(
					<p style={{ color: "black" }}>
						<ArrowDownOutlined />
						{" # of Ingredients"}
					</p>
				);
			},
		},
	];

	const handleFilterClick = (event: any) => {
		console.log("target", event);
		setFilterKey(event.key);
	};

	const menuProps = {
		items,
		onClick: handleFilterClick,
	};

	return (
		<div className="recipe-page">
			{contextHolder}
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
				<Radio.Button value="Drinks and Desserts">
					Desserts and Drink
				</Radio.Button>
			</Radio.Group>
			<div className="save-and-filter">
				<Button type="primary" onClick={() => handlesave()}>
					Save
				</Button>
				<Dropdown
					menu={{ items }}
					arrow
					// onClick={(event) => handleFilterClick(event)}
					// icon={<FilterFilled />}
					// style={{ width: "175px" }}
				>
					<Space.Compact>
						<Button
							style={{
								width: "200px",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<p
								style={{
									color: "black",
									width: "200px",
									textAlign: "center",
								}}
							>
								{filterName}
							</p>
							<FilterFilled />
						</Button>
					</Space.Compact>
				</Dropdown>
			</div>
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
										setNewRecipeLevel={setNewRecipeLevel}
										disable={isLoading}
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
										setNewRecipeLevel={setNewRecipeLevel}
										disable={isLoading}
									/>
								)
							)}
					</div>
				</div>
			)}
		</div>
	);
};
