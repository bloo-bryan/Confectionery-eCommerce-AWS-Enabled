import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

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
                        We are a dedicated group of programmers and designers who have worked tirelessly to bring our unique vision to life. 
                        This platform offers a wide variety of delicious treats for customers to choose from, all available for purchase at the click of a button. 
                        From hand-crafted chocolates to homemade fudge and truffles, there's something for everyone. 
                        The team's passion for confectionery is evident in every aspect of their platform, from the user-friendly design to the seamless online shopping experience. 
                        With this platform, indulging in sweet treats has never been easier or more enjoyable.
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
