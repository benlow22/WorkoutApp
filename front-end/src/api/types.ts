export interface IGetFullWorkoutResponse {
	data: IWorkoutWithExercises | null;
	error: any;
}

export interface IExercise {
	name: string;
	id: string;
}

export type TError = Error | null;

export interface IWorkout {
	id: string;
	name: string;
	url: string;
	last_performed: string | null;
}

export type IWorkoutWithExercises = {
	workout: IWorkout;
	exercises: IExercise[];
};

export interface IExercise {
	description: string | null;
	name: string;
	equipment: number;
	id: string;
	created_by: string;
	muscles: string[];
	"Exercise Group": string[];
	public: true;
	default_sets: number[][];
}

export interface INewExerciseInput {
	description: string | null;
	name: string;
	equipment: string[];
	id: string;
	createdBy: string;
	defaultSets: number[][];
	fitnessElement: string[];
	links: string[];
	muscleGroup: string[];
	muscles: string[];
	notes: string;
	public: boolean;
	time: number | null;
	defaultWeightUnits: string | null;
	defaultTimeUnits: string | null;
}

export type TUsersExerciseData = {
	name: string;
	id: string;
	links?: string[];
	notes?: string[];
	sets: number[][];
	weight_units?: string;
	time_units?: string;
	time?: number;
	useTime: boolean;
};
