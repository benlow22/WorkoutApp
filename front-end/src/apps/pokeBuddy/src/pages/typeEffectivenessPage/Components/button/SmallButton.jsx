import React from "react";

export function SmallButton(props) {
	return (
		<button
			//onClick={this.handleClick}
			disabled
			className={`small-button ${props.typeName} ${props.effectiveness}-attack`}
		>
			{props.typeName}
		</button>
	);
}

/* export class Button extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddType = this.handleAddType.bind(this);
    }


    /* ////// handleClick() {
        this.props.onClick
    } ////// * /

    handleAddType(e) {
        const type = e.target.value     // get value from button clicked
        this.props.onClick(type)
    }

    render(){
        return (
            <button 
                //onClick={this.handleClick}
                type="submit"
                className={this.props.typeName} 
                value={this.props.typeName} 
                onClick={this.handleAddType}>
                {this.props.typeName}
            </button>
        )
    }
}*/
