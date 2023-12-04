import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"

import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { deleteProject } from "../../service/UserService";
interface props {
    isShowDelete: boolean
    setIsShowDelete: (value: boolean) => void
    getProject: () => void
}
const DeleteProjectModal = (props: props) => {
    const { isShowDelete, setIsShowDelete, getProject } = props
    const data = useSelector((state: { editProjectReducer: { Id: number } }) => state.editProjectReducer);
    const handleDelete = async () => {
        await deleteProject(data.Id)
        toast.success('success')
        setIsShowDelete(false)
        getProject()
    }

    return (<>
        <Modal show={isShowDelete}>
            <Modal.Header><h3>Delete Project</h3> </Modal.Header>
            <Modal.Body><p>This action couldn't undone</p></Modal.Body>
            <Modal.Footer><Button onClick={() => setIsShowDelete(false)}>Close</Button>
                <Button variant='danger ' onClick={handleDelete}>Confirm</Button>
            </Modal.Footer>
        </Modal>

    </>)

}
export default DeleteProjectModal