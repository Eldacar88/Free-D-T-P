import "./createsessionbutton.css"
import GlobalContext from "../../Context/GlobalContext";
import React, { useContext } from "react";
import plusImg from "./assets/plus.svg";

const Createsessionbutton = ({userRole, setUserRole}) => {
    const {setShowSessionModal} = useContext(GlobalContext);

    return(
        <div className="eventbuttoncontainer">
            <button className="eventbutton" onClick={() =>{
                if(userRole === "coach"){
                    setShowSessionModal(true);
                }}
            }
                
                >
                <img src={plusImg} alt="create_event"/>
                <span> Create New Session</span>
            </button>
        </div>

    )

}

export default Createsessionbutton;