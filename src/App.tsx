
import './App.css'
import Login from './components/Login/Login.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Task/home.tsx';
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux';
import Header from './components/Header/Header.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register/Register.tsx';
import Project from './components/Project/Project.tsx';
import EditUser from './components/User/EditUser.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/ErrorPage/ErrorPage.tsx';
import PrivateRoutes from './utils/PrivateRoutes.tsx';
import PrivateLogin from './utils/PrivateLogin.tsx';
import Dashboard from './components/DashBoard/AdminDashBoard/Task/DashBoard.tsx';

import ProjectDashboard from './components/DashBoard/AdminDashBoard/Project/ProjectDashboard.tsx';
import UserDashboard from './components/DashBoard/AdminDashBoard/User/UserDashboard.tsx';
import PrivateChildDashBoard from './utils/PrivateChildDashBoard.tsx';
import Footers from './components/Footer/Footer.tsx';

import DashBoard from './components/DashBoard/DashBoard.tsx';
import Private from './utils/Private.tsx';





function App() {





  return (
    <>

      <Provider store={store}>


        <BrowserRouter>
          <Header />


          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/task' element={<Home />} />
            <Route path='/project' element={<Project />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<NotFound />} />

            <Route element={<Private />}>
              <Route path='/dashboard' element={<DashBoard />} />
            </Route>


            <Route element={<PrivateRoutes />}>
              <Route path='/edit' element={<EditUser />} />
            </Route>
            <Route element={<PrivateChildDashBoard />}>
              <Route path='/dashboard/task' element={<Dashboard />} />
              <Route path='/dashboard/user' element={<UserDashboard />} />
              <Route path='/dashboard/project' element={<ProjectDashboard />} />
            </Route>
            <Route element={<PrivateLogin />}>
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
          <Footers />
        </BrowserRouter>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  )
}

export default App
