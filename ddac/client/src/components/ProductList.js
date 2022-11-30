import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import {useSelector} from "react-redux";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useSelector((store) => store.filter)

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }
  if (products.length > 0) {
    if (grid_view === false) {
      return <ListView products={products} />
    }
    return <GridView products={products}>product list</GridView>
  }
}

export default ProductList
