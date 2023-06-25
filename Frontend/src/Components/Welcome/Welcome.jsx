import "./welcome.css"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigator = useNavigate();
    const handleClick = () => {
        navigator("/login");
    }

    return(
        <div className="welcomecontainer">
            <h1>Willkommen bei Free-D-T-P</h1>
            
            <Button variant="primary" onClick={handleClick}>Continue</Button>
        </div>
    )
}

export default Welcome;