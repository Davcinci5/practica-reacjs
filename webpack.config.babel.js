//Dependencies
import webpack from 'webpack';
import path from 'path';
import ChunksPlugin from 'webpack-split-chunks';

//Enviroments
const isDevelopment = process.env.NODE_ENV !== 'production';

//Paths
const PATHS = {
    index: path.join(__dirname, 'src/index'),
    build: path.join(__dirname, 'src/public'),
    src: path.join(__dirname, 'src')
  };

  const getDevtool = () =>'cheap-module-eval-source-map'; // herramienta que nos ayuda ver nuestro codigo para hacer debbug
  const getEntry = () => {
      const entry = [
        PATHS.index //la ruta del index
      ];
      if(isDevelopment){
          entry.push('webpack-hot-middleware/client?reload=true'); // escucha cambios que estemos haciendo a nuestro webpack
      }

      return entry;
  };
  const getOuput = () =>({ // es un objeto y se utiliza cuando vamos a compilar para producción
	path: PATHS.build, //
	publicPath: '/',//
	filename: '[name].bundle.js'
    });

  const getPlugins = () => {
      const plugins = [
          new ChunksPlugin({
              to: 'vendor',
              test: /node_modules/
          })
      ];
      if(isDevelopment){
          plugins.push(
               // array plugins que se ponen por defecto, ejecutandolo como función
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
          );
      }else {
        plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              screw_ie8: true,
              warnings: false
            }
          })
        );
      }
      return plugins;
  };
  const getLoaders = () => ({ // vamos a cargar nuestros loaders que son paquetes que sirven para que el webpack puede interpretar una rchivo
    loaders: [
        {
            test: /\.js?$/, //expresion regular para detectaar archivos js
            loaders: ['babel-loader'], //carga babel loader
            include: PATHS.src  // examinara la carpeta unicamente en la carpeta src
        },
            {
            test: /(\.css)$/, //archivos css
            loaders: ['style-loader', 'css-loader']
            },
            {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, //archivos svg
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }]
});

//Webpack Config
export default { //esto es un json , escribiendo la configuración de webpack
    devtool: getDevtool(),
    entry: getEntry(),
    output: getOuput(),
	plugins:getPlugins(),
	module: getLoaders()
};
