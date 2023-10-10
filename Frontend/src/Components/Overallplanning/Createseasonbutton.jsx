import "./createseasonbutton.css"
import GlobalContext from "../../Context/GlobalContext";
import React, { useContext } from "react";
import plusImg from "./assets/plus.svg";

const Createseasonbutton = ({userRole, setUserRole}) => {

    const {setShowSeasonModal} = useContext(GlobalContext);

    return(
        <div className="season_button_container">
            <button className="season_button" onClick={() =>{
                if(userRole === "coach"){
                    setShowSeasonModal(true);
                }}
            }>
                <img src={plusImg} alt="create_season"/>
                <span> Create New Season</span>
            </button>
        </div>
    )
}

export default Createseasonbutton