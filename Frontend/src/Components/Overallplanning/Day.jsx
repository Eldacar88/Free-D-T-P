import "./day.css"
import React, {useContext, useState, useEffect} from 'react';
import dayjs from "dayjs";
import GlobalContext from "../../Context/GlobalContext";

const Day = ({day, rowIdx}) => {
    const [dayEvents, setDayEvents] = useState([]);

    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents, 
        setSelectedEvent
      } = useContext(GlobalContext);

      useEffect(() => {
        const events = filteredEvents.filter(
          (evt) =>
            dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
      }, [filteredEvents, day]);

    function getcurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ?
        "dayparagraphtoday" : ""}

    function applyEventLabel(eventlabel){
        if(eventlabel === "indigo"){
            return "color_0";
        }
        else if(eventlabel === "gray"){
            return "color_1";
        }
        else if(eventlabel === "green"){
            return "color_2";
        }
        else if(eventlabel === "blue"){
            return "color_3";
        }
        else if(eventlabel === "red"){
            return "color_4";
        }
        else if(eventlabel === "purple"){
            return "color_5";
        }  

    }

    return(
        <div className="daycontainer">
            <header className="dayheader">

                {rowIdx === 0 && (<p className="dayparagraph">
                    {day.format('ddd').toUpperCase()}
                </p>)}

                <p className={`dayparagraph ${getcurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>

            <div className="dayselection" onClick={() => {
                setDaySelected(day);
                setShowEventModal(true);
                }}>
                    {dayEvents.map((evt, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEvent(evt)}
                            className={`eventlabel ${applyEventLabel(evt.label)}`}
                        >
                            {evt.title}
                        </div>
                        ))}
            </div>
            
        </div>
    )
}

export default Day;