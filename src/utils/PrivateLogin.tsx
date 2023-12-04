import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';


const PrivateLogin = () => {
    const [cookies, setCookie] = useCookies(['userInfo']);

    const auth = cookies.userInfo?.isLogIn



    return (<>
        {auth === undefined ? <Outlet /> : <Navigate to='/home' />}



    </>)

}
export default PrivateLogin