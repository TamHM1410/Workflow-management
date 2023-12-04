import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../service/UserService";
import { toast } from "react-toastify";


interface props {
    isShowEdit: boolean
    setEditModal: (value: boolean) => void
    getUser: () => void

}

const EditUerModal = (props: props) => {
    const editUser = useSelector((state: { editReducer: { Email: string, Name: string, Role: number } }) => state.editReducer)



    const { isShowEdit, setEditModal, getUser } = props
    const [inputEmail, setInputEmail] = useState<string>('')
    const [inputPass, setInputPass] = useState<string>('')
    const [seclectedRole, setSeclectedRole] = useState<number>(0)
    const [hide, setHide] = useState<boolean>(false)
    const handleSethide = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (hide === false) {
            setHide(true)
        } else {
            setHide(false)
        }
    }
    const handleCancle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        event.preventDefault();
        setEditModal(false)
    }
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeclectedRole(parseInt(event.target.value))
    }
    const handleUpdateUser = async () => {
        await updateUser(inputEmail, inputPass, seclectedRole)
        console.log('gogo')
        toast.success('go pro', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        setInputEmail('')
        setInputPass('')

        setEditModal(false)
        await getUser()



    }
    useEffect(() => {
        setInputEmail(editUser.Email)
        setInputPass(editUser.Name)
        setSeclectedRole(editUser.Role)

    }, [editUser])


    return (<>


        <Modal show={isShowEdit} >
            <div  >
                <div style={{ border: '1px solid black', padding: '75px', display: 'flex', justifyContent: 'center' }}>

                    <form  >
                        <h4>User Information</h4>
                        <div> Email :
                            <div>        <input placeholder="Email" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} /></div>


                        </div>


                        <div> Pass:
                            <div>        <input type={hide === false ? 'password' : 'text'} placeholder="pass" value={inputPass} onChange={(e) => setInputPass(e.target.value)} /> <button style={{ marginLeft: '-40px' }} onClick={handleSethide} >hide</button></div>


                        </div>
                        <div style={{ marginTop: '5px' }}> Role:
                            <select value={seclectedRole} onChange={handleSelect} ><option value='0'> 0</option>
                                <option value='1'> 1</option> </select>


                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button type="button" className="btn btn-secondary" onClick={handleCancle}> Cancle</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateUser}> Update</button>
                        </div>

                    </form>


                </div>

            </div>

        </Modal>

    </>)

}
export default EditUerModal