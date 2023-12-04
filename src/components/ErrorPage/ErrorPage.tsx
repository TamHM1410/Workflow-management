import { Alert } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
const NotFound = () => {
    return (<>
        <>
            {" "}
            <Alert variant="danger">
                <Alert.Heading>Error 404. Page Not Found!</Alert.Heading>

                <p>Please <NavLink to='/task'>click here!</NavLink> to back to home Page</p>
                <hr />
                <p className="mb-0"></p>
            </Alert>
        </></>)

}
export default NotFound