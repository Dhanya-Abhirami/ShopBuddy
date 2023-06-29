<br />
<p align="center">
  <a href="https://github.com/Dhanya-Abhirami/ShopBuddy">
    <img src="https://github.com/Dhanya-Abhirami/ShopBuddy/blob/master/static/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">ShopBuddy</h3>

  <p align="center">
    Interactive Online Marketplace website that facilitates product buying and selling
    <br />
    <a href="https://github.com/Dhanya-Abhirami/ShopBuddy">View Demo</a>
    ·
    <a href="https://github.com/Dhanya-Abhirami/ShopBuddy/issues">Report Bug/Request Feature</a>
  </p>
</p>

The site is made for educational purposes!
### Features
- [x]  Authentication
    - [ ] Confirm Password
    - [ ] Password Reset
    - [x] Signup with email ID
    - [ ] Signup OAuth (Gmail,Github,Twitter)
    - [ ] Verify Email
- [x]  Role-based Authorization
- [x]  Buyer
    - [x]  Browse Product List
    - [ ]  Search products
    - [ ]  Sort & Filter products
    - [ ]  Recommendation
    - [x]  Product Detail Page 
    - [x]  Add to Cart
    - [x]  Checkout using Stripe
    - [ ]  Checkout using other services (Razorpay)
    - [ ]  Order Placed email confirmation
    - [x]  Order History
    - [ ]  Scheduled Email (Cron Job) for users with cart not checked out
- [x]  Seller 
    - [x]  Create products
    - [x]  Upload images to Cloud Storage(Cloudinary)
- [x]  Security, Validation, Error & Exception Handling

# REST APIs
Swagger Documentation
```

```

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

### Built With


### Tech stack
* Database hosted in [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* Backend - Node JS (Express and [Axios](https://www.npmjs.com/package/axios))
* Frontend - React JS
* Payments handled through [Stripe](https://stripe.com/en-in)
* Images in [Cloudinary](https://cloudinary.com/)

### Setup
1. Get a free API Key from MongoDB Atlas, Cloudinary, Stripe
2. Clone the repo
  ```console
  dhanya@dhanya:~$ git clone https://github.com/Dhanya-Abhirami/ShopBuddy.git
  dhanya@dhanya:~$ cd ShopBuddy
  ```
3. Enter your API keys in next.config.js
  ```json
    MONGO_SRV: "",
    JWT_SECRET: "",
    CLOUDINARY_URL: "",
    STRIPE_SECRET_KEY: ""
  ```
4. Build Docker Image
  ```console
  dhanya@dhanya:~/ShopBuddy$ make build
  ```
5. Run
  ```console
  dhanya@dhanya:~/ShopBuddy$ make run
  ```
6. Stop
  ```console
  dhanya@dhanya:~/ShopBuddy$ make stop
  ```

### References
* [Reed Barger](https://github.com/reedbarger/react-reserve)
* Colours inspired from [Flipkart](https://www.flipkart.com/)


