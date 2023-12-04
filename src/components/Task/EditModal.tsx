import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react'
import { addTask, getAllProject } from '../../service/UserService';
import React, { useRef } from 'react';
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
    showEdit: boolean,
    setShowEdit: (value: boolean) => void
    getData: () => void,
    listTask: api[] | undefined
    listProject: api[] | undefined
}
const EditModal = (props: props) => {

    const { showEdit, setShowEdit, listProject, listTask } = props

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
    const [checkProjectId, setCheckProjectId] = useState<number>(0)

    const currentDate = new Date().toISOString().split('T')[0];

    const [array, setArr] = useState()
    const uniqueNumbers: array = [];


    const handleTimeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeStart(event.target.value)
        const time: Date = new Date(event.target.value)
        const dateObject: string = new Date(time.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        setMin(dateObject)
    }
    const handleInputPrjId = (e) => {
        setPrjId(parseInt(e.target.value))

    }



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
                setShowEdit(false)
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
        listProject &&
            listProject?.filter((item: { Id: number }) => {
                if (!uniqueNumbers.includes(item.Id)) {
                    uniqueNumbers.push(item.Id);
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
            <Modal show={showEdit}>
                <Modal.Dialog style={{ width: '100%' }}>
                    <Modal.Header >
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div >
                            <input className='form-control' placeholder='User Email' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} onChange={(e) => setUserEmail(e.target.value)} value={inputUserEmail} />
                            {invalid ? <p style={{ color: 'red' }}>Invalid UserEmail!</p> : <div></div>}
                        </div>


                        <div >
                            <select className='form-control' onChange={handleInputPrjId} value={prjId}>

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
                            <input className='form-control' placeholder='Note' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} onChange={(e) => setNote(e.target.value)} value={note} />

                        </div>
                        <div >
                            <input className='form-control' placeholder='prj id' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} onChange={(e) => handleTimeStart(e)} type='date' min={currentDate} value={timeStart} />

                        </div>
                        <div  >
                            <input className='form-control' placeholder='note' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} onChange={(e) => setTimeEnd(e.target.value)} type='date' min={min} value={timeEnd} />

                        </div>
                        <div >
                            <input className='form-control' placeholder='Status' style={{ width: '100%', marginBottom: '10px', display: 'flex', justifyContent: 'center' }} value={data.Status} />

                        </div>


                    </Modal.Body>


                    <Button variant="secondary" onClick={() => setShowEdit(false)}>Close</Button>
                    <Button variant="primary" onClick={handleUpdate} >Update</Button>

                </Modal.Dialog>
            </Modal>


        </div >



    </>)
}
export default EditModal