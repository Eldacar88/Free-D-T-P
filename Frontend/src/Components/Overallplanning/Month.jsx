import "./month.css"
import React from "react";
import Day from "./Day";

const Month = ({month, setMonth}) => {
    return(
        <div className="monthcontainer">

        {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                    <Day key={idx}  day={day} rowIdx={i}/>                        
                    ))}
                </React.Fragment>
                    ))}
        </div>
    )
}

export default Month;