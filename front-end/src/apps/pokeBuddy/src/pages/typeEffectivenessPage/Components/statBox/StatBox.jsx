import React from "react";
import { SmallButtonHolder } from "../typeList/SmallButtonHolder";

export function StatBox (props) {
    let type1 = props.type1 //props.type1;        // TEST = bug
    let type2 = props.type2;
    let status = props.status;

    let multiplierLabels = []


    if (status === 'Weak') {
        multiplierLabels = ['2.56x', '1.60x'];
    } if (status === 'Resistant') {
        multiplierLabels = ['0.391x', '0.625x' ];
    }



    
    return (
        <div className="stat-box">
            <h4>{status} to </h4>
            <h5>{multiplierLabels[0]} damage from</h5>
            <SmallButtonHolder type1={type1} type2={type2} status={status} multiplier={1}/>
            <h5>{multiplierLabels[1]} damage from</h5>
            <SmallButtonHolder type1={type1} type2={type2} status={status} multiplier={2}/>
      </div>
    )
}
 