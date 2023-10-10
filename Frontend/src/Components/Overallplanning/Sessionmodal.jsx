import "./sessionmodal.css";
import GlobalContext from "../../Context/GlobalContext";
import React, {useContext, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { uuid4 } from "uuid4";
import axios from 'axios';

import Trainingtypeselection from "./Trainingtype/Trainingstypeselection";

const labelsClasses = [
    "wettkampf",
    "geschwindigkeit",
    "technik",
    "ausdauer",
    "kraft",
    "kraftausdauer",
  ];

const Sessionmodal = () => {
    const formRef = useRef();

    const {
        setShowSessionModal,
        selectedSession,
        /*startDateSeasonMilliSeconds,
        setStartDateSeasonMilliSeconds,
        numberOfSessions,
        setNumberOfSessions,
        durationSession,
        durationLastTrainingSession, 
        setDurationLastTrainingSession,*/
      } = useContext(GlobalContext);


      const [sessionType, setSessionType] = useState(selectedSession? selectedSession.sessionType : "");

      const [selectedTypes, setSelectedTypes] = useState([]);

      const [selectedValues, setSelectedValues] = useState([]);

      const [selectedLabel, setSelectedLabel] = useState(selectedEvent
        ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
        : labelsClasses[0]);

      const handleFormSubmit = (sessionType) => {
        // Store the selected option in MongoDB or perform other actions
        setSelectedValues([...selectedValues, sessionType]);
      };

      const components = [];

      function renderMultipleTrainingtypes(numberOfTimes) {
        
        for (let i = 1; i <= numberOfTimes; i++) {
          components.push(<Trainingtypeselection 
             setShowSessionModal={setShowSessionModal}
             key={i} 
             iteration={i}
             sessionType={sessionType}
             setSessionType={setSessionType}
             onFormSubmit={handleFormSubmit}/>);
        }
      
        return components;
      }

      async function handleSubmit(e) {
        e.preventDefault();

        const seasonTitle = title;
        console.log("Season: " + seasonTitle);
        var sessionNumber = 1;
        const dayInMilliseconds = 86400000;
        const weekInMilliseconds = 604800000;
        var sessionStartDate = 0;
        var sessionEndDate = 0;

        selectedTypes.forEach(async (sessionType) => {
            //console.log(`Storing ${selectedOption} in MongoDB...`);

            sessionStartDate = startDateSeasonMilliSeconds;

            if(sessionNumber === numberOfSessions){
                sessionEndDate = sessionStartDate + durationLastTrainingSession;
            }
            else{
                sessionEndDate = sessionStartDate + durationSession;
            }
            
            
            const formData = {
                id: uuid4(),
                seasonTitle: seasonTitle,
                sessionStartDate: sessionStartDate,
                sessionEndDate: sessionEndDate,
                sessionNumber: sessionNumber,
                sessionType: sessionType,
            }

            console.log(formData);
            const config = {
                url: "http://localhost:3002/postSession",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData)
            }

            try{
                const response = await axios(config);
                console.log(response);

                if(response.status !== 201){
                    throw new Error('failed to register');
                }
            }
            catch(error){
                if(error.response.status === 429) {
                
                console.log(error.response.data);
            } else {
                
                console.log(error);
                }
            }
            sessionNumber++;
            sessionStartDate = sessionEndDate + dayInMilliseconds;
          })
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
                    </div>

                    <div>{renderMultipleTrainingtypes(numberOfSessions)}</div>
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