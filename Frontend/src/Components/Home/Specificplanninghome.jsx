import "./specificplanninghome.css"
import ListGroup from 'react-bootstrap/ListGroup';

const Specificplanninghome = () => {
    return(
        <div className="specifichomecontainer">
            <h2>Latest Specific Plannings</h2>
            <ListGroup className="listgroupcontainer" defaultActiveKey="#link4">
                <ListGroup.Item action href="#link1">
                    Link 1
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                    Link 2
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                    Link 3
                </ListGroup.Item>
            </ListGroup>

        </div>
    )
}

export default Specificplanninghome;