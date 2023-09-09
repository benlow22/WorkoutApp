import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Button, Image, Space, Tooltip } from "antd";

type TIngredient = {
	id: number;
	name: string;
	description: string;
	baseStrength: number;
	sellValue: number;
	imageUrl: string;
};

export type TRecipe = {
	name: string;
	description: string;
	ingredients: { name: string; quantity: number }[];
	minimumPotSize: number;
	imageUrl: string;
	levels: {
		[recipeLevel: string]: TLevel;
	};
	level?: number;
};

type TLevel = {
	experience: number;
	expNeeded: number;
	value: number;
};

type Tprops = {
	recipe: TRecipe;
	ingredients: TIngredient[];
	// recipeLevel: number;
	setNewRecipeLevel: React.Dispatch<
		React.SetStateAction<
			| {
					name: string;
					level: number;
			  }
			| undefined
		>
	>;
	disable: boolean;
};
export const Recipe = ({
	recipe,
	ingredients,
	setNewRecipeLevel,
	disable,
}: // , recipeLevel
Tprops) => {
	const { auth, username } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>();
	const [imageUrls, setImageUrls] = useState<{
		[ingredient: string]: string;
	}>({});
	const [usersRecipeLevel, setUsersRecipeLevel] = useState<number>();
	const [recipeLevel, setRecipeLevel] = useState<number>(1);

	const [recipeBaseValue, setRecipeBaseValue] = useState<number>(0);
	const [ingredientsNeeded, setIngredientsNeeded] = useState<TIngredient[]>(
		[]
	);

	useEffect(() => {
		if (ingredients) {
			const imageArr: {
				[ingredient: string]: string;
			} = {};

			ingredients.map((ingredient) => {
				imageArr[ingredient.name] = ingredient.imageUrl;
			});
			// imageArr.Any = "anyIngredient.png";

			// console.log("ingARr", imageArr);
			setImageUrls(imageArr);
		}
	}, [ingredients]);

	useEffect(() => {
		if (recipe.level) {
			const level = recipe.level;
			// console.log("test value", level);
			setUsersRecipeLevel(level);
			setRecipeLevel(level);
			setRecipeBaseValue(recipe.levels[level].value);
		}
	}, [recipe.level]);

	useEffect(() => {
		if (recipeLevel !== recipe.level) {
			setNewRecipeLevel({ name: recipe.name, level: recipeLevel });
			setRecipeBaseValue(recipe.levels[recipeLevel].value);
		}
	}, [recipeLevel]);

	const handleRecipeLevelDecrease = () => {
		if (recipeLevel > 1) {
			setRecipeLevel(recipeLevel - 1);
			setRecipeBaseValue(recipe.levels[recipeLevel - 1].value);
		}
	};
	const handleRecipeLevelIncrease = () => {
		if (recipeLevel < 40) {
			setRecipeLevel(recipeLevel + 1);
			setRecipeBaseValue(recipe.levels[recipeLevel + 1].value);
		}
	};
	return (
		<div className="recipe-list">
			<div className="recipe-name">
				<p>{recipe.name}</p>
			</div>
			<div className="ingredient-and-image">
				<div className="ingredient-list">
					{recipe.ingredients &&
						recipe.ingredients.map((ingredient, index: number) => (
							<div className="ingr" key={index}>
								<img
									src={`/pokemonSleepIngredients/${
										imageUrls[ingredient.name]
									}`}
									className="ingredient-icon-in-recipe"
								/>
								<p>
									{ingredient.name} x {ingredient.quantity}
								</p>
							</div>
						))}
				</div>
				<div className="recipe-level-and-image">
					<div className="recipe-level">
						<p>lvl. {recipeLevel}</p>
						<Button
							size="small"
							className="recipe-level-adjuster"
							onClick={() => handleRecipeLevelDecrease()}
							disabled={disable}
						>
							-
						</Button>
						<Button
							size="small"
							className="recipe-level-adjuster"
							onClick={() => handleRecipeLevelIncrease()}
							disabled={disable}
						>
							+
						</Button>
					</div>
					<div className="recipe-image-and-base-value">
						<Image
							src={`/recipes/${recipe.imageUrl}`}
							className="recipe-image"
						/>
						<Tooltip title="base value of recipe">
							<p className="base-value">
								{recipeBaseValue ? recipeBaseValue : "0"}
							</p>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
	);
};
