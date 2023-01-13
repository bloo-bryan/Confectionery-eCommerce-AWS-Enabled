import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'

import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Products,
  PrivateRoute,
} from './pages'
import {countCartTotals} from "./features/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts, loadProducts, sortProducts} from "./features/filterSlice";
import {fetchProducts} from "./features/productsSlice";
import { products_url as url } from './utils/constants'
import S3TestPage from "./pages/S3TestPage";

function App() {
    const dispatch = useDispatch();
    const {cart} = useSelector((store) => store.cart);
    const {products} = useSelector((store) => store.products);
    const {sort, filters} = useSelector((store) => store.filter);

    useEffect(() => {
        dispatch(fetchProducts(url))
    }, [])

    useEffect(() => {
        dispatch(countCartTotals())
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        dispatch(loadProducts(products));
    }, [products])

    useEffect(() => {
        dispatch(filterProducts());
        dispatch(sortProducts());
    }, [products, sort, filters])

  return (
      // <AuthWrapper>
        <Router>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='products' element={<Products/>}/>
            <Route path='products/:id' element={<SingleProduct/>}/>
            <Route path='uploader' element={<S3TestPage/>}/>
            <Route path='checkout' element={
              <PrivateRoute>
                <Checkout/>
              </PrivateRoute>
            }/>
            <Route path='*' element={<Error/>}/>

          </Routes>
          <Footer />
        </Router>
      // </AuthWrapper>
  )
}

export default App
