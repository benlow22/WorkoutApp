// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
const { response } = require("express");
const supabase = createClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_ANON_KEY,
	{
		auth: {
			autoRefreshToken: true,
			persistSession: false,
			detectSessionInUrl: true,
		},
	}
);

var router = require("express").Router();

// EXERCISES
router.get("/exercises", async (req, res) => {
	const { data, error } = await supabase.from("exercise").select("*");
	console.log("get exercises", data); // show in terminal
	if (data) {
		res.send(data);
	} else {
		res.status(404).send(error);
	}
});

router.get("/cats", (req, res) => {
	res.send(res.header);
});

router.get("/", (req, res) => {
	// const path = `/api/item/${v4()}`;
	console.log("HYIA");
	// const path = `/api/item/${v4()}`;
	console.log("HYIA");
	res.setHeader("Content-Type", "text/html");
	res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

router.get("/api/item/:slug", (req, res) => {
	const { slug } = req.params;
	res.end(`Item: ${slug}`);
});

router.get("/cards/:cardName", async (req, res) => {
	const cardName = req.params.cardName;

	const data = await fetch(`https://api.lorcana-api.com/strict/${cardName}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/html",
		},
	});
	if (data) {
		response = await data.json();
		const item = { cardName: cardName, ...response };
		res.send(item).status(204);
		// console.log("updated workout exercises", data);
	}
});

//call this to update lorcana card.json
//http://localhost:8000/api/public/lorcana/cards

router.get("/lorcana/cards", async (req, res) => {
	console.log("hi");
	const namesData = fetch(`https://api.lorcana-api.com/lists/names`)
		.then((lorcanaNamesArr) => {
			return lorcanaNamesArr.json();
		})
		.then((lorcanaArr) => {
			const allCards = Promise.all(
				lorcanaArr.map(async (name) => {
					const data = await fetch(
						`https://api.lorcana-api.com/strict/${name}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Accept: "text/html",
							},
						}
					);
					if (data) {
						const response = await data.json();
						const item = { cardName: name, ...response };
						return item;
					}
				})
			);
			return allCards;
		});
	let data = await namesData;
	const sortedData = data.sort((a, b) => a["card-number"] - b["card-number"]);
	res.send(sortedData).status(200);
});

router.get("/cards/:cardName", async (req, res) => {
	const cardName = req.params.cardName;

	const data = await fetch(`https://api.lorcana-api.com/strict/${cardName}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "text/html",
		},
	});
	if (data) {
		response = await data.json();
		const item = { cardName: cardName, ...response };
		res.send(item).status(204);
		// console.log("updated workout exercises", data);
	}
});

router.get("/lorcana/cards", async (req, res) => {
	console.log("hi");
	const namesData = fetch(`https://api.lorcana-api.com/lists/names`).then(
		(lorcanaNamesArr) => {
			return lorcanaNamesArr.json();
		}
	);
	let data = await namesData;
	const sortedData = data.sort((a, b) => a["card-number"] - b["card-number"]);
	res.send(sortedData).status(200);
});

// console.log("NAMES DATA", namesData);
// const lorcanaData = async () => {
// 	const solution = await Promise.all(
// 		namesData.map(async (name) => {
// 			const data = await fetch(
// 				`https://api.lorcana-api.com/strict/${name}`,
// 				{
// 					method: "GET",
// 					headers: {
// 						"Content-Type": "application/json",
// 						Accept: "text/html",
// 					},
// 				}
// 			);
// 			if (data) {
// 				response = await data.json();
// 				const item = { cardName: name, ...response };
// 				return item;
// 			}
// 		})
// 	);
// 	solution.sort((a, b) => a["card-number"] - b["card-number"]);
// 	res.send(solution).status(200);
// 	// setTimeout(() => console.log("sol", solution), 10000);
// };
// lorcanaData();

// if (data) {
// 	response = await data.json();
// 	const item = { cardName: cardName, ...response };
// 	res.send(item).status(204);
// 	// console.log("updated workout exercises", data);
// }
// });
// // /api/authorized/:exerciseId = get users exercise id including sets and reps
// router.get("/:exerciseId", async (req, res) => {
// 	const exerciseId = req.params.exerciseId;
// 	const { data, error } = await req.supabase
// 		.from("workouts")
// 		.delete()
// 		.eq("id");
// 	console.log("deleted workout: ", data); // show in terminal
// 	if (error) {
// 		// if there is data, send it back = 200 status
// 		res.status(404).send(error);
// 	} else {
// 		res.status(204);
// 	}
// });

// // POST /api/authorized/:workoutId/:exerciseId
// router.post("/:workoutId/:exerciseId", async (req, res) => {
// 	const workoutId = req.params.workoutId;
// 	const exerciseId = req.params.exerciseId;
// 	const userId = req.headers["user-id"];
// 	console.log(userId, workoutId, exerciseId);
// 	const { data, error } = await req.supabase
// 		.from("workouts_exercises")
// 		.insert([
// 			{
// 				workout_id: workoutId,
// 				exercise_id: exerciseId,
// 				created_by: userId,
// 			},
// 		])
// 		.select("*");
// 	console.log("errrror", error);
// 	console.log("updated workout exercises", data);
// });

//call this to update lorcana card.json
//http://localhost:8000/api/public/lorcana/latestCards
//
router.get("/lorcana/latestCards", async (req, res) => {
	const set1 = fetch(`https://api.lorcana-api.com/cards/fetch`).then(
		(lorcanaNamesArr) => {
			return lorcanaNamesArr.json();
		}
	);
	const allCards = await set1;
	allCards.sort((a, b) => {
		if (a["Set_Num"] === b["Set_Num"]) {
			// Price is only important when cities are the same
			return a["Card_Num"] - b["Card_Num"];
		}
		return a["Set_Num"] > b["Set_Num"] ? 1 : -1;
	});
	// const orderedCards = await set1.concat(set2);
	res.send(allCards).status(200);
});

module.exports = router;
