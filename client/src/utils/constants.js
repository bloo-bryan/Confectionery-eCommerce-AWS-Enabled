import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'about',
        url: '/about',
    },
    {
        id: 3,
        text: 'products',
        url: '/products',
    },
]

export const services = [
    {
        id: 1,
        icon: <GiCompass />,
        title: 'mission',
        text:
            'Our mission is to provide a one-stop-shop for confectionery businesses to set up and grow their online presence, and for customers to discover and enjoy a diverse selection of confectioneries from small businesses all over Malaysia.'
    },
    {
        id: 2,
        icon: <GiDiamondHard />,
        title: 'vision',
        text:
            'Our vision is to empower small confectionery businesses across Malaysia to reach customers nationwide, and to provide customers with easy access to a wide variety of delicious and high-quality confectioneries through an accessible, user-friendly and reliable online platform.',
    },
    {
        id: 3,
        icon: <GiStabbedNote />,
        title: 'partner with us',
        text:
            'Whether you\'re a small business just starting out or a well-established confectionery shop, we\'ve got you covered. With our platform, you can set up your online business all in one place and reach customers from all over Malaysia.',
    },
]

export const products_url = 'https://course-api.com/react-store-products'

export const single_product_url = `https://course-api.com/react-store-single-product?id=`

export const dateTimeFormat = "YYYY-MM-DD hh:mm a";