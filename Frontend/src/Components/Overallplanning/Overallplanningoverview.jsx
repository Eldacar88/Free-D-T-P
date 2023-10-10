import "./overallplanningoverview.css"
import Button from 'react-bootstrap/Button';
import create from './img/overallplanning_create.jpg';
import load from './img/overallplanning_load.jpg';
import { Link, Navigate } from "react-router-dom";

const Overallplanningoverview = ({userRole, setUserRole}) => {
    return(
        <div className="overallplanning_overview_container">
            <h1>Overall Planning</h1>

            <div className="overallplanning_subcontainer">

                <div className="overallplanning_create_container">
                    <img id="overallplanning_image" src={create} alt="create" />
                    <Link to={"/newoverallplanning"}><Button variant="dark" size="lg">
                        Create new Overall Planing
                    </Button></Link>
                </div>
                
                <div className="overallplanning_load_container">
                    <img id="overallplanning_image" src={load} alt="load"/>
                    <Button variant="dark" size="lg">
                        Load Existing Planing
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Overallplanningoverview;