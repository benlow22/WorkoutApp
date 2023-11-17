/* 1. display app name, 
summary of functions / description 
 , image,  
 LINK 
 */

import "../styles/style.css";
type TProps = {
	appName: string;
	color: string;
	description: string;
	imagePath: string;
};
export const AppSummary = ({
	appName,
	color,
	description,
	imagePath,
}: TProps) => {
	return (
		<div style={{ border: `${color} 5px solid` }} className="summary-blurb">
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
