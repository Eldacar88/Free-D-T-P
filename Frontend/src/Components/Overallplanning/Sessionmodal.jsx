import "./sessionmodal.css";
import GlobalContext from "../../Context/GlobalContext";
import React, {useContext, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

import Trainingtypeselection from "./Trainingtype/Trainingstypeselection";

const labelsClasses = [
    "wettkampf",
    "geschwindigkeit",
    "technik",
    "ausdauer",
    "kraft",
    "kraftausdauer",
  ];

const Sessionmodal = ({titleSeason, setTitleSeason, endDateSeason, setEndDateSeason, startDateSeason, setStartDateSeason,
                    durationSession, setDurationSession, lastTrainingDay, setLastTrainingDay,
                    numberOfSessions, setNumberOfSessions, durationLastTrainingSession, setDurationLastTrainingSession,
                    endDateSeasonMilliSeconds, setEndDateSeasonMiliSeconds, startDateSeasonMilliSeconds, setStartDateSeasonMiliSeconds,
                    lastTrainingDayMilliSeconds, setLastTrainingDayMilliSeconds}) => {
    const formRef = useRef();

    const {
        setShowSessionModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
      } = useContext(GlobalContext);

      const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

      const [session, setSession] = useState(selectedEvent ? selectedEvent.session : "");

      const [selectedLabel, setSelectedLabel] = useState(selectedEvent
        ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
        : labelsClasses[0]);

      function applyLabelclass(i) {
        if(i === 0){
            return "color_0";
        }
        else if(i===1){
            return "color_1";
        }
        else if(i===2){
            return "color_2";
        }
        else if(i===3){
            return "color_3";
        }
        else if(i===4){
            return "color_4";
        }
        else if(i===5){
            return "color_5";
        }  
      }
    //wichtig für DB
      function handleSubmit(e) {
        e.preventDefault();
        /*
        const form = formRef.current;
        const formData = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            title: form.title.value,
            description: form.description.value,
            label: selectedLabel,
            day: daySelected.valueOf()
            
        }
        console.log(formData);
        */
        /*
        const config = {
            url: "http://localhost:3002/event",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData)
        }
        */
        /*
        try{
            const response = await axios(config);
            console.log(response);

            if(response.status !== 201){
                throw new Error('failed to register');
            }

            if (selectedEvent) {
                dispatchCalEvent({ type: "update", payload: response });
              } else {
                dispatchCalEvent({ type: "push", payload: response });
              }
              setShowEventModal(false);
        }
        catch(error){
            if(error.response.status === 429) {
            
            console.log(error.response.data);
        } else {
            
            console.log(error);
        }
        */
        const calendarEvent = {
          title,
          session,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        
        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowSessionModal(false);
      }

      return(
        <div className="overlaycontainer">
            <form className="formcontainer_eventmodal">
                <header className="formheader">
                    <span className="spanicon">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <div className='spanicontainer'>
                        {selectedEvent && (
                        <span
                            onClick={() => {
                            dispatchCalEvent({
                                type: "delete",
                                payload: selectedEvent,
                            });
                            setShowSessionModal(false);
                            
                            }}
                            className="spanicon"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        )}

                    
                    <button>
                        <span className="spanicon" onClick={() => setShowSessionModal(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                    </div>
                </header>


                <div className="middle" ref={formRef}>
                    <div className="middlegrid">
                        <div></div>
                        <input className="middleinput1"
                         type="text"
                         name="title" 
                         placeholder="Add Title" 
                         value={title} 
                         required 
                         onChange={(e) => setTitle(e.target.value)}/>


                        <Trainingtypeselection session={session} setSession={setSession} setShowSessionModal={setShowSessionModal}/>

                        
                        <div className='bookmarkcontainer'>

                        
                        <span className="spanicon" onClick={() => setShowSessionModal(false)}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </span>

                        <div className="labelcontainer">
                        {labelsClasses.map((lblClass, i) => (
                            <span 
                                key={i}
                                onClick={() => setSelectedLabel(lblClass)}
                                className={`check ${applyLabelclass(i)}`}>
                                {selectedLabel === lblClass && (
                                <span>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                )}
                            </span>
                        ))} 
                        </div>
                        
                        </div>                   
                    </div>
                </div>

                <footer className="footercontainer">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="footerbutton">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )

}

export default Sessionmodal;