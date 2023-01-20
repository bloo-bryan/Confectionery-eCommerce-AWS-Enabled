import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { hideLoginPopUp, registerPost, checkUsernamePost } from '../features/userSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const RegisterPage = ()=>{
    const [passwordValid, setPasswordValid] = useState(true);
    const [usernameValid, setUsernameValid] = useState(true);
    const [role, setRole] = useState('customer');
    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(hideLoginPopUp());
    var tempPassword;

    const validatePassword = (password_1, password_2)=>{
        if(password_1 === password_2){
            return true;
        }
        return false;
    }
    
    const handlePasswordRetry = (event)=>{
        if(validatePassword(tempPassword, event.target.value)){
            setPasswordValid(true);
        };
    }

    const handleSubmit = async (event)=>{
        if (event) event.preventDefault();
        const isPasswordSame = validatePassword(event.target[1].value, event.target[2].value);
        if (isPasswordSame === false) {
            setPasswordValid(false);
            tempPassword = event.target[1].value;
            return;
        }
        const response = await dispatch(checkUsernamePost(event.target[0].value));
        console.log(response.payload.status)
        if (response.payload.status === "invalid"){
            setUsernameValid(false);
            return;
        }
        let registrationData = {};
        switch (role){
            case 'customer':
                registrationData = {
                    username: event.target[0].value,
                    password: event.target[1].value,
                    role: event.target[3].value,
                    mobile: event.target[4].value,
                    shipping: event.target[5].value,
                    state: event.target[6].value,
                }
                break;
            case 'merchant':
                registrationData = {
                    username: event.target[0].value,
                    password: event.target[1].value,
                    role: event.target[3].value,
                    mobile: event.target[4].value,
                }
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

    return(
        <>
        <Form onSubmit={handleSubmit}>
            <h1>Register A New Account</h1>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" onChange={ ()=>setUsernameValid(true) }/>
                {usernameValid ? (<p></p>):(<p>This username has been taken, please try another username</p>)}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Verify Password</Form.Label>
                <Form.Control type="password" placeholder="Enter same password" onChange={handlePasswordRetry}/>
                {passwordValid ? (<p></p>):(<p>The password is not same, please re-enter the password</p>)}
            </Form.Group>
            <Form.Group>
            <Form.Label>What role are you register for?</Form.Label>
                <Form.Select aria-label="What role are you register for?" onChange={ (event)=>setRole(event.target.value) }>
                    <option value='customer'>Customer</option>
                    <option value='merchant'>Merchant</option>
                </Form.Select>
            </Form.Group>
            {(role === 'customer')?
            (
                <Form.Group>
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control type='phone-number' placeholder='Enter your mobile number' />
                    <Form.Label>Shipping Adress</Form.Label>
                    <Form.Control type='address' placeholder='Enter your shipping address' />
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="state">
                        <option value='kuala_lumpur'>Kuala Lumpur</option>
                        <option value='johor'>Johor</option>
                        <option value='kedah'>Kedah</option>
                        <option value='kelantan'>Kelantan</option>
                        <option value='malacca'>Malacca</option>
                        <option value='negeri-sembilan'>Negeri Sembilan</option>
                        <option value='pahang'>Pahang</option>
                        <option value='penang'>Penang</option>
                        <option value='perak'>Perak</option>
                        <option value='perlis'>Perlis</option>
                        <option value='sabah'>Sabah</option>
                        <option value='sarawak'>Sarawak</option>
                        <option value='selangor'>Selangor</option>
                        <option value='terengganu'>Terengganu</option>
                    </Form.Select>
                </Form.Group>
            ):(
                <Form.Group>
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control type='phone-number' placeholder='Enter your mobile number' />
                </Form.Group>
            )}
            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
        <Modal show={showNotification} onHide={closeNotification}>
            <Modal.Body>Congratulation, you have succesfully register as a {role}!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeNotification}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default RegisterPage