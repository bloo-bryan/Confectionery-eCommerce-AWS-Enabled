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
    ManageOrderPage,
    WithoutNav,
    WithNav, OrderDetailPage, ManageProductPage, ProductDetailPage , RegisterPage
} from './pages'
import {countCartTotals} from "./features/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts, loadProducts, sortProducts} from "./features/filterSlice";
import {fetchProducts} from "./features/productsSlice";
import {checkUser} from "./features/userSlice";
import { products_url as url } from './utils/constants'
import S3TestPage from "./pages/S3TestPage";

function App() {
    const dispatch = useDispatch();
    const {cart} = useSelector((store) => store.cart);
    const {products} = useSelector((store) => store.products);
    const {sort, filters} = useSelector((store) => store.filter);
    const { isLoggedIn, userDetails } = useSelector((store) => store.user);

    useEffect(()=>{
        window.localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn])

    useEffect(()=>{
        window.localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }, [userDetails])

    useEffect(() => {
        dispatch(fetchProducts())
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
          <Routes>
              <Route element={<WithoutNav />}>
                  <Route path="/admin/orders" element={<ManageOrderPage />} />
                  <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
                  <Route path="/admin/products" element={<ManageProductPage />} />
                  <Route path="/admin/add-product" element={<ProductDetailPage />} />
                  <Route path="/admin/edit-product/:id" element={<ProductDetailPage title={"Edit Product"}/>} />
              </Route>
              <Route element={<WithNav />}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='about' element={<About/>}/>
                  <Route path='cart' element={<Cart/>}/>
                  <Route path='products' element={<Products/>}/>
                  <Route path='products/:id' element={<SingleProduct/>}/>
                  <Route path='uploader' element={<S3TestPage/>}/>
                  <Route path='checkout' element={
                      // <PrivateRoute>
                          <Checkout/>
                      // </PrivateRoute>
                  }/>
                  <Route path='register' element={<RegisterPage/>}/>
                  <Route path='*' element={<Error/>}/>
              </Route>
          </Routes>
      </Router>
      // </AuthWrapper>
  )
}

export default App
