import { Navigate, Route } from "react-router";
import { Homepage } from "./pages/homepage/Homepage";
import { TypeEffectiveness } from "./pages/typeEffectivenessPage/TypeEffectivenessPage";
import { Quiz } from "./pages/quiz/Quiz";

export const PokeBuddy = [
	<Route index element={<Homepage />} key={"PB1"} />,
	<Route
		path="typeEffectiveness"
		element={<TypeEffectiveness />}
		key={"PB2"}
	/>,
	<Route path="quiz" element={<Quiz />} key={"PB3"} />,
	<Route path="*" element={<Navigate to="" />} key={"PB4"} />,
];
