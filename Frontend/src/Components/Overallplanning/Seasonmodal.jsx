import "./seasonmodal.css"
import React, {useContext, useState, useRef} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';

const labelsClasses = [
    "statik",
    "geschwindigkeit",
    "technik",
    "ausdauer",
    "kraft",
    "kraftausdauer",
  ];

const Seasonmodal = () => {
    const formRef = useRef();

    const {
        setShowSeasonModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
      } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

    const [start, setStart] = useState(selectedEvent ? selectedEvent.start : "");

    const [duration, setDuration] = useState(selectedEvent ? selectedEvent.duration : "");

    const [daysOff, setDaysOff] = useState(selectedEvent ? selectedEvent.daysOff : "");


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
          start,
          duration,
          daysOff,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        
        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowSeasonModal(false);
        
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
                            setShowSeasonModal(false);
                            
                            }}
                            className="spanicon"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        )}

                    
                    <button>
                        <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
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

                        <div className='datecontainer'>
                            <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Date of Final Contest:
                            <br/>

                            {daySelected.format("dddd, MMMM DD")}

                        </div>

                        <div className='datecontainer'>
                            <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Start of Season:
                            <br/>

                            <input className="middleinput1"
                            type="date"
                            name="start" 
                            value={start} 
                            required 
                            onChange={(e) => setStart(e.target.value)}/>
                        </div>

                        <div className='datecontainer'>
                            <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Duration of each session in weeks:
                            <br/>

                            <input className="middleinput1"
                            type="number"
                            min="1"
                            max="6"
                            name="duration" 
                            value={duration} 
                            required 
                            onChange={(e) => setDuration(e.target.value)}/>
                        </div>

                        <div className='datecontainer'>
                            <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Days off before final contest:
                            <br/>

                            <input className="middleinput1"
                            type="number"
                            min="1"
                            max="6"
                            name="daysoff" 
                            value={daysOff} 
                            required 
                            onChange={(e) => setDaysOff(e.target.value)}/>
                        </div>

                        
                        
                        

                        <div className='bookmarkcontainer'>

                        
                        <span className="spanicon" onClick={() => setShowSeasonModal(false)}>
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

export default Seasonmodal;