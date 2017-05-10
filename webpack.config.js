
var config = {
    
   entry: ['webpack-dev-server/client?http://indus.www.shaadi.com:80/','./App.jsx'],
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
    server:'http://indus.www.shaadi.com', 
      inline: true,
      port: 80
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
            { 
               test: /\.css/, 
               loaders: ['style', 'css'] 
            } 
      ]
   }
}

module.exports = config;