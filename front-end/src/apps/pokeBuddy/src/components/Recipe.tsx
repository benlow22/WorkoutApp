import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Image, Space } from "antd";

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
};

type Tprops = {
	recipe: TRecipe;
	ingredients: TIngredient[];
};
export const Recipe = ({ recipe, ingredients }: Tprops) => {
	const { auth, username } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>();
	const [imageUrls, setImageUrls] = useState<{ ingredientName: string }[]>(
		[]
	);

	const [ingredientsNeeded, setIngredientsNeeded] = useState<TIngredient[]>(
		[]
	);

	useEffect(() => {
		if (ingredients) {
			const imageArr = {};
			ingredients.map((ingredient) => {
				imageArr[ingredient.name] = ingredient.imageUrl;
			});
			imageArr.Any = "anyIngredient.png";

			console.log("ingARr", imageArr);
			setImageUrls(imageArr);
		}
	}, [ingredients]);

	return (
		<div className="recipe-list">
			<p>{recipe.name}</p>
			<div className="ingredient-and-image">
				<div className="ingredient-list">
					{recipe.ingredients &&
						recipe.ingredients.map((ingredient) => (
							<div className="ingr">
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
				<Image
					src={`/recipes/${recipe.imageUrl}`}
					className="recipe-image"
				/>
			</div>
		</div>
	);
};
