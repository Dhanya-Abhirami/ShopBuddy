import React from 'react'
import { Input } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import catchErrors from '../../utils/catchErrors'
import cookie, { set } from 'js-cookie'

function AddProductToCart({user,productId}) {
  const [quantity,setQuantity] = React.useState(1);
  const [loading,setLoading] = React.useState(false);
  const [success,setSuccess] = React.useState(false);
  const router = useRouter();
  React.useEffect(()=>{
    let timeout;
    if (success){
      timeout = setTimeout(()=>setSuccess(false), 3000); // show add to cart after 3 seconds
    }
    // if user navigates to different page before 3 seconds
    return () => { // error function
      clearTimeout(timeout)
    }
  }, [success])
  async function handleAddProductToCart(){
    try{
      setLoading(true)
      const url = `${baseUrl}/api/cart`;
      const payload = {
        quantity,
        productId
      }
      const token = cookie.get('token');
      const headers = { headers : {Authorization : token}}
      await axios.put(url,payload,headers);
      setSuccess(true)
    }
    catch(error){
      catchErrors(error, window.alert);
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }

  return (
  <Input
  type = 'number'
  min = '1'
  placeholder = 'Quantity'
  value = {quantity}
  onChange = {event => setQuantity(Number(event.target.value))}
  action = {
    user && success ? {
      color : 'yellow',
      content : 'ITEM ADDED!',
      icon : 'plus cart',
      disabled : true
    }
    :
    user ? { 
    color : 'orange',
    content : 'ADD TO CART',
    icon : 'plus cart',
    loading,
    disabled : loading,
    onClick : handleAddProductToCart
  }
  :
  { 
    color : 'orange',
    content : 'SIGN IN TO ADD TO CART',
    onClick : ()=> router.push('/login')
  }
}
  />
  )
}

export default AddProductToCart;
