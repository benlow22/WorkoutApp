import { Navigate, Route } from "react-router";
import { Homepage } from "./pages/homepage/Homepage";
import { TypeEffectiveness } from "./pages/typeEffectivenessPage/TypeEffectivenessPage";
import { Quiz } from "./pages/quiz/Quiz";
import { SearchPage } from "./pages/search/SearchPage";
import { PokemonSleep } from "./pages/pokemonSleep/PokemonSleep";

export const PokeBuddy = [
	<Route index element={<Homepage />} key={"PB1"} />,
	<Route
		path="typeEffectiveness"
		element={<TypeEffectiveness />}
		key={"PB2"}
	/>,
	<Route path="quiz" element={<Quiz />} key={"PB3"} />,
	<Route path="search" element={<SearchPage />} key={"PB3"} />,
	<Route path="pokemonSleep" element={<PokemonSleep />} key={"PB34"} />,

	<Route path="*" element={<Navigate to="" />} key={"PB5"} />,
];
