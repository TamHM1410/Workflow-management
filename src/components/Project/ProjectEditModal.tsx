import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateProject } from "../../service/UserService";
import { toast } from "react-toastify";
interface props {
    editProject: boolean,
    setEditProject: (value: boolean) => void
    getProject: () => void
}
const ProjectEditModal = (props: props) => {
    const { editProject, setEditProject, getProject } = props
    const data = useSelector((state: {
        editProjectReducer: {
            Id: number,
            Name: string,
            Payment: number,
            TimeStart: string,
            TimeEnd: string,
            Note: string,
            Priority: number
        }
    }) => state.editProjectReducer)
    const [selectedPriority, setselectedPriority] = useState<number>(0)
    const [timeStart, setTimeStart] = useState<string>('')
    const [timeEnd, setTimeEnd] = useState<string>('')
    const [Id, setId] = useState<number>(0)
    const [inputName, setInputName] = useState<string>('')
    const [inputPayment, setInputPayment] = useState<number>(0)
    const [inputNote, setInputNote] = useState<string>('')

    const currentDate = new Date().toISOString().split('T')[0];

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const number = parseInt(event.target.value)
        setselectedPriority(number);
    };
    const handleUpdate = async () => {
        await updateProject(Id, inputName, inputPayment, timeStart, timeEnd, inputNote, selectedPriority)
        toast.success('Success')
        setEditProject(false)
        getProject()
    }
    const handleClose = () => {
        setEditProject(false)
    }

    useEffect(() => {
        setTimeStart(data.TimeStart)
        setTimeEnd(data.TimeEnd)
        setInputName(data.Name)
        setInputNote(data.Note)
        setInputPayment(data.Payment)
        setId(data.Id)
    }, [data])
    return (<>
        <Modal show={editProject}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}><h4 >Edit Project</h4></Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setInputName(e.target.value)} value={inputName} />

                </div>
                <div className="mb-3">
                    <label className="form-label">Payment</label>
                    <input className="form-control" id="exampleInputPassword1" onChange={(e) => setInputPayment(parseInt(e.target.value))} value={inputPayment} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Time Start</label>
                    <input className="form-control" id="exampleInputPassword1" type="date" min={currentDate} onChange={(e) => setTimeStart(e.target.value)} value={timeStart} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Time end</label>
                    <input className="form-control" id="exampleInputPassword1" type="date" min={currentDate} onChange={(e) => setTimeEnd(e.target.value)} value={timeEnd} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Note</label>
                    <input className="form-control" id="exampleInputPassword1" onChange={(e) => setInputNote(e.target.value)} value={inputNote} />
                </div>
                <div className="mb-3">
                    <label className="form-label"  >Priority</label>
                    <select className="form-control" onChange={handleSelectChange} value={selectedPriority}>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>


                    </select>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancle</Button>
                <Button variant="success" onClick={handleUpdate}>Update</Button>
            </Modal.Footer>




        </Modal>

    </>)
}
export default ProjectEditModal