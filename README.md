# ShopBuddy :shopping_cart:
Interactive Online Marketplace website that facilitates product buying and selling

### Features
- [x]  Authentication
    - [x]  Signup with email ID
    - [ ]  Signup email confirmation
- [x]  Role-based Authorization
- [x]  Buyer
    - [x]  Browse Product List
    - [ ]  Search products
    - [ ]  Sort & Filter products
    - [ ]  Recommendation
    - [x]  Product Detail Page 
    - [x]  Add to Cart
    - [x]  Checkout using Stripe
    - [ ]  Order Placed email confirmation
    - [x]  Order History
- [x]  Seller 
    - [x]  Post products
- [x]  Security, Validation, Error & Exception Handling

Role Name	Permissions
roles/viewer	Permissions for read-only actions that do not affect state, such as viewing (but not modifying) existing resources or data.
roles/editor	All viewer permissions, plus permissions for actions that modify state, such as changing existing resources.
roles/owner	All editor permissions and permissions for the following actions: Manage roles and permissions for a project and all resources within the project; Set up billing for a project.

### Screenshots
Home Screen               |  Product Detail               | Cart               |  Checkout
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![]()|![]()|![]()|![]()|
Order History               |  Product Detail               | Cart               |  Checkout
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:

### Tech stack
* [MongoDB](https://www.mongodb.com/cloud/atlas)
* Express
* React JS
* Node JS

### Dependencies
* [Cloudinary](https://cloudinary.com/)
* [Stripe](https://stripe.com/en-in)

### Setup
Basic Installation
```console
dhanya@dhanya:~$ git clone https://github.com/Dhanya-Abhirami/ShopBuddy.git
dhanya@dhanya:~$ cd ShopBuddy
dhanya@dhanya:~/ShopBuddy$ npm install
```
Create a file next.config.json
```javascript
module.exports = {
  env: {
    MONGO_SRV: "",
    JWT_SECRET: "",
    CLOUDINARY_URL: "",
    STRIPE_SECRET_KEY: ""
  }
};
```
Run Server in Development Mode
```console
dhanya@dhanya:~$ npm run dev
```
### References
* [Reed Barger](https://github.com/reedbarger/react-reserve)
* Colours inspired from [Flipkart](https://www.flipkart.com/)

### Todo
- [ ] Confirm Password
