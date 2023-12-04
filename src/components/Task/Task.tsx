import Table from 'react-bootstrap/Table';
import { getAllTask } from '../../service/UserService';
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import AddNewTask from './AddNewTaskModal';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editTaskState } from '../../redux/feature/editTaskSlice';
import EditModal from './EditModal';
import ConfirmModal from './DeleteModal';
import EditDetail from './EditDetail';
import CustomDropdown from './FilterTask';
import { getAllProject } from '../../service/UserService';
import './style.css'


interface api {
    Id: number,
    UserMail: string,
    ProjectId: number,
    TimeStart: string,
    TimeEnd: string,
    Status: number,
    Note: string,
    UserName: string,
    ProjectName: string,
    prjStart: string,
    prjEnd: string
}
const Task = () => {
    const dispatch = useDispatch()
    const [listTask, setListTask] = useState<api[] | undefined>()
    const [listProject, setListProject] = useState<api[] | undefined>()
    const [cloneList, setCloneList] = useState<api[] | undefined>()

    const cookies = useCookies(['userInfo'])
    const cookiesClone = cookies[0]
    const [addNew, setAddNew] = useState<boolean>(false)
    const [detail, setDetail] = useState<boolean>(false)
    const [showDelete, setShowDelete] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const getData = async () => {
        const res = await getAllTask()

        if (cookiesClone.userInfo?.role === 1) {
            const list = res.data.sort((a: api, b: api) => b.Id - a.Id)
            setCloneList(list)

            setListTask(list)
            const response = await getAllProject()
            setListProject(response.data)

        } if (cookiesClone.userInfo?.role === 0) {
            const test = res.data.filter((item: api) => cookiesClone.userInfo.email === item.UserMail)
            const list = test.sort((a: api, b: api) => b.Id - a.Id)

            setListTask(list)

        }

    }
    const handleEdit = (value: api) => {
        const data: { Id: number, UserEmail: string, ProjectId: number, TimeStart: string, TimeEnd: string, Note: string, Status: number } = {
            Id: value.Id,
            UserEmail: value.UserMail,
            ProjectId: value.ProjectId,
            TimeStart: value.TimeStart,
            TimeEnd: value.TimeEnd,
            Note: value.Note,
            Status: value.Status
        }
        dispatch(editTaskState(data))
        setShowEdit(true)


    }
    const handleDelete = (value: api) => {
        const data: { Id: number, UserEmail: string, ProjectId: number, TimeStart: string, TimeEnd: string, Note: string, Status: number } = {
            Id: value.Id,
            UserEmail: value.UserMail,
            ProjectId: value.ProjectId,
            TimeStart: value.TimeStart,
            TimeEnd: value.TimeEnd,
            Note: value.Note,
            Status: value.Status

        }
        dispatch(editTaskState(data))
        setShowDelete(true)


    }
    const handleDetail = (value: api) => {
        const data: { Id: number, UserEmail: string, ProjectId: number, TimeStart: string, TimeEnd: string, Note: string, Status: number } = {
            Id: value.Id,
            UserEmail: value.UserMail,
            ProjectId: value.ProjectId,
            TimeStart: value.TimeStart,
            TimeEnd: value.TimeEnd,
            Note: value.Note,
            Status: value.Status

        }
        dispatch(editTaskState(data))
        setDetail(true)

    }



    useEffect(() => {
        getData()
    }, [showEdit, setAddNew, detail])


    return (
        <>

            <div>
                {cookiesClone.userInfo?.role === 1 ? <CustomDropdown listTask={listTask} setListTask={setListTask} cloneList={cloneList} /> : <div></div>}


            </div>
            <div hidden={cookiesClone.userInfo?.role === 1 ? false : true} style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}><button style={{ backgroundColor: 'yellow ', borderRadius: '10px' }} onClick={() => setAddNew(true)}  >Add new task</button> </div>



            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>User Email</th>
                        <th className='node1'>Project id</th>
                        <th className='node'>Time start</th>
                        <th className='node'>Time end</th>
                        <th>Status</th>
                        <th className='node'>Note</th>
                        <th className='node'>Project Name</th>
                        <th className='node'>Prj time start</th>
                        <th className='node'>Prj time end</th>


                        {cookiesClone.userInfo?.role === 1 ? (<>       <th>action </th>
                        </>) : (<>  <th>action </th></>)}
                    </tr>
                </thead>
                <tbody>
                    {listTask && listTask.length > 0 && listTask.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>

                                    <td>{item.UserMail}</td>
                                    <td className='node1'>{item.ProjectId}</td>
                                    <td className='node'>{item.TimeStart}</td>
                                    <td className='node'>{item.TimeEnd}</td>
                                    <td>{item.Status}</td>
                                    <td className='node'>{item.Note}</td>
                                    <td className='node'>{item.ProjectName}</td>
                                    <td className='node'>{item.prjStart}</td>
                                    <td className='node'>{item.prjEnd}</td>

                                    {cookiesClone.userInfo?.role === 1 ? (<>       <td><Button variant='success' onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button variant='danger ' className='mx-1' onClick={() => handleDelete(item)}>Delete</Button>
                                    </td>
                                    </>) : (<><td><Button onClick={() => handleDetail(item)}>Detail</Button></td></>)}


                                </tr></>



                        )
                    })}
                </tbody>

            </Table>
            <AddNewTask addNew={addNew} setAddNew={setAddNew} getData={getData} listTask={listTask} listProject={listProject} />
            <EditModal showEdit={showEdit} setShowEdit={setShowEdit} getData={getData} listTask={listTask} listProject={listProject} />
            <ConfirmModal showDelete={showDelete} setShowDelete={setShowDelete} getData={getData} />
            <EditDetail detail={detail} setDetail={setDetail} getData={getData} listTask={listTask} />
        </>
    )
}
export default Task