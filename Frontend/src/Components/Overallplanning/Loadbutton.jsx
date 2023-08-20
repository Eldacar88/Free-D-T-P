import "./loadbutton.css";
import GlobalContext from "../../Context/GlobalContext";
import React, { useContext, useState } from "react";
import axios from 'axios';
import plusImg from "./assets/plus.svg"

const Loadbutton = () => {
    const {

        dispatchCalEvent,
        savedEvents,
      } = useContext(GlobalContext);

      const [loaded, setLoaded] = useState(false);

    async function loadEvents (){  
      
      try {
        const response = await axios.get('http://localhost:3002/getEvent');
        const responseDataArray = Array.isArray(response.data) ? response.data : [response.data];

        if(loaded === false){
          responseDataArray.forEach((item, index) => {
              //console.log(`Item ${index}:`, item);
    
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
    return(
        <div className="eventbuttoncontainer">
            <button className="eventbutton" onClick={loadEvents}>

                <img src={plusImg} alt="load"/>
                <span> Load</span>
            </button>
        </div>

    )
}

export default Loadbutton;