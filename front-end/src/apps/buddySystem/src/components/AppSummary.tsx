/* 1. display app name, 
summary of functions / description 
 , image,  
 LINK 
 */

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
		<div style={{ border: `${color} 5px solid` }}>
			<h2>{appName}</h2>
			<div className="description-and-image">
				<p>{description}</p>
				<img alt={`${imagePath}.png`} src={`/${imagePath}`} />
			</div>
		</div>
	);
};
