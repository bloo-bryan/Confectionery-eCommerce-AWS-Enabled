import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
    Loading,
    Error,
    ProductImages,
    AddToCart,
    Stars,
    PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleProduct} from "../features/productsSlice";

const SingleProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [loading, setLoading] = useState(false);

    const {
        single_product_loading: loading,
        single_product_error: error,
        single_product: product,
    } = useSelector((store) => store.products);

    useEffect(() => {
        const fetchData = async() => {
            const data = await dispatch(fetchSingleProduct(id))
        }
        fetchData().then(() => {}).catch(console.error);
    }, [id])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
        // eslint-disable-next-line
    }, [error])

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <Error />
    }
    const {
        name,
        merchant_name,
        price,
        description,
        quantity,
        category,
        SKU,
        brand,
        url,
    } = product
    return (
        <Wrapper>
            <PageHero title={name} product />
            <div className='section section-center page'>
                <Link to='/products' className='btn'>
                    back to products
                </Link>
                {Object.keys(product).length !== 0 ? <div className='product-center'>
                    <ProductImages images={url} />
                    <section className='content'>
                        <h2>{name}</h2>
                        <h5 className='price'> RM{price.toFixed(2)}</h5>
                        <p className='desc'> {description}</p>
                        <p className='info'>
                            <span>Available : </span>
                            {quantity > 0 ? 'In stock' : 'out of stock'}
                        </p>
                        <p className='info'>
                            <span>SKU : </span>
                            {SKU}
                        </p>
                        <p className='info'>
                            <span>Brand : </span>
                            {brand}
                        </p>
                        <p className='info'>
                            <span>Category : </span>
                            {category}
                        </p>
                        <p className='info'>
                            <span>Merchant : </span>
                            {merchant_name}
                        </p>
                        <hr />
                        {quantity > 0 && <AddToCart product={product} />}
                    </section>
                </div> : false}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
