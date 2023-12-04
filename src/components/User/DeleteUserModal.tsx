import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import { DeleteUser } from "../../service/UserService";


interface props {
    isShowDelete: boolean
    setEditDelete: (value: boolean) => void
    getUser: () => void


}

const DeleteUerModal = (props: props) => {
    const { isShowDelete, setEditDelete, getUser } = props
    const editUser = useSelector((state: { editReducer: { Email: string } }) => state.editReducer)
    const [inputEmail, setInputEmail] = useState<string>('')
    const handleDelete = async () => {
        await DeleteUser(inputEmail)
        await getUser()
        setEditDelete(false)
    }
    const handleClose = () => {
        setEditDelete(false)
    }


    useEffect(() => {
        setInputEmail(editUser.Email)


    }, [editUser])


    return (<>


        <Modal show={isShowDelete} >
            <div  >
                <div style={{ border: '1px solid black', padding: '75px', display: 'flex', justifyContent: 'center' }}>

                    <form  >
                        <h4>Delete User</h4>
                        <div> Email :
                            <div>        <input placeholder="Email" value={inputEmail} /></div>


                        </div>
                        <div style={{ justifyContent: 'space-between', display: 'flex' }} className="mt-2">
                            <Button type="button" variant="dark" onClick={handleClose}>Close</Button>
                            <Button type="button" variant="danger" onClick={handleDelete}>Confirm</Button>
                        </div>



                    </form>


                </div>

            </div>

        </Modal>

    </>)

}
export default DeleteUerModal