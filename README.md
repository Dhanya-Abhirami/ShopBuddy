# ShopBuddy
Online Shopping website


## Tech stack
* MERN Stack
* API's from Cloudinary, Stripe

# Installation
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