import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import {openSidebar} from "../features/productsSlice";
import {useDispatch, useSelector} from "react-redux";

const Nav = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, userDetails } = useSelector((store) => store.user)
  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/' className='text-link'>
             <img src={logo} alt='home page' />
          </Link>
          <button type='button' className='nav-toggle' onClick={() => dispatch(openSidebar())}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li key={id}>
                <Link to={url} className='text-link'>{text}</Link>
              </li>
            )
          })}
          {isLoggedIn && userDetails.role === 'customer' ? (
            <li>
              <Link to='/checkout' className='text-link'>checkout</Link>
            </li>
          ) : false}
          {isLoggedIn && userDetails.role === 'merchant' ? (
              <li>
                  <Link to='/admin/orders' className='text-link'>my store</Link>
              </li>
          ) : false}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-link{
    text-decoration: none;
  }
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav
