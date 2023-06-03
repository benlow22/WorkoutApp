import { IWorkoutWithExercises } from "../data";

export interface IGetFullWorkoutResponse {
	data: IWorkoutWithExercises | null;
	error: any;
}
