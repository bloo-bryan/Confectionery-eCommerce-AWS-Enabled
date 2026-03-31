import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import AmountButtons from './AmountButtons'
import {addToCart} from "../features/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import button from "bootstrap/js/src/button";

const AddToCart = ({ product }) => {
  const { product_id, quantity } = product;
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const {isLoggedIn, userDetails} = useSelector((store) => store.user)

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1
      if (tempAmount > quantity) {
        tempAmount = quantity
      }
      return tempAmount
    })
  }
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1
      if (tempAmount < 1) {
        tempAmount = 1
      }
      return tempAmount
    })
  }

  const addItem = (id, amount, product) => {
    dispatch(addToCart({id, amount, product}))
  }

  return (
    <Wrapper>
      <div className='btn-container'>
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        {isLoggedIn && userDetails.role === 'merchant' ?
            <button disabled={true} className='btn'>add to cart</button> : (
            <Link
              to='/cart'
              className='btn'
              onClick={() => addItem(product_id, amount, product)}
            >
              add to cart
            </Link>
            )
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
