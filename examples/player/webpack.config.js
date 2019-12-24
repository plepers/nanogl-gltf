

const path = require('path');

module.exports = {
  entry: path.resolve( __dirname, 'src/index.ts' ),
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },

  output: {
    filename: 'main.js',
    path: path.resolve( __dirname, 'dist' ),
  },

  devServer: {
    contentBase: path.join( __dirname, 'dist' )
  }
};