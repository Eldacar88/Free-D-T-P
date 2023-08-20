import "./globalcontext.css"
import React from "react"

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent: ({ type, payload }) => {},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: () => {},
    setLabels: () => {},
    labels: [],
    updateLabel: () => {},
    filteredEvents: [],
    showSeasonModal: false,
    setShowSeasonModal: () => {},
    showSessionModal: false,
    setShowSessionModal: () => {},
    fetchData: () => {},
    
    titleSeason: [],
    setTitleSeason: () => {},
    endDateSeason: [],
    setEndDateSeason: () => {},
    endDateSeasonMilliSeconds: [],
    setEndDateSeasonMilliSeconds: () => {},
    startDateSeason: [], 
    setStartDateSeason: () => {},
    startDateSeasonMilliSeconds: [],
    setStartDateSeasonMilliSeconds: () => {},
    numberOfSessions: [],
    setNumberOfSessions: () => {},
    durationSession: [],
    setDurationSession: () => {},
    lastTrainingDay: [], 
    setLastTrainingDay: () => {},
    lastTrainingDayMilliSeconds: [],
    setLastTrainingDayMilliSeconds: () => {},
    durationLastTrainingSession: [], 
    setDurationLastTrainingSession: () => {},
    
})

export default GlobalContext;