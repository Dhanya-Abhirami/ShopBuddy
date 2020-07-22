import React from 'react'
import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'

function CreateProduct() {
  const INITIAL_PRODUCT = {
    name : '',
    price: '',
    image : '',
    description : ''
  }
  const [product,setProduct]= React.useState(INITIAL_PRODUCT)
  const [imagePreview, setImagePreview] = React.useState('');
  const [success,setSuccess] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [disabled,setDisabled] = React.useState(true);
  const [error,setError] = React.useState('');

  React.useEffect(()=>{
    const isProduct = Object.values(product).every(ele=>Boolean(ele))
    isProduct ? setDisabled(false) : setDisabled(true);
  },[product]) // [product] is the dependencies array
  function handleChange(event){
    const { name, value, files } = event.target ;
    if (name === 'image'){
      setProduct((prevState) => ({ ...prevState, [name] : files[0]})); // updater pattern
      setImagePreview(window.URL.createObjectURL(files[0]))
    }
    else{
      setProduct((prevState) => ({ ...prevState, [name] : value}));
    }
  }
  async function handleImageUpload() {
    const data = new FormData()
    data.append('file',product.image)
    data.append('upload_preset','ShopBuddy')
    data.append('cloud_name','dhanyaabhirami')
    const response = await axios.post(process.env.CLOUDINARY_URL,data)
    const imageUrl = response.data.url
    return imageUrl;
  }
  async function handleSubmit(event){
    try{
      event.preventDefault(); // prevent page from refreshing
      setLoading(true);
      setError('');
      const imageUrl = await handleImageUpload();
      // console.log({imageUrl})
      const url = `${baseUrl}/api/product`;
      const payload = { ...product,imageUrl } // same as { name, price, description, imageUrl}
      const response = await axios.post(url,payload) // make request to server
      // console.log({response})
      setProduct(INITIAL_PRODUCT); // controlled input
      setSuccess(true); // success message
    }
    catch(error){
      catchErrors(error,setError)
      console.error('Error',error)
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
    <Header as = 'h2' block >
      <Icon name='add' color='orange'/>
      Create New Product
    </Header>
    <Form loading={loading} error = {Boolean(error)} success={success} onSubmit={handleSubmit}>
    <Message
        error 
        header = 'Oops!'
        content = {error}
        />
      <Message
        success
        icon = 'check'
        header = 'Success'
        content = 'Your product has been posted!'
        />
      <Form.Group  widths='equal'>
        <Form.Field
          control = {Input}
          name = 'name'
          label = 'Name'
          placeholder = 'Name'
          type = 'text'
          value = {product.name}
          onChange = {handleChange}
        />
        <Form.Field
          control = {Input}
          name = 'price'
          label = 'Price'
          placeholder = 'Price'
          type = 'number'
          min = '0'
          step = '1'
          value = {product.price}
          onChange = {handleChange}
        />
        <Form.Field
          control = {Input}
          name = 'image'
          label = 'Image'
          type = 'file'
          accept = 'image/*'
          content = 'Select Image'
          onChange = {handleChange}
        /> {/*see why unequal width*/}
      </Form.Group>
      <Image src={imagePreview} rounded centered size='small'/>
      <Form.Field
          control = {TextArea}
          name = 'description'
          label = 'Description'
          placeholder = 'Description'
          type = 'text'
          value = {product.description}
          onChange = {handleChange}
        />
      <Form.Field
        control = {Button}
        disabled = {disabled || loading}
        color = 'blue'
        icon = 'pencil alternate'
        content = 'Submit'
        type = 'Submit'
      />
    </Form>
    </>
  );
}

export default CreateProduct;
