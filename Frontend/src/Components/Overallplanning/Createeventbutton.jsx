import "./createeventbutton.css"
import GlobalContext from "../../Context/GlobalContext";
import React, { useContext } from "react";
import plusImg from "./assets/plus.svg"

const Createeventbutton = () => {
    const { setShowEventModal } = useContext(GlobalContext);

    return(
        <div className="eventbuttoncontainer">
            <button className="eventbutton" onClick={() => setShowEventModal(true)}>
                <img src={plusImg} alt="create_event"/>
                <span> Create</span>
            </button>

        </div>

    )
}
export default Createeventbutton;