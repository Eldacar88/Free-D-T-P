import "./trainingtypeselection.css"
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faXmark, faBarsStaggered, faBookmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';

const Trainingtypeselection = ({session, setSession, setShowSessionModal}) => {
    return(
        <div className='datecontainer'>
                            <span className="spanicon" onClick={() => setShowSessionModal(false)}>
                                <FontAwesomeIcon icon={faBars} />
                            </span>

                            1.Session:
                            <br/>

                            <Form.Select aria-label="Default select example" name="session1" value={session}>
                                <option>Select Trainingtype</option>
                                <option value="Wettkampf">Statik</option>
                                <option value="Geschwindigkeit">Geschwindigkeit</option>
                                <option value="Technik">Technik</option>
                                <option value="Kraft">Kraft</option>
                                <option value="Ausdauer">Ausdauer</option>
                                <option value="Kraftausdauer">Ausdauer</option>
                            </Form.Select>
        </div>
    )

}

export default Trainingtypeselection;