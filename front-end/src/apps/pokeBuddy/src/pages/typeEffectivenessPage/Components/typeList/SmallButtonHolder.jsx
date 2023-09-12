import { React } from "react";
import { checkTypes } from "../../database";
import { SmallButton } from "../button/SmallButton";



export function SmallButtonHolder (props) {
    const status = props.status;
    const type1 = props.type1;
    const type2 = props.type2;
    let multi = props.multiplier


    if (type1 !== 'Type 1') {         // if its NOT type 1 render 
        const allmultipliers = checkTypes(type1,type2);
        let multiplier1 = []

        if (status === 'Weak') {
            if (multi === 1 ) {
                multiplier1 = allmultipliers.weakTo;
            } if (multi === 2 ) {
                multiplier1 = allmultipliers.veryWeakTo;
            }
        } if (status === 'Resistant') {
            if (multi === 1 ) {
                multiplier1 = allmultipliers.resistant;
            } if (multi === 2 ) {
                multiplier1 = allmultipliers.veryResistant;
            }
        };
        
        return (
                <div>
                    <p>{multiplier1.map(type=>{
                        return (
                            <SmallButton 
                            typeName={type}
                            />
                        )
                    })}</p>
                </div>

        )
    } 
};