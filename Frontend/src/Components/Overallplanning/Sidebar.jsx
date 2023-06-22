import "./sidebar.css"
import Createeventbutton from "./Createeventbutton";
import Smallcalendar from "./Smallcalendar";
import Labels from "./Labels";
import React from "react";

const Sidebar = () => {
    return (
        <aside className="sidebarcontainer">
            <Createeventbutton/>
            <Smallcalendar/>
            <Labels/>
            
        </aside>
    )
}

export default Sidebar;