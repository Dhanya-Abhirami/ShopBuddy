import React from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'
import {handleLogin} from '../utils/auth'

const INITIAL_USER = {
  email : '',
  password :''
}

function Login() {
  const [user,setUser]= React.useState(INITIAL_USER);
  const [disabled,setDisabled] = React.useState(true);
  const [loading,setLoading] = React.useState(false);
  const [error,setError] = React.useState('')
  React.useEffect(()=>{
    const isUser = Object.values(user).every(ele=>Boolean(ele))
    isUser ? setDisabled(false) : setDisabled(true);
  },[user])

  function handleChange(event){
    const {name,value} =  event.target;
    setUser(prevState=>({ ...prevState,[name]:value}))
  }
  
  async function handleSubmit(event){
    event.preventDefault()
    try{
      setLoading(true);
      setError('');
      // console.log(user)
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url,payload);
      handleLogin(response.data)
    }
    catch(error){
      catchErrors(error,setError);
    }
    finally{
      setLoading(false);
    }
  }
  return (<>
    <Message
      attached
      icon='sign-in'
      header = 'Get access to your Orders'
      content = 'Login'
      color = 'blue'
    />
    <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
      <Message
        error
        header = 'Oops!'
        content = {error}
      />
      <Segment>
        <Form.Input
          fluid
          icon = 'envelope'
          iconPosition = 'left'
          type = 'email'
          label = 'Email'
          placeholder = 'Email'
          name = 'email'
          value = {user.email}
          onChange = {handleChange}
        />
        <Form.Input
          fluid
          icon = 'lock'
          iconPosition = 'left'
          type = 'password'
          label = 'Password'
          placeholder = 'Password'
          name = 'password'
          value = {user.password}
          onChange = {handleChange}
        />
        <Button
          disabled = {disabled || loading}
          color = 'orange'
          type = 'submit'
          content = 'LOGIN'
        />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
        New to ShopBuddy?{' '}
        <Link href='/signup'>
          <a>Create a new account</a>
        </Link>
    </Message>  
  </>);
}

export default Login;
