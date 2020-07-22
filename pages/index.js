import React from 'react'
import axios from 'axios'
import ProductList from '../components/Index/ProductList'
import ProductPagination from '../components/Index/ProductPagination'
import baseUrl from '../utils/baseUrl'

function Home({ products, totalPages }) {
  return (
  <>
  <ProductList products={products}/>
  <ProductPagination totalPages={totalPages}/>
  </>
  )
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1'// for pagination
  const size = 9;// number of products to display in one page
  // fetch data on server
  const url = `${baseUrl}/api/products`;
  const payload = { params : { page,size}}
  const response = await axios.get(url,payload);
  // return response data as an object
  return response.data;
  // note : this object will be merged with existing props
}
export default Home;
