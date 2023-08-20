import "./sidebar.css"
import Createeventbutton from "./Createeventbutton";
import Smallcalendar from "./Smallcalendar";
import Labels from "./Labels";
import Hidecomponent from "../Hide/Hidecomponent";
import Createseasonbutton from "./Createseasonbutton";
import Createsessionbutton from "./Createsessionbutton";
import Loadbutton from "./Loadbutton";
import React from "react";

const Sidebar = ({userRole, setUserRole}) => {
    return (
        <aside className="sidebarcontainer">
            <Createeventbutton userRole={userRole} setUserRole={setUserRole}/>
            <Createseasonbutton userRole={userRole} setUserRole={setUserRole}/>
            <Createsessionbutton userRole={userRole} setUserRole={setUserRole}/>
            <Smallcalendar/>
            <Loadbutton/>
            <Labels/>
            
        </aside>
    )
}

export default Sidebar;