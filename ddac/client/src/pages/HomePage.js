import React from 'react'
import styled from 'styled-components'
import {FeaturedProducts, Hero, Filters, ProductList, Sort, Services} from '../components'
const HomePage = () => {
    return (
        <main>
            <Hero />
            <FeaturedProducts />
            <Services/>
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
