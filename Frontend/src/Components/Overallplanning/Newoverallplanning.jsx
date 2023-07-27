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
    const {monthIndex, showEventModal, showSeasonModal, showSessionModal, selectedEvent} = useContext(GlobalContext);
    const [titleSeason, setTitleSeason] = useState(selectedEvent ? selectedEvent.titleSeason : "");
    const [endDateSeason, setEndDateSeason] = useState(selectedEvent ? selectedEvent.endDateSeason : "");
    const [endDateSeasonMilliSeconds, setEndDateSeasonMilliSeconds] = useState(selectedEvent ? selectedEvent.endDateSeasonMilliSeconds : "");
    const [startDateSeason, setStartDateSeason] = useState(selectedEvent ? selectedEvent.startDateSeason : "");
    const [startDateSeasonMilliSeconds, setStartDateSeasonMilliSeconds] = useState(selectedEvent ? selectedEvent.startDateSeasonMilliSeconds : "");
    const [numberOfSessions, setNumberOfSessions] = useState(selectedEvent ? selectedEvent.numberOfSessions : "");
    const [durationSession, setDurationSession] = useState(selectedEvent ? selectedEvent.durationSession : "");
    const [lastTrainingDay, setLastTrainingDay] = useState(selectedEvent ? selectedEvent.lastTrainingDay : "");
    const [lastTrainingDayMilliSeconds, setLastTrainingDayMilliSeconds] = useState(selectedEvent ? selectedEvent.lastTrainingDayMilliSeconds : "");
    const [durationLastTrainingSession, setDurationLastTrainingSession] = useState(selectedEvent ? selectedEvent.durationLastTrainingSession : "");

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
      }, [monthIndex])

    return(
        <React.Fragment>
            {showEventModal && <Eventmodal/>}
            {showSeasonModal && <Seasonmodal
                titleSeason={titleSeason} 
                setTitleSeason={setTitleSeason}

                endDateSeason={endDateSeason}
                setEndDateSeason={setEndDateSeason}

                endDateSeasonMilliSeconds={endDateSeasonMilliSeconds}
                setEndDateSeasonMilliSeconds = {setEndDateSeasonMilliSeconds}

                startDateSeason={startDateSeason}
                setStartDateSeason={setStartDateSeason}

                startDateSeasonMilliSeconds={startDateSeasonMilliSeconds}
                setStartDateSeasonMilliSeconds={setStartDateSeasonMilliSeconds}

                durationSession={durationSession}
                setDurationSession={setDurationSession}

                numberOfSessions={numberOfSessions}
                setNumberOfSessions={setNumberOfSessions}

                lastTrainingDay={lastTrainingDay}
                setLastTrainingDay={setLastTrainingDay}

                lastTrainingDayMilliSeconds={lastTrainingDayMilliSeconds}
                setLastTrainingDayMilliSeconds={setLastTrainingDayMilliSeconds}
                
                durationLastTrainingSession={durationLastTrainingSession}                
                setDurationLastTrainingSession={setDurationLastTrainingSession}
                />}

                
            {showSessionModal && <Sessionmodal
            titleSeason={titleSeason} 
            setTitleSeason={setTitleSeason}
            endDateSeason={endDateSeason}
            setEndDateSeason={setEndDateSeason}
            endDateSeasonMilliSeconds={endDateSeasonMilliSeconds}
            setEndDateSeasonMiliSeconds={setEndDateSeasonMilliSeconds}
            startDateSeason={startDateSeason}
            setStartDateSeason={setStartDateSeason}
            startDateSeasonMilliSeconds={startDateSeasonMilliSeconds}
            setStartDateSeasonMiliSeconds={setStartDateSeasonMilliSeconds}
            durationSession={durationSession}
            setDurationSession={setDurationSession}
            numberOfSessions={numberOfSessions}
            setNumberOfSessions={setNumberOfSessions}
            lastTrainingDay={lastTrainingDay}
            setLastTrainingDay={setLastTrainingDay}
            lastTrainingDayMilliSeconds={lastTrainingDayMilliSeconds}
            setLastTrainingDayMilliSeconds={setLastTrainingDayMilliSeconds}
            durationLastTrainingSession={durationLastTrainingSession}
            setDurationLastTrainingSession={setDurationLastTrainingSession}/>}


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