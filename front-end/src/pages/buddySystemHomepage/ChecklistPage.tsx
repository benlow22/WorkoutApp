export const ChecklistPage = () => {
	const imageee = (
		<img src={"https://lorcana-api.com/images/dalmatian_puppy/tail_wagger/dalmatian_puppy-tail_wagger-large.png"} style={{ width: "100px" }} />
	);
	const list = [
		{ Card_Num: 1, Image: "https://lorcana-api.com/images/baloo/von_bruinwald_xiii/baloo-von_bruinwald_xiii-large.png" },
		{ Card_Num: 2, Image: "https://lorcana-api.com/images/bernard/brand-new_agent/bernard-brand-new_agent-large.png" },
		{ Card_Num: 3, Image: "https://lorcana-api.com/images/chernabog/evildoer/chernabog-evildoer-large.png" },
		{ Card_Num: 4, Image: "https://lorcana-api.com/images/dalmatian_puppy/tail_wagger/dalmatian_puppy-tail_wagger-large.png" },
		{ Card_Num: 5, Image: "https://lorcana-api.com/images/joshua_sweet/the_doctor/joshua_sweet-the_doctor-large.png" },
		{ Card_Num: 6, Image: "https://lorcana-api.com/images/kida/atlantean/kida-atlantean-large.png" },
		{ Card_Num: 7, Image: "https://lorcana-api.com/images/kida/protector_of_atlantis/kida-protector_of_atlantis-large.png" },
		{ Card_Num: 8, Image: "https://lorcana-api.com/images/lucky/the_15th_puppy/lucky-the_15th_puppy-large.png" },
		{ Card_Num: 9, Image: "https://lorcana-api.com/images/minnie_mouse/musical_artist/minnie_mouse-musical_artist-large.png" },
		{ Card_Num: 10, Image: "https://lorcana-api.com/images/miss_bianca/rescue_aid_society_agent/miss_bianca-rescue_aid_society_agent-large.png" },
		{ Card_Num: 11, Image: "https://lorcana-api.com/images/mr._snoops/inept_businessman/mr._snoops-inept_businessman-large.png" },
		{ Card_Num: 12, Image: "https://lorcana-api.com/images/nani/protective_sister/nani-protective_sister-large.png" },
		{ Card_Num: 13, Image: "https://lorcana-api.com/images/orville/ace_pilot/orville-ace_pilot-large.png" },
		{ Card_Num: 14, Image: "https://lorcana-api.com/images/patch/intimidating_pup/patch-intimidating_pup-large.png" },
		{ Card_Num: 15, Image: "https://lorcana-api.com/images/perdita/devoted_mother/perdita-devoted_mother-large.png" },
		{ Card_Num: 16, Image: "https://lorcana-api.com/images/piglet/pooh_pirate_captain/piglet-pooh_pirate_captain-large.png" },
		{ Card_Num: 17, Image: "https://lorcana-api.com/images/pluto/determined_defender/pluto-determined_defender-large.png" },
		{ Card_Num: 18, Image: "https://lorcana-api.com/images/pluto/friendly_pooch/pluto-friendly_pooch-large.png" },
		{ Card_Num: 19, Image: "https://lorcana-api.com/images/pongo/determined_father/pongo-determined_father-large.png" },
		{ Card_Num: 20, Image: "https://lorcana-api.com/images/queen_of_hearts/wonderland_empress/queen_of_hearts-wonderland_empress-large.png" },
		{ Card_Num: 21, Image: "https://lorcana-api.com/images/rolly/hungry_pup/rolly-hungry_pup-large.png" },
		{ Card_Num: 22, Image: "https://lorcana-api.com/images/tinker_bell/generous_fairy/tinker_bell-generous_fairy-large.png" },
		{ Card_Num: 23, Image: "https://lorcana-api.com/images/wendy_darling/talented_sailor/wendy_darling-talented_sailor-large.png" },
		{ Card_Num: 24, Image: "https://lorcana-api.com/images/99_puppies/99_puppies-large.png" },
		{ Card_Num: 25, Image: "https://lorcana-api.com/images/boss's_orders/boss's_orders-large.png" },
		{ Card_Num: 26, Image: "https://lorcana-api.com/images/heal_what_has_been_hurt/heal_what_has_been_hurt-large.png" },
		{ Card_Num: 27, Image: "https://lorcana-api.com/images/quick_patch/quick_patch-large.png" },
		{ Card_Num: 28, Image: "https://lorcana-api.com/images/the_bare_necessities/the_bare_necessities-large.png" },
		{ Card_Num: 29, Image: "https://lorcana-api.com/images/cleansing_rainwater/cleansing_rainwater-large.png" },
		{ Card_Num: 30, Image: "https://lorcana-api.com/images/heart_of_atlantis/heart_of_atlantis-large.png" },
		{ Card_Num: 31, Image: "https://lorcana-api.com/images/wildcat's_wrench/wildcat's_wrench-large.png" },
		{ Card_Num: 32, Image: "https://lorcana-api.com/images/never_land/mermaid_lagoon/never_land-mermaid_lagoon-large.png" },
		{ Card_Num: 33, Image: "https://lorcana-api.com/images/pride_lands/pride_rock/pride_lands-pride_rock-large.png" },
		{ Card_Num: 34, Image: "https://lorcana-api.com/images/tiana's_palace/tiana's_palace-large.png" },
		{ Card_Num: 35, Image: "https://lorcana-api.com/images/alice/tea_alchemist/alice-tea_alchemist-large.png" },
		{ Card_Num: 36, Image: "https://lorcana-api.com/images/chernabog's_followers/chernabog's_followers-large.png" },
		{ Card_Num: 37, Image: "https://lorcana-api.com/images/diablo/faithful_pet/diablo-faithful_pet-large.png" },
		{ Card_Num: 38, Image: "https://lorcana-api.com/images/genie/supportive_friend/genie-supportive_friend-large.png" },
		{ Card_Num: 39, Image: "https://lorcana-api.com/images/hydros/ice_titan/hydros-ice_titan-large.png" },
		{ Card_Num: 40, Image: "https://lorcana-api.com/images/iago/pretty_polly/iago-pretty_polly-large.png" },
		{ Card_Num: 41, Image: "https://lorcana-api.com/images/jafar/lamp_thief/jafar-lamp_thief-large.png" },
		{ Card_Num: 42, Image: "https://lorcana-api.com/images/jafar/striking_illusionist/jafar-striking_illusionist-large.png" },
		{ Card_Num: 43, Image: "https://lorcana-api.com/images/lena_sabrewing/rebellious_teenager/lena_sabrewing-rebellious_teenager-large.png" },
		{ Card_Num: 44, Image: "https://lorcana-api.com/images/magic_broom/dancing_duster/magic_broom-dancing_duster-large.png" },
		{ Card_Num: 45, Image: "https://lorcana-api.com/images/magic_broom/swift_cleaner/magic_broom-swift_cleaner-large.png" },
		{ Card_Num: 46, Image: "https://lorcana-api.com/images/magic_broom/the_big_sweeper/magic_broom-the_big_sweeper-large.png" },
		{ Card_Num: 47, Image: "https://lorcana-api.com/images/magic_carpet/flying_rug/magic_carpet-flying_rug-large.png" },
		{ Card_Num: 48, Image: "https://lorcana-api.com/images/magica_de_spell/ambitious_witch/magica_de_spell-ambitious_witch-large.png" },
		{ Card_Num: 49, Image: "https://lorcana-api.com/images/magica_de_spell/the_midas_touch/magica_de_spell-the_midas_touch-large.png" },
		{ Card_Num: 50, Image: "https://lorcana-api.com/images/magica_de_spell/thieving_sorceress/magica_de_spell-thieving_sorceress-large.png" },
		{ Card_Num: 51, Image: "https://lorcana-api.com/images/maleficent/mistress_of_all_evil/maleficent-mistress_of_all_evil-large.png" },
		{ Card_Num: 52, Image: "https://lorcana-api.com/images/mama_odie/voice_of_wisdom/mama_odie-voice_of_wisdom-large.png" },
		{ Card_Num: 53, Image: "https://lorcana-api.com/images/pua/potbellied_buddy/pua-potbellied_buddy-large.png" },
		{ Card_Num: 54, Image: "https://lorcana-api.com/images/rafiki/mystical_fighter/rafiki-mystical_fighter-large.png" },
		{ Card_Num: 55, Image: "https://lorcana-api.com/images/stratos/tornado_titan/stratos-tornado_titan-large.png" },
		{ Card_Num: 56, Image: "https://lorcana-api.com/images/the_firebird/force_of_destruction/the_firebird-force_of_destruction-large.png" },
		{ Card_Num: 57, Image: "https://lorcana-api.com/images/the_queen/hateful_rival/the_queen-hateful_rival-large.png" },
		{
			Card_Num: 58,
			Image: "https://lorcana-api.com/images/treasure_guardian/protector_of_the_cave/treasure_guardian-protector_of_the_cave-large.png",
		},
		{ Card_Num: 59, Image: "https://lorcana-api.com/images/ursula/sea_witch/ursula-sea_witch-large.png" },
		{ Card_Num: 60, Image: "https://lorcana-api.com/images/bestow_a_gift/bestow_a_gift-large.png" },
		{ Card_Num: 61, Image: "https://lorcana-api.com/images/it_calls_me/it_calls_me-large.png" },
		{ Card_Num: 62, Image: "https://lorcana-api.com/images/last-ditch_effort/last-ditch_effort-large.png" },
		{ Card_Num: 63, Image: "https://lorcana-api.com/images/the_boss_is_on_a_roll/the_boss_is_on_a_roll-large.png" },
		{ Card_Num: 64, Image: "https://lorcana-api.com/images/the_lamp/the_lamp-large.png" },
		{ Card_Num: 65, Image: "https://lorcana-api.com/images/the_sorcerer's_hat/the_sorcerer's_hat-large.png" },
		{
			Card_Num: 66,
			Image: "https://lorcana-api.com/images/forbidden_mountain/maleficent's_castle/forbidden_mountain-maleficent's_castle-large.png",
		},
		{ Card_Num: 67, Image: "https://lorcana-api.com/images/the_queen's_castle/mirror_chamber/the_queen's_castle-mirror_chamber-large.png" },
		{
			Card_Num: 68,
			Image: "https://lorcana-api.com/images/the_sorcerer's_tower/wondrous_workspace/the_sorcerer's_tower-wondrous_workspace-large.png",
		},
	];
	return (
		<div style={{ backgroundColor: "blue", width: "877px", height: "1240px", display: "flex", flexWrap: "wrap" }}>
			{list.map((number) => (
				<div>
					<img src={number.Image} style={{ width: "100px" }} />
					<p>{number.Card_Num}</p>
				</div>
			))}
		</div>
	);
};
