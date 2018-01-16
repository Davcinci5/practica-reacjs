//Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open'; // sirve para abrir nuestra aplicaicón en el navegador, sino hay erroes
import exphbs from 'express-handlebars'

//Webpack Configuration
import webpackConfig from '../../webpack.config.babel';

//API
import blogApi from './api/blog';

// Helpers
import * as hbsHelper from '../lib/handlebars';

//Utilis
import { isMobile } from '../lib/utils/device';

//Server Port
const port = 3000;

//Enviroment
const isDevelopment = process.env.NODE_ENV !== 'production';
// Express app
const app = express();

// Public
app.use(express.static(path.join(__dirname, '../public')));

//Handlebars setup
app.engine('.hbs',exphbs({
  extname: '.hbs',
  helpers: hbsHelper
}));

//View Engine Setup
app.set('views',path.join(__dirname, './views'));
app.set('view engine','.hbs');

//Webpack Compiler ---------nos dará un compilador con toda la configuración cargada
const webpackCompiler = webpack(webpackConfig);

if(isDevelopment){
  //Webpack Middlewares
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}
// Devise detector
app.use((req,res,next) => {
  res.locals.isMobile = isMobile(req.headers['user-agent']); //true  false
  return next(); //salir del middleware
})

//API dispatch
app.use('/api/blog',blogApi);

//sending all traffic to React mandar todo el trafico de la aplicación
app.get('*',(req, res)=>{  //* = todo el trafico, hacemos un req y un res
  res.render('frontend/index',{
    layout: false
  });
});

//Listen port
app.listen(port, err => {
  if(!err){
   open(`http://localhost:${port}`);// se tiene que poner invertidas para concatenar texto, para agregar codigo embebido
  }
});

