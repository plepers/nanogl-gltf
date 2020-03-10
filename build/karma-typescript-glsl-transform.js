
const acorn = require('acorn');

const compiler = require('nanogl-template/lib/compiler');

const filter =  /(\.glsl)|(\.vert)|(\.frag)$/;

const transform = (context, callback) => {

  if (context.filename.match(filter)) {
    
    if (!context.source) {
      return callback(new Error("File is empty"), false);
    }
    
    context.source = compiler(context.source, { module: 'cjs' });
    try {
      context.js.ast = acorn.parse(context.source, { sourceType: "module" });
    } catch( e ){
      console.log( e );
    }
    
    callback(undefined, {
      dirty: true,
      transpile: true,
      transformedScript: true,
    });

  }
  else {
    return callback(undefined, false);
  }
};

const initialize = (logOptions) => {

};

module.exports = Object.assign(transform, { initialize });

