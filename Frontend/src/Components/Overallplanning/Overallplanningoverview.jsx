import "./overallplanningoverview.css"
import Button from 'react-bootstrap/Button';
import create from './img/overallplanning_create.jpg';
import load from './img/overallplanning_load.jpg';
import mountain from './img/mountain.jpg';
import { Link, Navigate } from "react-router-dom";

const Overallplanningoverview = () => {
    return(


        <div className="overallplanningoverviewcontainer">
            <h1>Overall Planning</h1>

            <div className="subcontainer">

                <div className="overallplanningcreatecontainer">
                    <img src={create} width="300px" alt="create"/>
                    <Link to={"/newoverallplanning"}><Button variant="dark" size="lg">
                        Create new Overall Planing
                    </Button></Link>
                </div>
                
                <div className="overallplanningloadcontainer">
                    <img src={load} width="300px" alt="load"/>
                    <Button variant="dark" size="lg">
                        Load Existing Planing
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default Overallplanningoverview;