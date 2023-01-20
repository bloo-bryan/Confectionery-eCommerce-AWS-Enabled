import React, {useEffect} from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {closeSidebar} from "../features/productsSlice";
import {countCartTotals} from "../features/cartSlice";
import { showLoginPopUp, showLogoutWarning, hideLoginPopUp, hideLogoutWarning} from '../features/userSlice';
import {useDispatch, useSelector} from "react-redux";
import LoginPopUp from './LoginPopUp';
import LogoutWarning from './LogoutWarning';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartButtons = () => {
  var greeting;
  var login_logout;
  const { total_items, cart } = useSelector((store) => store.cart);
  const { isLoggedIn, userDetails } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countCartTotals());
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  if (isLoggedIn){
    greeting = <p className='greeting'>Welcome, {userDetails.name}</p>
    login_logout = <button type='button' className='auth-btn' onClick={ () => dispatch(showLogoutWarning()) }> Logout <FaUserMinus /></button>
  }else{
    greeting = <p className='greeting'></p>
    login_logout = <button type='button' className='auth-btn' onClick = {() => dispatch(showLoginPopUp())}> Login <FaUserPlus /></button>
  }
  
  return (
    <Wrapper className='cart-btn-wrapper'>
      {greeting}
      <Link to='/cart' className='cart-btn' onClick={() => dispatch(closeSidebar())}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      {login_logout}
      <LoginPopUp onHide={() => dispatch(hideLoginPopUp())}/>
      <LogoutWarning />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 315px;

  .greeting{
    color: var(--clr-grey-1);
  }
  .cart-btn {
    text-decoration: none;
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons
