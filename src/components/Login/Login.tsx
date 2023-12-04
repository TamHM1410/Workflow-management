import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../service/UserService';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateLoginState } from '../../redux/feature/loginSlice';
import { useCookies } from 'react-cookie';
import { Button } from 'react-bootstrap';
import { FacebookFilled, GithubFilled, GoogleCircleFilled } from '@ant-design/icons';




import { toast } from "react-toastify";


interface objectt {
    Email: string,
    Name: string,
    Role: number

}

const Login = () => {

    const dispatch = useDispatch();
    const [inputEmail, setInputEmail] = useState<string>('');
    const [inputPass, setInputPass] = useState<string>('');
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['userInfo']);



    const [loggedUser, setLoggedUser] = useState({
        email: '',
        name: '',
        isLogIn: false,
        role: 0

    })



    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(e.target.value);
    };

    const handleInputPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputPass(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newList = await getAllUser()
        let isErrorMessageShown = false;
        if (newList) {
            newList.data.map((item: objectt) => {
                if (item.Email === inputEmail && item.Name === inputPass) {
                    setLoggedUser({
                        email: inputEmail,
                        name: inputPass,
                        isLogIn: true,
                        role: item.Role

                    })
                    const newLoginState = {
                        Name: inputPass,
                        Email: inputEmail,
                        Role: item.Role,
                        isLoggedIn: true,
                    };
                    setCookie('userInfo', { name: inputPass, email: inputEmail, isLogIn: true, role: item.Role });

                    dispatch(updateLoginState(newLoginState));
                    navigate('/task')
                    toast.success('Login success')
                    isErrorMessageShown = true




                }
                else {

                    isErrorMessageShown = true;




                }

            })
        }




        setInputEmail('')
        setInputPass('')

    };
    const handleRegister = () => {
        navigate('/register')
    }



    return (
        <>
            <div style={{ backgroundSize: 'cover', padding: '9% ', }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
                    <div style={{ border: 'solid  5px', padding: '100px', borderRadius: '10px' }} >
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ justifyContent: 'start' }}>User Name:</div>
                            <input placeholder="Enter your user name" onChange={handleInputEmail} style={{ borderRadius: '4px' }} className="form-control" />
                            <div>Password: </div>
                            <input placeholder="Enter your PassWord" type="password" onChange={handleInputPass} style={{ borderRadius: '4px' }} className="form-control" />
                            <div style={{ display: 'flex', marginTop: '5px  ', justifyContent: 'space-between' }}>
                                <Button variant='success' type="submit" disabled={inputEmail && inputPass ? false : true}>Login</Button>
                                <Button style={{ justifyContent: 'end', marginLeft: '60px' }} onClick={handleRegister}>Register</Button>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <h6>-----Or-----</h6>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <FacebookFilled style={{ fontSize: '24px' }} />
                                <GithubFilled style={{ fontSize: '24px' }} />
                                <GoogleCircleFilled style={{ fontSize: '24px' }} />

                            </div>

                        </form>
                    </div>
                </div >
            </div >






        </>
    );
};

export default Login;