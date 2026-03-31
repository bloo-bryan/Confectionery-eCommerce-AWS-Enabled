import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { hideLogoutWarning, logout } from '../features/userSlice';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutWarning = () => {
    const dispatch = useDispatch();
    const { showWarning } = useSelector((store) => store.user);

    return (
        <StyledModal 
        show = {showWarning}>
            <Modal.Body className='body'>
                <p className='alert'> Are you sure you want to logout? </p>
                <div className='selection'>
                    <Button className='cancel-button' onClick={() => dispatch(hideLogoutWarning())}> Cancel </Button>
                    <Button className='logout-button' onClick={() => dispatch(logout())}> Logout </Button>
                </div>
            </Modal.Body>
        </StyledModal>
    )
}

const StyledModal = styled(Modal)`
.body{
    border-color: rgba(177, 161, 129, 1);
    border-radius: 10px;
    padding: 5%;
}
.selection{
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 5%;
    float: right;
    margin-top: 5%;
    margin-right: 5%;
    margin-bottom:2%;
}
.cancel-button{
    background: rgba(252, 248, 227, 1);
    color: rgba(177, 161, 129, 1);
    border-color: rgba(177, 161, 129, 1);
}
.cancel-button:hover{
    color: white;
    background: rgba(177, 161, 129, 1);
    border-color: rgba(177, 161, 129, 1);
}
.logout-button{
    background: rgba(177, 161, 129, 1);
    border-color: rgba(177, 161, 129, 1);
}
.logout-button:hover{
    background: rgba(208, 52, 44, 1);
    border-color: rgba(208, 52, 44, 1);
}
`

export default LogoutWarning