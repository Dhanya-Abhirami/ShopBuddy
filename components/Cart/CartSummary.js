import React from 'react'
import StripeCheckOut from 'react-stripe-checkout'
import { Button, Segment, Divider } from 'semantic-ui-react'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary( {products, handleCheckout, success} ) {
  const [cartAmount,setCartAmount] = React.useState(0);
  const [stripeAmount,setStripeAmount] = React.useState(0);
  const [isCartEmpty,setCartEmpty] = React.useState(false);
  React.useEffect(()=>{
    const  { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0)
  },[products])
  return (
    <>
      <Divider/>
      <Segment clearing size='large'>
        <strong>Sub Total:</strong>&#x20B9;{cartAmount}
        <StripeCheckOut
          name = 'Shop Buddy'
          amount = {stripeAmount}
          // image = '/static/logo.svg'
          currency = 'INR'
          shippingAddress = {true}
          billingAddress = {true}
          zipcode = {true}
          stripeKey = 'pk_test_51H74WTEbbLm49fR8ks298UJqwWG0ipM8WDTSMJ7TvAyE9QxQrh25tfuBb8XGJgD7CK4lRt5fecqhIRhh0onZTJtx00H63bFwzz'
          token = {handleCheckout}
          triggerEvent = 'onClick'
        >
          <Button
          disabled = {isCartEmpty || success}
          icon = 'lightning'
          color = 'orange'
          floated = 'right'
          content = 'PLACE ORDER'
          />
        </StripeCheckOut>
      </Segment>
    </>
  );
}

export default CartSummary;
