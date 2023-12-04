import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import { addTask, getAllProject } from '../../service/UserService';
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from "react-toastify";
import { getAllUser } from '../../service/UserService';
import { useSelector } from 'react-redux';
import { editTask } from '../../service/UserService';


interface api {
    Id: number,
    Email: string,
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

interface props {
    detail: boolean,
    setDetail: (value: boolean) => void
    getData: () => void,
    listTask: api[] | undefined
}
const EditDetail = (props: props) => {

    const { detail, setDetail, getData, listTask } = props

    const data = useSelector((state) => state.editTaskReducer)


    const [inputUserEmail, setUserEmail] = useState<string>('')
    const [note, setNote] = useState<string>(0)
    const [userName, setUserName] = useState<string>('')
    const [projectName, setProjectName] = useState<string>('')


    const [prjId, setPrjId] = useState<number>(data.ProjectId)
    const [status, setStatus] = useState<number>(0)
    const [timeStart, setTimeStart] = useState<string>('')
    const [timeEnd, setTimeEnd] = useState<string>('')
    const [prjStart, setPrjStart] = useState<string>('')
    const [prjEnd, setPrjEnd] = useState<string>('')
    const [invalid, setInvalid] = useState<boolean>(false)
    const [invalidId, setInvalidId] = useState<boolean>(false)
    const [min, setMin] = useState<string>('')


    const currentDate = new Date().toISOString().split('T')[0];

    const [array, setArr] = useState()
    const uniqueNumbers: array = [];





    const handleUpdate = async () => {
        const res = await getAllUser()
        const res1 = await getAllProject()


        const clone: api = res1.data.filter((item: api) => item.Id === prjId)
        const test = clone.map((item: api) => item.Id)




        let flag = false
        await res.data.map((item: api) => {
            if (item.Email === inputUserEmail && test[0] === prjId
            ) {




                toast.success('success')



                flag = true
                setInvalid(false)

                setInvalid(false)
                setInvalidId(false)
                setDetail(false)
                editTask(data.Id, inputUserEmail, prjId, timeStart, timeEnd, status, note)





            }
            else {
                if (!flag) {
                    if (item.ProjectId != test[0] && item.Email != inputUserEmail) {
                        setInvalidId(true)
                        setInvalid(true)

                    }
                    if (prjId != test[0]) {
                        setInvalidId(true)
                        setInvalid(false)


                    }
                    if (item.Email != inputUserEmail) {
                        setInvalid(true)
                        setInvalidId(false)
                    }


                    flag = true; // Mark the error message as shown




                }


            }




        })







    }


    useEffect(() => {
        setUserEmail(data.UserEmail);
        setPrjId(data.ProjectId);
        setTimeStart(data.TimeStart);
        setTimeEnd(data.TimeEnd);
        setNote(data.Note);
        setStatus(data.Status);
        listTask &&
            listTask?.filter((item: { ProjectId: number }) => {
                if (!uniqueNumbers.includes(item.ProjectId)) {
                    uniqueNumbers.push(item.ProjectId);
                }
                return null;
            });

        setArr(uniqueNumbers.sort((a: number, b: number) => a - b));

    }, [data]);









    return (<>
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}

        >
            <Modal show={detail}>
                <Modal.Dialog style={{ width: '100%' }}>
                    <Modal.Header >
                        <Modal.Title>Detail Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div >
                            <input className='form-control' placeholder='User Email' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} value={inputUserEmail} />

                        </div>


                        <div >
                            <select className='form-control' value={prjId}>

                                {Array.isArray(array) && array.length > 0 && array?.map((item) => {
                                    return (
                                        <>
                                            <option>{item}</option>
                                        </>
                                    )
                                })}


                            </select>





                        </div>
                        <div >
                            <input className='form-control' placeholder='Note' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} value={note} />

                        </div>
                        <div >
                            <input className='form-control' placeholder='prj id' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} min={currentDate} value={timeStart} />

                        </div>
                        <div  >
                            <input className='form-control' placeholder='note' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} min={min} value={timeEnd} />

                        </div>
                        <div >
                            <label>Status:</label>

                            <select className='form-control' placeholder='Status' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} value={status} onChange={(e) => setStatus(e.target.value)}><option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option></select>
                        </div>


                    </Modal.Body>


                    <Button variant="secondary" onClick={() => setDetail(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate} >Update</Button>

                </Modal.Dialog>
            </Modal>


        </div >



    </>)
}
export default EditDetail