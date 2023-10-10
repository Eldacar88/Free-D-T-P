import "./eventmodal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useState, useRef} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import axios from 'axios';
import { uuid4 } from "uuid4";
import dayjs from "dayjs";

const labelsClasses = [
    "wettkampf",
    "geschwindigkeit",
    "technik",
    "ausdauer",
    "kraft",
    "kraftausdauer",
  ];

const Eventmodal = () => {
    const formRef = useRef();

    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        testEvent,
        setTestEvent,
        loaded, 
        setLoaded
      } = useContext(GlobalContext);

    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");

    const [selectedLabel, setSelectedLabel] = useState(selectedEvent
        ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
        : labelsClasses[0]);

    function applyLabelclass(i) {
        if(i === 0){
            return "eventmodal_color_0";
        }
        else if(i===1){
            return "eventmodal_color_1";
        }
        else if(i===2){
            return "eventmodal_color_2";
        }
        else if(i===3){
            return "eventmodal_color_3";
        }
        else if(i===4){
            return "eventmodal_color_4";
        }
        else if(i===5){
            return "eventmodal_color_5";
        }  
    }

    function checkHandleSubmit(e){
        e.preventDefault();
        if(loaded === false){
            //alert("Load the Events first.");
            loadEvents(e);
            handleSubmit(e);
        }
        else {
            handleSubmit(e);
        }
    }

    async function loadEvents (e){  
    e.preventDefault();
    try {
        const response = await axios.get('http://localhost:3002/getEvent');
        const responseDataArray = Array.isArray(response.data) ? response.data : [response.data];
        if(loaded === false){
            responseDataArray.forEach((item, index) => {
                const event = {
                    title: item.title,
                    description: item.description,
                    label: item.label,
                    day: parseInt(item.day, 10),
                    id: parseInt(item.id,10),
                    realId: item.realId,
                }
                dispatchCalEvent({ type: "push", payload: event });           
                }
            )
        }
        setLoaded(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (selectedEvent) {
            //updateEvent
            const formData = {
                id: selectedEvent ? selectedEvent.id : Date.now(),
                realId: uuid4(),
                title,
                description,
                label: selectedLabel,
                day: daySelected.valueOf()
            }

            const configUpdate = {
                url: "http://localhost:3002/updateEvent",
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            }

            try{
                const response = await axios(configUpdate);
                console.log(response.data); 
                const responseDataArray = Array.isArray(response.data) ? response.data : [response.data];
                var updatedTitleConverted;
                var updatedDescriptionConverted;
                var updatedLabelConverted;
                var updatedDayConverted;
                var updatedIdConverted;
                var updatedRealIdConverted;

                responseDataArray.forEach((item, index) => {
                    //console.log(`Item ${index}:`, item);
                    updatedTitleConverted = item.title;
                    updatedDescriptionConverted = item.description;
                    updatedLabelConverted = item.label;
                    updatedDayConverted = parseInt(item.day, 10);
                    updatedIdConverted = parseInt(item.id,10);
                    updatedRealIdConverted = item.realId;    
                });

                const updatedEvents = {
                    title: updatedTitleConverted,
                    description: updatedDescriptionConverted,
                    label: updatedLabelConverted,
                    day: updatedDayConverted,
                    id: updatedIdConverted,
                    realId: updatedRealIdConverted,  
                }
                
                dispatchCalEvent({ type: "update", payload: updatedEvents });
            }

            catch(error){
                console.log(error.response.data.message);
            }
            
        } else {
            //Postevent
            const form = formRef.current;
            const formData = {
                id: selectedEvent ? selectedEvent.id : Date.now(),
                realId: uuid4(),
                title,
                description,
                label: selectedLabel,
                day: daySelected.valueOf()
            }

            const configPost = {
                url: "http://localhost:3002/postEvent",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            }

            try{
                const response = await axios(configPost);
                console.log(response);

                if(response.status !== 201){
                    throw new Error('failed to create event');
                }
            }
            catch(error){
                console.log(error.response.data.message);
            }

            //getEvent
            try {
                const response = await axios.get('http://localhost:3002/getEvent');
                
                const responseDataArray = Array.isArray(response.data) ? response.data : [response.data];

                var titleConverted;
                var descriptionConverted;
                var labelConverted;
                var dayConverted;
                var idConverted;
                var realIdConverted;

                responseDataArray.forEach((item, index) => {
                    titleConverted = item.title;
                    descriptionConverted = item.description;
                    labelConverted = item.label;
                    dayConverted = parseInt(item.day, 10);
                    idConverted = parseInt(item.id,10);
                    realIdConverted = item.realId;    
                });

                const postedEvents = {
                    title: titleConverted,
                    description: descriptionConverted,
                    label: labelConverted,
                    day:dayConverted,
                    id: idConverted,
                    realId: realIdConverted,  
                }
                    dispatchCalEvent({ type: "push", payload: postedEvents });

                }
                catch (error) {
                    console.error(error);
                }
        }
        
        setShowEventModal(false);
    }
      

    async function deleteEvent(e) {
        const formData = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            realId: uuid4(),
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf()
        }

            const config = {
            url: `http://localhost:3002/deleteEvent`,
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        }

        try{
            const response = await axios(config);
            console.log(response);
            if(response.status !== 200){
                throw new Error('failed to delete event');
            }
        }
        catch(error){
            console.log(error.response.data.message);
        }
    }

    return(
        <div className="eventmodal_overlaycontainer">
            <form className="eventmodal_formcontainer">
                <header className="eventmodal_formheader">
                    <span className="eventmodal_spanicon">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <div className='eventmodal_spanicon_container'>
                        {selectedEvent && (
                        <span
                            onClick={() => {
                            dispatchCalEvent({
                                type: "delete",
                                payload: selectedEvent,
                            });
                            setShowEventModal(false);
                            deleteEvent()
                            }}
                            className="eventmodal_spanicon"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        )}

                    <button>
                        <span className="eventmodal_spanicon" onClick={() => setShowEventModal(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                    </div>
                </header>

                <div className="eventmodal_middle" ref={formRef}>
                    <div className="eventmodal_middlegrid">
                        <div></div>
                        <input className="eventmodal_titleinput"
                         type="text"
                         name="title" 
                         placeholder="Add Title" 
                         value={title} 
                         required 
                         onChange={(e) => setTitle(e.target.value)}/>

                        <div className='eventmodal_datecontainer'>
                            <span className="eventmodal_spanicon" onClick={() => setShowEventModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            {daySelected.format("dddd, MMMM DD")}

                        </div>
                        
                        <div className='eventmodal_descriptiocontainer'>
                            <span className="eventmodal_spanicon" onClick={() => setShowEventModal(false)}>
                                <FontAwesomeIcon icon={faBarsStaggered} />
                            </span>
                            <input className="eventmodal_descriptioninput"
                                type="text"
                                name="description" 
                                placeholder="Add Description" 
                                value={description} 
                                required 
                                onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        
                        <div className='eventmodal_bookmarkcontainer'>
                        
                        <span className="eventmodal_spanicon" onClick={() => setShowEventModal(false)}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </span>

                        <div className="eventmodal_labelcontainer">
                        {labelsClasses.map((lblClass, i) => (
                            <span 
                                key={i}
                                onClick={() => setSelectedLabel(lblClass)}
                                className={`eventmodal_check ${applyLabelclass(i)}`}>
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

                <footer className="eventmodal_footercontainer">
                    <button
                        type="submit"
                        onClick={checkHandleSubmit}
                        
                        className="eventmodal_footerbutton">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default Eventmodal;