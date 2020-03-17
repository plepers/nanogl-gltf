

const path = require('path');
const resolvePath = (p)=>path.resolve( __dirname, p )


module.exports = {

  mode : 'development',
  devtool: '(none)',

  entry: resolvePath( 'src/index.ts' ),
  
  module: {
    rules: [
      
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // GLSL
      {
        test: /\.(vert|frag|glsl)$/,
        use: 'nanogl-template/lib/compiler'
      },

    ],
  },
  
  resolve: {

    extensions: [ '.ts', '.js' ],

    modules: [
      resolvePath('src'),
      resolvePath('../../src'),
      resolvePath('../../node_modules'),
    ],

    alias: {
      'nanogl-gltf': resolvePath('../../src/'),
    }
  },

  output: {
    filename: 'main.js',
    path: resolvePath( 'dist' ),
  },

  devServer: {
    contentBase: [
      path.join( __dirname, 'dist' ),
      path.join( __dirname, '../../test/samples' )
    ]
  }
};