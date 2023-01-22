import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {showLoginPopUp} from "../features/userSlice";

const CartTotals = () => {
  const { total_amount, shipping_fee } = useSelector((store) => store.cart)
  const { isLoggedIn, userDetails } = useSelector((store) => store.user)
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            subtotal : <span>RM {total_amount.toFixed(2)}</span>
          </h5>
          <p>
            shipping fee : <span>RM {shipping_fee.toFixed(2)}</span>
          </p>
          <hr />
          <h4>
            order total :{' '}
            <span>RM {(total_amount + shipping_fee).toFixed(2)}</span>
          </h4>
        </article>
        {isLoggedIn && userDetails.role === 'customer' ?
          <Link to='/checkout' className='btn'>
            proceed to checkout
          </Link> :
          <button type='button' className='btn' onClick={() => dispatch(showLoginPopUp())}>
            login
          </button>
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`

export default CartTotals
