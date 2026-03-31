import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components'
import { hideLoginPopUp, registerPost, checkUsernamePost, checkEmailPost } from '../features/userSlice';
import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const RegisterPage = ()=>{
    const [passwordValid, setPasswordValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [email, setEmail] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [role, setRole] = useState('customer');
    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let tempPassword;

    const validatePassword = (password_1, password_2)=>{
        if(password_1 === password_2){
            return true;
        }
        return false;
    }
    
    const handlePasswordRetry = (event)=>{
        if(validatePassword(tempPassword, event.target.value)){
            setPasswordValid(true);
        }
    }

    const handleSubmit = async (event)=>{
        if (event) event.preventDefault();
        const isPasswordSame = validatePassword(event.target[2].value, event.target[3].value);
        if (isPasswordSame === false) {
            setPasswordValid(false);
            tempPassword = event.target[2].value;
            return;
        }
        const response = await dispatch(checkUsernamePost(event.target[1].value));
        console.log(response.payload.status)
        if (response.payload.status === "invalid"){
            setUsernameValid(false);
            return;
        }
        
        const responseEm = await dispatch(checkEmailPost({email: email, role: role}));
        console.log(responseEm.payload.status)
        if (responseEm.payload.status === "invalid") {
            setEmailValid(false);
            return;
        }

        let registrationData = {};
        switch (role){
            case 'customer':
                registrationData = {
                    name: event.target[0].value,
                    username: event.target[1].value,
                    password: event.target[2].value,
                    role: event.target[4].value,
                    mobile: event.target[5].value,
                    shipping: event.target[6].value,
                    state: event.target[7].value,
                    email: email
                }
                console.log(registrationData)
                break;
            case 'merchant':
                registrationData = {
                    name: event.target[0].value,
                    username: event.target[1].value,
                    password: event.target[2].value,
                    role: event.target[4].value,
                    mobile: event.target[5].value,
                    email: email,
                }
                console.log(registrationData)
                break;
        }
        const registration = await dispatch(registerPost(registrationData))
        if(registration.payload.status === 'done'){
            setShowNotification(true);
        }
    }

    const closeNotification = ()=>{
        setShowNotification(false);
        navigate("/");
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
        setEmailValid(true)
    }

    useEffect(() => {
        dispatch(hideLoginPopUp());
    }, []);

    return(
        <Wrapper>
            <div className='title-background'>
                <div className='title-container'>
                    <h1 className='title'>Register A New Account</h1>
                </div>
            </div>
            <Form onSubmit={handleSubmit} className='form'>
                <Form.Group>
                    <Form.Label>{role === 'customer' ? 'Full Name' : 'Store Name'}</Form.Label>
                    <Form.Control type="text" required placeholder="Enter full name"/>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" required placeholder="Enter username" onChange={ ()=>setUsernameValid(true) }/>
                    {usernameValid ? (<br/>):(<p className='warning'>This username has been taken, please try another username</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Enter password" />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control type="password" required placeholder="Enter same password" onChange={handlePasswordRetry}/>
                    {passwordValid ? (<br/>):(<p className='warning'>The password is not same, please re-enter the password</p>)}
                </Form.Group>
                <Form.Group>
                <Form.Label>Registering as customer or merchant?</Form.Label>
                    <Form.Select className='dropdown' required aria-label="What role are you register for?" onChange={ (event)=>setRole(event.target.value) }>
                        <option value='customer'>Customer</option>
                        <option value='merchant'>Merchant</option>
                    </Form.Select>
                </Form.Group>
                <br/>
                {(role === 'customer')?
                (
                    <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type='number' max={99999999999} placeholder='Enter your mobile number' required/> <br/>
                        <Form.Label>Shipping Address</Form.Label>
                        <Form.Control type='text' placeholder='Enter your shipping address' required/> <br/>
                        <Form.Label>State</Form.Label>
                        <Form.Select aria-label="state" className='dropdown' required>
                            <option value='Kuala Lumpur'>Kuala Lumpur</option>
                            <option value='Johor'>Johor</option>
                            <option value='Kedah'>Kedah</option>
                            <option value='Kelantan'>Kelantan</option>
                            <option value='Malacca'>Malacca</option>
                            <option value='Negeri Sembilan'>Negeri Sembilan</option>
                            <option value='Pahang'>Pahang</option>
                            <option value='Penang'>Penang</option>
                            <option value='Perak'>Perak</option>
                            <option value='Perlis'>Perlis</option>
                            <option value='Sabah'>Sabah</option>
                            <option value='Sarawak'>Sarawak</option>
                            <option value='Selangor'>Selangor</option>
                            <option value='Terengganu'>Terengganu</option>
                        </Form.Select>
                    </Form.Group>
                ):(
                    <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control type='number' max={99999999999} placeholder='Enter your mobile number' required />
                    </Form.Group>
                )}
                <br/>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={handleChangeEmail} />
                    {emailValid ? (<p></p>) : (<p>This email has been taken, please try another email</p>)}
                </Form.Group>
                <Button variant="primary" type="submit" className='register-button'>
                    Register
                </Button>
            </Form>
            <Modal show={showNotification} onHide={closeNotification}>
                <Modal.Body>Congratulations, you have successfully registered as a {role}!</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeNotification}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
        </Wrapper>
    )
}

const Wrapper = styled.div`
.title-background{
    background: var(--clr-primary-10);
    width: 100%;
    min-height: 20vh;
    display: flex;
    align-items: center;
    margin-bottom: 5%;
}
.title-container{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}
.title{
    text-align: left;
}
.form{
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}
.warning{
    color: red;
}
.register-button{
    float: right;
    margin-top: 5%;
    margin-bottom: 10vh;
}
button{
    background: var(--clr-primary-5);
    border-color: var(--clr-primary-5);
}
button:hover{
    border-color: var(--clr-primary-5);
    color: var(--clr-primary-5);
    background: white;
}
`

export default RegisterPage