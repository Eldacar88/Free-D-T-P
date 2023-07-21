import "./hidecomponent.css"

const Hidecomponent = ({ userRole, component }) => {
    
    const role = "athlet";
    if (userRole === role) {
        return null; // Hide the component
    }
    return(
    <div>
        {component}
    </div>);    
}

export default Hidecomponent;