import React from 'react'
import { Header,Button,Modal } from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import { useRouter } from 'next/router'

function ProductAttributes({ description, _id, user }) {
  const [modal, setModal] = React.useState(false)
  const router = useRouter()
  const isRoot = user && user.role === 'root'
  const isAdmin = user && user.role === 'admin'
  const isRootOrAdmin = isRoot||isAdmin

  async function handleDelete(){
    const url = `${baseUrl}/api/product`
    const payload = { params : { _id }} // query params used as req.body in api
    await axios.delete(url,payload)
    router.push('/'); // Redirect to index page
  }
  return (
  <>
    <Header as = 'h3'> Product Details</Header>
    <p> {description} </p>
    {isRootOrAdmin && <>
    <Button
      icon = 'trash alternate outline'
      color = 'red'
      content = 'DELETE'
      onClick = { () => setModal(true)}
    />
     <Modal  open={modal} dimmer='blurring' >  {/* size = {'mini'} closeIcon */}
      <Modal.Header> Delete Item</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button 
        content='CANCEL'
        onClick = { () => setModal(false)}
        />
        <Button 
        negative
        color = 'red'
        content='DELETE'
        onClick = {handleDelete}
        />
      </Modal.Actions>
    </Modal>
    </>
    }
    </>
  )
}

export default ProductAttributes;
