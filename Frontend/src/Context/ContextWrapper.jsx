import "./contextwrapper.css"
import React, {useState, useEffect, useReducer, useMemo} from "react"
import dayjs from "dayjs"
import GlobalContext from "./GlobalContext"
import axios from 'axios'

const ContextWrapper = (props) => {

  //DB-Part
  /*function savedEventsReducer(state, {type, payload}) {
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
  }*/

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
  /*function initEvents (){   
     const fetchData = async () => {
      try {
        const response = await axios('http://localhost:3002/getEvent');
        dispatchCalEvent({ type: 'push', payload: response.data });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); 
       
  }*/

  function  initEvents() {   
    const storageEvents = localStorage.getItem("savedEvents"); // aus DB holen
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    //console.log(parsedEvents);
    return parsedEvents;
  }

    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSeasonModal, setShowSeasonModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
      savedEventsReducer,[], initEvents);


      const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
          labels
            .filter((lbl) => lbl.checked)
            .map((lbl) => lbl.label)
            .includes(evt.label)
        );
      }, [savedEvents, labels]);

      //DB-Part
     /* useEffect(() => {
         const fetchData = async () => {
          try {
            const response = await axios('http://localhost:3002/getEvent'); 
            dispatchCalEvent({ type: 'push', payload: response.data });
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [savedEvents]);*/
      
      
      useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
      }, [savedEvents]);
      

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
          
            }}>
            {props.children}
        </GlobalContext.Provider>  
    )
}

export default ContextWrapper;