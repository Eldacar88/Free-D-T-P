import "./generalplanninghome.css"
import ListGroup from 'react-bootstrap/ListGroup';

const Generalplanninghome = () => {
    return(
        <div className="generalhomecontainer">
            <h2>Latest General Plannings</h2>
            <ListGroup id="listgroupcontainer" defaultActiveKey="#link4">
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

export default Generalplanninghome;