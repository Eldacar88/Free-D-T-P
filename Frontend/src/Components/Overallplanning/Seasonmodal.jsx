import "./seasonmodal.css"
import React, {useContext, useState, useRef} from 'react';
import GlobalContext from "../../Context/GlobalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { uuid4 } from "uuid4";

  const weeksInMs = 604800000;

    const Seasonmodal = () => {
    const formRef = useRef();

    const {
        setShowSeasonModal,
        endDateSeasonMilliSeconds,
        setEndDateSeasonMilliSeconds,
        startDateSeasonMilliSeconds,
        setStartDateSeasonMilliSeconds,
        numberOfSessions,
        setNumberOfSessions,
        lastTrainingDayMilliSeconds,
        setLastTrainingDayMilliSeconds,
        durationLastTrainingSession, 
        setDurationLastTrainingSession,
        selectedSeason,
        setSelectedSeason
      } = useContext(GlobalContext);

    
    const [titleSeason, setTitleSeason] = useState(selectedSeason ? selectedSeason.titleSeason : "");
    const [endDateSeason, setEndDateSeason] = useState(selectedSeason ? selectedSeason.endDateSeason : "");
    const [startDateSeason, setStartDateSeason] = useState(selectedSeason ? selectedSeason.startDateSeason : "");
    const [durationSession, setDurationSession] = useState(selectedSeason ? selectedSeason.durationSession : "");
    const [lastTrainingDay, setLastTrainingDay] = useState(selectedSeason ? selectedSeason.lastTrainingDay : "");

    //wichtig für DB
      async function handleSubmit(e) {
        e.preventDefault();
        /*console.log("Titel: " + titleSeason);
        console.log("Final Contest: " + endDateSeason);
        console.log("Startdate: " + startDateSeason);
        console.log("Last Trainingday: " + lastTrainingDay);
        console.log("Duration Session: " + durationSession); // noch in Ms umwandeln
        console.log("Label:" + selectedLabel);*/

        setDurationSession(durationSession*weeksInMs);

        const dateEnd = new Date(endDateSeason).getTime();
        //console.log(dateEnd);
        setEndDateSeasonMilliSeconds(dateEnd);
        //console.log(endDateSeasonMilliSeconds);
        
        const dateEndTraining = new Date(lastTrainingDay).getTime();
        //console.log(dateEndTraining);
        setLastTrainingDayMilliSeconds(dateEndTraining);
        //console.log(lastTrainingDayMilliSeconds);

        const dateStart = new Date(startDateSeason).getTime();
        //console.log(dateStart);
        setStartDateSeasonMilliSeconds(dateStart);
        //console.log(startDateSeasonMilliSeconds);

        const differenceInMilliseconds = dateEndTraining - dateStart;
        setNumberOfSessions((differenceInMilliseconds / (1000 * 60 * 60 * 24)/(7*durationSession)));
        //console.log("Number of Sessions: " + numberOfSessions);


        if(numberOfSessions % 1 != 0){
            setDurationLastTrainingSession((Math.round((numberOfSessions % 1)*durationSession))*weeksInMs);//noch in Ms umwandeln
        }else {
            setDurationLastTrainingSession(durationSession*weeksInMs); //noch in Ms umwandeln
        }
        //console.log("Duration last Session: " + durationLastTrainingSession);

        const numberOfSeasons = 0;

        try {
            const response = await axios.get('http://localhost:3002/getNumberOfSeasons');
            console.log(response.data.count);
            numberOfSeasons = response.data.count + 1;
            console.log(numberOfSeasons);
        }
        catch(error) {
            console.error(error);
        }

        const formData = {
            id: uuid4(),
            numberofSeason: numberOfSeasons,
            title: titleSeason,
            finalContestDate: endDateSeasonMilliSeconds,
            finalTrainingDate:lastTrainingDayMilliSeconds,
            startDate: startDateSeasonMilliSeconds,
            durationSession: durationSession,
            numberOfSessions: numberOfSessions,
            durationLastSession: durationLastTrainingSession
        }
        console.log(formData);
        const config = {
            url: "http://localhost:3002/postSeason",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formData)
        }
        try{
            const response = await axios(config);
            console.log(response);

            if(response.status !== 201){
                throw new Error('failed to register');
            }
        }
            catch(error){
                if(error.response.status === 429) {
                
                console.log(error.response.data);
            } else {
                
                console.log(error);
            }
        }
        
        setShowSeasonModal(false);
        //setShowSessionModal(true);
      }
      
      return(
        <div className="seasonmodal_overlaycontainer">
            <form className="seasonmodal_formcontainer">
                <header className="seasonmodal_formheader">
                    <span className="seasonmodal_spanicon">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <div className='seasonmodal_spanicon_container'>
                    
                    <button>
                        <span className="seasonmodal_spanicon" onClick={() => setShowSeasonModal(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                    </button>
                    </div>
                </header>

                <div className="seasonmodal_middle" ref={formRef}>
                    <div className="seasonmodal_middlegrid">
                        <div></div>
                        <input className="seasonmodal_input"
                         type="text"
                         name="title" 
                         placeholder="Add Title" 
                         value={titleSeason} 
                         required 
                         onChange={(e) => setTitleSeason(e.target.value)}/>
                        
                        <div className='seasonmodal_datacontainer'>
                            <span className="seasonmodal_spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            Date of Final Contest:
                            <br/>
                            <input className="seasonmodal_input"
                            type="date"
                            name="finalContestDate" 
                            value={endDateSeason} 
                            required 
                            onChange={(e) => setEndDateSeason(e.target.value)}/>
                        </div>
                        

                        <div className='seasonmodal_datacontainer'>
                            <span className="seasonmodal_spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Start of Season:
                            <br/>

                            <input className="seasonmodal_input"
                            type="date"
                            name="startDate" 
                            value={startDateSeason} 
                            required 
                            onChange={(e) => setStartDateSeason(e.target.value)}/>
                        </div>

                        <div className='seasonmodal_datacontainer'>
                            <span className="seasonmodal_spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Last Day of Training:
                            <br/>

                            <input className="seasonmodal_input"
                            type="date"
                            name="lastTrainingDate" 
                            value={lastTrainingDay} 
                            required 
                            onChange={(e) => setLastTrainingDay(e.target.value)}/>
                        </div>

                        <div className='seasonmodal_datacontainer'>
                            <span className="seasonmodal_spanicon" onClick={() => setShowSeasonModal(false)}>
                                <FontAwesomeIcon icon={faClock} />
                            </span>

                            Duration of each session in weeks:
                            <br/>

                            <input className="seasonmodal_input"
                            type="number"
                            min="1"
                            max="6"
                            name="durationSession" 
                            value={durationSession} 
                            required 
                            onChange={(e) => setDurationSession(e.target.value)}/>
                        </div>
                                        
                    </div>
                </div>

                <footer className="seasonmodal_footercontainer">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="seasonmodal_footerbutton">
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default Seasonmodal;