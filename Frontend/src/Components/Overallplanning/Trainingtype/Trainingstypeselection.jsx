import "./trainingtypeselection.css"
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';

const Trainingtypeselection = ({setShowSessionModal, key, iteration, sessionType, setSessionType, onFormSubmit}) => {

    const setTrainingType = (event) => {
        const newSelectedType = event.target.value;
        setSessionType(newSelectedType);
        onFormSubmit(newSelectedType);
    };

    return(
        <div className='trainingtype_selection_container'>
            <span className="trainingtype_spanicon" onClick={() => setShowSessionModal(false)}>
                <FontAwesomeIcon icon={faBars} />
            </span>

            {iteration}.Session
            <br/>

            <Form.Select aria-label="Default select example" name="session" value={sessionType} onChange={setTrainingType}>
                <option>Select Trainingtype</option>
                <option value="Wettkampf">Statik</option>
                <option value="Geschwindigkeit">Geschwindigkeit</option>
                <option value="Technik">Technik</option>
                <option value="Kraft">Kraft</option>
                <option value="Ausdauer">Ausdauer</option>
                <option value="Kraftausdauer">Kraftausdauer</option>
            </Form.Select>
        </div>
    )
}

export default Trainingtypeselection;