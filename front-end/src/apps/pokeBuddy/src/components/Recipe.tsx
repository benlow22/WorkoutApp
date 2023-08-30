import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { Space } from "antd";

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
};
export const Recipe = ({ recipe }: Tprops) => {
	const { auth, username } = useContext(AuthContext);
	const [potSize, setPotSize] = useState<number>();

	const [ingredientsNeeded, setIngredientsNeeded] = useState<TIngredient[]>(
		[]
	);

	return (
		<div className="recipe-list">
			<p>
				{recipe.name} {recipe.minimumPotSize}
			</p>
		</div>
	);
};
