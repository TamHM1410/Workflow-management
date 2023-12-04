import { useCookies } from 'react-cookie';
import UserRoleDashboard from './UserDashBoard/UserDashBoard';
import AdminDashBoard from './AdminDashBoard/AdminDashBoard';
const DashBoard = () => {
    const [cookies, setCookie] = useCookies(['userInfo']);


    const auth = cookies.userInfo?.role
    console.log(auth)
    return (<>
        {auth === 1 ? <AdminDashBoard /> : <UserRoleDashboard />}

    </>)
}
export default DashBoard