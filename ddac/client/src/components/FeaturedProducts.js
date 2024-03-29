import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
import {useSelector} from "react-redux";

const FeaturedProducts = () => {
  const {
    featured_loading: loading,
    featured_error: error,
    featured_products: featured,
  } = useSelector((store) => store.products)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>trending products 🔥</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {featured.map((product) => {
          return <Product key={product.product_id} {...product} />
        })}
      </div>
      <Link to='/products' className='btn'>
        view all products
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 3rem;
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
