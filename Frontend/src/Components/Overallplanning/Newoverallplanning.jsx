import "./newoverallplanning.css"
import React, {useState, useContext, useEffect} from 'react';

import Calendarheader from "./Calendarheader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import Eventmodal from "./Eventmodal";
import Seasonmodal from "./Seasonmodal";
import Sessionmodal from "./Sessionmodal";
import { getMonth } from "./util";
import GlobalContext from "../../Context/GlobalContext";


const Newoverallplanning = ({userRole, setUserRole}) => {

    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex, showEventModal, showSeasonModal, showSessionModal} = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
      }, [monthIndex])

    return(
        <React.Fragment>
            {showEventModal && <Eventmodal/>}
            {showSeasonModal && <Seasonmodal/>}
            {showSessionModal && <Sessionmodal/>}


            <div className="newoverallplanningcontainer">

                <Calendarheader/>

                <div className="calendarcontainer">
                    <Sidebar userRole={userRole} setUserRole={setUserRole}/>
                    <Month month={currentMonth} userRole={userRole} setUserRole={setUserRole}/>
                </div>

            </div>

        </React.Fragment>

    )
}

export default Newoverallplanning;