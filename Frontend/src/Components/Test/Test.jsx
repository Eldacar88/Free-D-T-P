import "./test.css"
import create from './img/overallplanning_create.jpg';
import load from './img/overallplanning_load.jpg';

const Test = () => {
    return (
        <div className="container">
                <img src={create} width="300px" alt="create"/>

                <img src={load} alt="load" width="300px"/>
        </div>
    )
}

export default Test;