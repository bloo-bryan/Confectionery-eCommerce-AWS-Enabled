import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import { hideLoginPopUp, loginPost } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const LoginPopUp = (props)=>{
    const dispatch = useDispatch();
    const { showPopUp, loginStatus } = useSelector((store) => store.user);

    const handleSubmit = async (event)=>{
        if (event) event.preventDefault();
        const loginCredential ={
            username: event.target[0].value,
            password: event.target[1].value,
        }
        const response = await dispatch(loginPost(loginCredential));
        if (response.payload.status === "logged in"){
            dispatch(hideLoginPopUp());
        }
        //todos: reroute user to correct pages
    }

    return (
        <StyledModal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show = {showPopUp}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='title'>
                Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='form' onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label >Username</Form.Label>
                        <Form.Control type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                    {loginStatus? (<p style={{color: "red"}}>{loginStatus}</p>) :(<p></p>)}
                    <div className='form-action'>
                        <Link to='register' className='register-link'>Register a new account.</Link>
                        <Button type="submit" className='login-button'>Login</Button>
                    </div>
                </Form>
            </Modal.Body>
        </StyledModal>
    )
}

const StyledModal = styled(Modal)`
.title{
    color: var(--clr-grey-1);
}
.form{
    display: block;
    width: 60%;
    margin-top: 10%;
    margin-bottom: 15%;
    margin-left: auto;
    margin-right: auto;
}
.form-action{
    margin-top: 10%;
}
.login-button{
    float : right;
    background: var(--clr-primary-5);
}
`

export default LoginPopUp