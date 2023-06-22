import "./newoverallplanning.css"
import React, {useState, useContext, useEffect} from 'react';

import Calendarheader from "./Calendarheader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import Eventmodal from "./Eventmodal";
import { getMonth } from "./util";
import GlobalContext from "../../Context/GlobalContext";


const Newoverallplanning = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex, showEventModal} = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
      }, [monthIndex])

    return(
        <React.Fragment>
            {showEventModal && <Eventmodal/>}
            <div className="newoverallplanningcontainer">

                <Calendarheader/>

                <div className="calendarcontainer">
                    <Sidebar/>
                    <Month month={currentMonth}/>
                </div>

            </div>

        </React.Fragment>

    )
}

export default Newoverallplanning;