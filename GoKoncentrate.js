const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var fileUpload=require('express-fileupload');
const routes = require('./routes/routes')
const flash = require('connect-flash');
const port = process.env.PORT || 3191;
const app = express();
var http = require('http').createServer(app);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('trust proxy', 1)
app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));

//app.use(fileUpload());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var cors = require('cors');    
app.use(cors());
const apiroutes = require('./routes/apiroutes.js');
app.use('/api',apiroutes)
// app.use(function(req, res, next) {
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
//   });

//app.use(session({secret:'secret', resave: false, saveUninitialized: true, cookie: {maxAge: 24 * 60 * 60 * 365 * 1000}}));
const expressSession = require('cookie-session')

   var expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session1 = expressSession({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secureProxy: true,
        httpOnly: true,
        domain: 'example.com',
        expires: expiryDate
      }
    })

    app.use(session1)
// app.use (
//     session ({
//     secret: "secret",
//     saveUninitialized: false,
//     resave: true,
//     rolling: true,
//     cookie: {
//     expires: 20 * 1000
//     }
//     })
//     );
app.use(flash());
require('./routes/routes')(app);
// app.use('/admin', routes);

http.listen(port, function(){
    console.log(`listening on *: ${port}`);
});