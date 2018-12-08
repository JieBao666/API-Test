Name: JIE BAO
ID: 20082475
github link:https://github.com/JieBao666/API-Test
1. Test Goods:
(1).findAll: Test all goods from the mongodb.
(2).findByPrice: Test a price and search for goods whose price is greater than that value.
(3).addGood: Add the value of goods attritubes and can get the new good.
(4).incrementAmount: Increase the number of amount.Every time post can add 1.
(5).deleteGood: Delete the good choosed by id.

2.Test Customers:
(1).findAll: Test all customers from the mongodb.
(2).findDetails: Aggreate three collections and get details about customers.
(3).addCustomer:Add the value of customers attritubes and can get the new customer.
(4).incrementUpvotes:Increase the number of upvotes.Every time post can add 1.
(5).deleteCustomer:Delete the customer choosed by id.

3.Test Ordgoods:
(1).findAll:Test all ordergoods from the mongodb.
(2).findByName: Fuzzy searches,get the ordergoods searched by 1 or more word in the name.
(3).addOrder:Add the value of orders attritubes and can get the new ordgood.
(4).incrementNumber: Increase the number of amount.Every time post can add 1.
(5).deleteOrdgood:Delete the ordgood choosed by id.

In good-test, I need to manual delete the testing case in the mlab.
In customers-test and ordgoods-test, I test the add method and the put method is based on the add case.At last, the delete method is delete the testing case which add method added to the mlab.So the database is not changed and we don't need to manual operation to the database.
