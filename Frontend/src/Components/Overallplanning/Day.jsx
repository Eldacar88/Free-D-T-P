import "./day.css"
import React, {useContext, useState, useEffect} from 'react';
import dayjs from "dayjs";
import GlobalContext from "../../Context/GlobalContext";

const Day = ({day, rowIdx, userRole, setUserRole}) => {
    const [dayEvents, setDayEvents] = useState([]);

    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        filteredSeasonEvents, 
        setSelectedEvent
    } = useContext(GlobalContext);

    useEffect(() => {
    const events = filteredEvents.filter(
        (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
    }, [filteredEvents, day]);

    /*useEffect(() => {
    const events = filteredSeasonEvents.filter(
        (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
    }, [filteredSeasonEvents, day]);*/

    function getcurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ?
        "day_paragraph_today" : ""}

    function applyEventLabel(eventlabel){
        if(eventlabel === "wettkampf"){
            return "day_color_0";
        }
        else if(eventlabel === "geschwindigkeit"){
            return "day_color_1";
        }
        else if(eventlabel === "technik"){
            return "day_color_2";
        }
        else if(eventlabel === "ausdauer"){
            return "day_color_3";
        }
        else if(eventlabel === "kraft"){
            return "day_color_4";
        }
        else if(eventlabel === "kraftausdauer"){
            return "day_color_5";
        }  
    }

    return(
        <div className="day_container">
            <header className="day_header">
                {rowIdx === 0 && (<p className="day_paragraph">
                    {day.format('ddd').toUpperCase()}
                </p>)}

                <p className={`day_paragraph ${getcurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>

            <div className="day_selection" onClick={() => {
                setDaySelected(day);
                if(userRole === "coach"){
                    setShowEventModal(true);
                }
                }}>
                    {dayEvents.map((evt, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEvent(evt)}
                            className={`day_eventlabel ${applyEventLabel(evt.label)}`}>
                            {evt.title}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Day;