import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpg'

const AboutPage = () => {
    return (
        <main>
            <PageHero title='about' />
            <Wrapper className='page section section-center'>
                <img src={aboutImg} alt='nice desk' />
                <article>
                    <div className='title'>
                        <h2>our story</h2>
                        <div className='underline'></div>
                    </div>
                    <p>
                        Introducing the ultimate destination for all your sweet cravings - our new online confectionery store! Whether you're in search of the perfect gift or just looking to indulge in some treats, we've got you covered. With a wide range of confectioneries from small businesses all over Malaysia, you can shop with ease and have your sweet treats delivered right to your door.
                        We understand that shopping online can be overwhelming, that's why we've made it easy for you to find the perfect confectionery for any occasion. Our platform allows you to browse through a wide selection of chocolates, cand, and other sweets from local merchants. Plus, with the power of AWS cloud services, you can trust that your shopping experience will be seamless and reliable.
                        We're committed to providing you with the best customer service, and our easy to use platform makes it simple for you to find, purchase and have your confectionery delivered to you. So, whether you're looking for a gift for a loved one, or just looking to treat yourself, our online confectionery store is the perfect destination. Shop now and discover the sweetest treats Malaysia has to offer!
                    </p>
                </article>
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
