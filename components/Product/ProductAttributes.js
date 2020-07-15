import { Header,Button } from 'semantic-ui-react'

function ProductAttributes({ description }) {
  return <>
    <Header as = 'h3'> Product Details</Header>
    <p> {description} </p>
    <Button
      icon = 'trash alternate outline'
      color = 'red'
      content = 'REMOVE'
    />
    </>
}

export default ProductAttributes;
