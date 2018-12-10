# Assignment 2 - Web API - Automated development process.

Name: Jie Bao

## Overview.

This Web Api can realize the addition, deletion, modification and check of goods, and can query the basic information of shoppers, realize the addition, deletion, modification and check of shoppers, and can also realize the function of shopping cart to see which goods have been selected.

## API endpoints.
 
 + GET /goods - Get all goods.
 + GET /goods/:goods_price - Test a price and search for goods whose price is greater than that value.
 + POST /goods -  Add the value of goods attritubes and can get the new good.
 + PUT /goods/:id/amount -  Increase the number of amount.Every time post can add 1.
 + DELETE  /goods/:id -  Delete the good choosed by id.
 
 + GET /customers - Get all customers.
 + POST /customers -  Add the value of customers attritubes and can get the new customer.
 + PUT /customers/:customers_id/vote -  Increase the number of upvotes.Every time post can add 1.
 + DELETE  /customers/:customers_id -  Delete the customers choosed by customers_id.
 
  + GET /ordgoods - Get all ordgoods.
  + GET /ordgoods/:goods_name - Fuzzy searches,get the ordergoods searched by 1 or more word in the name.
  + POST /ordgoods - Add the value of orders attritubes and can get the new ordgood.
  + PUT /ordgoods/:id/number - Increase the number of amount.Every time put can add 1.
  + DELETE  /ordgoods/:id -  Delete the ordgood choosed by id.
 
## Continuous Integration and Test results.

URL of the Travis build page for web API.

https://www.travis-ci.org/JieBao666/API-Test

URL of published test coverage results on Coveralls  

https://coveralls.io/github/JieBao666/API-Test

## Extra features.

In login page, I had finished the function of login and we can sign in with three ways. But it is based on firebase authentication and surge doesn't have this function. So deploy to surge, we can't use login function. In map page, I had added google map API, but it only can uses 3 times in one day.

URL of the Firebase for vue app.

https://shoppingvue.firebaseapp.com

