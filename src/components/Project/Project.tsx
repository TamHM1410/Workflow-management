
import { getAllProject } from "../../service/UserService"
import { useState, useEffect } from 'react'
import AddProjectModal from "./AddProject"
import ReactPaginate from 'react-paginate';
import './style.css'
import { Button } from "react-bootstrap";
import ProjectEditModal from "./ProjectEditModal";
import { useDispatch } from "react-redux";
import { editProjectState } from "../../redux/feature/editProjectSlice";
import DeleteProjectModal from "./DeleteProjectModal";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import { getProjectByUser } from "../../service/UserService";
import FilterProject from "./FilterProject";

import { debounce } from "lodash";
import { cloneDeep } from "lodash";
import { faSearch, faAddressBook, faCloudDownload } from '@fortawesome/free-solid-svg-icons';


interface api {
    Id: number,
    Name: string,
    Payment: number,
    TimeStart: string,
    TimeEnd: string,
    Note: string,
    Priority: number
}

const Project = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0);
    const [editProject, setEditProject] = useState(false)
    const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

    const [listProject, setListProject] = useState<api[]>()
    const [cloneList, setCloneList] = useState<api[] | undefined>()
    const [listCsv, setListCSV] = useState<api[]>([])
    const cookies = useCookies(['userInfo'])
    const cookiesClone = cookies[0]

    //////pagination


    const itemPerPage = 5
    const pageCount = listProject ? Math.ceil(listProject.length / itemPerPage) : 0;
    const startIndex = currentPage * itemPerPage
    const endIndex = (currentPage + 1) * itemPerPage - 1;


    //////////
    const [isShowModalAdd, setIsShowModalAdd] = useState<boolean>(false)
    const getProject = async () => {
        const role = cookiesClone.userInfo?.role
        const email = cookiesClone.userInfo?.email
        if (role === 1) {
            const res = await getAllProject();

            if (res && res.data) {
                const clone = res.data.sort((a: api, b: api) => b.Id - a.Id);
                const newData: api[] = res.data

                setListCSV(newData)
                setListProject(clone);
                setCloneList(clone)

            }

        } if (role === 0) {
            const res = await getProjectByUser(email)
            if (res && res.data) {
                const clone = res.data.sort((a: api, b: api) => b.Id - a.Id);



                setListProject(clone);

            }


        }

    };
    const handleAdd = () => {
        setIsShowModalAdd(true)
    }
    const handlePageChange = (selectedPage: {
        selected: number;
    }): void => {

        setCurrentPage(selectedPage.selected);
    };
    const handleEditProject = (value: api): void => {
        dispatch(editProjectState(value))
        setEditProject(true)
    }
    const handleDeleteModal = (value: api) => {
        dispatch(editProjectState(value))
        setIsShowDelete(true)
    }
    const handleSearch = debounce((event) => {
        const term = event.target.value;
        if (term) {

            let cloneListProject = cloneDeep(listProject);
            cloneListProject = cloneListProject?.filter((item: api) => item.Name.includes(term));

            setListProject(cloneListProject)
        } else {
            getProject()

        }
    }, 1000);



    useEffect(() => {
        getProject()

    }, [])


    return (<>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Kenia&display=swap');
        </style>

        <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Kenia, sans-serif' }}><h1>Project    </h1></div >

        <div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input placeholder="search by name" style={{ borderRadius: '4px', width: '25%' }} onChange={(event) => handleSearch(event)} />
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', fontSize: '1rem' }} />
                </div>


            </div>



            {cookiesClone.userInfo?.role === 1 ? <><div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px', marginRight: '10px' }}>
                <span style={{ justifyContent: 'start', display: 'flex', marginRight: '10px' }}><FilterProject setListProject={setListProject} cloneList={cloneList} /></span>
                <button type="button" className="btn btn-primary" onClick={handleAdd} style={{ marginRight: '5px', width: '10%' }}>AddNew

                </button>
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faAddressBook} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px', fontSize: '1rem' }} />
                </div>
                <CSVLink data={listCsv} filename="mydata.csv" className="btn btn-success" style={{ marginLeft: '5px', paddingRight: '30px' }}>
                    Download CSV
                </CSVLink>
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faCloudDownload} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', right: '5px' }} />
                </div>
            </div ></> : <>
            </>}



        </div>

        <table className="table table-dark table-striped " style={{ marginTop: '2rem', overflowX: 'scroll' }}>
            <thead  >
                <tr className="node">
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Payment</th>
                    <th scope="col" className="node">TimeStart</th>
                    <th scope="col" className="node">TimeEnd</th>
                    <th scope="col" className="node">Note</th>
                    <th scope="col" className="node">PRiority</th>
                    {cookiesClone.userInfo?.role === 1 ? <><th scope="col">Action</th></> : <></>}
                </tr>
            </thead>
            <tbody >
                {listProject && listProject?.slice(startIndex, endIndex).map((item: api, index: number) => {
                    return (<>
                        <tr key={item.Id}    >
                            <td style={{ width: '10px' }}>{index + 1}</td>
                            <td>{item.Name}</td>
                            <td>{item.Payment}</td>
                            <td className="node">{item.TimeStart}</td>
                            <td className="node">{item.TimeEnd}</td>
                            <td className="node">{item.Note}</td>
                            <td className="node">{item.Priority}</td>
                            {cookiesClone.userInfo?.role === 1 ? <><td><Button variant="danger" onClick={() => handleDeleteModal(item)}>Delete </Button>
                                <Button variant="warning" style={{ marginLeft: '5px' }} onClick={() => handleEditProject(item)}>Edit  <div style={{ position: 'relative' }}>

                                </div></Button>
                            </td></> : <></>}
                        </tr>

                    </>)
                })}


            </tbody>
        </table>
        <AddProjectModal isShowModalAdd={isShowModalAdd} setIsShowModalAdd={setIsShowModalAdd} getProject={getProject} />
        <ReactPaginate previousLabel={'Previous'}
            nextLabel={'Next'} marginPagesDisplayed={2}
            pageRangeDisplayed={3} containerClassName={'pagination'}
            activeClassName={'active'} onPageChange={handlePageChange} pageCount={pageCount} />
        <ProjectEditModal setEditProject={setEditProject} editProject={editProject} getProject={getProject} />
        <DeleteProjectModal isShowDelete={isShowDelete} setIsShowDelete={setIsShowDelete} getProject={getProject} />



    </>)

}
export default Project