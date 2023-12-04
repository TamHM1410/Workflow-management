import { getAllUser } from "../../service/UserService"
import { useState, useEffect } from 'react'
import EditUerModal from "./EditModal"
import { useDispatch } from 'react-redux'
import { editState } from "../../redux/feature/editSlice"
import DeleteUerModal from "./DeleteUserModal"

// import { useCookies } from 'react-cookie';
interface api {
    Email: string,
    Name: string,
    Role: number

}
const EditUser = () => {
    const dispatch = useDispatch()
    const [listUser, setLisUser] = useState<api[]>()
    const [isShowEdit, setEditModal] = useState<boolean>(false)
    const [isShowDelete, setEditDelete] = useState<boolean>(false)
    // const cookies = useCookies(['userInfo'])
    // const cookiesClone = cookies[0]
    const getUser = async () => {
        const res = await getAllUser()
        setLisUser(res.data)
    }
    const handleEditUser = async (value: api) => {

        dispatch(editState(value))



        setEditModal(true)

    }
    const handleDeleteUser = async (value: api) => {
        dispatch(editState(value))
        setEditDelete(true)

    }


    useEffect(() => {
        getUser()

    }, [])
    return (<>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Kenia&display=swap');
        </style>

        <div style={{ justifyContent: 'center', display: 'flex', fontFamily: 'Kenia, sans-serif' }}><h1>User List</h1></div>

        <table className="table table-warning table-striped" style={{ marginTop: '5%', marginBottom: '5%' }}>
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody>
                {listUser && listUser.map((item, index) => {
                    return (
                        <>
                            <tr key={index}>

                                <td>{item.Email}</td>
                                <td>{item.Name}</td>
                                <td>{item.Role}</td>
                                <td style={{ width: '20%' }}><button type="button" className="btn btn-success" onClick={() => handleEditUser(item)}>Edit </button>
                                    <button type="button" className="btn btn-danger" style={{ marginLeft: '5px' }} disabled={item.Role === 1 ? true : false} onClick={() => handleDeleteUser(item)}>Delete </button></td>


                            </tr>
                        </>
                    )
                })}



            </tbody>
        </table>
        <EditUerModal isShowEdit={isShowEdit} setEditModal={setEditModal} getUser={getUser} />
        <DeleteUerModal isShowDelete={isShowDelete} setEditDelete={setEditDelete} getUser={getUser} />

    </>)

}
export default EditUser