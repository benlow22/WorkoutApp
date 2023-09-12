import { Navigate, Route } from "react-router";
import { Homepage as Dash } from "./pages/homepage/Homepage";
import { TypeEffectiveness } from "./pages/typeEffectivenessPage/TypeEffectivenessPage";
import { Quiz } from "./pages/quiz/Quiz";
import { SearchPage } from "./pages/search/SearchPage";
import { PokemonSleep } from "./pages/pokemonSleep/PokemonSleep";
import { Homepage } from "./pages/typeEffectivenessPage/Components/Homepage";
export const PokeBuddy = [
	<Route index element={<Dash />} key={"PB1"} />,
	<Route path="typeEffectiveness" element={<Homepage />} key={"PB2"} />,
	<Route path="quiz" element={<Quiz />} key={"PB3"} />,
	<Route path="search" element={<SearchPage />} key={"PB3"} />,
	<Route path="pokemonSleep" element={<PokemonSleep />} key={"PB34"} />,

	<Route path="*" element={<Navigate to="" />} key={"PB5"} />,
];
