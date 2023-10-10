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

    function seasonEventsReducer(state, { type, payload }) {
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
  
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showSeasonModal, setShowSeasonModal] = useState(false);
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
      savedEventsReducer,[]);

      const [seasonEvents, setSeasonEvents] = useReducer(
        seasonEventsReducer,[]);
      
    //Season
    const [endDateSeasonMilliSeconds, setEndDateSeasonMilliSeconds] = useState("");
    const [startDateSeasonMilliSeconds, setStartDateSeasonMilliSeconds] = useState("");
    const [numberOfSessions, setNumberOfSessions] = useState("");
    const [lastTrainingDayMilliSeconds, setLastTrainingDayMilliSeconds] = useState("");
    const [durationLastTrainingSession, setDurationLastTrainingSession] = useState("");

    const filteredEvents = useMemo(() => {
      return savedEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.label)
      );
    }, [savedEvents, labels]);

    const filteredSeasonEvents = useMemo(() => {
      return seasonEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.label)
      );
    }, [seasonEvents, labels]);
  
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

    useEffect(() => {
      if (!showSeasonModal) {
        setSelectedSeason(null);
      }
    }, [showSeasonModal]);

    useEffect(() => {
      if (!showSessionModal) {
        setSelectedSession(null);
      }
    }, [showSessionModal]);

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
          selectedSeason, 
          setSelectedSeason,
          selectedSession,
          setSelectedSession,
          savedEvents,
          setLabels,
          labels,
          updateLabel,
          filteredEvents,
          showSeasonModal,
          setShowSeasonModal,
          showSessionModal,
          setShowSessionModal,
          seasonEvents,
          setSeasonEvents,
          filteredSeasonEvents,
          loaded, 
          setLoaded,
          endDateSeasonMilliSeconds,
          setEndDateSeasonMilliSeconds,
          startDateSeasonMilliSeconds,
          setStartDateSeasonMilliSeconds,
          numberOfSessions,
          setNumberOfSessions,
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