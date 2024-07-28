

# eCommerce Backend API

This project is a backend API for an eCommerce platform. It includes functionalities for user authentication, product management, cart management, and seller management. The API is built using Node.js, Express, and MongoDB.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User API](#user-api)
    - [Sign Up](#sign-up)
    - [Login](#login)
    - [Logout](#logout)
    - [Forget Password](#forget-password)
  - [Products API](#products-api)
    - [Add Products](#add-products)
    - [Delete Products](#delete-products)
    - [Update Products](#update-products)
  - [Wishlist API](#wishlist-api)
  - [Seller API](#seller-api)
    - [Seller Sign Up](#seller-sign-up)
    - [Seller Login](#seller-login)
- [License](#license)

## Installation

1. Clone the repository


*********************************************************************** 

 POST : Sign UP API
https://e-commerce-u5oz.onrender.com/ecom/signup  
	
jOSN BODY : FOR SIGN UP
{
    "email": "second@example.com",
    "mobileNo": "9876543220",
    "password": "password123",
    "firstname": "secomd"
}


*********************************************************************** 
POST : Login API
https://e-commerce-u5oz.onrender.com/ecom/login

jOSN BODY : FOR LOGIN:
{
    "email":"first@example.com",
    "password":"password123"
}

***********************************************************************
POST : LOGOUT API
https://e-commerce-u5oz.onrender.com/ecom/logout
jOSN BODY : FOR LOGIN:
{
    "email":"first@example.com"
}



***********************************************************************
POST : FORGET PASSWORD API
https://e-commerce-u5oz.onrender.com/ecom/reset-password

jOSN BODY : FORGET PASSWORD:
{
    "email":"first@example.com"
}


***********************************************************************
GET : THIS IS A GET API REQUEST TO GET ALL PRODUCT

https://e-commerce-u5oz.onrender.com/ecom/products/list

***********************************************************************
POST : Seller Signup API

https://e-commerce-u5oz.onrender.com/seller/signup


jOSN BODY : SELLER SIGN UP:
{
        "sellerEmail": "PARASMORE.doe@example.com",
        "SellerMobile": "1234567880",
        "password":"password123",
        "name": "John Doe",
        "GSTNO": "27AAAPL1234C1ZV"
    }
***********************************************************************
POST :
This is a POST API FOR SELLER TO LOGIN

https://e-commerce-u5oz.onrender.com/seller/login

json BODY :
{
    "email":"paras.dsoe@example.com",
    "password":"password123"
}
***********************************************************************
POST : ADD PRODUCT  API FOR SELLER

https://e-commerce-u5oz.onrender.com/seller/addproduct
JSON POST DATA:
{
            "title": "Paraproduct from paras more",
            "description": "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume 		     Oil",
            "price": 230,
            "discountPercentage": 15.6,
            "rating": 4.21,
            "stock": 114,
            "brand": "Al Munakh",
            "category": "fragrances",
            "thumbnail": "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/14/1.jpg",
                "https://i.dummyjson.com/data/products/14/2.jpg",
                "https://i.dummyjson.com/data/products/14/3.jpg",
                "https://i.dummyjson.com/data/products/14/thumbnail.jpg"
            ]
        }
***********************************************************************

POST : DELETE PRODUCT POST API FOR SELLER 

https://e-commerce-u5oz.onrender.com/deleteproduct/:productID

***********************************************************************
POST : UDPATE PRODUCT DATA FOR SELLER

https://e-commerce-u5oz.onrender.com/seller/updateproduct/:productID


***********************************************************************
GET API FOR GETTING WISHLIST AFTER LOGIN

https://e-commerce-u5oz.onrender.com/products/wishlist/

***********************************************************************
POST :  API FOR ADDING PRODUCTS INTO THE WISHLIST

https://e-commerce-u5oz.onrender.com/products/addwishlist/

JSON BDOY : THIS WILL BE PRODUCT ID 
{
    "id":"66a5574671534fa7ff963c58"
}

***********************************************************************
POST :  API FOR DELETING REMOVING THE WISHLIST

https://e-commerce-u5oz.onrender.com/products/deletewishlist/

JSON BDOY : THIS WILL BE PRODUCT ID 
{
    "id":"66a5574671534fa7ff963c58"
}

***********************************************************************
POST :  API TO UPLOAD A BLOG

https://e-commerce-u5oz.onrender.com/blogs/addblog/
JSON BODY:
{
    "title": "The Beauty of SPorts",
    "content": "Sports is an essential and integral part of humanity. It provides us with the resources to lead a healthy and prosperous life."
}
***********************************************************************
POST :  API TO DELETE BLOG

https://e-commerce-u5oz.onrender.com/blogs/deleteblog/:blogId

***********************************************************************
POST :  API FOR UPDATION OF BLOGS

https://e-commerce-u5oz.onrender.com/blogs/updateBlog/66a6508f6c6caad1de5150ab

JSON DATA MUST HAVE TITLE OR CONTENT IN BODY:
{
    "title":"new udpated title from seind"
}

***********************************************************************
POST : API TO ADD THE PRODUCTS ITEMS INTO CART
https://e-commerce-u5oz.onrender.com/cart/additem

JSON DATA :
{
    "productID":"66a5574671534fa7ff963c5f",
    "title":"Infinix INBOOK",
    "quantity":2    
}

***********************************************************************

POST :  API TO DELTE THE ITEMS FROM THE CART

https://e-commerce-u5oz.onrender.com/cart/deletecart

{
    "productID":"66a5574671534fa7ff963c61"
}

***********************************************************************













