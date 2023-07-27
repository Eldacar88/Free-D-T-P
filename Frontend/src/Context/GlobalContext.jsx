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
    setSavedEvents: ({ type, payload }) => {},
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
    
})

export default GlobalContext;