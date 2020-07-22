import React from 'react'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import catchErrors from '../utils/catchErrors'
import {handleLogin} from '../utils/auth'
const INITIAL_USER = {
  name : '',
  email : '',
  password :''
}

function Signup() {
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
      const url = `${baseUrl}/api/signup`
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
      icon='signup'
      header = 'Looks like you are new here!'
      content = 'Create a new account'
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
          icon = 'user'
          iconPosition = 'left'
          label = 'Name'
          placeholder = 'Name'
          name = 'name'
          value = {user.name}
          onChange = {handleChange}
        />
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
        {/* confirm password */}
        <Button
          disabled = {disabled || loading}
          color = 'orange'
          type = 'submit'
          content = 'SIGN UP'
        />
      </Segment>
    </Form>
    <Message attached='bottom' warning>
        Existing User?{' '}
        <Link href='/login'>
          <a>Log In here</a>
        </Link>
    </Message>
  </>);
}

export default Signup;
