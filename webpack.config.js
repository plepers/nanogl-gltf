

const webpack = require('webpack');


const _path = require('path');
const path = p=>_path.resolve( __dirname, p );



module.exports =
{
  // target:'node',

  mode: 'development',

  devtool:'(none)',

  entry: [
    './src/index.ts'
  ],

  resolve: {
    modules: [
      path( 'test' ),
      path( 'src' ),
      path( 'node_modules')
    ]
  },


  module : {
    rules : [

    
    {
      test: /\.ts$/,
      use: [
        // "babel-loader",
        "ts-loader",
      ]
    }

  ]
  },


  output: {
    filename: '[name].js',
    path: path( 'tests/build')
  },





};