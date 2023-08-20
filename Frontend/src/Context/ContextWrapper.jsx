import "./contextwrapper.css"
import React, {useState, useEffect, useReducer, useMemo} from "react"
import dayjs from "dayjs"
import GlobalContext from "./GlobalContext"
import axios from 'axios'

const ContextWrapper = (props) => {

  function savedEventsReducer(state, { type, payload }) {
    switch (type) {
      case "push":
        return [...state, payload];
      case "update":
        return state.map((evt) =>
          evt.id === payload.id ? payload : evt
        );
      case "delete":
        return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
  }


  // DB-Part
  /*
 async function initTestEvents (){   
  
    try {
      const response = await axios.get('http://localhost:3002/getEvent');
      const resolvedData = await response.data;
      const responseDataArray = Array.isArray(resolvedData) ? resolvedData : [resolvedData];
      const postedEvents = []; 
      responseDataArray.forEach((item, index) => {
          console.log(`Item ${index}:`, item);

          const event = {
            title: item.title,
            description: item.description,
            label: item.label,
            day: parseInt(item.day, 10),
            id: parseInt(item.id,10),
            realId: item.realId,
          }
          postedEvents.push(event);
          dispatchCalEvent({ type: "push", payload: event });          
      });
      console.log(postedEvents);
      console.log(savedEvents);
      return postedEvents;
      }
      catch (error) {
          console.error(error);
      }
  }

  function initEvents() {   
    const storageEvents = localStorage.getItem("savedEvents"); // aus DB holen
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    console.log(parsedEvents);
    return parsedEvents;
  }*/

    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSeasonModal, setShowSeasonModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
      savedEventsReducer,[]);
    

    //Season
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


      const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
          labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        );
      }, [savedEvents, labels]);
    
      
      /*useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
        //console.log(savedEvents);
        //initEvents();
        //initTestEvents();
      }, [savedEvents]);*/

      useEffect(() => {
        
        setLabels((prevLabels) => {
          return [...new Set(savedEvents.map((evt) => evt.label))].map(
            (label) => {
              const currentLabel = prevLabels.find(
                (lbl) => lbl.label === label
              );
              return {
                label,
                checked: currentLabel ? currentLabel.checked : true,
              };
            }
          );
        });
      }, [savedEvents]);

      useEffect(() => {
          if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth);
          }
        }, [smallCalendarMonth]);

        useEffect(() => {
          if (!showEventModal) {
            setSelectedEvent(null);
          }
        }, [showEventModal]);

        function updateLabel(label) {
          setLabels(
            labels.map((lbl) => (lbl.label === label.label ? label : lbl))
          );
        }


    return(
        <GlobalContext.Provider value={{
          monthIndex,
          setMonthIndex,
          smallCalendarMonth,
          setSmallCalendarMonth,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          dispatchCalEvent,
          selectedEvent,
          setSelectedEvent,
          savedEvents,
          setLabels,
          labels,
          updateLabel,
          filteredEvents,
          showSeasonModal,
          setShowSeasonModal,
          showSessionModal,
          setShowSessionModal,
          
          titleSeason,
          setTitleSeason,
          endDateSeason,
          setEndDateSeason,
          endDateSeasonMilliSeconds,
          setEndDateSeasonMilliSeconds,
          startDateSeason, 
          setStartDateSeason,
          startDateSeasonMilliSeconds,
          setStartDateSeasonMilliSeconds,
          numberOfSessions,
          setNumberOfSessions,
          durationSession,
          setDurationSession,
          lastTrainingDay, 
          setLastTrainingDay,
          lastTrainingDayMilliSeconds,
          setLastTrainingDayMilliSeconds,
          durationLastTrainingSession, 
          setDurationLastTrainingSession,
            }}>
            {props.children}
        </GlobalContext.Provider>  
    )
}

export default ContextWrapper;