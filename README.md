# ShopBuddy :shopping_cart:
Interactive Online Marketplace website that facilitates product buying and selling

### Features
* Authentication
* Role-based Authorization
* Seller can post products
* Product Page with details about each product
* Add to Cart
* Checkout using Stripe
* Order History
* Validation, Error & Exception Handling

### Screenshots
Home Screen               |  Product Detail               | Cart               |  Checkout
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![]()|![]()|![]()|![]()|
Order History
### Tech stack
* MERN Stack
## Dependencies
<details>
     <summary> Click to expand </summary>
  * [Cloudinary](https://pub.dev/packages/cached_network_image)
  * [Stripe]()
</details>
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

### Todo
- [ ] Confirm Password
- [ ] Signup email confirmation
- [ ] order placed - email
- [ ] Search products
- [ ] Recommendation
