export const workouts = [
	{ name: "Back and Bi", url: "backAndBi" },
	{ name: "Chest day", url: "chestDay" },
	{ name: "Leg day", url: "legDay" },
];

export const workoutRoutine = [
	{
		name: "Back and Bi",
		url: "backAndBi",
		exercises: [
			{
				id: "1",
				name: "Preacher Curls",
				sets: [
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
			},
			{
				id: "2",
				name: "deadlifts",
				sets: [
					{
						setNumber: 1,
						reps: 10,
						weight: 25,
					},
					{
						setNumber: 2,
						reps: 10,
						weight: 45,
					},
					{
						setNumber: 3,
						reps: 10,
						weight: 95,
					},
				],
			},
		],
	},
	// { name: "Chest day", url: "chestDay" },
	// { name: "Leg day", url: "legDay" },
];
