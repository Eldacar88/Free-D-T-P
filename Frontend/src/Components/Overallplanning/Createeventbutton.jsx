import "./createeventbutton.css"
import GlobalContext from "../../Context/GlobalContext";
import React, { useContext } from "react";
import plusImg from "./assets/plus.svg"

const Createeventbutton = ({userRole, setUserRole}) => {
    const { setShowEventModal } = useContext(GlobalContext);

    return(
        <div className="eventbuttoncontainer">
            <button className="eventbutton" onClick={() =>{
                if(userRole === "coach"){
                    setShowEventModal(true);
                }}
            }
                
                >
                <img src={plusImg} alt="create_event"/>
                <span> Create New Competition</span>
            </button>
        </div>

    )
}
export default Createeventbutton;