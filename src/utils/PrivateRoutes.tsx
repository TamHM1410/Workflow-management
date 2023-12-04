import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';


const PrivateRoutes = () => {
    const [cookies, setCookie] = useCookies(['userInfo']);

    const auth = cookies.userInfo.isLogIn
    const role = cookies.userInfo.role




    return (<>
        {auth === true && role === 1 ? <Outlet /> : <Navigate to='/home' />}



    </>)

}
export default PrivateRoutes