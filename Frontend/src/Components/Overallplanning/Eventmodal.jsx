import "./eventmodal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useState} from 'react';
import GlobalContext from "../../Context/GlobalContext";

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
  ];

const Eventmodal = () => {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
      } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");

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

      function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
          title,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
        
      }

    return(
        <div className="overlaycontainer">
            <form className="formcontainer">
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
                            setShowEventModal(false);
                            
                            }}
                            className="spanicon"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        )}

                    
                    <button>
                        <span className="spanicon" onClick={() => setShowEventModal(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                    </div>
                </header>

                <div className="middle">
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
                            <span className="spanicon" onClick={() => setShowEventModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            {daySelected.format("dddd, MMMM DD")}

                        </div>
                        
                        <div className='descriptiocontainer'>
                            <span className="spanicon" onClick={() => setShowEventModal(false)}>
                                <FontAwesomeIcon icon={faBarsStaggered} />
                            </span>
                            <input className="middleinput2"
                                type="text"
                                name="description" 
                                placeholder="Add Description" 
                                value={description} 
                                required 
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        

                        <div className='bookmarkcontainer'>

                        
                        <span className="spanicon" onClick={() => setShowEventModal(false)}>
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

export default Eventmodal;