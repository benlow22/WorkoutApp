/* 1. display app name, 
summary of functions / description 
 , image,  
 LINK 
 */

import { useNavigate } from "react-router";
import "../styles/style.css";
type TProps = {
	appName: string;
	color: string;
	description: string;
	imagePath: string;
	appPath: string;
	id: string;
};
export const AppSummary = ({
	appName,
	color,
	description,
	imagePath,
	appPath,
}: TProps) => {
	// const element = document.getElementById(`${appPath}`); //grab the element
	const navigate = useNavigate();
	return (
		<div
			style={{ border: `${color} 5px solid` }}
			className="summary-blurb"
			id={`${appPath}`}
			onClick={() => {
				console.log(`${appPath}`);
				navigate(`/${appPath}`);
			}}
		>
			<h2>{appName}</h2>
			<div className="description-and-image">
				<div className="description">
					<p>{description}</p>
				</div>
				<img
					alt={`${imagePath}.png`}
					src={`/${imagePath}`}
					width={"125px"}
				/>
			</div>
		</div>
	);
};
