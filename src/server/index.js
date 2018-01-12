//Dependencies
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open'; // sirve para abrir nuestra aplicaicón en el navegador, sino hay erroes

//Webpack Configuration
import webpackConfig from '../../webpack.config.babel';

//API
import blogApi from './api/blog';

//Server Port
const port = 3000;

//Enviroment
const isDevelopment = process.env.NODE_ENV !== 'production';
// Express app
const app = express();

// Public

app.use(express.static(path.join(__dirname, '../public')));



//Webpack Compiler ---------nos dará un compilador con toda la configuración cargada
const webpackCompiler = webpack(webpackConfig);

if(isDevelopment){
  //Webpack Middlewares
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}

//API dispatch
app.use('/api/blog',blogApi);

//sending all traffic to React mandar todo el trafico de la aplicación
app.get('*',(req, res)=>{  //* = todo el trafico, hacemos un req y un res
  res.sendFile(path.join(__dirname, '../public/index.html')); //<-- aquí se va a utilizar nuestro archivo html
});

//Listen port
app.listen(port, err => {
  if(!err){
   open(`http://localhost:${port}`);
  }
});

