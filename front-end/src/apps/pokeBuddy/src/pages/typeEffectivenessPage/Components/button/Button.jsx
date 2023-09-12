import React from "react";

export function Button(props) {
	const handleAddType = ({ target }) => {
		const type = target.value; // get value from button clicked
		props.onClick(type);
	};

	return (
		<button
			//onClick={this.handleClick}
			type="submit"
			className={`${props.typeName} ${props.effectiveness}-attack`}
			value={props.typeName}
			onClick={handleAddType}
		>
			{props.typeName}
		</button>
	);
}
