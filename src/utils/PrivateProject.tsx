import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';


const PrivateProject = () => {
    const [cookies, setCookie] = useCookies(['userInfo']);

    const auth = cookies.userInfo.isLogIn
    const clone = cookies.userInfo.role



    return (<>
        {auth === true && clone === 1 ? <Outlet /> : <Navigate to='/home' />}



    </>)

}
export default PrivateProject