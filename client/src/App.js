import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
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
    WithNav, OrderDetailPage, ManageProductPage, ProductDetailPage, RegisterPage, AdminRoute
} from './pages'
import {countCartTotals} from "./features/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {filterProducts, loadProducts, sortProducts} from "./features/filterSlice";
import {fetchFeaturedProducts, fetchProducts} from "./features/productsSlice";
import {ToastContainer} from "react-toastify";

function App() {
    const dispatch = useDispatch();
    const {cart} = useSelector((store) => store.cart);
    const {products} = useSelector((store) => store.products);
    const {sort, filters} = useSelector((store) => store.filter);
    const { isLoggedIn, userDetails } = useSelector((store) => store.user);

    useEffect(()=>{
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn])

    useEffect(()=>{
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }, [userDetails])

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchFeaturedProducts());
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
                  <Route element={<AdminRoute/>}>
                      <Route path="/admin/orders" element={<ManageOrderPage />} />
                      <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
                      <Route path="/admin/products" element={<ManageProductPage />} />
                      <Route path="/admin/add-product" element={<ProductDetailPage />} />
                      <Route path="/admin/edit-product/:id" element={<ProductDetailPage title={"Edit Product"}/>} />
                  </Route>
              </Route>
              <Route element={<WithNav />}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='about' element={<About/>}/>
                  <Route path='products' element={<Products/>}/>
                  <Route path='products/:id' element={<SingleProduct/>}/>
                  <Route element={<Cart/>} path='cart'/>
                  <Route element={<PrivateRoute/>}>
                      <Route element={<Checkout/>} path="checkout"/>
                  </Route>
                  <Route path='register' element={<RegisterPage/>}/>
                  <Route path='*' element={<Error/>}/>
              </Route>
          </Routes>
          <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
          />
      </Router>
      // </AuthWrapper>
  )
}

export default App
