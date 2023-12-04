import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { addNewProject } from "../../service/UserService";
import { toast } from "react-toastify";

interface props {
    isShowModalAdd: boolean,
    setIsShowModalAdd: (value: boolean) => void
    getProject: () => void


}


const AddProjectModal = (props: props) => {
    const note: string = 'N/a'

    const { isShowModalAdd, setIsShowModalAdd, getProject } = props
    const [inputName, setInputName] = useState<string>('')
    const [inputPayment, setInputPayment] = useState<number>(0)
    const [inputNote, setInputNote] = useState<string>('')
    const [selectedPriority, setselectedPriority] = useState<number>(0)
    const [timeStart, setTimeStart] = useState<string>('')
    const [timeEnd, setTimeEnd] = useState<string>('')
    const currentDate = new Date().toISOString().split('T')[0];
    const [min, setMin] = useState<string>('')

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const number = parseInt(event.target.value)
        setselectedPriority(number);
    };
    const handleInputPayment = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputPayment(parseInt(event.target.value))

    };



    const handleAddNewProject = async () => {


        if (inputNote === '') {

            await addNewProject(inputName, Math.abs(inputPayment), note, selectedPriority, timeStart, timeEnd)


        } else {
            await addNewProject(inputName, Math.abs(inputPayment), inputNote, selectedPriority, timeStart, timeEnd)
        }

        setIsShowModalAdd(false)
        setInputName('')
        setInputPayment(0)
        setInputNote('')
        setselectedPriority(0)
        toast.success('success!')
        await getProject()


    }
    const handleClose = () => {
        setIsShowModalAdd(false)
    }
    const handleTimeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeStart(event.target.value)
        const time: Date = new Date(event.target.value)
        const dateObject: string = new Date(time.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        setMin(dateObject)



    }


    return (<>
        <Modal
            show={isShowModalAdd}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
                <Modal.Title id="contained-modal-title-vcenter" >
                    <h3>Add New Project</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Container style={{ justifyContent: 'center' }}>
                    <Row>
                        <Col ></Col>
                        <Col >

                            <div className="form-check mb-3">
                                <div>
                                    Name:
                                </div>
                                <input placeholder="input name project" style={{ borderRadius: '4px', width: '400px' }} onChange={(e) => setInputName(e.target.value)} required />
                                {inputName === '' ? <h6 style={{ color: 'red' }}>Please fill out this field.</h6> : <div></div>}
                            </div>
                            <div className="form-check mb-3">
                                <div>
                                    Payment:
                                </div>
                                <input placeholder="input name PayMent" style={{ borderRadius: '4px', width: '400px' }} onChange={handleInputPayment} type="number" max={100000} />
                                {inputPayment === 0 ? <h6 style={{ color: 'red' }}>Please enter Payment.</h6> : <div></div>}
                            </div>
                            <div className="form-check mb-3">
                                <div>
                                    Note:
                                </div>
                                <input placeholder="input name Note" style={{ borderRadius: '4px', width: '400px' }} onChange={(e) => setInputNote(e.target.value)} />

                            </div>
                            <div className="form-check mb-3">
                                <div>
                                    Time Start:
                                </div>
                                <input placeholder="input time start" style={{ borderRadius: '4px', width: '400px' }} type='date' min={currentDate} onChange={(e) => handleTimeStart(e)} />
                                {timeStart === '' ? <h6 style={{ color: 'red' }}>Please! choose time start.</h6> : <div></div>}
                            </div>
                            <div className="form-check mb-3">
                                <div>
                                    Time End:
                                </div>
                                <input placeholder="input time end" style={{ borderRadius: '4px', width: '400px' }} type='date' min={min} onChange={(e) => setTimeEnd(e.target.value)} disabled={timeStart === '' ? true : false} />
                                {timeEnd === '' ? <h6 style={{ color: 'red' }}>Please! choose time end.</h6> : <div></div>}
                            </div>
                            <div className="form-check mb-3">
                                <div>
                                    Priority:
                                </div>
                                <Form.Select aria-label="Default select example" value={selectedPriority} onChange={handleSelectChange} >
                                    <option value="">Open this select menu</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </Form.Select>

                            </div>

                        </Col>
                        <Col ></Col>
                    </Row>
                </Container>



            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleAddNewProject} disabled={inputName && inputPayment && timeStart && timeEnd ? false : true}>ADD</Button>
                <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>


    </>)
}
export default AddProjectModal