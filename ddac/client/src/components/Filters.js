import React from 'react'
import styled from 'styled-components'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import {useDispatch, useSelector} from "react-redux";
import {updateFilters, clearFilters} from "../features/filterSlice";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      brand,
      min_price,
      price,
      max_price,
    },
    all_products,
  } = useSelector((store) => store.filter)
  const dispatch = useDispatch();

  const categories = getUniqueValues(all_products, 'category')
  const brands = getUniqueValues(all_products, 'brand')

  const updateFilter = (name, value) => {
    dispatch(updateFilters({name, value}))
  }

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={(e) => updateFilter(e.target.name, e.target.value)}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => updateFilter(e.target.name, e.target.textContent)}
                    type='button'
                    name='category'
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* brands */}
          <div className='form-control'>
            <h5>brand</h5>
            <select
              name='brand'
              value={brand}
              onChange={(e) => updateFilter(e.target.name, e.target.value)}
              className='brand'
            >
              {brands.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          {/* end of brands */}
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>RM{price}</p>
            <input
              type='range'
              name='price'
              min={min_price}
              max={Math.ceil(max_price)}
              onChange={(e) => updateFilter(e.target.name, Number(e.target.value))}
              value={price}
            />
          </div>
          {/* end of price */}
        </form>
        <button type='button' className='clear-btn' onClick={() => dispatch(clearFilters())}>
          {' '}
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 100%
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .brand {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
