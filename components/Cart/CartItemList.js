import {Header,Segment,Icon,Button, Item, Message} from 'semantic-ui-react'
import { useRouter } from 'next/router'

function CartItemList({user, products, handleRemoveFromCart, success }) {
  const router = useRouter();
  function mapCartProductsToItems(products){
    return products.map(p=>({
      childKey : p.product._id,
      header : (
        //as anchor tag i.e. link
        <Item.Header as='a' onClick={() => router.push(`/product?_id=${p.product._id}`)}> 
          {p.product.name}
        </Item.Header>
      ),
      image : p.product.imageUrl,
      meta : `${p.quantity} x \u20B9${p.product.price}`,
      fluid : 'true',
      extra : (
        <Button
          basic
          icon = 'remove'
          floated = 'right'
          onClick = {()=> handleRemoveFromCart(p.product._id)}
        />
      )
    }))
  }
  if (success){
    return (
      <Message
        success
        header = 'Success!'
        content = 'Your Order has been placed'
        icon = 'star outline'
      />
    )
  }
  if (products.length === 0){
    return (
      <Segment secondary color='blue' inverted textAlign='center' placeholder>
        <Header icon>
          <Icon name='shopping basket'/>
          Cart is empty. Add some products!
        </Header>
        <div>
          {user ? (
            <Button color = 'yellow' onClick = { () => router.push('/')}> Explore Products </Button>
          ) : (
            <Button color = 'yellow' onClick = { () => router.push('/login')}> Login to view cart </Button>
          )}
        </div>
        
      </Segment>
    );
  }
  return <Item.Group divided items={mapCartProductsToItems(products)}/>
  
}

export default CartItemList;
