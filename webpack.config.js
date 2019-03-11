

const webpack = require('webpack');


const _path = require('path');
const path = p=>_path.resolve( __dirname, p );



module.exports =
{
  // target:'node',

  mode: 'development',

  devtool:'(none)',

  entry: [
    './src/index.js'
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

    // JS
    {
      test: /\.js$/,
      include: [path( 'src' )],
      use: [
        "babel-loader",
        "remove-flow-types-loader",
      ]
    }]
  },


  output: {
    filename: '[name].js',
    path: path( 'tests/build')
  },





  // temp since tex loader is in dev
  resolveLoader : {
    alias: {
      'nanogl-texture-loader': path('texture-loader')
    }
  },

};