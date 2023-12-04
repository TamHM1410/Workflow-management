
import { Modal, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { deleteTask } from "../../service/UserService"
import { toast } from "react-toastify";

interface props {
    setShowDelete: (value: boolean) => void
    showDelete: boolean
    getData: () => void,

}

const ConfirmModal = (props: props) => {
    const data = useSelector((state: { Id: number }) => state.editTaskReducer)
    const { showDelete, setShowDelete, getData } = props
    const handleDeleteTask = async () => {
        await deleteTask(data.Id)
        setShowDelete(false)
        toast.success('delete success!')
        getData()

    }
    return (<>
        <Modal show={showDelete}>
            <Modal.Header>
                Confirm Delete
            </Modal.Header>
            <Modal.Body>
                <p> Are you want to delete this task !</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDeleteTask}>
                    Yes
                </Button>
                <Button onClick={() => setShowDelete(false)}>
                    Cancle
                </Button>

            </Modal.Footer>


        </Modal>
    </>)

}
export default ConfirmModal