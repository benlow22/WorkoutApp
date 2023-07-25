import { INewExerciseInput } from "../api/types";
import { v4 as uuidv4 } from "uuid";

export const newExerciseExample: INewExerciseInput = {
	description: "15-30deg incline, to engage the upper pecs",
	equipment: ["2", "6"],
	fitnessElement: ["Strength Training"],
	links: [
		"https://www.muscleandstrength.com/exercises/incline-bench-press.html",
	],
	muscleGroup: ["Chest", "Arms"],
	muscles: ["Pectoralis Major"],
	name: "Incline Barbell Bench Press",
	notes: "can also use dumbbells, but lower the weight as you will need more stabilization",
	public: false,
	time: 0,
	id: uuidv4(),
	createdBy: "d79ccff2-0177-46e8-93a2-ea3353691d28",
	defaultSets: [
		["25", "10"],
		["25", "10"],
		["25", "10"],
	],
	defaultWeightUnits: "lbs",
	defaultTimeUnits: null,
};

// id: string;
// created_by: string;
// default_sets: string[][];
// time: string | null;
// defaultWeightUnits: string | ;
// defaultTimeUnits: string;

// sets = length of default sets.
// reps = sets[x][1]
