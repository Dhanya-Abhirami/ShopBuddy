import {Card} from 'semantic-ui-react'
function ProductList({ products }) {
  
  function mapProductsToItems(){
    return products.map(product => ({
      header : product.name,
      image : product.imageUrl,
      meta : `\u20B9${product.price}`,
      color : 'yellow',
      fluid : true,
      childKey : product._id,
      href : `/product?_id=${product._id}`
    }))
  }
  return <Card.Group stackable itemsPerRow='3' centered items = {mapProductsToItems(products)}/>
}

export default ProductList;
