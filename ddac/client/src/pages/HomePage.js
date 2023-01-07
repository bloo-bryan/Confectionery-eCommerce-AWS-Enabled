import React from 'react'
import styled from 'styled-components'
import { FeaturedProducts, Hero, Filters, ProductList, Sort } from '../components'
const HomePage = () => {
    return (
        <main>
            <Hero />
            <FeaturedProducts />
            <Wrapper className='page'>
            <div className='title'>
                <h2>All products</h2>
                <div className='underline'></div>
            </div>
                <div className='section-center products'>
                    <Filters />
                    <div>
                        <Sort />
                        <ProductList />
                    </div>
                </div>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
padding: 3rem;
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default HomePage
