import "./month.css"
import React from "react";
import Day from "./Day";

const Month = ({month, setMonth, userRole, setUserRole}) => {
    return(
        <div className="monthcontainer">

        {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                    <Day key={idx}  day={day} rowIdx={i} userRole={userRole} setUserRole={setUserRole}/>                        
                    ))}
                </React.Fragment>
                    ))}
        </div>
    )
}

export default Month;