import { Navigate, Route } from "react-router";
import { Homepage } from "./pages/homepage/Homepage";
import { TypeEffectiveness } from "./pages/typeEffectivenessPage/TypeEffectivenessPage";
import { Quiz } from "./pages/quiz/Quiz";

export const PokeBuddy = [
	<Route index element={<Homepage />} />,
	<Route path="typeEffectiveness" element={<TypeEffectiveness />} />,
	<Route path="quiz" element={<Quiz />} />,
	<Route path="*" element={<Navigate to="" />} />,
];
