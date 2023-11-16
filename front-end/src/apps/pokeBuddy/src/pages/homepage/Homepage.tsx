import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import sprigatito from "../../../../../images/sprigatito.jpg";
import { Link } from "react-router-dom";

export const Homepage = () => {
	const { auth, username } = useContext(AuthContext);

	// if logged in, will show dashboard with home page underneat, if not, just home page
	return (
		<div className="pokebuddy-homepage">
			<div className="page-heading">
				<h2>Welcome to Pokebuddy</h2>
			</div>
			<h4>
				There are currently two helpful apps available to assist you on
				your Pokémon journey!!
			</h4>
			<div className="type-preview-section">
				<div className="type-preview-section-center">
					<p>
						Click on the{" "}
						<Link to="./typeEffectiveness">
							'Type Effectiveness'
						</Link>{" "}
						tab to see enter an opponents typing from pokemon Go.
						you will quickly see what moves they are weak to and
						what they are resistant to.
					</p>
				</div>
				<div>
					<img
						alt="type effective.png"
						src="/typeEffect.png"
						className="type-preview"
					/>
				</div>
			</div>
			<div className="sleep-preview-section">
				<div className="center">
					<p>
						You can also check out all the delicious recipes on the
						"Sleep" tab. This is a componanion to your pokemon sleep
						app. You can enter your potsize, unlocked ingredients,
						and current week's category to see all the recipes
						available. This app was originally created, because
						until now there was no resource online that had an
						accurate and interactive interface for viewing these
						recipes. You would always have to count each ingredient
						to see if you would be able to fit it in your pot, or
						scroll through many recipes, without being able to
						filter the ones with ingredients you have yet to unlock.
						This app eliminates all those issues with a simple and
						affective UI, which you can also save for quick
						reference throughout the week.
					</p>
				</div>
				<div>
					<img
						alt="/pokeSleep.png"
						src="/pokeSleep.png"
						className="sleep-preview"
					/>
				</div>
			</div>
		</div>
	);
};
