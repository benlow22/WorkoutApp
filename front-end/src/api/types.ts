import { IWorkoutWithExercises } from "../data";

export interface IGetFullWorkoutResponse {
	data: IWorkoutWithExercises | null;
	error: any;
}

export type TError = Error | null;
