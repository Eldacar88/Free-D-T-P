import "./eventmodal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import React, {useContext, useState, useRef} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import axios from 'axios';
import { uuid4 } from "uuid4";

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

      async function postEvent(e) {
        

        const formData = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            realId: uuid4(),
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf()
        }

        const config = {
            url: "http://localhost:3002/postEvent",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        }
        
        try{
            const response = await axios(config);
            console.log(response);

            if(response.status !== 201){
                throw new Error('failed to create event');
            }
        }
        catch(error){
            console.log(error.response.data.message);
        }
      }

      async function updateEvent(e) {
        e.preventDefault();
        const formData = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            realId: uuid4(),
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf()
        }
        const config = {
            url: "http://localhost:3002/updateEvent",
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        }
        try{
            const response = await axios(config);
            console.log(response);

            if(response.status !== 200){
                throw new Error('failed to update event');
            }
        }
        catch(error){
            console.log(error.response.data.message);
        }
      }

      async function handleSubmit(e) {
        e.preventDefault();
        
        const form = formRef.current;
        const formData = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            realId: uuid4(),
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf()
        }

        const config = {
            url: "http://localhost:3002/postEvent",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: formData
        }
        
        try{
            const response = await axios(config);
            console.log(response);

            if(response.status !== 201){
                throw new Error('failed to create event');
            }

        }
        catch(error){
            console.log(error.response.data.message);
        }

        //DB-Part
        /*
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: formData });
          } else {
            dispatchCalEvent({ type: "push", payload: formData });
          }
          setShowEventModal(false);*/

        
        const calendarEvent = {
          title,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
          realId: uuid4(),
        };
        
        if (selectedEvent) {
          dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
          dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
      }
    

      /*async function handleSubmit(e) {
        e.preventDefault();
                      
        /*const calendarEvent = {
          title,
          description,
          label: selectedLabel,
          day: daySelected.valueOf(),
          id: selectedEvent ? selectedEvent.id : Date.now(),
          realId: uuid4(),
        };
        
        if (selectedEvent) {
            updateEvent();

            const formData = {
                id: selectedEvent ? selectedEvent.id : Date.now(),
                realId: uuid4(),
                title,
                description,
                label: selectedLabel,
                day: daySelected.valueOf()
            }
    
            const config = {
                url: "http://localhost:3002/getUpdatedEvent",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: formData
            }
            
            try{
                const response = await axios(config);
                //console.log(response);    
                if(response.status !== 200){
                    throw new Error('failed load updated event');
                }

                const updatedEvents ={
                    title: response.data.title,
                    description: response.data.description,
                    label: response.data.label,
                    day:response.data.day,
                    id: response.data.id,
                    realId: response.data.realId,
                }

                dispatchCalEvent({ type: "update", payload: updatedEvents});
            }
            catch(error){
                console.log(error.response.data.message);
            }

            //dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {

            postEvent();

            try {
                const response = await axios('http://localhost:3002/getEvent');
                console.log(response.data);
                const postedEvents ={
                    title: response.data.title,
                    description: response.data.description,
                    label: response.data.label,
                    day:response.data.day,
                    id: response.data.id,
                    realId: response.data.realId,
                }

                
                dispatchCalEvent({ type: "push", payload: response.data });
  
              } catch (error) {
                console.error(error);
              }
        

          //dispatchCalEvent({ type: "push", payload: calendarEvent });
        }
        setShowEventModal(false);
      }*/

      

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
                            setShowEventModal(false);
                            deleteEvent()
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