import Dropdown from "react-bootstrap/Dropdown"
import { useState } from 'react'

interface api {
    Id: number,
    Name: string,
    Payment: number,
    TimeStart: string,
    TimeEnd: string,
    Note: string,
    Priority: number
}
interface props {

    setListProject: (value: api[] | undefined) => void
    cloneList: api[] | undefined,


}

const FilterProject = (props: props) => {

    const [status, setStatus] = useState(false)
    const { setListProject, cloneList } = props
    const handleTheNextSevenDays = () => {
        const today = new Date()
        const theNextSevenDay = new Date();
        theNextSevenDay.setDate(theNextSevenDay.getDate() + 7);

        const data: api[] | undefined = cloneList?.filter((item) => today.getTime() <= Date.parse(item.TimeStart) && Date.parse(item.TimeStart) <= theNextSevenDay.getTime())
        setListProject(data)





    }
    const handleGetAll = () => {
        setListProject(cloneList)

    }


    const handleFirst = () => {


        const data = cloneList?.filter((item) => item.Priority === 0)
        setListProject(data)
        if (status === false) {
            setStatus(true)
        } else {
            setStatus(false)

        }


    }

    const handleSecond = () => {

        const data = cloneList?.filter((item) => item.Priority === 1)
        setListProject(data)

    }
    const handleThird = () => {

        const data = cloneList?.filter((item) => item.Priority === 2)
        setListProject(data)


    }
    const handleProcessingProject = () => {
        const today = new Date()
        const data = cloneList?.filter((item) => today.getTime() <= Date.parse(item.TimeEnd))
        setListProject(data)
    }




    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    Filter
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleGetAll}>All Project</Dropdown.Item>
                    <Dropdown.Item onClick={handleProcessingProject}>Processing Project</Dropdown.Item>
                    <Dropdown.Item onClick={handleTheNextSevenDays}>Project will be release the next 7days</Dropdown.Item>
                    <Dropdown>    <Dropdown.Toggle >Priority</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleFirst}>0</Dropdown.Item>
                            <Dropdown.Item onClick={handleSecond}>1</Dropdown.Item>
                            <Dropdown.Item onClick={handleThird}>2</Dropdown.Item>
                        </Dropdown.Menu>


                    </Dropdown>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )

}
export default FilterProject