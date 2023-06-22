import "./home.css"
import Generalplanninghome from "./Generalplanninghome";
import Specificplanninghome from "./Specificplanninghome";

const Home = () => {
    return(
        <div className="homecontainer">
            <h1>Welcome to the Free-D-T-P App</h1>
            <div className="planningcontainer">
                <Generalplanninghome/>

                <Specificplanninghome/>
            </div>
            
        </div>
    )
}

export default Home;