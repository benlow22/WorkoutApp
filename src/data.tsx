export const workouts = [
	{ name: "Back and Bi", url: "backAndBi" },
	{ name: "Chest day", url: "chestDay" },
	{ name: "Leg day", url: "legDay" },
];

// export const workoutRoutine: IWorkout[] = [
// 	{
// 		name: "Back and Bi",
// 		url: "backAndBi",
// 		exercises: [
// 			{
// 				id: 1,
// 				name: "Preacher Curls",
// 				sets: [
// 					{
// 						setNumber: 1,
// 						reps: 10,
// 						weight: 10,
// 					},
// 					{
// 						setNumber: 2,
// 						reps: 10,
// 						weight: 10,
// 					},
// 					{
// 						setNumber: 3,
// 						reps: 10,
// 						weight: 10,
// 					},
// 				],
// 			},
// 			{
// 				id: 2,
// 				name: "deadlifts",
// 				sets: [
// 					{
// 						setNumber: 1,
// 						reps: 10,
// 						weight: 25,
// 					},
// 					{
// 						setNumber: 2,
// 						reps: 10,
// 						weight: 45,
// 					},
// 					{
// 						setNumber: 3,
// 						reps: 10,
// 						weight: 95,
// 					},
// 				],
// 			},
// 		],
// 	},
// 	// { name: "Chest day", url: "chestDay" },
// 	// { name: "Leg day", url: "legDay" },
// ];

export interface IWorkout {
	id: string;
	name: string;
	url: string;
	last_performed: string | null;
}

export interface IWorkoutWithExercises {
	id: string;
	name: string;
	url: string;
	last_performed: string | null;
	exercises: IExercise[];
}

export interface IExercise {
	name: string;
	id: string;
}

export interface IWorkoutRoutine {
	workouts: IWorkout[];
}

// export interface IWorkout {
// 	name: string;
// 	url: string;
// 	id: string;
// 	exercises?: IExercise[];
// }

export interface IWorkoutNameUrl {
	name: string;
	url: string;
}

// interface IExercise {
// 	id: number;
// 	name: string;
// 	sets: ISets[];
// }

interface ISets {
	setNumber: number;
	reps: number;
	weight: number;
}

export type TSets = {
	name: string; // join table
	userId: string; // = uuid()
	exerciseId: string; // uuid()
	notes: string;
	sets: number[][];
	// {
	// 	setnumber: number;
	// 	reps: number;
	// 	weight: number;
	// }[];
};

let mockSets = {
	userId: "asd987sdsadias9iu",
	exerciseId: "23kjh3u2iueh7c",
	notes: "don't fail",
	sets: [
		// [1,10,10],[2,10,10]
		{
			setNumber: 1,
			reps: 10,
			weight: 10,
		},
		{
			setNumber: 2,
			reps: 10,
			weight: 10,
		},
		{
			setNumber: 3,
			reps: 10,
			weight: 10,
		},
	],
};

type TSets2 = {
	userId: string; // = uuid()
	exerciseId: string; // uuid()
	notes: string;
	sets: number[];
	reps: number[];
	weight: number[];
};

let mockSets2 = {
	userId: "asd987sdsadias9iu",
	exerciseId: "23kjh3u2iueh7c",
	notes: "don't fail",
	sets: [1, 2, 3],
	reps: [10, 10, 10],
	weight: [10, 15, 20],
};
