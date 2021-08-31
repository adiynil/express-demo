var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin)// "http://127.0.0.1:5500"req.headers.origin
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With")
    res.header("Set-Cookies", "HttpOnly;Secure;SameSite=None")
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
    if (req.method === "OPTIONS") {
        res.send(200)
    } else {
        next()
    }
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    name: "sess_id",
    secret: "67e92ff1-93e6-4ba6-892d-d215f9eded83",
    resave: false,
    saveUninitialized: true,
  //   cookie:{sameSite: "none",
  //   // secure:true}
  // }
}))
// CORS跨域设置


app.post('/', function(req, res, next) {
    // console.log(req.hostname)
    // console.log(req.cookies.username)
    // console.log(req.cookies.AAAA)
    console.log(req.session.val)
    // res.cookie('AAAA', req.body.val)
    req.session.val = req.body.val
    res.send(req.session.val).end()
});

app.use('/users', usersRouter);

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
