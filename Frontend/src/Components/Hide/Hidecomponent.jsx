import "./hidecomponent.css"

const Hidecomponent = ({ userRole, component }) => {
    
    const role = "athlet";
    if (userRole === role) {
        return null;
    }

    return(
    <div>
        {component}
    </div>);    
}

export default Hidecomponent;