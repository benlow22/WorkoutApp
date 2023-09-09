// create another router for getting 'authorized' resources
const { createClient } = require("@supabase/supabase-js");
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
	const path = `/api/item/${v4()}`;
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

router.get("/cards", async (req, res) => {
	const lorcanaNames = [
		"hades-king_of_olympus",
		"steal_from_the_rich",
		"let_it_go",
		"mickey_mouse-true_friend",
		"control_your_temper!",
		"the_queen-wicked_and_vain",
		"maleficent-sinister_visitor",
		"tamatoa-drab_little_crab",
		"heihei-boat_snack",
		"rapunzel-gifted_with_healing",
		"aladdin-street_rat",
		"befuddle",
		"tinker_bell-peter_pan's_ally",
		"jasmine-disguised",
		"stitch-abomination",
		"zeus-god_of_lightning",
		"grab_your_sword",
		"jumba_jookiba-renegade_scientist",
		"maui-hero_to_all",
		"minnie_mouse-always_classy",
		"elsa-queen_regent",
		"magic_mirror",
		"flynn_rider-charming_rogue",
		"maui-demigod",
		"goofy-daredevil",
		"aurora-briar_rose",
		"mufasa-king_of_the_pride_lands",
		"belle-inventive_engineer",
		"gaston-arrogant_hunter",
		"olaf-friendly_snowman",
		"aladdin-prince_ali",
		"frying_pan",
		"dr._facilier-remarkable_gentleman",
		"aurora-regal_princess",
		"smash",
		"sergeant_tibbs-courageous_cat",
		"simba-protective_cub",
		"elsa-ice_surfer",
		"genie-the_ever_impressive",
		"flounder-voice_of_reason",
		"tinker_bell-giant_fairy",
		"gantu-galactic_federation_captain",
		"musketeer_tabard",
		"fire_the_cannons!",
		"stitch-new_dog",
		"genie-powers_unleashed",
		"peter_pan-fearless_fighter",
		"freeze",
		"scar-mastermind",
		"beast-wolfsbane",
		"mickey_mouse-artful_rogue",
		"scar-fiery_usurper",
		"pascal-rapunzel's_companion",
		"tinker_bell-tiny_tactician",
		"anna-heir_to_arendelle",
		"sword_of_truth",
		"maximus-relentless_pursuer",
		"ransack",
		"kronk-right-hand_man",
		"peter_pan-never_landing",
		"flotsam-ursula's_spy",
		"hakuna_matata",
		"minnie_mouse-beloved_princess",
		"maleficent-uninvited",
		"scepter_of_arendelle",
		"jafar-wicked_sorcerer",
		"plasma_blaster",
		"scar-shameless_firebrand",
		"robin_hood-unrivaled_archer",
		"shield_of_virtue",
		"friends_on_the_other_side",
		"mickey_mouse-musketeer",
		"triton-the_sea_king",
		"mickey_mouse-wayward_sorcerer",
		"dr._facilier's_cards",
		"eye_of_the_fates",
		"iago-loud-mouthed_parrot",
		"the_beast_is_mine!",
		"dragon_fire",
		"healing_glow",
		"sebastion-court_composer",
		"maleficent-monstrous_dragon",
		"megara-pulling_the_strings",
		"stolen_scimitar",
		"philoctetes-trainer_of_heroes",
		"mother_gothel-selfish_manipulator",
		"break",
		"beast's_mirror",
		"starkey-hook's_henchman",
		"tigger-wonderful_thing",
		"hades-infernal_schemer",
		"donald_duck-musketeer",
		"archimedes-highly_educated_owl",
		"fishbone_quill",
		"captain_hook-thinking_a_happy_thought",
		"donald_duck-strutting_his_stuff",
		"white_rabbit's_pocket_watch",
		"elsa-snow_queen",
		"aladdin-heroic_outlaw",
		"magic_broom-bucket_brigade",
		"tinker_bell-most_helpful",
		"poisoned_apple",
		"hercules-true_hero",
		"sudden_chill",
		"te_ka-heartless",
		"be_our_guest",
		"ursula's_shell_necklace",
		"jasmine-queen_of_agrabah",
		"genie-on_the_job",
		"mr._smee-loyal_first_mate",
		"chief_tui-respected_leader",
		"cruella_de_vil-miserable_as_usual",
		"maximus-palace_horse",
		"kuzco-temperamental_emperor",
		"vicious_betrayal",
		"ursula-power_hungry",
		"stitch-carefree_surfer",
		"lady_tremaine-wicked_stepmother",
		"mother_knows_best",
		"tamatoa-so_shiny!",
		"prince_phillip-dragonslayer",
		"reflection",
		"maurice-world-famous_inventor",
		"elsa-spirit_of_winter",
		"jafar-keeper_of_secrets",
		"jetsam-ursula's_spy",
		"one_jump_ahead",
		"a_whole_new_world",
		"maleficent-biding_her_time",
		"dr._facilier-charlatan",
		"goons-maleficent's_underlings",
		"the_wardrobe-belle's_confidant",
		"hades-lord_of_the_underworld",
		"donald_duck-boisterous_fowl",
		"he's_got_a_sword!",
		"kristoff-offical_ice_master",
		"be_prepared",
		"dr._facilier-agent_provocateur",
		"tangle",
		"abu-mischievous_monkey",
		"part_of_your_world",
		"pongo-ol'_rascal",
		"mulan-imperial_soldier",
		"mad_hatter-gracious_host",
		"aladdin-cornered_swordsman",
		"mickey_mouse-detective",
		"rapunzel-letting_down_her_hair",
		"aurora-dreaming_gaurdian",
		"captain_hook-forceful_duelist",
		"work_together",
		"cheshire_cat-not_all_there",
		"simba-returned_king",
		"stampede",
		"pumbaa-friendly_warthog",
		"timon-grub_rustler",
		"lefou-instigator",
		"cinderella-gentle_and_kind",
		"moana-chosen_by_the_ocean",
		"rafiki-mysterious_sage",
		"develop_your_brain",
		"jasper-common_crook",
		"hans-scheming_prince",
		"stitch-rock_star",
		"duke_of_weselton-opportunistic_official",
		"captain-colonel's_lieutenant",
		"sven-official_ice_deliverer",
		"belle-strange_but_special",
		"simba-rightful_heir",
		"horace-no-good_scoundrel",
		"merlin-self-appointed_mentor",
		"ariel-on_human_legs",
		"moana-of_motunui",
		"mickey_mouse-brave_little_tailor",
		"just_in_time",
		"maleficent-sorceress",
		"yzma-alchemist",
		"mickey_mouse-steamboat_pilot",
		"dinglehopper",
		"ursula's_cauldron",
		"captain_hook-ruthless_pirate",
		"if_it's_not_baroque",
		"beast-hardheaded",
		"magic_golden_flower",
		"captain_hook-captain_of_the_jolly_roger",
		"do_it_again!",
		"you_have_forgotten_me",
		"marshmallow-persistent_guardian",
		"simba-future_king",
		"te_ka-the_burning_one",
		"prince_eric-dashing_and_brave",
		"lilo-galactic_hero",
		"fan_the_flames",
		"goofy-musketeer",
		"john_silver-alien_pirate",
		"ariel-whoseit_collector",
		"cerberus-three-headed_dog",
		"coconut_basket",
		"lefou-bumbler",
		"hans-thirteenth_in_line",
		"ariel-spectacular_singer",
		"lilo-making_a_wish",
		"lantern",
		"gramma_tala-storyteller",
		"cut_to_the_chase",
	];

	const lorcanaData = async () => {
		const solution = await Promise.all(
			lorcanaNames.map(async (name) => {
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
					response = await data.json();
					const item = { cardName: name, ...response };
					return item;
				}
			})
		);
		solution.sort((a, b) => a["card-number"] - b["card-number"]);
		res.send(solution).status(200);
		// setTimeout(() => console.log("sol", solution), 10000);
	};
	lorcanaData();

	// if (data) {
	// 	response = await data.json();
	// 	const item = { cardName: cardName, ...response };
	// 	res.send(item).status(204);
	// 	// console.log("updated workout exercises", data);
	// }
});
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

module.exports = router;
