import { Outlet, Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
const PrivateChildDashBoard = () => {
    const [cookies, setCookie] = useCookies(['checked']);
    const checked = cookies.checked.checked


    return (<>
        {checked === true ? <Outlet /> : <Navigate to='/dashboard' />}

    </>)

}
export default PrivateChildDashBoard