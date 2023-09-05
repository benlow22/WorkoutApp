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
};

type TLevel = {
	experience: number;
	expNeeded: number;
	value: number;
};

type Tprops = {
	recipe: TRecipe;
	ingredients: TIngredient[];
};
export const Recipe = ({ recipe, ingredients }: Tprops) => {
	const { auth, username } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>();
	const [imageUrls, setImageUrls] = useState<{
		[ingredient: string]: string;
	}>({});
	const [recipeLevel, setRecipeLevel] = useState<number>(4);
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
		if (recipe.levels) {
			const level = recipe;
			console.log("test value", level);
			setRecipeBaseValue(recipe.levels[recipeLevel].value);
		}
	}, [recipeLevel]);

	const handleRecipeLevelDecrease = () => {
		if (recipeLevel > 1) {
			setRecipeLevel(recipeLevel - 1);
		}
	};
	const handleRecipeLevelIncrease = () => {
		if (recipeLevel < 40) {
			setRecipeLevel(recipeLevel + 1);
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
						>
							-
						</Button>
						<Button
							size="small"
							className="recipe-level-adjuster"
							onClick={() => handleRecipeLevelIncrease()}
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
