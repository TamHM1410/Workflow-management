import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';


const Private = () => {
    const [cookies, setCookie] = useCookies(['userInfo']);

    const auth = cookies.userInfo?.isLogIn



    return (<>
        {auth === true ? <Outlet /> : <Navigate to='/login' />}



    </>)

}
export default Private