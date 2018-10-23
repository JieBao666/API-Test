var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const goods = require("./routes/goods");
const customers = require("./routes/customers");
const ordgoods = require("./routes/ordgoods");
var app = express();
if (process.env.NODE_ENV |= 'test') {  
  app.use(logger('dev'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/goods', goods.findAll);
//app.get('/goods/:id', goods.findOne);
app.get('/goods/:goods_price',goods.findByPrice);
app.get('/ordgoods/:goods_name', ordgoods.findByName);
app.get('/customers', customers.findAll);
app.get('/customers/:customers_id', customers.findOne);
app.get('/ordgoods', ordgoods.findAll);
app.post('/goods',goods.addGood);
app.post('/customers',customers.addCustomer);
app.put('/goods/:id/amount', goods.incrementAmount);
app.put('ordgoods/:id/number',ordgoods.incrementAmount);
app.put('/customers/:customers_id/vote', customers.incrementUpvotes);
app.delete('/goods/:id', goods.deleteGood);
app.delete('/customers/:customers_id', customers.deleteCustomer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
