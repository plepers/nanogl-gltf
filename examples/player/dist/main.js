/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/player/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/player/src/index.ts":
/*!**************************************!*\
  !*** ./examples/player/src/index.ts ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nanogl_gltf_io_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanogl-gltf/io/web */ "./src/io/web.ts");

console.log('toto');
nanogl_gltf_io_web__WEBPACK_IMPORTED_MODULE_0__["default"].loadGltf('./models/Avocado.glb').then((gltf) => {
});


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = __webpack_require__(/*! ./gl-matrix/common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");
exports.mat2 = __webpack_require__(/*! ./gl-matrix/mat2.js */ "./node_modules/gl-matrix/src/gl-matrix/mat2.js");
exports.mat2d = __webpack_require__(/*! ./gl-matrix/mat2d.js */ "./node_modules/gl-matrix/src/gl-matrix/mat2d.js");
exports.mat3 = __webpack_require__(/*! ./gl-matrix/mat3.js */ "./node_modules/gl-matrix/src/gl-matrix/mat3.js");
exports.mat4 = __webpack_require__(/*! ./gl-matrix/mat4.js */ "./node_modules/gl-matrix/src/gl-matrix/mat4.js");
exports.quat = __webpack_require__(/*! ./gl-matrix/quat.js */ "./node_modules/gl-matrix/src/gl-matrix/quat.js");
exports.vec2 = __webpack_require__(/*! ./gl-matrix/vec2.js */ "./node_modules/gl-matrix/src/gl-matrix/vec2.js");
exports.vec3 = __webpack_require__(/*! ./gl-matrix/vec3.js */ "./node_modules/gl-matrix/src/gl-matrix/vec3.js");
exports.vec4 = __webpack_require__(/*! ./gl-matrix/vec4.js */ "./node_modules/gl-matrix/src/gl-matrix/vec4.js");

/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/common.js":
/*!********************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/common.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

module.exports = glMatrix;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/mat2.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/mat2.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 


module.exports = mat2;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/mat2d.js":
/*!*******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/mat2d.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

module.exports = mat2d;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/mat3.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/mat3.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


module.exports = mat3;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/mat4.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/mat4.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;
    
    if (Math.abs(len) < glMatrix.EPSILON) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    
    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    
    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,
      
      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];
      
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;
        
  return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


module.exports = mat4;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/quat.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/quat.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");
var mat3 = __webpack_require__(/*! ./mat3.js */ "./node_modules/gl-matrix/src/gl-matrix/mat3.js");
var vec3 = __webpack_require__(/*! ./vec3.js */ "./node_modules/gl-matrix/src/gl-matrix/vec3.js");
var vec4 = __webpack_require__(/*! ./vec4.js */ "./node_modules/gl-matrix/src/gl-matrix/vec4.js");

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

module.exports = quat;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/vec2.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/vec2.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

module.exports = vec2;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/vec3.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/vec3.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

module.exports = vec3;


/***/ }),

/***/ "./node_modules/gl-matrix/src/gl-matrix/vec4.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-matrix/src/gl-matrix/vec4.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(/*! ./common.js */ "./node_modules/gl-matrix/src/gl-matrix/common.js");

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

module.exports = vec4;


/***/ }),

/***/ "./node_modules/nanogl-node/index.js":
/*!*******************************************!*\
  !*** ./node_modules/nanogl-node/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/src/gl-matrix.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gl_matrix__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./node_modules/nanogl-node/math.js");


const MAT3 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat3"].create(), VX = (new Float32Array(MAT3.buffer, 0 * 4, 3)), VY = (new Float32Array(MAT3.buffer, 3 * 4, 3)), VZ = (new Float32Array(MAT3.buffer, 6 * 4, 3)), VUP = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(0, 1, 0);
class Node {
    constructor() {
        this.position = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        this.rotation = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].create();
        this.scale = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(1, 1, 1);
        this._matrix = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this._wmatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this._wposition = new Float32Array(this._wmatrix.buffer, 12 * 4, 3);
        this._parent = null;
        this._children = [];
        this._invalidM = true;
        this._invalidW = true;
    }
    rotateX(rad) { gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].rotateX(this.rotation, this.rotation, rad); this.invalidate(); }
    rotateY(rad) { gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].rotateY(this.rotation, this.rotation, rad); this.invalidate(); }
    rotateZ(rad) { gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].rotateZ(this.rotation, this.rotation, rad); this.invalidate(); }
    set x(v) { this.position[0] = v; this.invalidate(); }
    set y(v) { this.position[1] = v; this.invalidate(); }
    set z(v) { this.position[2] = v; this.invalidate(); }
    get x() { return this.position[0]; }
    get y() { return this.position[1]; }
    get z() { return this.position[2]; }
    setScale(s) {
        this.scale[0] =
            this.scale[1] =
                this.scale[2] = s;
        this.invalidate();
    }
    lookAt(tgt) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].subtract(VZ, this.position, tgt);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(VZ, VZ);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].cross(VX, VUP, VZ);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(VX, VX);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].cross(VY, VZ, VX);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].fromMat3(this.rotation, MAT3);
        this.invalidate();
    }
    setMatrix(m4) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].copy(this._matrix, m4);
        Object(_math__WEBPACK_IMPORTED_MODULE_1__["decomposeMat4"])(m4, this.position, this.rotation, this.scale);
        this._invalidM = false;
        this._invalidW = true;
    }
    add(child) {
        if (this._children.indexOf(child) === -1) {
            if (child._parent !== null) {
                child._parent.remove(child);
            }
            this._children.push(child);
            child._parent = this;
        }
    }
    remove(child) {
        const i = this._children.indexOf(child);
        if (i > -1) {
            this._children.splice(i, 1);
            child._parent = null;
        }
    }
    invalidate() {
        this._invalidM = true;
        this._invalidW = true;
    }
    updateMatrix() {
        if (this._invalidM) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].fromRotationTranslationScale(this._matrix, this.rotation, this.position, this.scale);
            this._invalidM = false;
        }
    }
    updateWorldMatrix(skipParents = false) {
        this.updateMatrix();
        const invalidWorldMatrix = this._hasInvalidWorldMatrix(skipParents);
        if (invalidWorldMatrix) {
            this._computeWorldMatrix(skipParents);
        }
        for (var i = 0; i < this._children.length; i++) {
            var c = this._children[i];
            c._invalidW = c._invalidW || invalidWorldMatrix;
            c.updateWorldMatrix(true);
        }
    }
    _computeWorldMatrix(skipParents) {
        const p = this._parent;
        if (p !== null) {
            if (!skipParents && p._hasInvalidWorldMatrix(false)) {
                p.updateMatrix();
                p._computeWorldMatrix(false);
            }
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].multiply(this._wmatrix, p._wmatrix, this._matrix);
        }
        else {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].copy(this._wmatrix, this._matrix);
        }
        this._invalidW = false;
    }
    _hasInvalidWorldMatrix(skipParents) {
        return this._invalidW || (!skipParents && this._parent !== null && this._parent._hasInvalidWorldMatrix(false));
    }
}
;
/* harmony default export */ __webpack_exports__["default"] = (Node);


/***/ }),

/***/ "./node_modules/nanogl-node/math.js":
/*!******************************************!*\
  !*** ./node_modules/nanogl-node/math.js ***!
  \******************************************/
/*! exports provided: decomposeMat4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decomposeMat4", function() { return decomposeMat4; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/src/gl-matrix.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gl_matrix__WEBPACK_IMPORTED_MODULE_0__);

const M3 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat3"].create();
function decomposeMat4(m4, p, q, s) {
    p[0] = m4[12];
    p[1] = m4[13];
    p[2] = m4[14];
    s[0] = Math.sqrt(m4[0] * m4[0] + m4[1] * m4[1] + m4[2] * m4[2]);
    s[1] = Math.sqrt(m4[4] * m4[4] + m4[5] * m4[5] + m4[6] * m4[6]);
    s[2] = Math.sqrt(m4[8] * m4[8] + m4[9] * m4[9] + m4[10] * m4[10]);
    M3[0] = m4[0] / s[0];
    M3[1] = m4[1] / s[0];
    M3[2] = m4[2] / s[0];
    M3[3] = m4[4] / s[1];
    M3[4] = m4[5] / s[1];
    M3[5] = m4[6] / s[1];
    M3[6] = m4[8] / s[2];
    M3[7] = m4[9] / s[2];
    M3[8] = m4[10] / s[2];
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].fromMat3(q, M3);
}


/***/ }),

/***/ "./node_modules/nanogl-pbr/Chunk.js":
/*!******************************************!*\
  !*** ./node_modules/nanogl-pbr/Chunk.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chunk; });
class Chunk {
    constructor(hasCode = false, hasSetup = false) {
        this._ref = null;
        this._lists = new Set();
        this._hasCode = hasCode;
        this._hasSetup = hasSetup;
        this._invalid = true;
        this._children = [];
    }
    collectChunks(all, actives) {
        all.push(this);
        if (this._ref !== null) {
            this._ref.collectChunks(all, actives);
        }
        else {
            for (const child of this._children) {
                child.collectChunks(all, actives);
            }
            actives.push(this);
        }
    }
    detectCyclicDependency(chunk) {
        const all = [];
        const actives = [];
        chunk.collectChunks(all, actives);
        const index = all.indexOf(this);
        return index > -1;
    }
    addChild(child) {
        if (this._children.indexOf(child) > -1) {
            return child;
        }
        if (this.detectCyclicDependency(child)) {
            throw new Error(`Chunk.addChild() will lead to cyclic dependency`);
        }
        this._children.push(child);
        this.invalidateList();
        return child;
    }
    removeChild(child) {
        var i = this._children.indexOf(child);
        if (i > -1) {
            this._children.splice(i, 1);
        }
        this.invalidateList();
    }
    genCode(slots) {
        if (this._ref !== null) {
            this._ref.genCode(slots);
        }
        else {
            this._genCode(slots);
        }
    }
    getHash() {
        if (this._ref !== null) {
            return this._ref.getHash();
        }
        else {
            return this._getHash();
        }
    }
    get hasCode() {
        if (this._ref !== null) {
            return this._ref.hasCode;
        }
        else {
            return this._hasCode;
        }
    }
    get hasSetup() {
        if (this._ref !== null) {
            return this._ref.hasSetup;
        }
        else {
            return this._hasSetup;
        }
    }
    get isInvalid() {
        if (this._ref !== null) {
            return this._ref.isInvalid;
        }
        else {
            return this._invalid;
        }
    }
    setup(prg) {
    }
    addList(list) {
        this._lists.add(list);
    }
    removeList(list) {
        this._lists.delete(list);
    }
    invalidateList() {
        for (const l of this._lists.values()) {
            l.invalidateList();
        }
    }
    invalidateCode() {
        for (const l of this._lists.values()) {
            l.invalidateCode();
        }
    }
    proxy(ref = null) {
        if (this._ref === ref)
            return;
        if (ref !== null && this.detectCyclicDependency(ref)) {
            throw new Error(`Chunk.proxy() will lead to cyclic dependency`);
        }
        this._ref = ref;
        this.invalidateList();
    }
    createProxy() {
        const Class = Chunk;
        const p = new Class();
        p.proxy(this);
        return p;
    }
}


/***/ }),

/***/ "./node_modules/nanogl-pbr/ChunkCollection.js":
/*!****************************************************!*\
  !*** ./node_modules/nanogl-pbr/ChunkCollection.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChunkCollection; });
/* harmony import */ var _ChunksSlots__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChunksSlots */ "./node_modules/nanogl-pbr/ChunksSlots.js");

class ChunkCollection {
    constructor() {
        this._invalidList = true;
        this._invalidCode = true;
        this._revision = 0;
        this._chunks = [];
        this._all = [];
        this._actives = [];
        this._setups = [];
        this._codes = [];
        this._cachedSlots = null;
    }
    add(chunk) {
        if (this._chunks.indexOf(chunk) === -1) {
            this._chunks.push(chunk);
            this.invalidateList();
        }
        return chunk;
    }
    remove(chunk) {
        const i = this._chunks.indexOf(chunk);
        if (i > -1) {
            this._chunks.splice(i, 1);
            this.invalidateList();
        }
    }
    addChunks(chunks) {
        for (const c of chunks) {
            this.add(c);
        }
    }
    invalidateList() {
        this._invalidList = true;
        this.invalidateCode();
    }
    invalidateCode() {
        if (!this._invalidCode) {
            this._invalidCode = true;
            this._revision++;
        }
    }
    isInvalid() {
        return this._invalidList || this._invalidCode;
    }
    getRevision() {
        return this._revision;
    }
    _collectChunks() {
        const all = this._all, setups = this._setups, codes = this._codes, actives = this._actives;
        for (const chunk of all) {
            chunk.removeList(this);
        }
        all.length = 0;
        setups.length = 0;
        codes.length = 0;
        actives.length = 0;
        for (const chunk of this._chunks) {
            chunk.collectChunks(all, actives);
        }
        for (const chunk of actives) {
            chunk.hasSetup && setups.push(chunk);
            chunk.hasCode && codes.push(chunk);
        }
        for (const chunk of all) {
            chunk.addList(this);
        }
        this._invalidList = false;
    }
    setupProgram(prg) {
        for (const chunk of this._setups) {
            chunk.setup(prg);
        }
    }
    getCode(base) {
        if (this._invalidList) {
            this._collectChunks();
        }
        if (this._cachedSlots === null || this._invalidCode) {
            const slots = new _ChunksSlots__WEBPACK_IMPORTED_MODULE_0__["default"]();
            for (const chunk of this._codes) {
                chunk.genCode(slots);
                slots.hash += chunk.getHash();
            }
            this._cachedSlots = slots;
            this._invalidCode = false;
        }
        if (base !== undefined) {
            base.merge(this._cachedSlots);
            return base;
        }
        return this._cachedSlots;
    }
}


/***/ }),

/***/ "./node_modules/nanogl-pbr/ChunksSlots.js":
/*!************************************************!*\
  !*** ./node_modules/nanogl-pbr/ChunksSlots.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class ChunkSlots {
    constructor() {
        this.slots = [];
        this.slotsMap = {};
        this.hash = '';
    }
    getSlot(id) {
        var s = this.slotsMap[id];
        if (s === undefined) {
            s = {
                key: id,
                code: ''
            };
            this.slotsMap[id] = s;
            this.slots.push(s);
        }
        return s;
    }
    add(slotId, code) {
        this.getSlot(slotId).code += code + '\n';
    }
    merge(other) {
        this.hash += other.hash;
        for (var os of other.slots) {
            this.add(os.key, os.code);
        }
    }
}
;
/* harmony default export */ __webpack_exports__["default"] = (ChunkSlots);


/***/ }),

/***/ "./node_modules/nanogl-pbr/Enum.js":
/*!*****************************************!*\
  !*** ./node_modules/nanogl-pbr/Enum.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chunk */ "./node_modules/nanogl-pbr/Chunk.js");

function defReducer(res, v, i) {
    res += `#define ${v} ${i + 1}\n`;
    return res;
}
class Enum extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, penum) {
        super(true, false);
        this.name = name;
        this.values = penum;
        this._valIndex = 0;
        this._val = this.values[0];
        this._enumDefs = this.values.reduce(defReducer, '');
        this._accesDef = `#define ${this.name}(k) VAL_${this.name} == k`;
    }
    set(val) {
        if (this._val === val) {
            return;
        }
        const idx = this.values.indexOf(val);
        if (idx === -1) {
            throw new Error(`invalide Enum value :${val}`);
        }
        if (this._valIndex !== idx) {
            this._valIndex = idx;
            this._val = val;
            this.invalidateCode();
        }
    }
    _genCode(slots) {
        const c = [
            this._enumDefs,
            `#define VAL_${this.name} ${this._val}`,
            this._accesDef
        ].join('\n');
        slots.add('definitions', c);
    }
    _getHash() {
        return `${this.name}${this._valIndex}`;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Enum);


/***/ }),

/***/ "./node_modules/nanogl-pbr/Flag.js":
/*!*****************************************!*\
  !*** ./node_modules/nanogl-pbr/Flag.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chunk */ "./node_modules/nanogl-pbr/Chunk.js");

class Flag extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, val = false) {
        super(true, false);
        this.name = name;
        this._val = !!val;
    }
    enable() {
        this.set(true);
    }
    disable() {
        this.set(false);
    }
    set(val = false) {
        if (this._val !== val) {
            this._val = val;
            this.invalidateCode();
        }
    }
    _genCode(slots) {
        const c = `#define ${this.name} ${~~this._val}`;
        slots.add('definitions', c);
    }
    _getHash() {
        return `${this.name}${~~this._val}`;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Flag);


/***/ }),

/***/ "./node_modules/nanogl-pbr/Input.js":
/*!******************************************!*\
  !*** ./node_modules/nanogl-pbr/Input.js ***!
  \******************************************/
/*! exports provided: ShaderType, Sampler, Uniform, Attribute, Constant, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaderType", function() { return ShaderType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sampler", function() { return Sampler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uniform", function() { return Uniform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constant", function() { return Constant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Input; });
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chunk */ "./node_modules/nanogl-pbr/Chunk.js");

const TYPES = [
    null,
    'float',
    'vec2',
    'vec3',
    'vec4'
];
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["FRAGMENT"] = 1] = "FRAGMENT";
    ShaderType[ShaderType["VERTEX"] = 2] = "VERTEX";
    ShaderType[ShaderType["ALL"] = 3] = "ALL";
})(ShaderType || (ShaderType = {}));
function _trimComps(comps, size) {
    const l = comps.length;
    if (l === size) {
        return comps;
    }
    if (l > size) {
        return comps.substr(0, size);
    }
    const last = comps[l - 1];
    while (comps.length < size) {
        comps = (comps + last);
    }
    return comps;
}
function _floatStr(n) {
    return n.toPrecision(8);
}
function _addCode(slots, type, code) {
    if ((type & ShaderType.FRAGMENT) !== 0) {
        slots.add('f', code);
    }
    if ((type & ShaderType.VERTEX) !== 0) {
        slots.add('v', code);
    }
}
function _addPreCode(slots, type, code) {
    if ((type & ShaderType.FRAGMENT) !== 0) {
        slots.add('pf', code);
    }
    if ((type & ShaderType.VERTEX) !== 0) {
        slots.add('pv', code);
    }
}
function isAttribute(x) {
    return x instanceof Attribute;
}
class Sampler extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, texCoords) {
        super(true, true);
        this._input = null;
        this.name = name;
        this.texCoords = texCoords;
        this._tex = null;
        this.size = 4;
        if (isAttribute(texCoords)) {
            this._linkAttrib = true;
            this.addChild(texCoords);
            this.uvsToken = texCoords.token;
        }
        else {
            this._linkAttrib = false;
            this.uvsToken = texCoords;
        }
        this.token = `VAL_${this.name}${this.uvsToken}`;
    }
    set(t) {
        this._tex = t;
    }
    _genCode(slots) {
        if (this._input == null)
            return;
        var name = this.name, c;
        c = `uniform sampler2D ${name};\n`;
        _addPreCode(slots, this._input.shader, c);
        c = `vec4 ${this.token} = texture2D( ${name}, ${this.uvsToken});\n`;
        _addCode(slots, this._input.shader, c);
    }
    setup(prg) {
        prg[this.name](this._tex);
    }
    _getHash() {
        return `${this._linkAttrib ? '' : this.texCoords}-${this.name}`;
    }
}
class Uniform extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, size) {
        super(true, true);
        this._input = null;
        this.name = name;
        this.size = size;
        this._value = new Float32Array(size);
        this.token = this.name;
    }
    set(...args) {
        for (var i = 0; i < args.length; i++) {
            this._value[i] = args[i];
        }
        this._invalid = true;
    }
    _genCode(slots) {
        if (this._input === null)
            return;
        var c;
        c = `uniform ${TYPES[this.size]} ${this.token};\n`;
        _addPreCode(slots, this._input.shader, c);
    }
    setup(prg) {
        prg[this.name](this._value);
        this._invalid = false;
    }
    _getHash() {
        return `${this.size}-${this.name}`;
    }
}
class Attribute extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, size) {
        super(true, false);
        this._input = null;
        this.name = name;
        this.size = size;
        this.token = `v_${this.name}`;
    }
    _genCode(slots) {
        var c;
        const typeId = TYPES[this.size];
        c = `varying ${typeId} ${this.token};\n`;
        slots.add('pf', c);
        c = `attribute ${typeId} ${this.name};\n`;
        c += `varying   ${typeId} ${this.token};\n`;
        slots.add('pv', c);
        c = `${this.token} = ${this.name};\n`;
        slots.add('v', c);
    }
    _getHash() {
        return `${this.size}-${this.name}`;
    }
}
class Constant extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(value) {
        super(true, false);
        this._input = null;
        this.name = `CONST_${(0 | (Math.random() * 0x7FFFFFFF)).toString(16)}`;
        if (Array.isArray(value)) {
            this.size = value.length;
        }
        else {
            this.size = 1;
        }
        this.value = value;
        this.token = `VAR_${this.name}`;
    }
    _genCode(slots) {
        if (this._input === null)
            return;
        var c;
        c = `#define ${this.token} ${TYPES[this.size]}(${this._stringifyValue()})\n`;
        _addPreCode(slots, this._input.shader, c);
    }
    _stringifyValue() {
        if (this.size === 1) {
            return this.value.toString();
        }
        else {
            const a = this.value;
            return a.map(_floatStr).join(',');
        }
    }
    _getHash() {
        return `${this._stringifyValue()}-${this.size}-`;
    }
}
class Input extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(name, size, shader = ShaderType.FRAGMENT) {
        super(true, false);
        this.name = name;
        this.size = size;
        this.param = null;
        this.comps = _trimComps('rgba', size);
        this.shader = shader;
    }
    attach(param, comps = 'rgba') {
        if (this.param) {
            this.param._input = null;
            this.removeChild(this.param);
        }
        param._input = this;
        this.param = param;
        this.comps = _trimComps(comps, this.size);
        this.addChild(param);
    }
    detach() {
        if (this.param !== null) {
            this.param._input = null;
            this.removeChild(this.param);
        }
        this.param = null;
    }
    attachSampler(name, texCoords, comps = 'rgba') {
        var p = new Sampler(name, texCoords);
        this.attach(p, comps);
        return p;
    }
    attachUniform(name, size = this.size, comps = 'rgba') {
        var p = new Uniform(name, size);
        this.attach(p, comps);
        return p;
    }
    attachAttribute(name, size = this.size, comps = 'rgba') {
        var p = new Attribute(name, size);
        this.attach(p, comps);
        return p;
    }
    attachConstant(value, comps = 'rgba') {
        var p = new Constant(value);
        this.attach(p, comps);
        return p;
    }
    _getHash() {
        var hash = `${this.size}-${this.comps}-${this.name}`;
        return hash;
    }
    _genCode(slots) {
        this.genAvailable(slots);
        if (this.param !== null) {
            var c = `#define ${this.name}(k) ${this.param.token}`;
            if (this.param.size > 1) {
                c += `.${this.comps}`;
            }
            _addPreCode(slots, this.shader, c);
        }
    }
    genAvailable(slots) {
        const val = (this.param === null) ? '0' : '1';
        const def = `#define HAS_${this.name} ${val}\n`;
        slots.add('definitions', def);
    }
}
Input.Sampler = Sampler;
Input.Uniform = Uniform;
Input.Attribute = Attribute;
Input.Constant = Constant;
Input.FRAGMENT = ShaderType.FRAGMENT;
Input.VERTEX = ShaderType.VERTEX;
Input.ALL = ShaderType.ALL;


/***/ }),

/***/ "./node_modules/nanogl-pbr/MaterialPass.js":
/*!*************************************************!*\
  !*** ./node_modules/nanogl-pbr/MaterialPass.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MaterialPass; });
/* harmony import */ var nanogl_state_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanogl-state/config */ "./node_modules/nanogl-state/config.js");
/* harmony import */ var _ChunkCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChunkCollection */ "./node_modules/nanogl-pbr/ChunkCollection.js");


class MaterialPass {
    constructor(shaderSource) {
        this.name = '';
        this.mask = ~0;
        this.glconfig = new nanogl_state_config__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.inputs = new _ChunkCollection__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this._shaderSource = shaderSource;
    }
}


/***/ }),

/***/ "./node_modules/nanogl-pbr/ShaderPrecision.js":
/*!****************************************************!*\
  !*** ./node_modules/nanogl-pbr/ShaderPrecision.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chunk */ "./node_modules/nanogl-pbr/Chunk.js");

class ShaderPrecision extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(p = 'mediump') {
        super(true, false);
        this.fprecision = p;
    }
    set(p) {
        this.fprecision = p;
    }
    _getHash() {
        return 'p' + this.fprecision;
    }
    _genCode(slots) {
        const s = `precision ${this.fprecision} float;\n`;
        slots.add('precision', s);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ShaderPrecision);


/***/ }),

/***/ "./node_modules/nanogl-pbr/ShaderVersion.js":
/*!**************************************************!*\
  !*** ./node_modules/nanogl-pbr/ShaderVersion.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chunk */ "./node_modules/nanogl-pbr/Chunk.js");

class ShaderVersion extends _Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(v = '100') {
        super(true, false);
        this.version = v;
    }
    set(v) {
        this.version = v;
        this.invalidateCode();
    }
    get() {
        return this.version;
    }
    _getHash() {
        return 'v' + this.version;
    }
    _genCode(slots) {
        var s = `#version ${this.version}`;
        slots.add('version', s);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ShaderVersion);


/***/ }),

/***/ "./node_modules/nanogl-pbr/glsl/includes/decode-rgbe.glsl":
/*!****************************************************************!*\
  !*** ./node_modules/nanogl-pbr/glsl/includes/decode-rgbe.glsl ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`
#ifndef _H_DECODE_RGBE_
#define _H_DECODE_RGBE_

vec3 decodeRGBE( vec4 hdr ){
  return hdr.rgb * exp2( (hdr.a*255.0)-128.0 );
  // return hdr.rgb * pow( 2.0, (hdr.a*255.0)-128.0 );
}

#endif`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./node_modules/nanogl-pbr/glsl/includes/ibl.glsl":
/*!********************************************************!*\
  !*** ./node_modules/nanogl-pbr/glsl/includes/ibl.glsl ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {




function fn( obj )
{
  let __p = '';

  __p+=`
#ifndef _H_SPECULAR_IBL_
#define _H_SPECULAR_IBL_

${ __webpack_require__( /*! ./octwrap-decode.glsl */ "./node_modules/nanogl-pbr/glsl/includes/octwrap-decode.glsl" )() }
${ __webpack_require__( /*! ./decode-rgbe.glsl */ "./node_modules/nanogl-pbr/glsl/includes/decode-rgbe.glsl" )() }

const vec2 _IBL_UVM = vec2(
  0.25*(254.0/256.0),
  0.125*0.5*(254.0/256.0)
);

vec3 SpecularIBL( sampler2D tEnv, vec3 skyDir, float roughness)
{

  vec2 uvA = octwrapDecode( skyDir );

  float r7   = 7.0*roughness;
  float frac = fract(r7);

  uvA = uvA * _IBL_UVM + vec2(
      0.5,
      0.125*0.5 + 0.125 * ( r7 - frac )
    );

  #if glossNearest

    return decodeRGBE( texture2D(tEnv,uvA) );

  #else

    vec2 uvB=uvA+vec2(0.0,0.125);
    return  mix(
      decodeRGBE( texture2D(tEnv,uvA) ),
      decodeRGBE( texture2D(tEnv,uvB) ),
      frac
    );

  #endif

}

#endif`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./node_modules/nanogl-pbr/glsl/includes/octwrap-decode.glsl":
/*!*******************************************************************!*\
  !*** ./node_modules/nanogl-pbr/glsl/includes/octwrap-decode.glsl ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`
#ifndef _H_OCTWRAP_DECODE_
#define _H_OCTWRAP_DECODE_

vec2 octwrapDecode( vec3 v ) {
  // Project the sphere onto the octahedron, and then onto the xy plan
  vec2 p = v.xy / dot(  abs( v ) , vec3(1.0) );
  p = vec2( p.x+p.y-1.0, p.x-p.y );

  if( v.z < 0.0 )
    p.x *= -1.0;

  // p.x *= sign( v.z );
  return p;
}

#endif`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./node_modules/nanogl-state/config.js":
/*!*********************************************!*\
  !*** ./node_modules/nanogl-state/config.js ***!
  \*********************************************/
/*! exports provided: DAT_SIZE, DAT_MASKS, _DEFAULT_SET, _DEFAULT_STATE, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAT_SIZE", function() { return DAT_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAT_MASKS", function() { return DAT_MASKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_DEFAULT_SET", function() { return _DEFAULT_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_DEFAULT_STATE", function() { return _DEFAULT_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GLConfig; });
const DAT_SIZE = 51;
const EHBuffer = new Float32Array(1);
const EHIBuffer = new Uint32Array(EHBuffer.buffer);
const DAT_MASKS = [
    1,
    512,
    1024,
    1024,
    2048,
    4096,
    4096,
    4,
    8192,
    2,
    16384,
    32768,
    256,
    65536,
    65536,
    65536,
    262144,
    131072,
    131072,
    131072,
    524288,
    524288,
    524288,
    2097152,
    1048576,
    1048576,
    1048576,
    128,
    4194304,
    4194304,
    4194304,
    4194304,
    8,
    16,
    8388608,
    8388608,
    32,
    64,
    16777216,
    33554432,
    67108864,
    67108864,
    67108864,
    67108864,
    134217728,
    134217728,
    134217728,
    134217728,
    268435456,
    268435456,
    536870912
], _DEFAULT_SET = (1 |
    2 |
    4 |
    8 |
    16 |
    128 |
    256 |
    512 |
    1024 |
    8192 |
    16384 |
    32768 |
    65536 |
    131072 |
    262144 |
    4194304 |
    8388608 |
    16777216 |
    33554432 |
    67108864 |
    268435456 |
    536870912), _DEFAULT_STATE = new Uint16Array([
    0,
    32774,
    0,
    1,
    0,
    0,
    0,
    0,
    513,
    0,
    1029,
    2305,
    0,
    519,
    0,
    65535,
    65535,
    7680,
    7680,
    7680,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0, 0, 0, 0,
    1,
    0,
    0,
    0,
    0,
    0,
    15,
    1,
    0, 0, 0, 0,
    0, 0, 0, 0,
    encodeClampedFloat(0),
    encodeClampedFloat(1),
    encodeHalf(1),
]);
function _fixSet(set) {
    return (set |
        ((set & 4096) >>> 2) |
        ((set & 2048) >>> 2) |
        ((set & 524288) >>> 3) |
        ((set & 1048576) >>> 3) |
        ((set & 2097152) >>> 3));
}
function encodeClampedFloat(f) {
    return Math.round(f * 0xFFFF) | 0;
}
function decodeClampedFloat(s) {
    return (s / (+0xFFFF));
}
function decodeHalf(u16) {
    var exponent = (u16 & 0x7C00) >> 10, fraction = u16 & 0x03FF;
    return (u16 >> 15 ? -1 : 1) * (exponent ?
        (exponent === 0x1F ?
            fraction ? NaN : Infinity :
            Math.pow(2, exponent - 15) * (1 + fraction / 0x400)) :
        6.103515625e-5 * (fraction / 0x400));
}
function encodeHalf(f32) {
    EHBuffer[0] = f32;
    const fltInt32 = EHIBuffer[0];
    let fltInt16 = (fltInt32 >> 31) << 5;
    let tmp = (fltInt32 >> 23) & 0xff;
    tmp = (tmp - 0x70) & (((0x70 - tmp) >> 4) >> 27);
    fltInt16 = (fltInt16 | tmp) << 10;
    fltInt16 |= (fltInt32 >> 13) & 0x3ff;
    return fltInt16;
}
function getGlParameter(gl, p) {
    return gl.getParameter(p);
}
;
class GLConfig {
    constructor() {
        this._dat = new Uint16Array(51);
        this._set = 0;
    }
    static encodeHalf(f32) {
        return encodeHalf(f32);
    }
    static decodeHalf(u16) {
        return decodeHalf(u16);
    }
    toDefault() {
        this._dat.set(_DEFAULT_STATE);
        this._set = _DEFAULT_SET | 0;
    }
    clone() {
        const res = new GLConfig();
        res._dat.set(this._dat);
        res._set = this._set;
        return res;
    }
    patch(cfg, out) {
        var ldat = this._dat, lset = this._set, sdat = cfg._dat, sset = cfg._set, odat = out._dat, oset = 0, sbit;
        for (var i = 0; i < (51 | 0); i++) {
            sbit = DAT_MASKS[i];
            if (0 !== (lset & sbit)) {
                if ((0 === (sset & sbit)) || (ldat[i] !== sdat[i])) {
                    oset |= sbit;
                }
                sdat[i] = ldat[i];
            }
        }
        odat.set(sdat);
        cfg._set |= lset;
        out._set = _fixSet(oset);
    }
    setupGL(gl) {
        const set = this._set, dat = this._dat;
        let i;
        if ((set & 1) !== 0) {
            dat[0] ? gl.enable(3042) : gl.disable(3042);
        }
        i = set & (512 | 2048);
        if (i !== 0) {
            if (i === (512 | 2048))
                gl.blendEquationSeparate(dat[1], dat[4]);
            else
                gl.blendEquation(dat[1]);
        }
        i = set & (1024 | 4096);
        if (i !== 0) {
            if (i === (1024 | 4096))
                gl.blendFuncSeparate(dat[3], dat[2], dat[6], dat[5]);
            else
                gl.blendFunc(dat[3], dat[2]);
        }
        if ((set & 4) !== 0) {
            dat[7] ? gl.enable(2929) : gl.disable(2929);
        }
        if ((set & 8192) !== 0) {
            gl.depthFunc(dat[8]);
        }
        if ((set & 2) !== 0) {
            dat[9] ? gl.enable(2884) : gl.disable(2884);
        }
        if ((set & 16384) !== 0) {
            gl.cullFace(dat[10]);
        }
        if ((set & 32768) !== 0) {
            gl.frontFace(dat[11]);
        }
        if ((set & 536870912) !== 0) {
            gl.lineWidth(decodeHalf(dat[50]));
        }
        if ((set & 256) !== 0) {
            dat[12] ? gl.enable(2960) : gl.disable(2960);
        }
        i = set & (65536 | 524288);
        if (i !== 0) {
            if (i === (65536 | 524288)) {
                gl.stencilFuncSeparate(1028, dat[13], dat[14], dat[15]);
                gl.stencilFuncSeparate(1029, dat[20], dat[21], dat[22]);
            }
            else {
                gl.stencilFunc(dat[13], dat[14], dat[15]);
            }
        }
        i = set & (131072 | 1048576);
        if (i !== 0) {
            if (i === (131072 | 1048576)) {
                gl.stencilOpSeparate(1028, dat[17], dat[18], dat[19]);
                gl.stencilOpSeparate(1029, dat[24], dat[25], dat[26]);
            }
            else {
                gl.stencilOp(dat[17], dat[18], dat[19]);
            }
        }
        i = set & (262144 | 2097152);
        if (i !== 0) {
            if (i === (262144 | 2097152)) {
                gl.stencilMaskSeparate(1028, dat[16]);
                gl.stencilMaskSeparate(1029, dat[23]);
            }
            else {
                gl.stencilMask(dat[16]);
            }
        }
        if ((set & 16777216) !== 0) {
            var flags = dat[38];
            gl.colorMask((flags & 1) === 1, (flags & 2) === 2, (flags & 4) === 4, (flags & 8) === 8);
        }
        if ((set & 33554432) !== 0) {
            gl.depthMask(dat[39] === 1);
        }
        if ((set & 67108864) !== 0) {
            gl.blendColor(decodeHalf(dat[40]), decodeHalf(dat[41]), decodeHalf(dat[42]), decodeHalf(dat[43]));
        }
        if ((set & 128) !== 0) {
            dat[27] ? gl.enable(3089) : gl.disable(3089);
        }
        if ((set & 4194304) !== 0) {
            gl.scissor(dat[28], dat[29], dat[30], dat[31]);
        }
        if ((set & 134217728) !== 0) {
            gl.viewport(dat[44], dat[45], dat[46], dat[47]);
        }
        if ((set & 16) !== 0) {
            dat[33] ? gl.enable(32823) : gl.disable(32823);
        }
        if ((set & 8388608) !== 0) {
            gl.polygonOffset(decodeHalf(dat[34]), decodeHalf(dat[35]));
        }
        if ((set & 268435456) !== 0) {
            gl.depthRange(decodeClampedFloat(dat[48]), decodeClampedFloat(dat[49]));
        }
    }
    fromGL(gl) {
        this._set = 0;
        const enableBlend = getGlParameter(gl, 3042), enableCullface = getGlParameter(gl, 2884), enableDepthTest = getGlParameter(gl, 2929), enableDither = getGlParameter(gl, 3024), enablePolyOffset = getGlParameter(gl, 32823), enableScissor = getGlParameter(gl, 3089), enableStencil = getGlParameter(gl, 2960), blendSrcRGB = getGlParameter(gl, 32969), blendDstRGB = getGlParameter(gl, 32968), blendSrcAlpha = getGlParameter(gl, 32971), blendDstAlpha = getGlParameter(gl, 32970), blendEqRgb = getGlParameter(gl, 32777), blendEqAlpha = getGlParameter(gl, 34877), stencilFunc = getGlParameter(gl, 2962), stencilRef = getGlParameter(gl, 2967), stencilValueMask = getGlParameter(gl, 2963), stencilWriteMask = getGlParameter(gl, 2968), stencilOpFail = getGlParameter(gl, 2964), stencilOpZfail = getGlParameter(gl, 2965), stencilOpZpass = getGlParameter(gl, 2966), stencilBFunc = getGlParameter(gl, 34816), stencilBRef = getGlParameter(gl, 36003), stencilBValueMask = getGlParameter(gl, 36004), stencilBWriteMask = getGlParameter(gl, 36005), stencilBOpFail = getGlParameter(gl, 34817), stencilBOpZfail = getGlParameter(gl, 34818), stencilBOpZpass = getGlParameter(gl, 34819), polyOffsetFactor = getGlParameter(gl, 32824), polyOffsetUnits = getGlParameter(gl, 10752), scissorBox = getGlParameter(gl, 3088), colorMaskArray = getGlParameter(gl, 3107), depthWriteMask = getGlParameter(gl, 2930), blendColor = getGlParameter(gl, 32773), viewport = getGlParameter(gl, 2978), depthRange = getGlParameter(gl, 2928), lineWidth = getGlParameter(gl, 2849);
        this.enableBlend(enableBlend);
        if (blendSrcRGB !== blendSrcAlpha || blendDstRGB !== blendDstAlpha) {
            this.blendFuncSeparate(blendSrcRGB, blendDstRGB, blendSrcAlpha, blendDstAlpha);
        }
        else {
            this.blendFunc(blendSrcRGB, blendDstRGB);
        }
        if (blendEqRgb !== blendEqAlpha) {
            this.blendEquationSeparate(blendEqRgb, blendEqAlpha);
        }
        else {
            this.blendEquation(blendEqRgb);
        }
        this.enableStencil(enableStencil);
        if (stencilFunc !== stencilBFunc ||
            stencilRef !== stencilBRef ||
            stencilValueMask !== stencilBValueMask) {
            this.stencilFuncSeparate(stencilFunc, stencilRef, stencilValueMask, stencilBFunc, stencilBRef, stencilBValueMask);
        }
        else {
            this.stencilFunc(stencilFunc, stencilRef, stencilValueMask);
        }
        if (stencilOpFail !== stencilBOpFail ||
            stencilOpZfail !== stencilBOpZfail ||
            stencilOpZpass !== stencilBOpZpass) {
            this.stencilOpSeparate(stencilOpFail, stencilOpZfail, stencilOpZpass, stencilBOpFail, stencilBOpZfail, stencilBOpZpass);
        }
        else {
            this.stencilOp(stencilOpFail, stencilOpZfail, stencilOpZpass);
        }
        if (stencilWriteMask !== stencilBWriteMask) {
            this.stencilMaskSeparate(stencilWriteMask, stencilBWriteMask);
        }
        else {
            this.stencilMask(stencilWriteMask);
        }
        this.depthFunc(gl.getParameter(2932));
        this.enableDepthTest(enableDepthTest);
        this.cullFace(gl.getParameter(2885));
        this.enableCullface(enableCullface);
        this.frontFace(gl.getParameter(2886));
        this.enablePolygonOffset(enablePolyOffset);
        this.polygonOffset(polyOffsetFactor, polyOffsetUnits);
        this.enableScissor(enableScissor);
        this.scissor(scissorBox[0], scissorBox[1], scissorBox[2], scissorBox[3]);
        this.enableDither(enableDither);
        this.colorMask(colorMaskArray[0], colorMaskArray[1], colorMaskArray[2], colorMaskArray[3]);
        this.depthMask(depthWriteMask);
        this.blendColor(blendColor[0], blendColor[1], blendColor[2], blendColor[3]);
        this.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
        this.depthRange(depthRange[0], depthRange[1]);
        this.lineWidth(lineWidth);
    }
    enableBlend(flag = true) {
        this._dat[0] = +flag;
        this._set |= 1 | 0;
        return this;
    }
    blendFunc(src, dst) {
        this._dat[3] = src;
        this._dat[2] = dst;
        this._set = this._set & ~4096 | (1024);
        return this;
    }
    blendFuncSeparate(srcRgb, dstRgb, srcAlpha, dstAlpha) {
        this._dat[3] = srcRgb;
        this._dat[2] = dstRgb;
        this._dat[6] = srcAlpha;
        this._dat[5] = dstAlpha;
        this._set |= 1024 | 4096;
        return this;
    }
    blendEquation(eq) {
        this._dat[1] = eq;
        this._set = this._set & ~2048 | (512);
        return this;
    }
    blendEquationSeparate(rgbEq, alphaEq) {
        this._dat[1] = rgbEq;
        this._dat[4] = alphaEq;
        this._set |= 512 | 2048;
        return this;
    }
    blendColor(r, g, b, a) {
        this._dat[40] = encodeHalf(r);
        this._dat[41] = encodeHalf(g);
        this._dat[42] = encodeHalf(b);
        this._dat[43] = encodeHalf(a);
        this._set |= 67108864 | 0;
        return this;
    }
    depthFunc(func) {
        this._dat[8] = func;
        this._set |= 8192 | 0;
        return this;
    }
    enableDepthTest(flag = true) {
        this._dat[7] = +flag;
        this._set |= 4 | 0;
        return this;
    }
    depthRange(near, far) {
        this._dat[48] = encodeClampedFloat(near);
        this._dat[49] = encodeClampedFloat(far);
        this._set |= 268435456 | 0;
        return this;
    }
    lineWidth(w) {
        this._dat[50] = encodeHalf(w);
        this._set |= 536870912 | 0;
        return this;
    }
    cullFace(mode) {
        this._dat[10] = mode;
        this._set |= 16384 | 0;
        return this;
    }
    enableCullface(flag) {
        if (flag === undefined)
            flag = true;
        this._dat[9] = +flag;
        this._set |= 2 | 0;
        return this;
    }
    polygonOffset(polyOffsetFactor, polyOffsetUnits) {
        this._dat[34] = encodeHalf(polyOffsetFactor);
        this._dat[35] = encodeHalf(polyOffsetUnits);
        this._set |= 8388608 | 0;
        return this;
    }
    enablePolygonOffset(flag = true) {
        this._dat[33] = +flag;
        this._set |= 16 | 0;
        return this;
    }
    enableScissor(flag = true) {
        this._dat[27] = +flag;
        this._set |= 128 | 0;
        return this;
    }
    scissor(x, y, w, h) {
        this._dat[28] = x;
        this._dat[29] = y;
        this._dat[30] = w;
        this._dat[31] = h;
        this._set |= 4194304 | 0;
        return this;
    }
    viewport(x, y, w, h) {
        this._dat[44] = x;
        this._dat[45] = y;
        this._dat[46] = w;
        this._dat[47] = h;
        this._set |= 134217728 | 0;
        return this;
    }
    enableDither(flag = true) {
        this._dat[32] = +flag;
        this._set |= 8 | 0;
        return this;
    }
    depthMask(flag) {
        this._dat[39] = +flag;
        this._set |= 33554432 | 0;
        return this;
    }
    colorMask(r, g, b, a) {
        const mask = (r | 0) |
            ((g | 0) << 1) |
            ((b | 0) << 2) |
            ((a | 0) << 3);
        this._dat[38] = mask;
        this._set |= 16777216 | 0;
        return this;
    }
    frontFace(dir) {
        this._dat[11] = dir;
        this._set |= 32768 | 0;
        return this;
    }
    enableStencil(flag = true) {
        this._dat[12] = +flag;
        this._set |= 256 | 0;
        return this;
    }
    stencilFunc(func, ref, mask) {
        this._dat[13] = func;
        this._dat[14] = ref;
        this._dat[15] = mask;
        this._set = this._set & ~524288 | (65536);
        return this;
    }
    stencilOp(sfail, dpfail, dppass) {
        this._dat[17] = sfail;
        this._dat[18] = dpfail;
        this._dat[19] = dppass;
        this._set = this._set & ~1048576 | (131072);
        return this;
    }
    stencilMask(mask) {
        this._dat[16] = mask;
        this._set = (this._set & ~2097152) | (262144);
        return this;
    }
    stencilFuncSeparate(func, ref, mask, funcback, refback, maskback) {
        const dat = this._dat;
        dat[13] = func;
        dat[14] = ref;
        dat[15] = mask;
        dat[20] = funcback;
        dat[21] = refback;
        dat[22] = maskback;
        this._set |= 524288 | 65536;
        return this;
    }
    stencilOpSeparate(sfail, dpfail, dppass, sfailback, dpfailback, dppassback) {
        const dat = this._dat;
        dat[17] = sfail;
        dat[18] = dpfail;
        dat[19] = dppass;
        dat[24] = sfailback;
        dat[25] = dpfailback;
        dat[26] = dppassback;
        this._set |= 1048576 | 131072;
        return this;
    }
    stencilMaskSeparate(mask, maskback) {
        this._dat[16] = mask;
        this._dat[23] = maskback;
        this._set |= 2097152 | 262144;
        return this;
    }
}


/***/ }),

/***/ "./node_modules/nanogl-vao/vao.js":
/*!****************************************!*\
  !*** ./node_modules/nanogl-vao/vao.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Vao; });
function shimGL(gl, ext) {
    gl.createVertexArray = function () { return ext.createVertexArrayOES(); };
    gl.bindVertexArray = function (array) { return ext.bindVertexArrayOES(array); };
    gl.deleteVertexArray = function (array) { return ext.deleteVertexArrayOES(array); };
    gl.isVertexArray = function (array) { return ext.isVertexArrayOES(array); };
}
function isWebgl2(gl) {
    return gl.bindVertexArray !== undefined;
}
class Vao {
    constructor(gl) {
        this.gl = gl;
        if (isWebgl2(gl)) {
            this._impl = new NativeVao(this);
        }
        else {
            const ext = gl.getExtension('OES_vertex_array_object');
            if (ext) {
                shimGL(gl, ext);
                this._impl = new NativeVao(this);
            }
            else {
                this._impl = new EmulateVao(this);
            }
        }
    }
    dispose() {
        this._impl.dispose();
    }
    setup(prg, buffers, indices) {
        if (!prg.ready) {
            prg._grabParameters();
        }
        this._impl.setup(prg, buffers, indices);
    }
    bind() {
        this._impl.bind();
    }
    unbind() {
        this._impl.unbind();
    }
}
class NativeVao {
    constructor(vao) {
        this._vao = vao;
        this._gl = this._vao.gl;
        this._handle = null;
    }
    dispose() {
        this.release();
    }
    setup(prg, buffers, indices) {
        this.release();
        const gl = this._gl;
        this._handle = gl.createVertexArray();
        gl.bindVertexArray(this._handle);
        for (var i = 0; i < buffers.length; i++) {
            buffers[i].attribPointer(prg);
        }
        if (indices !== undefined) {
            indices.bind();
        }
        gl.bindVertexArray(null);
    }
    bind() {
        this._gl.bindVertexArray(this._handle);
    }
    unbind() {
        this._gl.bindVertexArray(null);
    }
    release() {
        if (this._handle) {
            this._gl.deleteVertexArray(this._handle);
            this._handle = null;
        }
    }
}
class EmulateVao {
    constructor(vao) {
        this._vao = vao;
        this.prg = null;
        this.buffers = null;
        this.indices = null;
    }
    dispose() {
        this.prg = null;
        this.buffers = null;
        this.indices = null;
    }
    setup(prg, buffers, indices) {
        this.prg = prg;
        this.buffers = buffers;
        this.indices = indices;
    }
    bind() {
        if (this.buffers == null || this.prg == null || this.indices == null)
            return;
        for (var i = 0; i < this.buffers.length; i++) {
            this.buffers[i].attribPointer(this.prg);
        }
        if (this.indices !== undefined) {
            this.indices.bind();
        }
    }
    unbind() {
    }
}


/***/ }),

/***/ "./node_modules/nanogl/arraybuffer.js":
/*!********************************************!*\
  !*** ./node_modules/nanogl/arraybuffer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basebuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basebuffer */ "./node_modules/nanogl/basebuffer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/nanogl/utils.js");


const GL_ARRAY_BUFFER = 0x8892;
class ArrayBuffer extends _basebuffer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(gl, data, usage = gl.STATIC_DRAW, glbuffer) {
        super();
        this.gl = gl;
        this.usage = usage;
        this.buffer = (glbuffer !== undefined) ? glbuffer : gl.createBuffer();
        this.attribs = [];
        this.stride = 0;
        this.byteLength = 0;
        this.length = 0;
        if (data) {
            this.data(data);
        }
    }
    bind() {
        this.gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
    }
    attrib(name, size, type, normalize = false) {
        this.attribs.push({
            name,
            type: 0 | type,
            size: 0 | size,
            normalize,
            offset: this.stride,
            stride: 0
        });
        this.stride += Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getComponentSize"])(type) * size;
        this._computeLength();
        return this;
    }
    data(array) {
        const gl = this.gl;
        gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
        gl.bufferData(GL_ARRAY_BUFFER, array, this.usage);
        gl.bindBuffer(GL_ARRAY_BUFFER, null);
        this.byteLength = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isBufferSource"])(array) ? array.byteLength : array;
        this._computeLength();
    }
    subData(array, offset) {
        const gl = this.gl;
        gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
        gl.bufferSubData(GL_ARRAY_BUFFER, offset, array);
        gl.bindBuffer(GL_ARRAY_BUFFER, null);
    }
    attribPointer(program) {
        const gl = this.gl;
        gl.bindBuffer(GL_ARRAY_BUFFER, this.buffer);
        for (var i = 0; i < this.attribs.length; i++) {
            var attrib = this.attribs[i];
            if (program[attrib.name] !== undefined) {
                var aLocation = program[attrib.name]();
                gl.enableVertexAttribArray(aLocation);
                gl.vertexAttribPointer(aLocation, attrib.size, attrib.type, attrib.normalize, attrib.stride || this.stride, attrib.offset);
            }
        }
    }
    draw(mode, count = this.length, offset = 0) {
        this.gl.drawArrays(mode, offset, 0 | count);
    }
    dispose() {
        this.gl.deleteBuffer(this.buffer);
    }
    _computeLength() {
        if (this.stride > 0) {
            this.length = this.byteLength / this.stride;
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ArrayBuffer);


/***/ }),

/***/ "./node_modules/nanogl/basebuffer.js":
/*!*******************************************!*\
  !*** ./node_modules/nanogl/basebuffer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BaseBuffer {
    drawPoints(count, offset) {
        this.draw(0, count, offset);
    }
    drawLines(count, offset) {
        this.draw(1, count, offset);
    }
    drawLineLoop(count, offset) {
        this.draw(2, count, offset);
    }
    drawLineStrip(count, offset) {
        this.draw(3, count, offset);
    }
    drawTriangles(count, offset) {
        this.draw(4, count, offset);
    }
    drawTriangleStrip(count, offset) {
        this.draw(5, count, offset);
    }
    drawTriangleFan(count, offset) {
        this.draw(6, count, offset);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (BaseBuffer);


/***/ }),

/***/ "./node_modules/nanogl/indexbuffer.js":
/*!********************************************!*\
  !*** ./node_modules/nanogl/indexbuffer.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _basebuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basebuffer */ "./node_modules/nanogl/basebuffer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/nanogl/utils.js");


const TGT = 0x8893;
class IndexBuffer extends _basebuffer__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(gl, type = gl.UNSIGNED_SHORT, data, usage = gl.STATIC_DRAW, glbuffer) {
        super();
        this.gl = gl;
        this.usage = usage;
        this.buffer = (glbuffer !== undefined) ? glbuffer : gl.createBuffer();
        this.type = 0;
        this.typeSize = 0;
        this.byteLength = 0;
        this.setType(type);
        if (data) {
            this.data(data);
        }
    }
    bind() {
        this.gl.bindBuffer(TGT, this.buffer);
    }
    setType(type) {
        this.type = type;
        this.typeSize = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getComponentSize"])(type);
    }
    data(array) {
        const gl = this.gl;
        gl.bindBuffer(TGT, this.buffer);
        gl.bufferData(TGT, array, this.usage);
        gl.bindBuffer(TGT, null);
        this.byteLength = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isBufferSource"])(array) ? array.byteLength : array;
    }
    subData(array, offset) {
        const gl = this.gl;
        gl.bindBuffer(TGT, this.buffer);
        gl.bufferSubData(TGT, offset, array);
        gl.bindBuffer(TGT, null);
    }
    dispose() {
        this.gl.deleteBuffer(this.buffer);
    }
    draw(mode, count, offset = 0) {
        count = (count === undefined) ? this.byteLength / this.typeSize : count;
        this.gl.drawElements(mode, count, this.type, 0 | offset);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (IndexBuffer);


/***/ }),

/***/ "./node_modules/nanogl/texture-2d.js":
/*!*******************************************!*\
  !*** ./node_modules/nanogl/texture-2d.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Texture2D; });
/* harmony import */ var _texture_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./texture-base */ "./node_modules/nanogl/texture-base.js");

const GL_TEXTURE_2D = 0x0de1;
class Texture2D extends _texture_base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(gl, format, type, internal) {
        super(gl, format, type, internal);
        this.textureType = _texture_base__WEBPACK_IMPORTED_MODULE_0__["TextureType"].TEXTURE_2D;
        this._target = GL_TEXTURE_2D;
        gl.bindTexture(GL_TEXTURE_2D, this.id);
        this.setFilter(true);
    }
    fromImage(img) {
        const gl = this.gl;
        this.width = img.width;
        this.height = img.height;
        gl.bindTexture(GL_TEXTURE_2D, this.id);
        gl.texImage2D(GL_TEXTURE_2D, 0, this.internal, this.format, this.type, img);
    }
    fromData(width, height, data = null) {
        const gl = this.gl;
        this.width = width;
        this.height = height;
        data = data || null;
        gl.bindTexture(GL_TEXTURE_2D, this.id);
        gl.texImage2D(GL_TEXTURE_2D, 0, this.internal, width, height, 0, this.format, this.type, data);
    }
}


/***/ }),

/***/ "./node_modules/nanogl/texture-base.js":
/*!*********************************************!*\
  !*** ./node_modules/nanogl/texture-base.js ***!
  \*********************************************/
/*! exports provided: TextureType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureType", function() { return TextureType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractTexture; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/nanogl/utils.js");

let _UID = 0;
var TextureType;
(function (TextureType) {
    TextureType[TextureType["NONE"] = 0] = "NONE";
    TextureType[TextureType["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
    TextureType[TextureType["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
    TextureType[TextureType["TEXTURE_CUBE"] = 34067] = "TEXTURE_CUBE";
    TextureType[TextureType["TEXTURE_3D"] = 32879] = "TEXTURE_3D";
})(TextureType || (TextureType = {}));
class AbstractTexture {
    constructor(gl, format, type, internal) {
        this.textureType = TextureType.NONE;
        this.format = 0;
        this.internal = 0;
        this.type = 0;
        this._uid = _UID++;
        this.gl = gl;
        this.id = gl.createTexture();
        this.width = 0;
        this.height = 0;
        this.setFormat(format, type, internal);
    }
    setFormat(format, type, internal) {
        this.format = format || this.gl.RGB;
        this.internal = internal || this.format;
        this.type = type || this.gl.UNSIGNED_BYTE;
    }
    bind(unit) {
        const gl = this.gl;
        if (unit !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + (0 | unit));
        }
        gl.bindTexture(this._target, this.id);
    }
    dispose() {
        this.gl.deleteTexture(this.id);
    }
    setFilter(smooth = false, mipmap = false, miplinear = false) {
        const gl = this.gl;
        gl.texParameteri(this._target, gl.TEXTURE_MAG_FILTER, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getTextureFiltering"])(!!smooth, false, false));
        gl.texParameteri(this._target, gl.TEXTURE_MIN_FILTER, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getTextureFiltering"])(!!smooth, !!mipmap, !!miplinear));
        return this;
    }
    repeat() {
        this.wrap(this.gl.REPEAT);
        return this;
    }
    clamp() {
        this.wrap(this.gl.CLAMP_TO_EDGE);
        return this;
    }
    mirror() {
        this.wrap(this.gl.MIRRORED_REPEAT);
        return this;
    }
    wrap(wrap) {
        const gl = this.gl;
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_S, wrap);
        gl.texParameteri(this._target, gl.TEXTURE_WRAP_T, wrap);
        return this;
    }
}


/***/ }),

/***/ "./node_modules/nanogl/utils.js":
/*!**************************************!*\
  !*** ./node_modules/nanogl/utils.js ***!
  \**************************************/
/*! exports provided: isWebgl2, isBufferSource, getTextureFiltering, getComponentSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebgl2", function() { return isWebgl2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBufferSource", function() { return isBufferSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTextureFiltering", function() { return getTextureFiltering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComponentSize", function() { return getComponentSize; });
function isWebgl2(context) {
    return context.fenceSync !== undefined;
}
function isBufferSource(val) {
    return val.byteLength !== undefined;
}
function getTextureFiltering(smooth, mipmap, miplinear) {
    return 0x2600 | +smooth | (+mipmap << 8) | (+(mipmap && miplinear) << 1);
}
function getComponentSize(type) {
    switch (type) {
        case 0x1400:
        case 0x1401:
            return 1;
        case 0x1402:
        case 0x1403:
            return 2;
        case 0x1404:
        case 0x1405:
        case 0x1406:
            return 4;
        default:
            throw new Error(`unknown type ${type}`);
    }
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/when/lib/Promise.js":
/*!******************************************!*\
  !*** ./node_modules/when/lib/Promise.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	var makePromise = __webpack_require__(/*! ./makePromise */ "./node_modules/when/lib/makePromise.js");
	var Scheduler = __webpack_require__(/*! ./Scheduler */ "./node_modules/when/lib/Scheduler.js");
	var async = __webpack_require__(/*! ./env */ "./node_modules/when/lib/env.js").asap;

	return makePromise({
		scheduler: new Scheduler(async)
	});

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));


/***/ }),

/***/ "./node_modules/when/lib/Scheduler.js":
/*!********************************************!*\
  !*** ./node_modules/when/lib/Scheduler.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._running = false;

		this._queue = this;
		this._queueLen = 0;
		this._afterQueue = {};
		this._afterQueueLen = 0;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._queue[this._queueLen++] = task;
		this.run();
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._afterQueue[this._afterQueueLen++] = task;
		this.run();
	};

	Scheduler.prototype.run = function() {
		if (!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		var i = 0;
		for (; i < this._queueLen; ++i) {
			this._queue[i].run();
			this._queue[i] = void 0;
		}

		this._queueLen = 0;
		this._running = false;

		for (i = 0; i < this._afterQueueLen; ++i) {
			this._afterQueue[i].run();
			this._afterQueue[i] = void 0;
		}

		this._afterQueueLen = 0;
	};

	return Scheduler;

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/TimeoutError.js":
/*!***********************************************!*\
  !*** ./node_modules/when/lib/TimeoutError.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	/**
	 * Custom error type for promises rejected by promise.timeout
	 * @param {string} message
	 * @constructor
	 */
	function TimeoutError (message) {
		Error.call(this);
		this.message = message;
		this.name = TimeoutError.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, TimeoutError);
		}
	}

	TimeoutError.prototype = Object.create(Error.prototype);
	TimeoutError.prototype.constructor = TimeoutError;

	return TimeoutError;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/***/ }),

/***/ "./node_modules/when/lib/apply.js":
/*!****************************************!*\
  !*** ./node_modules/when/lib/apply.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	makeApply.tryCatchResolve = tryCatchResolve;

	return makeApply;

	function makeApply(Promise, call) {
		if(arguments.length < 2) {
			call = tryCatchResolve;
		}

		return apply;

		function apply(f, thisArg, args) {
			var p = Promise._defer();
			var l = args.length;
			var params = new Array(l);
			callAndResolve({ f:f, thisArg:thisArg, args:args, params:params, i:l-1, call:call }, p._handler);

			return p;
		}

		function callAndResolve(c, h) {
			if(c.i < 0) {
				return call(c.f, c.thisArg, c.params, h);
			}

			var handler = Promise._handler(c.args[c.i]);
			handler.fold(callAndResolveNext, c, void 0, h);
		}

		function callAndResolveNext(c, x, h) {
			c.params[c.i] = x;
			c.i -= 1;
			callAndResolve(c, h);
		}
	}

	function tryCatchResolve(f, thisArg, args, resolver) {
		try {
			resolver.resolve(f.apply(thisArg, args));
		} catch(e) {
			resolver.reject(e);
		}
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));




/***/ }),

/***/ "./node_modules/when/lib/decorators/array.js":
/*!***************************************************!*\
  !*** ./node_modules/when/lib/decorators/array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var state = __webpack_require__(/*! ../state */ "./node_modules/when/lib/state.js");
	var applier = __webpack_require__(/*! ../apply */ "./node_modules/when/lib/apply.js");

	return function array(Promise) {

		var applyFold = applier(Promise);
		var toPromise = Promise.resolve;
		var all = Promise.all;

		var ar = Array.prototype.reduce;
		var arr = Array.prototype.reduceRight;
		var slice = Array.prototype.slice;

		// Additional array combinators

		Promise.any = any;
		Promise.some = some;
		Promise.settle = settle;

		Promise.map = map;
		Promise.filter = filter;
		Promise.reduce = reduce;
		Promise.reduceRight = reduceRight;

		/**
		 * When this promise fulfills with an array, do
		 * onFulfilled.apply(void 0, array)
		 * @param {function} onFulfilled function to apply
		 * @returns {Promise} promise for the result of applying onFulfilled
		 */
		Promise.prototype.spread = function(onFulfilled) {
			return this.then(all).then(function(array) {
				return onFulfilled.apply(this, array);
			});
		};

		return Promise;

		/**
		 * One-winner competitive race.
		 * Return a promise that will fulfill when one of the promises
		 * in the input array fulfills, or will reject when all promises
		 * have rejected.
		 * @param {array} promises
		 * @returns {Promise} promise for the first fulfilled value
		 */
		function any(promises) {
			var p = Promise._defer();
			var resolver = p._handler;
			var l = promises.length>>>0;

			var pending = l;
			var errors = [];

			for (var h, x, i = 0; i < l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				h = Promise._handler(x);
				if(h.state() > 0) {
					resolver.become(h);
					Promise._visitRemaining(promises, i, h);
					break;
				} else {
					h.visit(resolver, handleFulfill, handleReject);
				}
			}

			if(pending === 0) {
				resolver.reject(new RangeError('any(): array must not be empty'));
			}

			return p;

			function handleFulfill(x) {
				/*jshint validthis:true*/
				errors = null;
				this.resolve(x); // this === resolver
			}

			function handleReject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--pending === 0) {
					this.reject(errors);
				}
			}
		}

		/**
		 * N-winner competitive race
		 * Return a promise that will fulfill when n input promises have
		 * fulfilled, or will reject when it becomes impossible for n
		 * input promises to fulfill (ie when promises.length - n + 1
		 * have rejected)
		 * @param {array} promises
		 * @param {number} n
		 * @returns {Promise} promise for the earliest n fulfillment values
		 *
		 * @deprecated
		 */
		function some(promises, n) {
			/*jshint maxcomplexity:7*/
			var p = Promise._defer();
			var resolver = p._handler;

			var results = [];
			var errors = [];

			var l = promises.length>>>0;
			var nFulfill = 0;
			var nReject;
			var x, i; // reused in both for() loops

			// First pass: count actual array items
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}
				++nFulfill;
			}

			// Compute actual goals
			n = Math.max(n, 0);
			nReject = (nFulfill - n + 1);
			nFulfill = Math.min(n, nFulfill);

			if(n > nFulfill) {
				resolver.reject(new RangeError('some(): array must contain at least '
				+ n + ' item(s), but had ' + nFulfill));
			} else if(nFulfill === 0) {
				resolver.resolve(results);
			}

			// Second pass: observe each array item, make progress toward goals
			for(i=0; i<l; ++i) {
				x = promises[i];
				if(x === void 0 && !(i in promises)) {
					continue;
				}

				Promise._handler(x).visit(resolver, fulfill, reject, resolver.notify);
			}

			return p;

			function fulfill(x) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				results.push(x);
				if(--nFulfill === 0) {
					errors = null;
					this.resolve(results);
				}
			}

			function reject(e) {
				/*jshint validthis:true*/
				if(this.resolved) { // this === resolver
					return;
				}

				errors.push(e);
				if(--nReject === 0) {
					results = null;
					this.reject(errors);
				}
			}
		}

		/**
		 * Apply f to the value of each promise in a list of promises
		 * and return a new list containing the results.
		 * @param {array} promises
		 * @param {function(x:*, index:Number):*} f mapping function
		 * @returns {Promise}
		 */
		function map(promises, f) {
			return Promise._traverse(f, promises);
		}

		/**
		 * Filter the provided array of promises using the provided predicate.  Input may
		 * contain promises and values
		 * @param {Array} promises array of promises and values
		 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
		 *  Must return truthy (or promise for truthy) for items to retain.
		 * @returns {Promise} promise that will fulfill with an array containing all items
		 *  for which predicate returned truthy.
		 */
		function filter(promises, predicate) {
			var a = slice.call(promises);
			return Promise._traverse(predicate, a).then(function(keep) {
				return filterSync(a, keep);
			});
		}

		function filterSync(promises, keep) {
			// Safe because we know all promises have fulfilled if we've made it this far
			var l = keep.length;
			var filtered = new Array(l);
			for(var i=0, j=0; i<l; ++i) {
				if(keep[i]) {
					filtered[j++] = Promise._handler(promises[i]).value;
				}
			}
			filtered.length = j;
			return filtered;

		}

		/**
		 * Return a promise that will always fulfill with an array containing
		 * the outcome states of all input promises.  The returned promise
		 * will never reject.
		 * @param {Array} promises
		 * @returns {Promise} promise for array of settled state descriptors
		 */
		function settle(promises) {
			return all(promises.map(settleOne));
		}

		function settleOne(p) {
			// Optimize the case where we get an already-resolved when.js promise
			//  by extracting its state:
			var handler;
			if (p instanceof Promise) {
				// This is our own Promise type and we can reach its handler internals:
				handler = p._handler.join();
			}
			if((handler && handler.state() === 0) || !handler) {
				// Either still pending, or not a Promise at all:
				return toPromise(p).then(state.fulfilled, state.rejected);
			}

			// The promise is our own, but it is already resolved. Take a shortcut.
			// Since we're not actually handling the resolution, we need to disable
			// rejection reporting.
			handler._unreport();
			return state.inspect(handler);
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduce(promises, f /*, initialValue */) {
			return arguments.length > 2 ? ar.call(promises, liftCombine(f), arguments[2])
					: ar.call(promises, liftCombine(f));
		}

		/**
		 * Traditional reduce function, similar to `Array.prototype.reduceRight()`, but
		 * input may contain promises and/or values, and reduceFunc
		 * may return either a value or a promise, *and* initialValue may
		 * be a promise for the starting value.
		 * @param {Array|Promise} promises array or promise for an array of anything,
		 *      may contain a mix of promises and values.
		 * @param {function(accumulated:*, x:*, index:Number):*} f reduce function
		 * @returns {Promise} that will resolve to the final reduced value
		 */
		function reduceRight(promises, f /*, initialValue */) {
			return arguments.length > 2 ? arr.call(promises, liftCombine(f), arguments[2])
					: arr.call(promises, liftCombine(f));
		}

		function liftCombine(f) {
			return function(z, x, i) {
				return applyFold(f, void 0, [z,x,i]);
			};
		}
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/flow.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/flow.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function flow(Promise) {

		var resolve = Promise.resolve;
		var reject = Promise.reject;
		var origCatch = Promise.prototype['catch'];

		/**
		 * Handle the ultimate fulfillment value or rejection reason, and assume
		 * responsibility for all errors.  If an error propagates out of result
		 * or handleFatalError, it will be rethrown to the host, resulting in a
		 * loud stack track on most platforms and a crash on some.
		 * @param {function?} onResult
		 * @param {function?} onError
		 * @returns {undefined}
		 */
		Promise.prototype.done = function(onResult, onError) {
			this._handler.visit(this._handler.receiver, onResult, onError);
		};

		/**
		 * Add Error-type and predicate matching to catch.  Examples:
		 * promise.catch(TypeError, handleTypeError)
		 *   .catch(predicate, handleMatchedErrors)
		 *   .catch(handleRemainingErrors)
		 * @param onRejected
		 * @returns {*}
		 */
		Promise.prototype['catch'] = Promise.prototype.otherwise = function(onRejected) {
			if (arguments.length < 2) {
				return origCatch.call(this, onRejected);
			}

			if(typeof onRejected !== 'function') {
				return this.ensure(rejectInvalidPredicate);
			}

			return origCatch.call(this, createCatchFilter(arguments[1], onRejected));
		};

		/**
		 * Wraps the provided catch handler, so that it will only be called
		 * if the predicate evaluates truthy
		 * @param {?function} handler
		 * @param {function} predicate
		 * @returns {function} conditional catch handler
		 */
		function createCatchFilter(handler, predicate) {
			return function(e) {
				return evaluatePredicate(e, predicate)
					? handler.call(this, e)
					: reject(e);
			};
		}

		/**
		 * Ensures that onFulfilledOrRejected will be called regardless of whether
		 * this promise is fulfilled or rejected.  onFulfilledOrRejected WILL NOT
		 * receive the promises' value or reason.  Any returned value will be disregarded.
		 * onFulfilledOrRejected may throw or return a rejected promise to signal
		 * an additional error.
		 * @param {function} handler handler to be called regardless of
		 *  fulfillment or rejection
		 * @returns {Promise}
		 */
		Promise.prototype['finally'] = Promise.prototype.ensure = function(handler) {
			if(typeof handler !== 'function') {
				return this;
			}

			return this.then(function(x) {
				return runSideEffect(handler, this, identity, x);
			}, function(e) {
				return runSideEffect(handler, this, reject, e);
			});
		};

		function runSideEffect (handler, thisArg, propagate, value) {
			var result = handler.call(thisArg);
			return maybeThenable(result)
				? propagateValue(result, propagate, value)
				: propagate(value);
		}

		function propagateValue (result, propagate, x) {
			return resolve(result).then(function () {
				return propagate(x);
			});
		}

		/**
		 * Recover from a failure by returning a defaultValue.  If defaultValue
		 * is a promise, it's fulfillment value will be used.  If defaultValue is
		 * a promise that rejects, the returned promise will reject with the
		 * same reason.
		 * @param {*} defaultValue
		 * @returns {Promise} new promise
		 */
		Promise.prototype['else'] = Promise.prototype.orElse = function(defaultValue) {
			return this.then(void 0, function() {
				return defaultValue;
			});
		};

		/**
		 * Shortcut for .then(function() { return value; })
		 * @param  {*} value
		 * @return {Promise} a promise that:
		 *  - is fulfilled if value is not a promise, or
		 *  - if value is a promise, will fulfill with its value, or reject
		 *    with its reason.
		 */
		Promise.prototype['yield'] = function(value) {
			return this.then(function() {
				return value;
			});
		};

		/**
		 * Runs a side effect when this promise fulfills, without changing the
		 * fulfillment value.
		 * @param {function} onFulfilledSideEffect
		 * @returns {Promise}
		 */
		Promise.prototype.tap = function(onFulfilledSideEffect) {
			return this.then(onFulfilledSideEffect)['yield'](this);
		};

		return Promise;
	};

	function rejectInvalidPredicate() {
		throw new TypeError('catch predicate must be a function');
	}

	function evaluatePredicate(e, predicate) {
		return isError(predicate) ? e instanceof predicate : predicate(e);
	}

	function isError(predicate) {
		return predicate === Error
			|| (predicate != null && predicate.prototype instanceof Error);
	}

	function maybeThenable(x) {
		return (typeof x === 'object' || typeof x === 'function') && x !== null;
	}

	function identity(x) {
		return x;
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/fold.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/fold.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Jeff Escalante */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function fold(Promise) {

		Promise.prototype.fold = function(f, z) {
			var promise = this._beget();

			this._handler.fold(function(z, x, to) {
				Promise._handler(z).fold(function(x, z, to) {
					to.resolve(f.call(this, z, x));
				}, x, this, to);
			}, z, promise._handler.receiver, promise._handler);

			return promise;
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/inspect.js":
/*!*****************************************************!*\
  !*** ./node_modules/when/lib/decorators/inspect.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var inspect = __webpack_require__(/*! ../state */ "./node_modules/when/lib/state.js").inspect;

	return function inspection(Promise) {

		Promise.prototype.inspect = function() {
			return inspect(Promise._handler(this));
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/iterate.js":
/*!*****************************************************!*\
  !*** ./node_modules/when/lib/decorators/iterate.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function generate(Promise) {

		var resolve = Promise.resolve;

		Promise.iterate = iterate;
		Promise.unfold = unfold;

		return Promise;

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.iterate
		 * Generate a (potentially infinite) stream of promised values:
		 * x, f(x), f(f(x)), etc. until condition(x) returns true
		 * @param {function} f function to generate a new x from the previous x
		 * @param {function} condition function that, given the current x, returns
		 *  truthy when the iterate should stop
		 * @param {function} handler function to handle the value produced by f
		 * @param {*|Promise} x starting value, may be a promise
		 * @return {Promise} the result of the last call to f before
		 *  condition returns true
		 */
		function iterate(f, condition, handler, x) {
			return unfold(function(x) {
				return [x, f(x)];
			}, condition, handler, x);
		}

		/**
		 * @deprecated Use github.com/cujojs/most streams and most.unfold
		 * Generate a (potentially infinite) stream of promised values
		 * by applying handler(generator(seed)) iteratively until
		 * condition(seed) returns true.
		 * @param {function} unspool function that generates a [value, newSeed]
		 *  given a seed.
		 * @param {function} condition function that, given the current seed, returns
		 *  truthy when the unfold should stop
		 * @param {function} handler function to handle the value produced by unspool
		 * @param x {*|Promise} starting value, may be a promise
		 * @return {Promise} the result of the last value produced by unspool before
		 *  condition returns true
		 */
		function unfold(unspool, condition, handler, x) {
			return resolve(x).then(function(seed) {
				return resolve(condition(seed)).then(function(done) {
					return done ? seed : resolve(unspool(seed)).spread(next);
				});
			});

			function next(item, newSeed) {
				return resolve(handler(item)).then(function() {
					return unfold(unspool, condition, handler, newSeed);
				});
			}
		}
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/progress.js":
/*!******************************************************!*\
  !*** ./node_modules/when/lib/decorators/progress.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function progress(Promise) {

		/**
		 * @deprecated
		 * Register a progress handler for this promise
		 * @param {function} onProgress
		 * @returns {Promise}
		 */
		Promise.prototype.progress = function(onProgress) {
			return this.then(void 0, void 0, onProgress);
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/timed.js":
/*!***************************************************!*\
  !*** ./node_modules/when/lib/decorators/timed.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var env = __webpack_require__(/*! ../env */ "./node_modules/when/lib/env.js");
	var TimeoutError = __webpack_require__(/*! ../TimeoutError */ "./node_modules/when/lib/TimeoutError.js");

	function setTimeout(f, ms, x, y) {
		return env.setTimer(function() {
			f(x, y, ms);
		}, ms);
	}

	return function timed(Promise) {
		/**
		 * Return a new promise whose fulfillment value is revealed only
		 * after ms milliseconds
		 * @param {number} ms milliseconds
		 * @returns {Promise}
		 */
		Promise.prototype.delay = function(ms) {
			var p = this._beget();
			this._handler.fold(handleDelay, ms, void 0, p._handler);
			return p;
		};

		function handleDelay(ms, x, h) {
			setTimeout(resolveDelay, ms, x, h);
		}

		function resolveDelay(x, h) {
			h.resolve(x);
		}

		/**
		 * Return a new promise that rejects after ms milliseconds unless
		 * this promise fulfills earlier, in which case the returned promise
		 * fulfills with the same value.
		 * @param {number} ms milliseconds
		 * @param {Error|*=} reason optional rejection reason to use, defaults
		 *   to a TimeoutError if not provided
		 * @returns {Promise}
		 */
		Promise.prototype.timeout = function(ms, reason) {
			var p = this._beget();
			var h = p._handler;

			var t = setTimeout(onTimeout, ms, reason, p._handler);

			this._handler.visit(h,
				function onFulfill(x) {
					env.clearTimer(t);
					this.resolve(x); // this = h
				},
				function onReject(x) {
					env.clearTimer(t);
					this.reject(x); // this = h
				},
				h.notify);

			return p;
		};

		function onTimeout(reason, h, ms) {
			var e = typeof reason === 'undefined'
				? new TimeoutError('timed out after ' + ms + 'ms')
				: reason;
			h.reject(e);
		}

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/unhandledRejection.js":
/*!****************************************************************!*\
  !*** ./node_modules/when/lib/decorators/unhandledRejection.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {

	var setTimer = __webpack_require__(/*! ../env */ "./node_modules/when/lib/env.js").setTimer;
	var format = __webpack_require__(/*! ../format */ "./node_modules/when/lib/format.js");

	return function unhandledRejection(Promise) {

		var logError = noop;
		var logInfo = noop;
		var localConsole;

		if(typeof console !== 'undefined') {
			// Alias console to prevent things like uglify's drop_console option from
			// removing console.log/error. Unhandled rejections fall into the same
			// category as uncaught exceptions, and build tools shouldn't silence them.
			localConsole = console;
			logError = typeof localConsole.error !== 'undefined'
				? function (e) { localConsole.error(e); }
				: function (e) { localConsole.log(e); };

			logInfo = typeof localConsole.info !== 'undefined'
				? function (e) { localConsole.info(e); }
				: function (e) { localConsole.log(e); };
		}

		Promise.onPotentiallyUnhandledRejection = function(rejection) {
			enqueue(report, rejection);
		};

		Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
			enqueue(unreport, rejection);
		};

		Promise.onFatalRejection = function(rejection) {
			enqueue(throwit, rejection.value);
		};

		var tasks = [];
		var reported = [];
		var running = null;

		function report(r) {
			if(!r.handled) {
				reported.push(r);
				logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
			}
		}

		function unreport(r) {
			var i = reported.indexOf(r);
			if(i >= 0) {
				reported.splice(i, 1);
				logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
			}
		}

		function enqueue(f, x) {
			tasks.push(f, x);
			if(running === null) {
				running = setTimer(flush, 0);
			}
		}

		function flush() {
			running = null;
			while(tasks.length > 0) {
				tasks.shift()(tasks.shift());
			}
		}

		return Promise;
	};

	function throwit(e) {
		throw e;
	}

	function noop() {}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/decorators/with.js":
/*!**************************************************!*\
  !*** ./node_modules/when/lib/decorators/with.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function addWith(Promise) {
		/**
		 * Returns a promise whose handlers will be called with `this` set to
		 * the supplied receiver.  Subsequent promises derived from the
		 * returned promise will also have their handlers called with receiver
		 * as `this`. Calling `with` with undefined or no arguments will return
		 * a promise whose handlers will again be called in the usual Promises/A+
		 * way (no `this`) thus safely undoing any previous `with` in the
		 * promise chain.
		 *
		 * WARNING: Promises returned from `with`/`withThis` are NOT Promises/A+
		 * compliant, specifically violating 2.2.5 (http://promisesaplus.com/#point-41)
		 *
		 * @param {object} receiver `this` value for all handlers attached to
		 *  the returned promise.
		 * @returns {Promise}
		 */
		Promise.prototype['with'] = Promise.prototype.withThis = function(receiver) {
			var p = this._beget();
			var child = p._handler;
			child.receiver = receiver;
			this._handler.chain(child, receiver);
			return p;
		};

		return Promise;
	};

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));



/***/ }),

/***/ "./node_modules/when/lib/env.js":
/*!**************************************!*\
  !*** ./node_modules/when/lib/env.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;var require;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(require) {
	/*jshint maxcomplexity:6*/

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// setTimeout, and finally vertx, since its the only env that doesn't
	// have setTimeout

	var MutationObs;
	var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

	// Default env
	var setTimer = function(f, ms) { return setTimeout(f, ms); };
	var clearTimer = function(t) { return clearTimeout(t); };
	var asap = function (f) { return capturedSetTimeout(f, 0); };

	// Detect specific env
	if (isNode()) { // Node
		asap = function (f) { return process.nextTick(f); };

	} else if (MutationObs = hasMutationObserver()) { // Modern browser
		asap = initMutationObserver(MutationObs);

	} else if (!capturedSetTimeout) { // vert.x
		var vertxRequire = require;
		var vertx = __webpack_require__(/*! vertx */ 0);
		setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
		clearTimer = vertx.cancelTimer;
		asap = vertx.runOnLoop || vertx.runOnContext;
	}

	return {
		setTimer: setTimer,
		clearTimer: clearTimer,
		asap: asap
	};

	function isNode () {
		return typeof process !== 'undefined' &&
			Object.prototype.toString.call(process) === '[object process]';
	}

	function hasMutationObserver () {
	    return (typeof MutationObserver !== 'undefined' && MutationObserver) ||
			(typeof WebKitMutationObserver !== 'undefined' && WebKitMutationObserver);
	}

	function initMutationObserver(MutationObserver) {
		var scheduled;
		var node = document.createTextNode('');
		var o = new MutationObserver(run);
		o.observe(node, { characterData: true });

		function run() {
			var f = scheduled;
			scheduled = void 0;
			f();
		}

		var i = 0;
		return function (f) {
			scheduled = f;
			node.data = (i ^= 1);
		};
	}
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/when/lib/format.js":
/*!*****************************************!*\
  !*** ./node_modules/when/lib/format.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return {
		formatError: formatError,
		formatObject: formatObject,
		tryStringify: tryStringify
	};

	/**
	 * Format an error into a string.  If e is an Error and has a stack property,
	 * it's returned.  Otherwise, e is formatted using formatObject, with a
	 * warning added about e not being a proper Error.
	 * @param {*} e
	 * @returns {String} formatted string, suitable for output to developers
	 */
	function formatError(e) {
		var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
		return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
	}

	/**
	 * Format an object, detecting "plain" objects and running them through
	 * JSON.stringify if possible.
	 * @param {Object} o
	 * @returns {string}
	 */
	function formatObject(o) {
		var s = String(o);
		if(s === '[object Object]' && typeof JSON !== 'undefined') {
			s = tryStringify(o, s);
		}
		return s;
	}

	/**
	 * Try to return the result of JSON.stringify(x).  If that fails, return
	 * defaultValue
	 * @param {*} x
	 * @param {*} defaultValue
	 * @returns {String|*} JSON.stringify(x) or defaultValue
	 */
	function tryStringify(x, defaultValue) {
		try {
			return JSON.stringify(x);
		} catch(e) {
			return defaultValue;
		}
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/lib/makePromise.js":
/*!**********************************************!*\
  !*** ./node_modules/when/lib/makePromise.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;
		var emitRejection = initEmitRejection();

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * @deprecated
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @param {function=} onProgress @deprecated progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			return begetFrom(this._handler, this.constructor);
		};

		function begetFrom(parent, Promise) {
			var child = new Pending(parent.receiver, parent.join().context);
			return new Promise(Handler, child);
		}

		// Array combinators

		Promise.all = all;
		Promise.race = race;
		Promise._traverse = traverse;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			return traverseWith(snd, null, promises);
		}

		/**
		 * Array<Promise<X>> -> Promise<Array<f(X)>>
		 * @private
		 * @param {function} f function to apply to each promise's value
		 * @param {Array} promises array of promises
		 * @returns {Promise} promise for transformed values
		 */
		function traverse(f, promises) {
			return traverseWith(tryCatch2, f, promises);
		}

		function traverseWith(tryMap, f, promises) {
			var handler = typeof f === 'function' ? mapAt : settleAt;

			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				traverseAt(promises, handler, i, x, resolver);
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function mapAt(i, x, resolver) {
				if(!resolver.resolved) {
					traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
				}
			}

			function settleAt(i, x, resolver) {
				results[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(results));
				}
			}
		}

		function traverseAt(promises, handler, i, x, resolver) {
			if (maybeThenable(x)) {
				var h = getHandlerMaybeThenable(x);
				var s = h.state();

				if (s === 0) {
					h.fold(handler, i, void 0, resolver);
				} else if (s > 0) {
					handler(i, h.value, resolver);
				} else {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
				}
			} else {
				handler(i, x, resolver);
			}
		}

		Promise._visitRemaining = visitRemaining;
		function visitRemaining(promises, start, handler) {
			for(var i=start; i<promises.length; ++i) {
				markAsHandled(getHandler(promises[i]), handler);
			}
		}

		function markAsHandled(h, handler) {
			if(h === handler) {
				return;
			}

			var s = h.state();
			if(s === 0) {
				h.visit(h, void 0, h._unreport);
			} else if(s < 0) {
				h._unreport();
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			if(typeof promises !== 'object' || promises === null) {
				return reject(new TypeError('non-iterable passed to race()'));
			}

			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			return promises.length === 0 ? never()
				 : promises.length === 1 ? resolve(promises[0])
				 : runRace(promises);
		}

		function runRace(promises) {
			var resolver = new Pending();
			var i, x, h;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x === void 0 && !(i in promises)) {
					continue;
				}

				h = getHandler(x);
				if(h.state() !== 0) {
					resolver.become(h);
					visitRemaining(promises, i+1, h);
					break;
				} else {
					h.visit(resolver, resolver.resolve, resolver.reject);
				}
			}
			return new Promise(Handler, resolver);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify // deprecated
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.when(new Fold(f, z, c, to));
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.handler;
			this.handler = this.handler.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		/**
		 * @deprecated
		 */
		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			if(this.handled) {
				return;
			}
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			this.reported = true;
			emitRejection('unhandledRejection', this);
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled && !this.rejection.reported) {
				this.rejection.reported = true;
				emitRejection('unhandledRejection', this.rejection) ||
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				emitRejection('rejectionHandled', this.rejection) ||
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		/**
		 * Fold a handler value with z
		 * @constructor
		 */
		function Fold(f, z, c, to) {
			this.f = f; this.z = z; this.c = c; this.to = to;
			this.resolver = failIfRejected;
			this.receiver = this;
		}

		Fold.prototype.fulfilled = function(x) {
			this.f.call(this.c, this.z, x, this.to);
		};

		Fold.prototype.rejected = function(x) {
			this.to.reject(x);
		};

		Fold.prototype.progress = function(x) {
			this.to.notify(x);
		};

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		/**
		 * @deprecated
		 */
		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		function tryCatch2(f, a, b) {
			try {
				return f(a, b);
			} catch(e) {
				return reject(e);
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * @deprecated
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function snd(x, y) {
			return y;
		}

		function noop() {}

		function hasCustomEvent() {
			if(typeof CustomEvent === 'function') {
				try {
					var ev = new CustomEvent('unhandledRejection');
					return ev instanceof CustomEvent;
				} catch (ignoredException) {}
			}
			return false;
		}

		function hasInternetExplorerCustomEvent() {
			if(typeof document !== 'undefined' && typeof document.createEvent === 'function') {
				try {
					// Try to create one event to make sure it's supported
					var ev = document.createEvent('CustomEvent');
					ev.initCustomEvent('eventType', false, true, {});
					return true;
				} catch (ignoredException) {}
			}
			return false;
		}

		function initEmitRejection() {
			/*global process, self, CustomEvent*/
			if(typeof process !== 'undefined' && process !== null
				&& typeof process.emit === 'function') {
				// Returning falsy here means to call the default
				// onPotentiallyUnhandledRejection API.  This is safe even in
				// browserify since process.emit always returns falsy in browserify:
				// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
				return function(type, rejection) {
					return type === 'unhandledRejection'
						? process.emit(type, rejection.value, rejection)
						: process.emit(type, rejection);
				};
			} else if(typeof self !== 'undefined' && hasCustomEvent()) {
				return (function (self, CustomEvent) {
					return function (type, rejection) {
						var ev = new CustomEvent(type, {
							detail: {
								reason: rejection.value,
								key: rejection
							},
							bubbles: false,
							cancelable: true
						});

						return !self.dispatchEvent(ev);
					};
				}(self, CustomEvent));
			} else if(typeof self !== 'undefined' && hasInternetExplorerCustomEvent()) {
				return (function(self, document) {
					return function(type, rejection) {
						var ev = document.createEvent('CustomEvent');
						ev.initCustomEvent(type, false, true, {
							reason: rejection.value,
							key: rejection
						});

						return !self.dispatchEvent(ev);
					};
				}(self, document));
			}

			return noop;
		}

		return Promise;
	};
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/when/lib/state.js":
/*!****************************************!*\
  !*** ./node_modules/when/lib/state.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {

	return {
		pending: toPendingState,
		fulfilled: toFulfilledState,
		rejected: toRejectedState,
		inspect: inspect
	};

	function toPendingState() {
		return { state: 'pending' };
	}

	function toRejectedState(e) {
		return { state: 'rejected', reason: e };
	}

	function toFulfilledState(x) {
		return { state: 'fulfilled', value: x };
	}

	function inspect(handler) {
		var state = handler.state();
		return state === 0 ? toPendingState()
			 : state > 0   ? toFulfilledState(handler.value)
			               : toRejectedState(handler.value);
	}

}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")));


/***/ }),

/***/ "./node_modules/when/when.js":
/*!***********************************!*\
  !*** ./node_modules/when/when.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */

/**
 * Promises/A+ and when() implementation
 * when is part of the cujoJS family of libraries (http://cujojs.com/)
 * @author Brian Cavalier
 * @author John Hann
 */
(function(define) { 'use strict';
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	var timed = __webpack_require__(/*! ./lib/decorators/timed */ "./node_modules/when/lib/decorators/timed.js");
	var array = __webpack_require__(/*! ./lib/decorators/array */ "./node_modules/when/lib/decorators/array.js");
	var flow = __webpack_require__(/*! ./lib/decorators/flow */ "./node_modules/when/lib/decorators/flow.js");
	var fold = __webpack_require__(/*! ./lib/decorators/fold */ "./node_modules/when/lib/decorators/fold.js");
	var inspect = __webpack_require__(/*! ./lib/decorators/inspect */ "./node_modules/when/lib/decorators/inspect.js");
	var generate = __webpack_require__(/*! ./lib/decorators/iterate */ "./node_modules/when/lib/decorators/iterate.js");
	var progress = __webpack_require__(/*! ./lib/decorators/progress */ "./node_modules/when/lib/decorators/progress.js");
	var withThis = __webpack_require__(/*! ./lib/decorators/with */ "./node_modules/when/lib/decorators/with.js");
	var unhandledRejection = __webpack_require__(/*! ./lib/decorators/unhandledRejection */ "./node_modules/when/lib/decorators/unhandledRejection.js");
	var TimeoutError = __webpack_require__(/*! ./lib/TimeoutError */ "./node_modules/when/lib/TimeoutError.js");

	var Promise = [array, flow, fold, generate, progress,
		inspect, withThis, timed, unhandledRejection]
		.reduce(function(Promise, feature) {
			return feature(Promise);
		}, __webpack_require__(/*! ./lib/Promise */ "./node_modules/when/lib/Promise.js"));

	var apply = __webpack_require__(/*! ./lib/apply */ "./node_modules/when/lib/apply.js")(Promise);

	// Public API

	when.promise     = promise;              // Create a pending promise
	when.resolve     = Promise.resolve;      // Create a resolved promise
	when.reject      = Promise.reject;       // Create a rejected promise

	when.lift        = lift;                 // lift a function to return promises
	when['try']      = attempt;              // call a function and return a promise
	when.attempt     = attempt;              // alias for when.try

	when.iterate     = Promise.iterate;      // DEPRECATED (use cujojs/most streams) Generate a stream of promises
	when.unfold      = Promise.unfold;       // DEPRECATED (use cujojs/most streams) Generate a stream of promises

	when.join        = join;                 // Join 2 or more promises

	when.all         = all;                  // Resolve a list of promises
	when.settle      = settle;               // Settle a list of promises

	when.any         = lift(Promise.any);    // One-winner race
	when.some        = lift(Promise.some);   // Multi-winner race
	when.race        = lift(Promise.race);   // First-to-settle race

	when.map         = map;                  // Array.map() for promises
	when.filter      = filter;               // Array.filter() for promises
	when.reduce      = lift(Promise.reduce);       // Array.reduce() for promises
	when.reduceRight = lift(Promise.reduceRight);  // Array.reduceRight() for promises

	when.isPromiseLike = isPromiseLike;      // Is something promise-like, aka thenable

	when.Promise     = Promise;              // Promise constructor
	when.defer       = defer;                // Create a {promise, resolve, reject} tuple

	// Error types

	when.TimeoutError = TimeoutError;

	/**
	 * Get a trusted promise for x, or by transforming x with onFulfilled
	 *
	 * @param {*} x
	 * @param {function?} onFulfilled callback to be called when x is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} onRejected callback to be called when x is
	 *   rejected.
	 * @param {function?} onProgress callback to be called when progress updates
	 *   are issued for x. @deprecated
	 * @returns {Promise} a new promise that will fulfill with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(x, onFulfilled, onRejected, onProgress) {
		var p = Promise.resolve(x);
		if (arguments.length < 2) {
			return p;
		}

		return p.then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Creates a new promise whose fate is determined by resolver.
	 * @param {function} resolver function(resolve, reject, notify)
	 * @returns {Promise} promise whose fate is determine by resolver
	 */
	function promise(resolver) {
		return new Promise(resolver);
	}

	/**
	 * Lift the supplied function, creating a version of f that returns
	 * promises, and accepts promises as arguments.
	 * @param {function} f
	 * @returns {Function} version of f that returns promises
	 */
	function lift(f) {
		return function() {
			for(var i=0, l=arguments.length, a=new Array(l); i<l; ++i) {
				a[i] = arguments[i];
			}
			return apply(f, this, a);
		};
	}

	/**
	 * Call f in a future turn, with the supplied args, and return a promise
	 * for the result.
	 * @param {function} f
	 * @returns {Promise}
	 */
	function attempt(f /*, args... */) {
		/*jshint validthis:true */
		for(var i=0, l=arguments.length-1, a=new Array(l); i<l; ++i) {
			a[i] = arguments[i+1];
		}
		return apply(f, this, a);
	}

	/**
	 * Creates a {promise, resolver} pair, either or both of which
	 * may be given out safely to consumers.
	 * @return {{promise: Promise, resolve: function, reject: function, notify: function}}
	 */
	function defer() {
		return new Deferred();
	}

	function Deferred() {
		var p = Promise._defer();

		function resolve(x) { p._handler.resolve(x); }
		function reject(x) { p._handler.reject(x); }
		function notify(x) { p._handler.notify(x); }

		this.promise = p;
		this.resolve = resolve;
		this.reject = reject;
		this.notify = notify;
		this.resolver = { resolve: resolve, reject: reject, notify: notify };
	}

	/**
	 * Determines if x is promise-like, i.e. a thenable object
	 * NOTE: Will return true for *any thenable object*, and isn't truly
	 * safe, since it may attempt to access the `then` property of x (i.e.
	 *  clever/malicious getters may do weird things)
	 * @param {*} x anything
	 * @returns {boolean} true if x is promise-like
	 */
	function isPromiseLike(x) {
		return x && typeof x.then === 'function';
	}

	/**
	 * Return a promise that will resolve only once all the supplied arguments
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the arguments.
	 * @param {...*} arguments may be a mix of promises and values
	 * @returns {Promise}
	 */
	function join(/* ...promises */) {
		return Promise.all(arguments);
	}

	/**
	 * Return a promise that will fulfill once all input promises have
	 * fulfilled, or reject when any one input promise rejects.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise}
	 */
	function all(promises) {
		return when(promises, Promise.all);
	}

	/**
	 * Return a promise that will always fulfill with an array containing
	 * the outcome states of all input promises.  The returned promise
	 * will only reject if `promises` itself is a rejected promise.
	 * @param {array|Promise} promises array (or promise for an array) of promises
	 * @returns {Promise} promise for array of settled state descriptors
	 */
	function settle(promises) {
		return when(promises, Promise.settle);
	}

	/**
	 * Promise-aware array map function, similar to `Array.prototype.map()`,
	 * but input array may contain promises or values.
	 * @param {Array|Promise} promises array of anything, may contain promises and values
	 * @param {function(x:*, index:Number):*} mapFunc map function which may
	 *  return a promise or value
	 * @returns {Promise} promise that will fulfill with an array of mapped values
	 *  or reject if any input promise rejects.
	 */
	function map(promises, mapFunc) {
		return when(promises, function(promises) {
			return Promise.map(promises, mapFunc);
		});
	}

	/**
	 * Filter the provided array of promises using the provided predicate.  Input may
	 * contain promises and values
	 * @param {Array|Promise} promises array of promises and values
	 * @param {function(x:*, index:Number):boolean} predicate filtering predicate.
	 *  Must return truthy (or promise for truthy) for items to retain.
	 * @returns {Promise} promise that will fulfill with an array containing all items
	 *  for which predicate returned truthy.
	 */
	function filter(promises, predicate) {
		return when(promises, function(promises) {
			return Promise.filter(promises, predicate);
		});
	}

	return when;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
})(__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js"));


/***/ }),

/***/ "./src/BufferCache.ts":
/*!****************************!*\
  !*** ./src/BufferCache.ts ***!
  \****************************/
/*! exports provided: ArrayBufferType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayBufferType", function() { return ArrayBufferType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BufferCache; });
var ArrayBufferType;
(function (ArrayBufferType) {
    ArrayBufferType[ArrayBufferType["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
    ArrayBufferType[ArrayBufferType["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
})(ArrayBufferType || (ArrayBufferType = {}));
class BufferCache {
    // private _ibuffers : Record<number, WebGLBuffer> 
    constructor(gl) {
        this.gl = gl;
        this._buffers = {};
        // this._abuffers = {};
    }
    getBuffer(bufferView, target) {
        // const dict = (target == ArrayBufferType.ARRAY_BUFFER) ? this._abuffers : this._ibuffers;
        const uid = bufferView.uuid;
        let glBuffer = this._buffers[uid];
        if (glBuffer === undefined) {
            const gl = this.gl;
            const data = new Uint8Array(bufferView.buffer._bytes, bufferView.getByteOffset(), bufferView.byteLength);
            glBuffer = gl.createBuffer();
            gl.bindBuffer(target, glBuffer);
            gl.bufferData(target, data, gl.STATIC_DRAW);
            gl.bindBuffer(target, null);
            this._buffers[uid] = glBuffer;
        }
        // TODO: assert target match if existing buffer
        return glBuffer;
    }
}


/***/ }),

/***/ "./src/Semantics.ts":
/*!**************************!*\
  !*** ./src/Semantics.ts ***!
  \**************************/
/*! exports provided: DefaultSemantics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultSemantics", function() { return DefaultSemantics; });
const Semantics = {
    POSITION: { indexed: false, attrib: 'aPosition' },
    NORMAL: { indexed: false, attrib: 'aNormal' },
    TEXCOORD: { indexed: true, attrib: 'aTexCoord' },
    COLOR: { indexed: true, attrib: 'aColor' },
    JOINT: { indexed: false, attrib: 'aSkinJoint' },
    WEIGHT: { indexed: false, attrib: 'aSkinWeight' },
};
class DefaultSemantics {
    getAttributeName(semantic) {
        const [basename, set_index = 0] = semantic.split('_');
        const infos = Semantics[basename];
        if (infos !== undefined) {
            if (set_index > 0 || infos.indexed)
                return infos.attrib + set_index;
            return infos.attrib;
        }
        return semantic;
    }
}


/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/*! exports provided: MAGIC, JSON_MAGIC, GLB_HEADER_SIZE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAGIC", function() { return MAGIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSON_MAGIC", function() { return JSON_MAGIC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLB_HEADER_SIZE", function() { return GLB_HEADER_SIZE; });
const MAGIC = 0x46546C67; // "glTF"
const JSON_MAGIC = 0x4E4F534A; // "JSON"
const GLB_HEADER_SIZE = 20;


/***/ }),

/***/ "./src/elements/Accessor.ts":
/*!**********************************!*\
  !*** ./src/elements/Accessor.ts ***!
  \**********************************/
/*! exports provided: getArrayForDataType, BaseAccessor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArrayForDataType", function() { return getArrayForDataType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAccessor", function() { return BaseAccessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Accessor; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/assert */ "./src/lib/assert.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["BYTE"] = 5120] = "BYTE";
    ComponentType[ComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    ComponentType[ComponentType["SHORT"] = 5122] = "SHORT";
    ComponentType[ComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    ComponentType[ComponentType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    ComponentType[ComponentType["FLOAT"] = 5126] = "FLOAT";
})(ComponentType || (ComponentType = {}));
const TYPE_SIZE_MAP = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16
};
const ARRAY_TYPES = new Map([
    [5120 /* BYTE */, Int8Array],
    [5121 /* UNSIGNED_BYTE */, Uint8Array],
    [5122 /* SHORT */, Int16Array],
    [5123 /* UNSIGNED_SHORT */, Uint16Array],
    [5125 /* UNSIGNED_INT */, Uint32Array],
    [5126 /* FLOAT */, Float32Array],
]);
//https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md_animations
const NORMALIZE_FUNCS = new Map([
    [5120 /* BYTE */, c => Math.max(c / 127.0, -1.0)],
    [5121 /* UNSIGNED_BYTE */, c => c / 255.0],
    [5122 /* SHORT */, c => Math.max(c / 32767.0, -1.0)],
    [5123 /* UNSIGNED_SHORT */, c => c / 65535.0],
    [5125 /* UNSIGNED_INT */, c => c],
    [5126 /* FLOAT */, c => c],
]);
function getNormalizeFunction(t) {
    const a = NORMALIZE_FUNCS.get(t);
    _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(a);
    return a;
}
function getArrayForDataType(t) {
    const a = ARRAY_TYPES.get(t);
    _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(a);
    return a;
}
function getBytesLengthForDataType(t) {
    return getArrayForDataType(t).BYTES_PER_ELEMENT;
}
function getSizeForComponentType(t) {
    const a = TYPE_SIZE_MAP[t];
    _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isDefined(a);
    return a;
}
class BaseAccessor extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    get numComps() {
        return getSizeForComponentType(this.type);
    }
    get bytesPerElem() {
        return getBytesLengthForDataType(this.componentType);
    }
    *[Symbol.iterator]() {
        const holder = this.createElementHolder();
        for (let i = 0; i < this.count; i++) {
            this.getValue(holder, i);
            yield holder;
        }
    }
    /**
     * @return {TypedArray}
     */
    createElementHolder(normalized = this.normalized) {
        if (normalized)
            return new Float32Array(this.numComps);
        else
            return new (getArrayForDataType(this.componentType))(this.numComps);
    }
    /**
     * Copy accessor value at the given index to output array
     * @param {number} index
     * @param {boolean} normalized
     */
    getScalar(index, normalized = this.normalized) {
        let s;
        if (this.sparse !== null) {
            s = this.sparse.getRawScalar(index);
        }
        else {
            s = this.getRawScalar(index);
        }
        if (normalized) {
            s = this._normalizeFunc(s);
        }
        return s;
    }
    /**
     * Copy accessor value at the given index to output array. Skip sparse resolve
     * @param {number} index
     */
    getRawScalar(index) {
        const offset = this._strideElem * index;
        return this._array[offset];
    }
    /**
     * Copy accessor value at the given index to output array
     * @param {TypedArray} out output value
     * @param {number} index
     * @param {boolean} normalized
     */
    getValue(out, index, normalized = this.normalized) {
        const _out = normalized ? this._valueHolder : out;
        if (this.sparse !== null) {
            this.sparse.getRawValue(_out, index);
        }
        else {
            this.getRawValue(_out, index);
        }
        if (normalized) {
            this._normalize(out, _out);
        }
    }
    getRawValue(out, index) {
        const offset = this._strideElem * index;
        const ncomps = this.numComps;
        for (var i = 0; i < ncomps; i++) {
            out[i] = this._array[i + offset];
        }
    }
    _normalize(out, raw) {
        const fn = this._normalizeFunc;
        const ncomps = this.numComps;
        for (var i = 0; i < ncomps; i++) {
            out[i] = fn(raw[i]);
        }
    }
}
class Accessor extends BaseAccessor {
    constructor() {
        super(...arguments);
        this.gltftype = "accessors" /* ACCESSOR */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const { byteOffset = 0, normalized = false, } = data;
            this.normalized = normalized;
            this.byteOffset = byteOffset;
            this.componentType = data.componentType;
            this.count = data.count;
            this.type = data.type;
            this.max = data.max;
            this.min = data.min;
            if (data.bufferView !== undefined) {
                this.bufferView = yield gltfLoader.getElement("bufferViews" /* BUFFERVIEW */, data.bufferView);
                const Arr = getArrayForDataType(this.componentType);
                if (this.bufferView.byteStride === 0) {
                    this._stride = this.numComps * this.bytesPerElem;
                    this._strideElem = this.numComps;
                }
                else {
                    this._stride = this.bufferView.byteStride;
                    this._strideElem = this._stride / Arr.BYTES_PER_ELEMENT;
                    _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isTrue(this._strideElem === Math.round(this._strideElem));
                }
                this._array = new Arr(this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem);
            }
            else {
                this.bufferView = null;
                this._stride = 0;
                this._strideElem = 0;
                this._array = this.createElementHolder();
            }
            this.sparse = null;
            if (data.sparse !== undefined) {
                // can't await sparse here because of cyclic dependency ( => sparse await accessor)
                gltfLoader._loadElement(data.sparse).then(sparse => this.sparse = sparse);
            }
            this._valueHolder = this.createElementHolder();
            this._normalizeFunc = getNormalizeFunction(this.componentType);
            return Promise.resolve();
        });
    }
}


/***/ }),

/***/ "./src/elements/AccessorSparse.ts":
/*!****************************************!*\
  !*** ./src/elements/AccessorSparse.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AccessorSparse; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class AccessorSparse extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "sparse" /* ACCESSOR_SPARSE */;
    }
    parse(gltfLoader, data, ...args) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.accessor = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data.elementParent.elementIndex);
            this.indices = yield gltfLoader._loadElement(data.indices);
            this.values = yield gltfLoader._loadElement(data.values);
            // this.indices.parse( loader, {
            //   uuid : "-internal-",
            //   gltftype : GltfTypes.ACCESSOR,
            //   bufferView   : iData   .bufferView ,
            //   byteOffset   : iData   .byteOffset ,
            //   componentType: iData   .componentType,
            //   count        : data    .count,
            //   normalized   : accessor.normalized,
            //   type         : Gltf2.AccessorType.SCALAR    
            // });
            // let vData = data.values;
            // this.values = new Accessor();
            // this.values.parse( loader, {
            //   uuid : "-internal-",
            //   gltftype : GltfTypes.ACCESSOR,
            //   bufferView   : vData   .bufferView ,
            //   byteOffset   : vData   .byteOffset ,
            //   count        : data    .count,
            //   componentType: accessor.componentType,
            //   normalized   : accessor.normalized,
            //   type         : accessor.type
            // });
            const iset = this.indicesSet = new Set();
            const imap = this.indicesMap = new Map();
            const indices = this.indices;
            const count = indices.count;
            for (var i = 0; i < count; i++) {
                var j = indices.getScalar(i);
                iset.add(j);
                imap.set(j, i);
            }
        });
    }
    getRawValue(out, index) {
        const isSparse = this.indicesSet.has(index);
        if (isSparse) {
            this.values.getRawValue(out, this.indicesMap.get(index));
        }
        else {
            this.accessor.getRawValue(out, index);
        }
    }
    getRawScalar(index) {
        const isSparse = this.indicesSet.has(index);
        if (isSparse) {
            return this.values.getRawScalar(this.indicesMap.get(index));
        }
        else {
            return this.accessor.getRawScalar(index);
        }
    }
}


/***/ }),

/***/ "./src/elements/AccessorSparseIndices.ts":
/*!***********************************************!*\
  !*** ./src/elements/AccessorSparseIndices.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AccessorSparseIndices; });
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");
/* harmony import */ var _Accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accessor */ "./src/elements/Accessor.ts");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/assert */ "./src/lib/assert.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class AccessorSparseIndices extends _Accessor__WEBPACK_IMPORTED_MODULE_1__["BaseAccessor"] {
    constructor() {
        super(...arguments);
        this.gltftype = "sparseIndices" /* ACCESSOR_SPARSE_INDICES */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const sparseData = data.elementParent;
            this.normalized = false;
            this.byteOffset = (_a = data.byteOffset) !== null && _a !== void 0 ? _a : 0;
            this.componentType = data.componentType;
            this.count = sparseData.count;
            this.type = _types_Gltf2__WEBPACK_IMPORTED_MODULE_0__["default"].AccessorType.SCALAR;
            this.sparse = null;
            this.bufferView = yield gltfLoader.getElement("bufferViews" /* BUFFERVIEW */, data.bufferView);
            const Arr = Object(_Accessor__WEBPACK_IMPORTED_MODULE_1__["getArrayForDataType"])(this.componentType);
            if (this.bufferView.byteStride === 0) {
                this._stride = this.numComps * this.bytesPerElem;
                this._strideElem = this.numComps;
            }
            else {
                this._stride = this.bufferView.byteStride;
                this._strideElem = this._stride / Arr.BYTES_PER_ELEMENT;
                _lib_assert__WEBPACK_IMPORTED_MODULE_2__["default"].isTrue(this._strideElem === Math.round(this._strideElem));
            }
            this._array = new Arr(this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem);
            this._valueHolder = this.createElementHolder();
            return Promise.resolve();
        });
    }
}


/***/ }),

/***/ "./src/elements/AccessorSparseValues.ts":
/*!**********************************************!*\
  !*** ./src/elements/AccessorSparseValues.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AccessorSparseValues; });
/* harmony import */ var _Accessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accessor */ "./src/elements/Accessor.ts");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/assert */ "./src/lib/assert.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class AccessorSparseValues extends _Accessor__WEBPACK_IMPORTED_MODULE_0__["BaseAccessor"] {
    constructor() {
        super(...arguments);
        this.gltftype = "sparseValues" /* ACCESSOR_SPARSE_VALUES */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const sparseData = data.elementParent;
            const accessorData = sparseData.elementParent;
            this.byteOffset = (_a = data.byteOffset) !== null && _a !== void 0 ? _a : 0;
            this.count = sparseData.count;
            this.normalized = (_b = accessorData.normalized) !== null && _b !== void 0 ? _b : false;
            this.componentType = accessorData.componentType;
            this.type = accessorData.type;
            this.sparse = null;
            this.bufferView = yield gltfLoader.getElement("bufferViews" /* BUFFERVIEW */, data.bufferView);
            const Arr = Object(_Accessor__WEBPACK_IMPORTED_MODULE_0__["getArrayForDataType"])(this.componentType);
            if (this.bufferView.byteStride === 0) {
                this._stride = this.numComps * this.bytesPerElem;
                this._strideElem = this.numComps;
            }
            else {
                this._stride = this.bufferView.byteStride;
                this._strideElem = this._stride / Arr.BYTES_PER_ELEMENT;
                _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isTrue(this._strideElem === Math.round(this._strideElem));
            }
            this._array = new Arr(this.bufferView.buffer._bytes, this.byteOffset + this.bufferView.getByteOffset(), this.count * this._strideElem);
            this._valueHolder = this.createElementHolder();
            return Promise.resolve();
        });
    }
}


/***/ }),

/***/ "./src/elements/Animation.ts":
/*!***********************************!*\
  !*** ./src/elements/Animation.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animation; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Animation extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "animations" /* ANIMATION */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const samplerPromises = data.samplers.map((data) => gltfLoader._loadElement(data));
            this.samplers = yield Promise.all(samplerPromises);
            const channelPromises = data.channels.map((data) => gltfLoader._loadElement(data));
            this.channels = yield Promise.all(channelPromises);
        });
    }
    evaluate(t) {
        for (var channel of this.channels) {
            channel.evaluate(t);
        }
    }
    getChannel(i) {
        return this.channels[i];
    }
    getSampler(i) {
        return this.samplers[i];
    }
}


/***/ }),

/***/ "./src/elements/AnimationChannel.ts":
/*!******************************************!*\
  !*** ./src/elements/AnimationChannel.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimationChannel; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var Path;
(function (Path) {
    Path["TRANSLATION"] = "translation";
    Path["ROTATION"] = "rotation";
    Path["SCALE"] = "scale";
    Path["WEIGHTS"] = "weights";
})(Path || (Path = {}));
function applyTranslation(node, value) {
    node.position.set(value);
    node.invalidate();
}
function applyRotation(node, value) {
    node.rotation.set(value);
    node.invalidate();
}
function applyScale(node, value) {
    node.scale.set(value);
    node.invalidate();
}
function applyWeights(node, value) {
    node.weights.set(value);
}
function getApplyFunctionFromPath(path) {
    switch (path) {
        case Path.TRANSLATION:
            return applyTranslation;
        case Path.ROTATION:
            return applyRotation;
        case Path.SCALE:
            return applyScale;
        case Path.WEIGHTS:
            return applyWeights;
        default:
            throw new Error('unsupported path ' + path);
    }
}
class AnimationChannel extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "animationChannels" /* ANIMATION_CHANNEL */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this._active = false;
            this.path = data.target.path;
            this.applyFunction = getApplyFunctionFromPath(this.path);
            if (data.target.node !== undefined) {
                this._active = true;
                this.node = yield gltfLoader.getElement("nodes" /* NODE */, data.target.node);
            }
            gltfLoader._loadElement(data.elementParent).then(animation => {
                this.sampler = animation.getSampler(data.sampler);
                this.valueHolder = this.sampler.createElementHolder();
            });
        });
    }
    evaluate(t) {
        if (this._active) {
            this.sampler.evaluate(this.valueHolder, t);
            this.applyFunction(this.node, this.valueHolder);
        }
    }
}


/***/ }),

/***/ "./src/elements/AnimationSampler.ts":
/*!******************************************!*\
  !*** ./src/elements/AnimationSampler.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AnimationSampler; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/src/gl-matrix.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gl_matrix__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function cubicSplineInterpolation(out, t, dt, v0, b0, a1, v1) {
    const t2 = t * t;
    const t3 = t * t2;
    const f0 = 2.0 * t3 - 3.0 * t2 + 1.0;
    const f1 = dt * (t3 - 2.0 * t2 + t);
    const f2 = 3.0 * t2 - 2.0 * t3;
    const f3 = dt * (t3 - t2);
    const ncomps = v0.length;
    for (var i = 0; i < ncomps; i++) {
        out[i] = f0 * v0[i] + f1 * b0[i] + f2 * v1[i] + f3 * a1[i];
    }
}
class SampleInterval {
    constructor(input) {
        this.frame = 0;
        this.t0 = input.getRawScalar(0);
        this.t1 = input.getRawScalar(1);
        this.inBound = true;
        this._fMax = input.count - 1;
    }
    contain(t) {
        if (t < this.t0)
            return -1;
        if (t >= this.t1)
            return 1;
        return 0;
    }
    normalizedFrame() {
        return Math.min(Math.max(this.frame, 0), this._fMax);
    }
}
class Interpolator {
    constructor(sampler) {
        this.sampler = sampler;
        this.interval = new SampleInterval(sampler.input);
    }
    resolveInterval(t) {
        const interval = this.interval;
        const input = this.sampler.input;
        const numFrames = input.count;
        const contain = interval.contain(t);
        // the current interval already contain t
        if (contain === 0)
            return;
        let frame;
        let t1;
        let t0;
        let inBound = true;
        if (contain > 0) {
            frame = interval.frame + 1;
            t1 = interval.t1;
            do {
                frame++;
                inBound = (frame < numFrames);
                t0 = t1;
                t1 = inBound ? input.getRawScalar(frame) : Number.MAX_VALUE;
            } while (t1 <= t);
            frame--;
        }
        else {
            frame = interval.frame;
            t0 = interval.t0;
            do {
                frame--;
                inBound = (frame >= 0);
                t1 = t0;
                t0 = inBound ? input.getRawScalar(frame) : -Number.MAX_VALUE;
            } while (t0 > t);
        }
        interval.frame = frame;
        interval.t0 = t0;
        interval.t1 = t1;
        interval.inBound = inBound;
    }
    evaluate(out, t) {
        //abstract
    }
}
class StepInterpolator extends Interpolator {
    evaluate(out, t) {
        this.resolveInterval(t);
        this.sampler.output.getValue(out, this.interval.normalizedFrame());
    }
}
function LERP_N(out, a, b, p) {
    const n = a.length;
    const invp = 1.0 - p;
    for (var i = 0; i < n; i++) {
        out[i] = a[i] * invp + b[i] * p;
    }
}
function LERP1(out, a, b, p) {
    out[0] = a[0] * (1.0 - p) + b[0] * p;
}
function getLerpFunction(numComps) {
    switch (numComps) {
        case 1:
            return LERP1;
        case 4:
            return gl_matrix__WEBPACK_IMPORTED_MODULE_1__["quat"].slerp;
        default:
            return LERP_N;
    }
}
class LinearInterpolator extends Interpolator {
    constructor(sampler) {
        super(sampler);
        this.val0 = sampler.output.createElementHolder();
        this.val1 = sampler.output.createElementHolder();
        this.lerpFunc = getLerpFunction(this.val0.length);
    }
    evaluate(out, t) {
        this.resolveInterval(t);
        const output = this.sampler.output;
        if (this.interval.inBound) {
            const { t0, t1, frame } = this.interval;
            const p = (t - t0) / (t1 - t0);
            output.getValue(this.val0, frame + 0);
            output.getValue(this.val1, frame + 1);
            this.lerpFunc(out, this.val0, this.val1, p);
        }
        else {
            output.getValue(out, this.interval.normalizedFrame());
        }
    }
}
// https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
class CubicSplineInterpolator extends Interpolator {
    constructor(sampler) {
        super(sampler);
        this.val0 = sampler.output.createElementHolder();
        this.val1 = sampler.output.createElementHolder();
        this.val2 = sampler.output.createElementHolder();
        this.val3 = sampler.output.createElementHolder();
        this.assumeQuat = (this.val0.length === 4);
    }
    evaluate(out, t) {
        this.resolveInterval(t);
        const output = this.sampler.output;
        if (this.interval.inBound) {
            const { t0, t1, frame } = this.interval;
            const dt = t1 - t0;
            const p = (t - t0) / dt;
            output.getValue(this.val0, frame * 3 + 1);
            output.getValue(this.val1, frame * 3 + 2);
            output.getValue(this.val2, frame * 3 + 3);
            output.getValue(this.val3, frame * 3 + 4);
            cubicSplineInterpolation(out, p, dt, this.val0, this.val1, this.val2, this.val3);
            if (this.assumeQuat) {
                gl_matrix__WEBPACK_IMPORTED_MODULE_1__["quat"].normalize(out, out);
            }
        }
        else {
            output.getValue(out, this.interval.normalizedFrame() * 3 + 1);
        }
    }
}
function InterpolatorFactory(sampler) {
    switch (sampler.interpolation) {
        case _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].AnimationSamplerInterpolation.STEP:
            return new StepInterpolator(sampler);
        case _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].AnimationSamplerInterpolation.LINEAR:
            return new LinearInterpolator(sampler);
        case _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].AnimationSamplerInterpolation.CUBICSPLINE:
            return new CubicSplineInterpolator(sampler);
        default:
            throw new Error('GLTF : Unsupported sampler interpolation ' + sampler.interpolation);
    }
}
class AnimationSampler extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "animationSamplers" /* ANIMATION_SAMPLER */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.input = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data.input);
            this.output = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data.output);
            this.interpolation = data.interpolation || _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].AnimationSamplerInterpolation.LINEAR;
            this.interpolator = InterpolatorFactory(this);
        });
    }
    createElementHolder() {
        return this.output.createElementHolder();
    }
    evaluate(out, t) {
        this.interpolator.evaluate(out, t);
    }
}


/***/ }),

/***/ "./src/elements/Asset.ts":
/*!*******************************!*\
  !*** ./src/elements/Asset.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Asset; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");

class Asset extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "asset" /* ASSET */;
    }
    parse(gltfLoader, data) {
        super.parse(gltfLoader, data);
        this.version = data.version;
        this.copyright = data.copyright;
        this.generator = data.generator;
        this.minVersion = data.minVersion;
        return Promise.resolve();
    }
}


/***/ }),

/***/ "./src/elements/BaseElement.ts":
/*!*************************************!*\
  !*** ./src/elements/BaseElement.ts ***!
  \*************************************/
/*! exports provided: ElementMixin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementMixin", function() { return ElementMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseElement; });
function ElementMixin(Base) {
    return class extends Base {
        parse(gltfLoader, data) {
            var _a;
            this.uuid = data.uuid;
            this.elementIndex = data.elementIndex;
            this.gltf = gltfLoader.gltf;
            this.name = (_a = data.name) !== null && _a !== void 0 ? _a : "";
            this.extras = data.extras;
            this.extensions = data.extensions;
            return Promise.resolve(true);
        }
        /** abstract */
        allocateGl(gl) {
            return null;
        }
    };
}

class BaseElement extends ElementMixin(Object) {
}


/***/ }),

/***/ "./src/elements/Buffer.ts":
/*!********************************!*\
  !*** ./src/elements/Buffer.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Buffer; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/assert */ "./src/lib/assert.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Buffer extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "buffers" /* BUFFER */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.byteLength = data.byteLength;
            this.uri = data.uri;
            this._byteOffset = 0;
            this._bytes = yield gltfLoader.loadBufferUri(data.uri);
            _lib_assert__WEBPACK_IMPORTED_MODULE_1__["default"].isTrue(this._bytes !== null);
        });
    }
}


/***/ }),

/***/ "./src/elements/BufferView.ts":
/*!************************************!*\
  !*** ./src/elements/BufferView.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BufferView; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class BufferView extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "bufferViews" /* BUFFERVIEW */;
        this.byteOffset = 0;
        this.byteLength = 0;
        this.byteStride = 0;
        this.target = 0;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const { byteLength, byteOffset = 0, byteStride = 0, target = 0 } = data;
            this.byteLength = byteLength;
            this.byteOffset = byteOffset;
            this.byteStride = byteStride;
            this.target = target;
            this.buffer = yield gltfLoader.getElement("buffers" /* BUFFER */, data.buffer);
        });
    }
    getByteOffset() {
        return this.byteOffset + this.buffer._byteOffset;
    }
    allocateGl(gl) {
    }
}


/***/ }),

/***/ "./src/elements/Camera.ts":
/*!********************************!*\
  !*** ./src/elements/Camera.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Camera; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/src/gl-matrix.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gl_matrix__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");



class Camera extends _BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "cameras" /* CAMERA */;
    }
    parse(gltfLoader, data) {
        super.parse(gltfLoader, data);
        this.projection = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.type = data.type;
        switch (this.type) {
            case _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].CameraType.PERSPECTIVE:
                this.projectionData = data.perspective;
                this.createPerpective(this.projectionData);
                break;
            case _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].CameraType.ORTHOGRAPHIC:
                this.projectionData = data.orthographic;
                this.createOrtho(this.projectionData);
                break;
            default:
                throw new Error('Camera - unsupported type ' + this.type);
        }
        return Promise.resolve();
    }
    createPerpective(data) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].perspective(this.projection, data.yfov, data.aspectRatio, data.znear, data.zfar);
    }
    createOrtho(data) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].ortho(this.projection, -data.xmag * .5, data.xmag * .5, -data.ymag * .5, data.ymag * .5, data.znear, data.zfar);
    }
}


/***/ }),

/***/ "./src/elements/Image.ts":
/*!*******************************!*\
  !*** ./src/elements/Image.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Image; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const _HAS_CIB = (window.createImageBitmap !== undefined);
class Image extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "images" /* IMAGE */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            if (data.uri) {
                this.uri = data.uri;
                if (this.uri.indexOf('data:') == 0) {
                    this.resolvedUri = this.uri;
                }
                else {
                    this.resolvedUri = gltfLoader.resolveUri(this.uri);
                }
            }
            this.mimeType = data.mimeType;
            if (data.bufferView !== undefined) {
                this.bufferView = yield gltfLoader.getElement("bufferViews" /* BUFFERVIEW */, data.bufferView);
            }
            this.texImageSource = yield this.loadImage();
        });
    }
    loadImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bufferView) {
                // mimeType is guaranted here
                const arrayView = new Uint8Array(this.bufferView.buffer._bytes, this.bufferView.getByteOffset(), this.bufferView.byteLength);
                const blob = new Blob([arrayView], { type: this.mimeType });
                return this.loadImageBuffer(blob);
            }
            else {
                // assume uri is defained as uri or data uri
                const request = yield fetch(this.resolvedUri);
                const blob = yield request.blob();
                return this.loadImageBuffer(blob);
            }
        });
    }
    loadImageBuffer(blob) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_HAS_CIB) {
                return createImageBitmap(blob);
            }
            else {
                const img = new window.Image();
                const src = URL.createObjectURL(blob);
                new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                })
                    .finally(() => URL.revokeObjectURL(src))
                    .then(() => img);
            }
        });
    }
}


/***/ }),

/***/ "./src/elements/Material.ts":
/*!**********************************!*\
  !*** ./src/elements/Material.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Material; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var _PbrMetallicRoughness__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PbrMetallicRoughness */ "./src/elements/PbrMetallicRoughness.ts");
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");
/* harmony import */ var _glsl_StandardPass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../glsl/StandardPass */ "./src/glsl/StandardPass.ts");
/* harmony import */ var nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nanogl-pbr/Input */ "./node_modules/nanogl-pbr/Input.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





function _isAllOnes(a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== 1)
            return false;
    }
    return true;
}
function _isAllZeros(a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== 0)
            return false;
    }
    return true;
}
const SRC_ALPHA = 0x0302;
const ONE_MINUS_SRC_ALPHA = 0x0303;
class Material extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "materials" /* MATERIAL */;
    }
    get materialPass() {
        return this._materialPass;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.emissiveFactor = new Float32Array(data.emissiveFactor || [0, 0, 0]);
            this.alphaMode = data.alphaMode || _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].MaterialAlphaMode.OPAQUE;
            this.alphaCutoff = (_a = data.alphaCutoff) !== null && _a !== void 0 ? _a : 0.5;
            this.doubleSided = (_b = data.doubleSided) !== null && _b !== void 0 ? _b : false;
            if (data.pbrMetallicRoughness !== undefined) {
                this.pbrMetallicRoughness = new _PbrMetallicRoughness__WEBPACK_IMPORTED_MODULE_1__["default"]();
                yield this.pbrMetallicRoughness.parse(gltfLoader, data.pbrMetallicRoughness);
            }
            if (data.normalTexture !== undefined) {
                this.normalTexture = yield gltfLoader._loadElement(data.normalTexture);
            }
            if (data.occlusionTexture !== undefined) {
                this.occlusionTexture = yield gltfLoader._loadElement(data.occlusionTexture);
            }
            if (data.emissiveTexture !== undefined) {
                this.emissiveTexture = yield gltfLoader._loadElement(data.emissiveTexture);
            }
            this.setupMaterialPass();
        });
    }
    // TODO: don't really need to be in gl allocation step
    setupMaterialPass() {
        const pass = new _glsl_StandardPass__WEBPACK_IMPORTED_MODULE_3__["default"](this.name);
        pass.glconfig.enableCullface(!this.doubleSided);
        pass.doubleSided.set(this.doubleSided);
        if (this.alphaMode === _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].MaterialAlphaMode.BLEND) {
            pass.glconfig.enableBlend();
            pass.glconfig.blendFunc(SRC_ALPHA, ONE_MINUS_SRC_ALPHA);
        }
        pass.alphaMode.set(this.alphaMode);
        if (this.alphaMode === _types_Gltf2__WEBPACK_IMPORTED_MODULE_2__["default"].MaterialAlphaMode.MASK) {
            pass.alphaCutoff.attachUniform('uAlphaCutoff').set(this.alphaCutoff);
        }
        const pbr = this.pbrMetallicRoughness;
        if (pbr !== undefined) {
            if (pbr.baseColorTexture) {
                const baseColorSampler = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["Sampler"]('tBaseColor', pass.getTexCoords(pbr.baseColorTexture.texCoord));
                pass.baseColor.attach(baseColorSampler, 'rgb');
                pass.alpha.attach(baseColorSampler, 'a');
            }
            if (pbr.metallicRoughnessTexture) {
                const mrSampler = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["Sampler"]('tMetalicRoughness', pass.getTexCoords(pbr.metallicRoughnessTexture.texCoord));
                pass.metalness.attach(mrSampler, 'b');
                pass.roughness.attach(mrSampler, 'g');
            }
            if (!_isAllOnes(pbr.baseColorFactor)) {
                pass.baseColorFactor.attachUniform('uBasecolorFactor').set(...pbr.baseColorFactor);
            }
            if (pbr.metallicFactor !== 1) {
                pass.metalnessFactor.attachUniform('uMetalnessFactor').set(pbr.metallicFactor);
            }
            if (pbr.roughnessFactor !== 1) {
                pass.roughnessFactor.attachUniform('uRoughnessFactor').set(pbr.roughnessFactor);
            }
        }
        if (this.emissiveTexture) {
            const sampler = pass.emissive.attachSampler('tEmissive', pass.getTexCoords(this.emissiveTexture.texCoord));
            sampler.set(this.emissiveTexture.texture.glTexture);
        }
        if (!_isAllZeros(this.emissiveFactor)) {
            pass.emissiveFactor.attachUniform('uEmissFactor').set(...this.emissiveFactor);
        }
        const nrm = this.normalTexture;
        if (nrm) {
            const sampler = pass.normal.attachSampler('tNormal', pass.getTexCoords(nrm.texCoord));
            sampler.set(nrm.texture.glTexture);
            if (nrm.scale !== 1) {
                pass.normalScale.attachUniform('uNormalScale').set(nrm.scale);
            }
        }
        const occlu = this.occlusionTexture;
        if (occlu) {
            const sampler = pass.occlusion.attachSampler('tOcclusion', pass.getTexCoords(occlu.texCoord));
            sampler.set(occlu.texture.glTexture);
            if (occlu.strength !== 1) {
                pass.occlusionStrength.attachUniform('uOccluStrength').set(occlu.strength);
            }
        }
        this._materialPass = pass;
    }
}


/***/ }),

/***/ "./src/elements/Mesh.ts":
/*!******************************!*\
  !*** ./src/elements/Mesh.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mesh; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Mesh extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "meshes" /* MESH */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const channelPromises = data.primitives.map((data) => gltfLoader._loadElement(data));
            this.primitives = yield Promise.all(channelPromises);
            if (data.weights) {
                this.weights = new Float32Array(data.weights);
            }
        });
    }
}


/***/ }),

/***/ "./src/elements/Node.ts":
/*!******************************!*\
  !*** ./src/elements/Node.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var nanogl_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanogl-node */ "./node_modules/nanogl-node/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Node extends Object(_BaseElement__WEBPACK_IMPORTED_MODULE_0__["ElementMixin"])(nanogl_node__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    constructor() {
        super(...arguments);
        this.gltftype = "nodes" /* NODE */;
        // set weights( weights ){
        //   this.mesh.weights.set( weights );
        // }
        // get weights( ){
        //   return this.mesh.weights;
        // }
    }
    parse(gltfLoader, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // super.parse();
            this.uuid = data.uuid;
            this.elementIndex = data.elementIndex;
            this.gltf = gltfLoader.gltf;
            this.name = data.name;
            this.extras = data.extras;
            this.extensions = data.extensions;
            if (data.camera !== undefined)
                this.camera = yield gltfLoader.getElement("cameras" /* CAMERA */, data.camera);
            if (data.matrix !== undefined)
                this.setMatrix(new Float32Array(data.matrix));
            if (data.scale !== undefined)
                this.scale.set(data.scale);
            if (data.translation !== undefined)
                this.position.set(data.translation);
            if (data.rotation !== undefined)
                this.rotation.set(data.rotation);
            if (data.weights !== undefined)
                this.weights = new Float32Array(data.weights);
            if (data.children !== undefined) {
                const childPromises = data.children.map((index) => gltfLoader.getElement("nodes" /* NODE */, index));
                const children = yield Promise.all(childPromises);
                for (var child of children) {
                    this.add(child);
                }
            }
            if (data.skin !== undefined) {
                this.skin = yield gltfLoader.getElement("skins" /* SKIN */, data.skin);
            }
            if (data.mesh !== undefined) {
                this.mesh = yield gltfLoader.getElement("meshes" /* MESH */, data.mesh);
            }
            this.invalidate();
        });
    }
}


/***/ }),

/***/ "./src/elements/NormalTextureInfo.ts":
/*!*******************************************!*\
  !*** ./src/elements/NormalTextureInfo.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NormalTextureInfo; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class NormalTextureInfo extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "normalTextureInfo" /* NORMAL_TEXTURE_INFO */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.texture = yield gltfLoader.getElement("textures" /* TEXTURE */, data.index);
            this.texCoord = (_a = data.texCoord) !== null && _a !== void 0 ? _a : 0;
            this.scale = (_b = data.scale) !== null && _b !== void 0 ? _b : 1.0;
        });
    }
}


/***/ }),

/***/ "./src/elements/OcclusionTextureInfo.ts":
/*!**********************************************!*\
  !*** ./src/elements/OcclusionTextureInfo.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OcclusionTextureInfo; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class OcclusionTextureInfo extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "occlusionTextureInfo" /* OCCLUSION_TEXTURE_INFO */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.texture = yield gltfLoader.getElement("textures" /* TEXTURE */, data.index);
            this.texCoord = (_a = data.texCoord) !== null && _a !== void 0 ? _a : 0;
            this.strength = (_b = data.strength) !== null && _b !== void 0 ? _b : 1;
        });
    }
}


/***/ }),

/***/ "./src/elements/PbrMetallicRoughness.ts":
/*!**********************************************!*\
  !*** ./src/elements/PbrMetallicRoughness.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PbrMetallicRoughness; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PbrMetallicRoughness {
    parse(gltfLoader, data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.baseColorFactor = new Float32Array(data.baseColorFactor || [1, 1, 1, 1]);
            this.metallicFactor = (_a = data.metallicFactor) !== null && _a !== void 0 ? _a : 1;
            this.roughnessFactor = (_b = data.roughnessFactor) !== null && _b !== void 0 ? _b : 1;
            if (data.baseColorTexture !== undefined) {
                this.baseColorTexture = yield gltfLoader._loadElement(data.baseColorTexture);
            }
            if (data.metallicRoughnessTexture !== undefined) {
                this.metallicRoughnessTexture = yield gltfLoader._loadElement(data.metallicRoughnessTexture);
            }
        });
    }
}


/***/ }),

/***/ "./src/elements/Primitive.ts":
/*!***********************************!*\
  !*** ./src/elements/Primitive.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Primitive; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var nanogl_arraybuffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanogl/arraybuffer */ "./node_modules/nanogl/arraybuffer.js");
/* harmony import */ var nanogl_vao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanogl-vao */ "./node_modules/nanogl-vao/vao.js");
/* harmony import */ var nanogl_indexbuffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanogl/indexbuffer */ "./node_modules/nanogl/indexbuffer.js");
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class Attribute {
    constructor(semantic, accessor) {
        this.semantic = semantic;
        this.accessor = accessor;
    }
}
class BufferInfos {
    constructor(accessor) {
        this.accessor = accessor;
        this.attributes = [];
    }
    addAttribute(attribute) {
        this.attributes.push(attribute);
    }
}
class AttributesSet {
    constructor() {
        this._attributes = [];
    }
    get length() {
        return this._attributes.length;
    }
    add(attribute) {
        this._attributes.push(attribute);
    }
    getSemantic(semantic) {
        for (var a of this._attributes) {
            if (a.semantic === semantic)
                return a;
        }
        return null;
    }
    /*
     * return set of attributes group by bufferView
     */
    getBuffersViewSets() {
        const map = new Map();
        for (var a of this._attributes) {
            var bId = a.accessor.bufferView.uuid;
            if (!map.has(bId)) {
                map.set(bId, new BufferInfos(a.accessor));
            }
            map.get(bId).addAttribute(a);
        }
        return Array.from(map.values());
    }
}
class Primitive extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "primitives" /* PRIMITIVE */;
        this.material = null;
        this.indices = null;
        this.targets = null;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.attributes = new AttributesSet();
            yield this.parseAttributeSet(gltfLoader, this.attributes, data.attributes);
            if (data.indices !== undefined)
                this.indices = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data.indices);
            if (data.material !== undefined)
                this.material = yield gltfLoader.getElement("materials" /* MATERIAL */, data.material);
            if (data.mode !== undefined)
                this.mode = data.mode;
            else
                this.mode = _types_Gltf2__WEBPACK_IMPORTED_MODULE_4__["default"].MeshPrimitiveMode.DEFAULT;
            if (data.targets !== undefined) {
                this.targets = [];
                for (var tgt of data.targets) {
                    const aset = new AttributesSet();
                    yield this.parseAttributeSet(gltfLoader, aset, tgt);
                    this.targets.push(aset);
                }
            }
        });
    }
    parseAttributeSet(gltfLoader, aset, data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const attrib in data) {
                const accessor = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data[attrib]);
                aset.add(new Attribute(attrib, accessor));
            }
        });
    }
    allocateGl(gl) {
        this._vaoMap = new Map();
        this.buffers = [];
        const buffersSet = this.attributes.getBuffersViewSets();
        for (const set of buffersSet) {
            this.buffers.push(this.createArrayBuffer(gl, set));
        }
        if (this.indices !== null) {
            const glBuffer = this.gltf.bufferCache.getBuffer(this.indices.bufferView, 34963 /* ELEMENT_ARRAY_BUFFER */);
            this.indexBuffer = new nanogl_indexbuffer__WEBPACK_IMPORTED_MODULE_3__["default"](gl, this.indices.componentType, undefined, gl.STATIC_DRAW, glBuffer);
        }
    }
    createArrayBuffer(gl, set) {
        const bufferView = set.accessor.bufferView;
        const glBuffer = this.gltf.bufferCache.getBuffer(bufferView, 34962 /* ARRAY_BUFFER */);
        const glArraybuffer = new nanogl_arraybuffer__WEBPACK_IMPORTED_MODULE_1__["default"](gl, undefined, gl.STATIC_DRAW, glBuffer);
        glArraybuffer.byteLength = bufferView.byteLength;
        glArraybuffer.stride = 0;
        for (const attribute of set.attributes) {
            const def = this.createAttributeDefinition(attribute);
            glArraybuffer.attribs.push(def);
        }
        return glArraybuffer;
    }
    createAttributeDefinition(attribute) {
        const accessor = attribute.accessor;
        return {
            name: this.gltf.semantics.getAttributeName(attribute.semantic),
            type: accessor.componentType,
            size: accessor.numComps,
            normalize: accessor.normalized,
            offset: accessor.byteOffset,
            stride: accessor._stride
        };
    }
    getVao(prg) {
        const id = prg._cuid.toString();
        if (!this._vaoMap.has(id)) {
            const vao = new nanogl_vao__WEBPACK_IMPORTED_MODULE_2__["default"](prg.gl);
            vao.setup(prg, this.buffers, this.indexBuffer);
            this._vaoMap.set(id, vao);
        }
        return this._vaoMap.get(id);
    }
    bindVao(prg) {
        this._currentVao = this.getVao(prg);
        this._currentVao.bind();
    }
    render() {
        if (this.indexBuffer)
            this.indexBuffer.draw(this.mode);
        else
            this.buffers[0].draw(this.mode);
    }
    unbindVao() {
        this._currentVao.unbind();
    }
}


/***/ }),

/***/ "./src/elements/Sampler.ts":
/*!*********************************!*\
  !*** ./src/elements/Sampler.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sampler; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");

const GL_REPEAT = 10497;
class Sampler extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "samplers" /* SAMPLER */;
    }
    parse(gltfLoader, data) {
        var _a, _b;
        super.parse(gltfLoader, data);
        this.magFilter = data.magFilter;
        this.minFilter = data.minFilter;
        this.wrapS = (_a = data.wrapS) !== null && _a !== void 0 ? _a : GL_REPEAT;
        this.wrapT = (_b = data.wrapT) !== null && _b !== void 0 ? _b : GL_REPEAT;
        return Promise.resolve();
    }
}


/***/ }),

/***/ "./src/elements/Scene.ts":
/*!*******************************!*\
  !*** ./src/elements/Scene.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scene; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Scene extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "scenes" /* SCENE */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            if (data.nodes !== undefined) {
                const nodePromises = data.nodes.map(idx => gltfLoader.getElement("nodes" /* NODE */, idx));
                this.nodes = yield Promise.all(nodePromises);
            }
            else {
                this.nodes = [];
            }
        });
    }
    /*
     * update world matrices of all scene nodes
     */
    updateNodes() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].updateWorldMatrix();
        }
    }
}


/***/ }),

/***/ "./src/elements/Skin.ts":
/*!******************************!*\
  !*** ./src/elements/Skin.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Skin; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "./node_modules/gl-matrix/src/gl-matrix.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gl_matrix__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Skin extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "skins" /* SKIN */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            const jointPromises = data.joints.map(idx => gltfLoader.getElement("nodes" /* NODE */, idx));
            this.joints = yield Promise.all(jointPromises);
            this.inverseBindMatrices = this.joints.map(gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].create);
            if (data.inverseBindMatrices !== undefined) {
                const ibmAccessor = yield gltfLoader.getElement("accessors" /* ACCESSOR */, data.inverseBindMatrices);
                this.inverseBindMatrices.forEach((m, i) => ibmAccessor.getValue(m, i));
            }
            if (data.skeleton !== undefined) {
                this.skeletonRoot = yield gltfLoader.getElement("nodes" /* NODE */, data.skeleton);
            }
        });
    }
}


/***/ }),

/***/ "./src/elements/Texture.ts":
/*!*********************************!*\
  !*** ./src/elements/Texture.ts ***!
  \*********************************/
/*! exports provided: filterHasMipmap, wrapRequirePot, isPowerOf2, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterHasMipmap", function() { return filterHasMipmap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapRequirePot", function() { return wrapRequirePot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPowerOf2", function() { return isPowerOf2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Texture; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
/* harmony import */ var _types_Gltf2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Gltf2 */ "./src/types/Gltf2.ts");
/* harmony import */ var nanogl_texture_2d__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nanogl/texture-2d */ "./node_modules/nanogl/texture-2d.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const GL_REPEAT = 0x2901;
const GL_MIRRORED_REPEAT = 0x8370;
function filterHasMipmap(filter) {
    return (filter & (1 << 8)) === (1 << 8);
}
function wrapRequirePot(wrap) {
    return wrap === GL_REPEAT || wrap === GL_MIRRORED_REPEAT;
}
function isPowerOf2(n) {
    return (n != 0 && (n & (n - 1)) === 0);
}
class Texture extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "textures" /* TEXTURE */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            if (data.sampler !== undefined) {
                this.sampler = yield gltfLoader.getElement("samplers" /* SAMPLER */, data.sampler);
            }
            if (data.source !== undefined) {
                this.source = yield gltfLoader.getElement("images" /* IMAGE */, data.source);
            }
        });
    }
    allocateGl(gl) {
        var _a, _b;
        let glFormat = gl.RGBA;
        if (this.source.mimeType === _types_Gltf2__WEBPACK_IMPORTED_MODULE_1__["default"].ImageMimeType.JPEG)
            glFormat = gl.RGBA;
        let minFilter = gl.LINEAR;
        let magFilter = gl.LINEAR;
        let wrapS = gl.REPEAT;
        let wrapT = gl.REPEAT;
        if (this.sampler) {
            minFilter = (_a = this.sampler.minFilter) !== null && _a !== void 0 ? _a : gl.LINEAR;
            magFilter = (_b = this.sampler.magFilter) !== null && _b !== void 0 ? _b : gl.LINEAR;
            wrapS = this.sampler.wrapS;
            wrapT = this.sampler.wrapT;
        }
        /*
          TODO: implement texture resize
          Resize source to POT if needed : if the sampler the texture references
          Has a wrapping mode (either wrapS or wrapT) equal to REPEAT or MIRRORED_REPEAT, or
          Has a minification filter (minFilter) that uses mipmapping (NEAREST_MIPMAP_NEAREST, NEAREST_MIPMAP_LINEAR, LINEAR_MIPMAP_NEAREST, or LINEAR_MIPMAP_LINEAR).
        */
        let texImageSource = this.source.texImageSource;
        if (wrapRequirePot(wrapS) || wrapRequirePot(wrapT) || filterHasMipmap(minFilter)) {
            if (!isPowerOf2(texImageSource.width) || !isPowerOf2(texImageSource.height))
                texImageSource = this.resizeToPOT(texImageSource);
        }
        this.glTexture = new nanogl_texture_2d__WEBPACK_IMPORTED_MODULE_2__["default"](gl, glFormat, gl.UNSIGNED_BYTE);
        this.glTexture.fromImage(this.source.texImageSource);
        if (filterHasMipmap(minFilter)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
    }
    resizeToPOT(source) {
        throw new Error("Not implemented - Texture source need to be resized to power of 2");
        return source;
    }
}


/***/ }),

/***/ "./src/elements/TextureInfo.ts":
/*!*************************************!*\
  !*** ./src/elements/TextureInfo.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextureInfo; });
/* harmony import */ var _BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseElement */ "./src/elements/BaseElement.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class TextureInfo extends _BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.gltftype = "textureInfo" /* TEXTURE_INFO */;
    }
    parse(gltfLoader, data) {
        const _super = Object.create(null, {
            parse: { get: () => super.parse }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _super.parse.call(this, gltfLoader, data);
            this.texture = yield gltfLoader.getElement("textures" /* TEXTURE */, data.index);
            this.texCoord = (_a = data.texCoord) !== null && _a !== void 0 ? _a : 0;
        });
    }
}


/***/ }),

/***/ "./src/extensions/DefaultExtension.ts":
/*!********************************************!*\
  !*** ./src/extensions/DefaultExtension.ts ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elements_Animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../elements/Animation */ "./src/elements/Animation.ts");
/* harmony import */ var _elements_AnimationChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../elements/AnimationChannel */ "./src/elements/AnimationChannel.ts");
/* harmony import */ var _elements_AnimationSampler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../elements/AnimationSampler */ "./src/elements/AnimationSampler.ts");
/* harmony import */ var _elements_Accessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../elements/Accessor */ "./src/elements/Accessor.ts");
/* harmony import */ var _elements_Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../elements/Camera */ "./src/elements/Camera.ts");
/* harmony import */ var _elements_Material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../elements/Material */ "./src/elements/Material.ts");
/* harmony import */ var _elements_Mesh__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../elements/Mesh */ "./src/elements/Mesh.ts");
/* harmony import */ var _elements_NormalTextureInfo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../elements/NormalTextureInfo */ "./src/elements/NormalTextureInfo.ts");
/* harmony import */ var _elements_OcclusionTextureInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../elements/OcclusionTextureInfo */ "./src/elements/OcclusionTextureInfo.ts");
/* harmony import */ var _elements_PbrMetallicRoughness__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../elements/PbrMetallicRoughness */ "./src/elements/PbrMetallicRoughness.ts");
/* harmony import */ var _elements_Primitive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../elements/Primitive */ "./src/elements/Primitive.ts");
/* harmony import */ var _elements_Sampler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../elements/Sampler */ "./src/elements/Sampler.ts");
/* harmony import */ var _elements_Scene__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../elements/Scene */ "./src/elements/Scene.ts");
/* harmony import */ var _elements_Skin__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../elements/Skin */ "./src/elements/Skin.ts");
/* harmony import */ var _elements_Texture__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../elements/Texture */ "./src/elements/Texture.ts");
/* harmony import */ var _elements_TextureInfo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../elements/TextureInfo */ "./src/elements/TextureInfo.ts");
/* harmony import */ var _elements_Node__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../elements/Node */ "./src/elements/Node.ts");
/* harmony import */ var _elements_Image__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../elements/Image */ "./src/elements/Image.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _elements_Asset__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../elements/Asset */ "./src/elements/Asset.ts");
/* harmony import */ var _elements_Buffer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../elements/Buffer */ "./src/elements/Buffer.ts");
/* harmony import */ var _elements_BufferView__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../elements/BufferView */ "./src/elements/BufferView.ts");
/* harmony import */ var _elements_AccessorSparse__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../elements/AccessorSparse */ "./src/elements/AccessorSparse.ts");
/* harmony import */ var _elements_AccessorSparseIndices__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../elements/AccessorSparseIndices */ "./src/elements/AccessorSparseIndices.ts");
/* harmony import */ var _elements_AccessorSparseValues__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../elements/AccessorSparseValues */ "./src/elements/AccessorSparseValues.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

























class DefaultExtensionInstance {
    constructor(gltfLoader) {
        this.name = 'default';
        this.order = -1;
        this.loader = gltfLoader;
    }
    loadElement(data) {
        switch (data.gltftype) {
            case "accessors" /* ACCESSOR */: return this.createAccessor(data);
            case "sparse" /* ACCESSOR_SPARSE */: return this.createAccessorSparse(data);
            case "sparseIndices" /* ACCESSOR_SPARSE_INDICES */: return this.createAccessorSparseIndices(data);
            case "sparseValues" /* ACCESSOR_SPARSE_VALUES */: return this.createAccessorSparseValues(data);
            case "animations" /* ANIMATION */: return this.createAnimation(data);
            case "animationSamplers" /* ANIMATION_SAMPLER */: return this.createAnimationSampler(data);
            case "animationChannels" /* ANIMATION_CHANNEL */: return this.createAnimationChannel(data);
            case "asset" /* ASSET */: return this.createAsset(data);
            case "buffers" /* BUFFER */: return this.createBuffer(data);
            case "bufferViews" /* BUFFERVIEW */: return this.createBufferview(data);
            case "cameras" /* CAMERA */: return this.createCamera(data);
            case "images" /* IMAGE */: return this.createImage(data);
            case "materials" /* MATERIAL */: return this.createMaterial(data);
            case "meshes" /* MESH */: return this.createMesh(data);
            case "nodes" /* NODE */: return this.createNode(data);
            case "normalTextureInfo" /* NORMAL_TEXTURE_INFO */: return this.createNormalTextureInfo(data);
            case "occlusionTextureInfo" /* OCCLUSION_TEXTURE_INFO */: return this.createOcclusionTextureInfo(data);
            case "primitives" /* PRIMITIVE */: return this.createPrimitive(data);
            case "samplers" /* SAMPLER */: return this.createSampler(data);
            case "scenes" /* SCENE */: return this.createScene(data);
            case "skins" /* SKIN */: return this.createSkin(data);
            case "textures" /* TEXTURE */: return this.createTexture(data);
            case "textureInfo" /* TEXTURE_INFO */: return this.createTextureInfo(data);
        }
    }
    createAccessor(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Accessor__WEBPACK_IMPORTED_MODULE_3__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAccessorSparse(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_AccessorSparse__WEBPACK_IMPORTED_MODULE_22__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAccessorSparseIndices(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_AccessorSparseIndices__WEBPACK_IMPORTED_MODULE_23__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAccessorSparseValues(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_AccessorSparseValues__WEBPACK_IMPORTED_MODULE_24__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAsset(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Asset__WEBPACK_IMPORTED_MODULE_19__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createBuffer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Buffer__WEBPACK_IMPORTED_MODULE_20__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createBufferview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_BufferView__WEBPACK_IMPORTED_MODULE_21__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAnimationChannel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_AnimationChannel__WEBPACK_IMPORTED_MODULE_1__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAnimationSampler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_AnimationSampler__WEBPACK_IMPORTED_MODULE_2__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createAnimation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Animation__WEBPACK_IMPORTED_MODULE_0__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createCamera(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Camera__WEBPACK_IMPORTED_MODULE_4__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Image__WEBPACK_IMPORTED_MODULE_17__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createMaterial(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Material__WEBPACK_IMPORTED_MODULE_5__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createMesh(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Mesh__WEBPACK_IMPORTED_MODULE_6__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createNode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Node__WEBPACK_IMPORTED_MODULE_16__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createNormalTextureInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_NormalTextureInfo__WEBPACK_IMPORTED_MODULE_7__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createOcclusionTextureInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_OcclusionTextureInfo__WEBPACK_IMPORTED_MODULE_8__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createPbrMetallicRoughness(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_PbrMetallicRoughness__WEBPACK_IMPORTED_MODULE_9__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createPrimitive(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Primitive__WEBPACK_IMPORTED_MODULE_10__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createSampler(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Sampler__WEBPACK_IMPORTED_MODULE_11__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createScene(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Scene__WEBPACK_IMPORTED_MODULE_12__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createSkin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Skin__WEBPACK_IMPORTED_MODULE_13__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createTexture(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_Texture__WEBPACK_IMPORTED_MODULE_14__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
    createTextureInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = new _elements_TextureInfo__WEBPACK_IMPORTED_MODULE_15__["default"]();
            yield el.parse(this.loader, data);
            return el;
        });
    }
}
class DefaultExtensionFactory {
    constructor() {
        this.name = 'default';
    }
    createInstance(gltfLoader) {
        return new DefaultExtensionInstance(gltfLoader);
    }
}
const defaultExtension = new DefaultExtensionFactory();
___WEBPACK_IMPORTED_MODULE_18__["default"].addExtension(defaultExtension);


/***/ }),

/***/ "./src/extensions/Registry.ts":
/*!************************************!*\
  !*** ./src/extensions/Registry.ts ***!
  \************************************/
/*! exports provided: ExtensionList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionList", function() { return ExtensionList; });
/* harmony import */ var _lib_assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/assert */ "./src/lib/assert.ts");
//@ts-check

class ExtensionList {
    constructor() {
        this._map = {};
        this._list = [];
    }
    addExtension(ext) {
        this._map[ext.name] = ext;
        this._list.push(ext);
    }
    sort() {
        this._list.sort((a, b) => a.order - b.order);
    }
    validate(used = [], required = []) {
        for (const id of used) {
            if (this._map[id] === undefined)
                console.warn(`Missing used extension ${id}`);
        }
        for (const id of required) {
            if (this._map[id] === undefined)
                throw new Error(`Missing required extension ${id}`);
        }
    }
}
class ExtensionsRegistry {
    constructor() {
        this._extensionFactories = {};
    }
    addExtension(ext) {
        const id = ext.name;
        _lib_assert__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(this._extensionFactories[id], `extension '${id}' already exist`);
        this._extensionFactories[id] = ext;
    }
    setupExtensions(loader, used = [], required = []) {
        const res = loader._extensions;
        for (const extName in this._extensionFactories) {
            const extInstance = this._extensionFactories[extName].createInstance(loader);
            _lib_assert__WEBPACK_IMPORTED_MODULE_0__["default"].isTrue(extInstance.name === extName);
            res.addExtension(extInstance);
        }
        res.sort();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ExtensionsRegistry);


/***/ }),

/***/ "./src/glsl/StandardPass.ts":
/*!**********************************!*\
  !*** ./src/glsl/StandardPass.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StandardPass; });
/* harmony import */ var _uvTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uvTransform */ "./src/glsl/uvTransform.ts");
/* harmony import */ var _standard_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./standard.vert */ "./src/glsl/standard.vert");
/* harmony import */ var _standard_vert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_standard_vert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _standard_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./standard.frag */ "./src/glsl/standard.frag");
/* harmony import */ var _standard_frag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_standard_frag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var gl_matrix_src_gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gl-matrix/src/gl-matrix/mat4 */ "./node_modules/gl-matrix/src/gl-matrix/mat4.js");
/* harmony import */ var gl_matrix_src_gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(gl_matrix_src_gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nanogl-pbr/Input */ "./node_modules/nanogl-pbr/Input.js");
/* harmony import */ var nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! nanogl-pbr/Flag */ "./node_modules/nanogl-pbr/Flag.js");
/* harmony import */ var nanogl_pbr_Enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nanogl-pbr/Enum */ "./node_modules/nanogl-pbr/Enum.js");
/* harmony import */ var nanogl_pbr_ShaderPrecision__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! nanogl-pbr/ShaderPrecision */ "./node_modules/nanogl-pbr/ShaderPrecision.js");
/* harmony import */ var nanogl_pbr_ShaderVersion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! nanogl-pbr/ShaderVersion */ "./node_modules/nanogl-pbr/ShaderVersion.js");
/* harmony import */ var nanogl_pbr_MaterialPass__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! nanogl-pbr/MaterialPass */ "./node_modules/nanogl-pbr/MaterialPass.js");










const M4 = gl_matrix_src_gl_matrix_mat4__WEBPACK_IMPORTED_MODULE_3___default.a.create();
const MAT_ID = 'std';
/**
 * @extends {BaseMaterial}
 */
class StandardPass extends nanogl_pbr_MaterialPass__WEBPACK_IMPORTED_MODULE_9__["default"] {
    constructor(name = 'gltf-std-pass') {
        super({
            uid: MAT_ID,
            vert: _standard_vert__WEBPACK_IMPORTED_MODULE_1___default()(),
            frag: _standard_frag__WEBPACK_IMPORTED_MODULE_2___default()(),
        });
        this._uvs = new Map();
        this.ibl = null;
        /*
        alphaMode : enum MaterialAlphaMode "OPAQUE","MASK","BLEND",
        
        alphaCutoff : float
        doubleSided : flag
        
        baseColorFactor          : vec4
        metallicFactor           : number
        roughnessFactor          : number
        baseColorTexture         : tex
        metallicRoughnessTexture : tex
        
        emissiveTex
        emissiveFactor : vec3
        
        normalTexture : tex
        normalScale : float
        
        occlusionTex
        occlusionStrength : float
        */
        const inputs = this.inputs;
        inputs.add(this.version = new nanogl_pbr_ShaderVersion__WEBPACK_IMPORTED_MODULE_8__["default"]('100'));
        inputs.add(this.precision = new nanogl_pbr_ShaderPrecision__WEBPACK_IMPORTED_MODULE_7__["default"]('highp'));
        inputs.add(this.shaderid = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('id_' + MAT_ID, true));
        // inputs.add( this.iTexCoord0      = new UVTransform( 'aTexCoord0', 'vTexCoord0' ) );
        inputs.add(this.baseColor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('baseColor', 3));
        inputs.add(this.baseColorFactor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('baseColorFactor', 3));
        inputs.add(this.alpha = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('alpha', 1));
        inputs.add(this.alphaFactor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('alphaFactor', 1));
        inputs.add(this.alphaCutoff = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('alphaCutoff', 1));
        inputs.add(this.metalness = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('metalness', 1));
        inputs.add(this.metalnessFactor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('metalnessFactor', 1));
        inputs.add(this.roughness = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('roughness', 1));
        inputs.add(this.roughnessFactor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('roughnessFactor', 1));
        inputs.add(this.emissive = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('emissive', 3));
        inputs.add(this.emissiveFactor = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('emissiveFactor', 3));
        inputs.add(this.normal = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('normal', 3));
        inputs.add(this.normalScale = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('normalScale', 1));
        inputs.add(this.occlusion = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('occlusion', 1));
        inputs.add(this.occlusionStrength = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('occlusionStrength', 1));
        inputs.add(this.iGamma = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('gamma', 1));
        inputs.add(this.iExposure = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_4__["default"]('exposure', 1));
        inputs.add(this.alphaMode = new nanogl_pbr_Enum__WEBPACK_IMPORTED_MODULE_6__["default"]('alphaMode', [
            "OPAQUE",
            "MASK",
            "BLEND"
        ]));
        inputs.add(this.doubleSided = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('doubleSided', false));
        inputs.add(this.conserveEnergy = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('conserveEnergy', false));
        inputs.add(this.perVertexIrrad = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('perVertexIrrad', false));
        inputs.add(this.glossNearest = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('glossNearest', false));
        inputs.add(this.noFresnel = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('noFresnel', false));
        inputs.add(this.horizonFading = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('horizonFading', false));
        inputs.add(this.useDerivatives = new nanogl_pbr_Flag__WEBPACK_IMPORTED_MODULE_5__["default"]('useDerivatives', false));
        inputs.add(this.gammaMode = new nanogl_pbr_Enum__WEBPACK_IMPORTED_MODULE_6__["default"]('gammaMode', [
            'GAMMA_NONE',
            'GAMMA_STD',
            'GAMMA_2_2',
            'GAMMA_TB'
        ])).set('GAMMA_2_2');
    }
    getTexCoords(index = 0) {
        let tc = this._uvs.get(index);
        if (tc === undefined) {
            tc = new _uvTransform__WEBPACK_IMPORTED_MODULE_0__["default"]('aTexCoord' + index, 'vTexCoord' + index);
            this.inputs.add(tc);
            this._uvs.set(index, tc);
        }
        return tc.token();
    }
    /**
     *
     * @param {Ibl} ibl
     */
    setIBL(ibl) {
        this.ibl = ibl;
    }
    setLightSetup(setup) {
        this.inputs.addChunks(setup.getChunks('std'));
    }
    prepare(prg, node, camera) {
        this.ibl.setupProgram(prg);
        // matrices
        if (prg.uMVP) {
            camera.modelViewProjectionMatrix(M4, node._wmatrix);
            prg.uMVP(M4);
        }
        if (prg.uWorldMatrix)
            prg.uWorldMatrix(node._wmatrix);
        if (prg.uVP)
            prg.uVP(camera._viewProj);
        if (prg.uCameraPosition)
            prg.uCameraPosition(camera._wposition);
    }
}
;


/***/ }),

/***/ "./src/glsl/includes/perturb-normal.glsl":
/*!***********************************************!*\
  !*** ./src/glsl/includes/perturb-normal.glsl ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`

#if useDerivatives


vec3 perturbWorldNormalDerivatives( vec3 nrm, vec3 n, vec2 texcoord ){
  // compute derivations of the world position

  vec3 p_dx = dFdx(vWorldPosition);
  vec3 p_dy = dFdy(vWorldPosition);
  // compute derivations of the texture coordinate
  vec2 tc_dx = dFdx(texcoord);
  vec2 tc_dy = dFdy(texcoord);

  float l = sign(tc_dx.x * tc_dy.y - tc_dx.y * tc_dy.x);
  
  // prevent some low precision issue (on )
  // l = max( 0.001 , l );


  // compute initial tangent and bi-tangent
  vec3 t = normalize( tc_dy.y * p_dx - tc_dx.y * p_dy )*l;
  vec3 b = normalize( tc_dx.x * p_dy - tc_dy.x * p_dx )*l;

  // get new tangent from a given world normal
  vec3 x = cross(nrm, t);
  t = cross(x, nrm);
  t = normalize(t);
  // get updated bi-tangent
  x = cross(b, nrm);
  b = cross(nrm, x);
  b = -normalize(b);
  mat3 tbn = mat3(t, b, nrm);
  return tbn * n;
}


  
#endif

vec3 perturbWorldNormal( vec3 nrm, vec3 n, vec3 wtan, vec3 wbitan ){
  return wtan * n.x + wbitan*n.y + nrm * n.z;
}

`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/includes/sh.glsl":
/*!***********************************!*\
  !*** ./src/glsl/includes/sh.glsl ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`
#ifndef _H_SAMPLE_SH_
#define _H_SAMPLE_SH_
// ================================
// compute Spherical Harmonics
// ================================
//
// "Stupid Spherical Harmonics (SH) Tricks"
// http://www.ppsloan.org/publications/StupidSH36.pdf
//
//
vec3 SampleSH( vec3 N, vec4 sh[7] )
{
  N.xz = N.zx;
  vec4 NV = vec4(N, 1.0);

  // todo transpose coeffs directly
  // NV.xyz = NV.zyx;

  vec3 X0, X1, X2;
  X0.x = dot( sh[0].xyz, N) + sh[0].w;
  X0.y = dot( sh[1].xyz, N) + sh[1].w;
  X0.z = dot( sh[2].xyz, N) + sh[2].w;

  vec4 vB = NV.zyxx * NV.yxxz;
  X1.x = dot( sh[3].xyz, vB.xyz) + (sh[3].w * vB.w);
  X1.y = dot( sh[4].xyz, vB.xyz) + (sh[4].w * vB.w);
  X1.z = dot( sh[5].xyz, vB.xyz) + (sh[5].w * vB.w);

  float vC = NV.z * NV.z - NV.y * NV.y;
  X2 =  sh[6].xyz * vC;

  return ( X0 + X1 + X2 );
//  return max( vec3(0.0) , X0 + X1 + X2 );
}

#endif
`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/includes/tonemap.glsl":
/*!****************************************!*\
  !*** ./src/glsl/includes/tonemap.glsl ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`

#ifndef _H_TONEMAP_
#define _H_TONEMAP_


  // Exposure
  // ===========
 
  #if HAS_exposure
    #define EXPOSURE(color) color *= vec3( exposure() );
  #else
    #define EXPOSURE(color)
  #endif


  // Gamma correction
  // ===========

  #if gammaMode( GAMMA_STD ) && HAS_gamma
    #define GAMMA_CORRECTION(color) color = pow( color, vec3( gamma() ) );


  #elif gammaMode( GAMMA_2_2 )
    #define GAMMA_CORRECTION(color) color = pow( color, vec3( 1.0/2.2 ) );


  #elif gammaMode( GAMMA_TB )

    void ToneMapTB( inout vec3 color ) {
      vec3 c = color;
      vec3 sqrtc = sqrt( c );
      color = (sqrtc-sqrtc*c) + c*(0.4672*c+vec3(0.5328));
    }

    #define GAMMA_CORRECTION(color) ToneMapTB( color );

  #else
    #define GAMMA_CORRECTION(color)

  #endif



#endif`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/standard.frag":
/*!********************************!*\
  !*** ./src/glsl/standard.frag ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const _INCL_0 = __webpack_require__(/*! ./includes/sh.glsl */ "./src/glsl/includes/sh.glsl");
const _INCL_1 = __webpack_require__(/*! nanogl-pbr/glsl/includes/ibl.glsl */ "./node_modules/nanogl-pbr/glsl/includes/ibl.glsl");
const _INCL_2 = __webpack_require__(/*! ./includes/perturb-normal.glsl */ "./src/glsl/includes/perturb-normal.glsl");
const _INCL_3 = __webpack_require__(/*! ./includes/tonemap.glsl */ "./src/glsl/includes/tonemap.glsl");


function fn( obj )
{
  let __p = '';

  __p+=`#pragma SLOT version
#pragma SLOT definitions

#if useDerivatives && __VERSION__ != 300
  #extension GL_OES_standard_derivatives : enable
#endif 

#pragma SLOT precision

#if __VERSION__ == 300
  #define IN in
  #define texture2D(a,b) texture( a, b )
#else
  #define IN varying
  #define FragColor gl_FragColor
#endif



#if __VERSION__ == 300
  out vec4 FragColor;
#endif

#pragma SLOT pf


uniform vec3 uCameraPosition;

IN vec3 vWorldPosition;

IN mediump vec3 vWorldNormal;


#if HAS_normal && useDerivatives == 0
  IN mediump vec3 vWorldTangent;
  IN mediump vec3 vWorldBitangent;
#endif


// IBL
// ========
uniform sampler2D tEnv;

#if perVertexIrrad
  IN vec3 vIrradiance;
#else
  uniform vec4 uSHCoeffs[7];
  ${_INCL_0()}
#endif



// MATH
// =========
#define saturate(x) clamp( x, 0.0, 1.0 )
#define sdot( a, b ) saturate( dot(a,b) )



${_INCL_1()}
${_INCL_2()}
${_INCL_3()}


// Schlick approx
// [Schlick 1994, "An Inexpensive BRDF Model for Physically-Based Rendering"]
// https://github.com/EpicGames/UnrealEngine/blob/dff3c48be101bb9f84633a733ef79c91c38d9542/Engine/Shaders/BRDF.usf#L168
vec3 F_Schlick( float VoH,vec3 spec,float glo )
{
  float dot = glo*glo * pow( 1.0-VoH, 5.0 );
  return( 1.0 - dot )*spec + dot;
}




#if HAS_normal
  #if HAS_normalScale
    #define SCALED_NORMAL(k) GetScaledNormal( normal(), normalScale() )
    vec3 GetScaledNormal( vec3 nrmtex, float scale ){
      vec3 nrm = nrmtex = nrmtex*vec3(2.0) - vec3(1.0);
      return normalize( nrm * vec3(scale, scale, 1.0 ) );
    }
  #else
    #define SCALED_NORMAL(k) GetScaledNormal( normal() )
    vec3 GetScaledNormal( vec3 nrmtex ){
      return nrmtex = nrmtex*vec3(2.0) - vec3(1.0);
    }
  #endif
  
  
  #define COMPUTE_NORMAL(k) ComputeWorldNormal( SCALED_NORMAL() )
  vec3 ComputeWorldNormal( vec3 nrmmap ){
    
    vec3 nrm = normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
    #if useDerivatives
      vec3 res = normalize( perturbWorldNormalDerivatives( nrm, nrmmap, vTexCoord0 ) );
    #else
      vec3 res = normalize( perturbWorldNormal( nrm, nrmmap, vWorldTangent, vWorldBitangent ) );
    #endif
    // res = res * 0.0001 + vWorldNormal;

    return res;
  }

#else
  #define COMPUTE_NORMAL(k) ComputeWorldNormal( )
  vec3 ComputeWorldNormal(){
    return normalize( gl_FrontFacing ? vWorldNormal : -vWorldNormal );
  }
#endif



vec3 ComputeIBLDiffuse( vec3 worldNormal ){
  #if perVertexIrrad
    return vIrradiance;
  #else
    return SampleSH(worldNormal, uSHCoeffs );
  #endif
}


//                MAIN
// ===================

void main( void ){

  #pragma SLOT f

  // -----------
  vec3 worldNormal = COMPUTE_NORMAL();



  // SH Irradiance diffuse coeff
  // -------------

  vec3 diffuseCoef = ComputeIBLDiffuse( worldNormal );


  // IBL reflexion
  // --------------

  vec3 viewDir = normalize( uCameraPosition - vWorldPosition );
  vec3 worldReflect = reflect( -viewDir, worldNormal );
  vec3 specularColor = SpecularIBL( tEnv, worldReflect, roughness() );


  #pragma SLOT lightsf


  vec4 _baseColor = vec4(1.0);
  #if HAS_baseColor
    _baseColor *= baseColor();
  #endif
  #if HAS_baseColorFactor
    _baseColor *= baseColorFactor();
  #endif


  float _metalness = 1.0;
  #if HAS_metalnessFactor
    _metalness *= metalnessFactor();
  #endif
  #if HAS_metalness
    _metalness *= metalness();
  #endif


  float _roughness = 1.0;
  #if HAS_roughnessFactor
    _roughness *= roughnessFactor();
  #endif
  #if HAS_roughness
    _roughness *= roughness();
  #endif




  float NoV = sdot( viewDir, worldNormal );
  vec3 specularF0 = mix( vec3(0.04), _baseColor, metalness() );
  specularColor *= F_Schlick( NoV, specularF0, 1.0-roughness() );


  
	#if horizonFading
    float horiz = dot( worldReflect, vWorldNormal );
    horiz = saturate( 1.0 + horiz );
    horiz *= horiz;
    specularColor *= horiz;
  #endif



  #if HAS_occlusion
    float _occlusion = occlusion();
    #if HAS_occlusionStrength
      _occlusion = 1 - occlusionStrength() + _occlusion*occlusionStrength()
    #endif
    diffuseCoef *= _occlusion;
  #endif


  vec3 alb = mix( _baseColor * vec3(1-0.04), vec3(0.0), metalness() );
  vec3 albedoSq = alb*alb;

  FragColor.xyz = diffuseCoef*albedoSq + specularColor;


  vec3 _emissive = vec3(0.0);
  #if HAS_emissive 
    _emissive += emissive();
  #endif
  #if HAS_emissiveFactor
    _emissive *= emissiveFactor();
  #endif
  
  FragColor.xyz += _emissive;



  vec4 _alpha = 1.0;
  #if HAS_alpha
    _alpha *= alpha();
  #endif
  #if HAS_alphaFactor
    _alpha *= alphaFactor();
  #endif


  #if alphaMode( MASK )
    if( _alpha < alphaCutoff() ) discard;
    FragColor.a = 1.0;
  #elif alphaMode( BLEND )
    FragColor.a = _alpha;
  #else
    FragColor.a = 1.0;
  #endif



  EXPOSURE(FragColor.rgb);
  GAMMA_CORRECTION(FragColor.rgb);



  #pragma SLOT post_color

  // FragColor.rgb = FragColor.rgb*0.0001 + gloss();
  // FragColor.rgb = FragColor.rgb*0.0001 + specular();
  // FragColor.rgb = FragColor.rgb*0.0001 + specularColor;
  // FragColor.rgb = FragColor.rgb*0.0001 + albedo();
  // FragColor.rgb = FragColor.rgb*0.0001 + albedoSq;
  // FragColor.rgb = FragColor.rgb*0.0001 + diffuseCoef;
  // FragColor.rgb = FragColor.rgb*0.0001 + worldNormal;
  // FragColor.rgb = FragColor.rgb*0.0001 + vec3(1.0, 0.0, 0.0);
  // FragColor.rg = vec2(0.0);

  // pure mirror

  // vec3 _rr = reflect( -viewDir, vWorldNormal );
  // vec3 purerefl = SpecularIBL( tEnv, _rr, 0.0 );
  // FragColor.rgb = FragColor.rgb*0.0001 + purerefl;

  #if HAS_normal
  // FragColor.rgb = FragColor.rgb*0.0001 + normal();
  #endif


  // #ifdef HAS_GI
  // #if HAS_GI
  //   FragColor.rgb = FragColor.rgb*0.0001 + gi;
  // #endif
  // #endif

}`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/standard.vert":
/*!********************************!*\
  !*** ./src/glsl/standard.vert ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const _INCL_0 = __webpack_require__(/*! ./includes/sh.glsl */ "./src/glsl/includes/sh.glsl");


function fn( obj )
{
  let __p = '';

  __p+=`#pragma SLOT version
#pragma SLOT definitions
#pragma SLOT precision


#if __VERSION__ == 300
  #define IN in
  #define OUT out
#else
  #define IN attribute
  #define OUT varying
#endif


#pragma SLOT pv


IN vec3 aPosition;
IN vec3 aNormal;


uniform mat4 uMVP;
uniform mat4 uWorldMatrix;
uniform mat4 uVP;


OUT vec3 vWorldPosition;
OUT mediump vec3 vWorldNormal;


#if HAS_normal
  #if useDerivatives == 0
  IN vec4 aTangent;
  OUT mediump vec3 vWorldTangent;
  OUT mediump vec3 vWorldBitangent;
  #endif
#endif


#if perVertexIrrad
  OUT vec3 vIrradiance;
  uniform vec4 uSHCoeffs[7];
  ${_INCL_0()}
#endif




vec3 rotate( mat4 m, vec3 v )
{
  return m[0].xyz*v.x + m[1].xyz*v.y + m[2].xyz*v.z;
}



void main( void ){

  #pragma SLOT v

  // warp acces
  highp vec3 pos = aPosition;
  vec3 nrm = aNormal;
  mat4 worldMatrix = uWorldMatrix;
  mat4 mvp         = uMVP;

  #pragma SLOT vertex_warp

  vec4 worldPos = worldMatrix * vec4( pos, 1.0 );
  worldPos.xyz /= worldPos.w;
  worldPos.w = 1.0;

  #pragma SLOT vertex_warp_world

  gl_Position     = uVP         * worldPos;

  vWorldPosition  = worldPos.xyz;
  vWorldNormal    = normalize( rotate( worldMatrix, nrm ) );

  #if HAS_normal
    #if useDerivatives == 0
    vWorldTangent   = normalize( rotate( worldMatrix, aTangent.xyz ) );
    vWorldBitangent = normalize( cross( vWorldNormal, vWorldTangent ) * aTangent.w );
    #endif
  #endif

  #if perVertexIrrad
    vIrradiance = SampleSH( vWorldNormal, uSHCoeffs );
  #endif


  
  // vDebugColor = vec4( -pos, 1.0 );
}`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/uvTransform.glsl":
/*!***********************************!*\
  !*** ./src/glsl/uvTransform.glsl ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {




function fn( obj )
{
  let __p = '';

  __p+=`
`;
 if( obj.pf === true ){ 
__p+=`
  IN mediump vec2 ${obj.mod.varying};
`;
 } 
__p+=`

`;
 if( obj.pv === true ){ 
__p+=`
  OUT mediump vec2 ${obj.mod.varying};
  `;
 if( obj.mod._defineAttrib === true ){ 
__p+=`
    IN mediump vec2 ${obj.mod.attrib};
  `;
 } 
__p+=`
`;
 } 
__p+=`


`;
 if( obj.v === true ){ 
__p+=`

  #define TC ${obj.mod.varying}

  TC = ${obj.mod.attrib};
  #if HAS_transform_${obj.mod.varying}
    #if HAS_pivot_${obj.mod.varying}
    TC = ( mat2( transform_${obj.mod.varying}() ) * (TC-pivot_${obj.mod.varying}() ) ) + pivot_${obj.mod.varying}();
    #else
    TC = mat2( transform_${obj.mod.varying}() ) * TC;
    #endif
  #endif

  #if HAS_translate_${obj.mod.varying}
    TC += translate_${obj.mod.varying}();
  #endif

  #undef TC

`;
 } 
__p+=`
`;


  return __p;
}

fn.toString = fn;

module.exports = fn;


/***/ }),

/***/ "./src/glsl/uvTransform.ts":
/*!*********************************!*\
  !*** ./src/glsl/uvTransform.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UVTransform; });
/* harmony import */ var nanogl_pbr_Chunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanogl-pbr/Chunk */ "./node_modules/nanogl-pbr/Chunk.js");
/* harmony import */ var nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nanogl-pbr/Input */ "./node_modules/nanogl-pbr/Input.js");
/* harmony import */ var gl_matrix_src_gl_matrix_mat2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix/src/gl-matrix/mat2 */ "./node_modules/gl-matrix/src/gl-matrix/mat2.js");
/* harmony import */ var gl_matrix_src_gl_matrix_mat2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gl_matrix_src_gl_matrix_mat2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uvTransform.glsl */ "./src/glsl/uvTransform.glsl");
/* harmony import */ var _uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3__);




class UVTransform extends nanogl_pbr_Chunk__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(attrib = 'aTexCoord0', varying = 'vTexCoord0') {
        super(true, false);
        this.attrib = attrib;
        this.varying = varying;
        this._defineAttrib = true;
        this._scale = new Float32Array([1, 1]);
        this._rotation = 0;
        this._translateInput = this.addChild(new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"]('translate_' + varying, 2, nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"].VERTEX));
        this._translateParam = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["Uniform"]('uTranslate_' + varying, 2);
        this._translateValue = this._translateParam._value;
        this._pivotInput = this.addChild(new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"]('pivot_' + varying, 2, nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"].VERTEX));
        this._pivotParam = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["Uniform"]('uPivot_' + varying, 2);
        this._pivotValue = this._pivotParam._value;
        this._transformInput = this.addChild(new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"]('transform_' + varying, 4, nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["default"].VERTEX));
        this._transformParam = new nanogl_pbr_Input__WEBPACK_IMPORTED_MODULE_1__["Uniform"]('uTransform_' + varying, 4);
        this._transformValue = this._transformParam._value;
    }
    token() {
        return this.varying;
    }
    scale(x, y = x) {
        this._scale[0] = x;
        this._scale[1] = y;
        this.updateTransformMatrix();
        return this;
    }
    rotate(rad) {
        this._rotation = rad;
        this.updateTransformMatrix();
        return this;
    }
    pivot(x, y) {
        if (x !== 0 || y !== 0) {
            this._pivotValue[0] = x;
            this._pivotValue[1] = y;
            this._pivotInput.attach(this._pivotParam);
        }
        else {
            this._pivotInput.detach();
        }
        return this;
    }
    translate(x, y) {
        if (x !== 0 || y !== 0) {
            this._translateValue[0] = x;
            this._translateValue[1] = y;
            this._translateInput.attach(this._translateParam);
        }
        else {
            this._translateInput.detach();
        }
        return this;
    }
    updateTransformMatrix() {
        var hasXform = !(this._rotation === 0 && this._scale[0] === 1 && this._scale[1] === 1);
        if (hasXform) {
            gl_matrix_src_gl_matrix_mat2__WEBPACK_IMPORTED_MODULE_2___default.a.fromScaling(this._transformValue, this._scale);
            gl_matrix_src_gl_matrix_mat2__WEBPACK_IMPORTED_MODULE_2___default.a.rotate(this._transformValue, this._transformValue, this._rotation);
            this._transformInput.attach(this._transformParam);
        }
        else
            this._transformInput.detach();
    }
    _genCode(slots) {
        slots.add('pv', _uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3___default()({ pv: true, mod: this }));
        slots.add('pf', _uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3___default()({ pf: true, mod: this }));
        slots.add('v', _uvTransform_glsl__WEBPACK_IMPORTED_MODULE_3___default()({ v: true, mod: this }));
    }
    _getHash() {
        return '';
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Gltf; });
/* harmony import */ var _extensions_Registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extensions/Registry */ "./src/extensions/Registry.ts");
/* harmony import */ var _BufferCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BufferCache */ "./src/BufferCache.ts");
/* harmony import */ var _Semantics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Semantics */ "./src/Semantics.ts");
/// <



/** Gltf file representation */
class Gltf {
    constructor() {
        this._url = null;
        this._byType = new Map([
            ["accessors" /* ACCESSOR */, []],
            ["sparse" /* ACCESSOR_SPARSE */, []],
            ["sparseIndices" /* ACCESSOR_SPARSE_INDICES */, []],
            ["sparseValues" /* ACCESSOR_SPARSE_VALUES */, []],
            ["animations" /* ANIMATION */, []],
            ["animationSamplers" /* ANIMATION_SAMPLER */, []],
            ["animationChannels" /* ANIMATION_CHANNEL */, []],
            ["asset" /* ASSET */, []],
            ["buffers" /* BUFFER */, []],
            ["bufferViews" /* BUFFERVIEW */, []],
            ["cameras" /* CAMERA */, []],
            ["images" /* IMAGE */, []],
            ["materials" /* MATERIAL */, []],
            ["meshes" /* MESH */, []],
            ["nodes" /* NODE */, []],
            ["normalTextureInfo" /* NORMAL_TEXTURE_INFO */, []],
            ["occlusionTextureInfo" /* OCCLUSION_TEXTURE_INFO */, []],
            ["primitives" /* PRIMITIVE */, []],
            ["samplers" /* SAMPLER */, []],
            ["scenes" /* SCENE */, []],
            ["skins" /* SKIN */, []],
            ["textures" /* TEXTURE */, []],
            ["textureInfo" /* TEXTURE_INFO */, []],
        ]);
        this._elements = [];
        this.semantics = new _Semantics__WEBPACK_IMPORTED_MODULE_2__["DefaultSemantics"]();
    }
    static addExtension(ext) {
        Gltf._extensionsRegistry.addExtension(ext);
    }
    allocateGl(gl) {
        this.bufferCache = new _BufferCache__WEBPACK_IMPORTED_MODULE_1__["default"](gl);
        const allocPromises = [];
        for (const element of this._elements) {
            const p = element.allocateGl(gl);
            p !== null && p !== void 0 ? p : allocPromises.push(p);
        }
    }
    get buffers() {
        return this._getTypeHolder("buffers" /* BUFFER */);
    }
    get bufferViews() {
        return this._getTypeHolder("bufferViews" /* BUFFERVIEW */);
    }
    get accessors() {
        return this._getTypeHolder("accessors" /* ACCESSOR */);
    }
    get animations() {
        return this._getTypeHolder("animations" /* ANIMATION */);
    }
    get meshes() {
        return this._getTypeHolder("meshes" /* MESH */);
    }
    get nodes() {
        return this._getTypeHolder("nodes" /* NODE */);
    }
    get materials() {
        return this._getTypeHolder("materials" /* MATERIAL */);
    }
    get cameras() {
        return this._getTypeHolder("cameras" /* CAMERA */);
    }
    get skins() {
        return this._getTypeHolder("skins" /* SKIN */);
    }
    _getTypeHolder(type) {
        return this._byType.get(type);
    }
    getAllElements() {
        return this._elements;
    }
    addElement(element) {
        const a = this._getTypeHolder(element.gltftype);
        a[element.elementIndex] = element;
        this._elements.push(element);
    }
    addElements(elements) {
        for (var e of elements) {
            this.addElement(e);
        }
    }
    getElement(type, index) {
        // getElement<T extends AnyElement>( type:GltfTypes, index:number ) : T {
        return this._getTypeHolder(type)[index];
    }
    getElementByName(type, name) {
        const list = this._getTypeHolder(type);
        for (var el of list) {
            if (el.name === name)
                return el;
        }
        return null;
    }
}
Gltf._extensionsRegistry = new _extensions_Registry__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./src/io/GltfLoader.ts":
/*!******************************!*\
  !*** ./src/io/GltfLoader.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GltfLoader; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../consts */ "./src/consts.ts");
/* harmony import */ var _extensions_Registry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensions/Registry */ "./src/extensions/Registry.ts");
/* harmony import */ var _extensions_DefaultExtension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../extensions/DefaultExtension */ "./src/extensions/DefaultExtension.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let UID = 0;
function getUUID() {
    return (UID++) + "";
}
class GltfLoader {
    constructor(gltfIO, url, baseurl) {
        this._elements = new Map();
        this._pendingElements = [];
        this._byType = new Map();
        this._propertyMaps = new Map();
        this.parse = (buffer) => {
            return this.unpack(buffer)
                .then(this.parseAll)
                .then(this.yieldGltf);
        };
        this.unpack = (buffer) => {
            const magic = new Uint32Array(buffer, 0, 1)[0];
            if (magic === _consts__WEBPACK_IMPORTED_MODULE_1__["MAGIC"]) {
                this.unpackGlb(buffer);
            }
            else {
                const jsonStr = this.gltfIO.decodeUTF8(buffer);
                this._data = JSON.parse(jsonStr);
                this.prepareGltfDatas(this._data);
            }
            return Promise.resolve(true);
        };
        // loadBuffer = (b: Buffer) => {
        this.loadBufferUri = (uri) => {
            if (uri === undefined)
                return Promise.resolve(this._glbData);
            const resolvedUri = this.gltfIO.resolvePath(uri, this._baseUrl);
            return this.gltfIO.loadBinaryResource(resolvedUri);
        };
        this.parseAll = () => __awaiter(this, void 0, void 0, function* () {
            const gltf = this.gltf;
            // verify that required extensions are available
            //, this._data.extensionsUsed, this._data.extensionsRequired
            this._extensions.validate(this._data.extensionsUsed, this._data.extensionsRequired);
            this._loadElement(this._data.asset);
            // TODO: validate asset version
            if (this._data.nodes !== undefined) {
                for (const nodeData of this._data.nodes) {
                    this._loadElement(nodeData);
                }
            }
            if (this._data.animations !== undefined) {
                for (const animData of this._data.animations) {
                    this._loadElement(animData);
                }
            }
            yield this.resolveElements();
        });
        this.yieldGltf = () => {
            return Promise.resolve(this.gltf);
        };
        this.gltfIO = gltfIO;
        this._url = url;
        this._baseUrl = baseurl;
        this.gltf = new ___WEBPACK_IMPORTED_MODULE_0__["default"]();
        this._data = null;
        this._extensions = new _extensions_Registry__WEBPACK_IMPORTED_MODULE_2__["ExtensionList"]();
        ___WEBPACK_IMPORTED_MODULE_0__["default"]._extensionsRegistry.setupExtensions(this);
        // this._defaultFactory = new ElementFactory();
        // this._factory = this._defaultFactory;
    }
    unpackGlb(buffer) {
        const [, version, , jsonSize, magic] = new Uint32Array(buffer, 0, 5);
        // Check that the version is 2
        if (version !== 2)
            throw new Error('Binary glTF version is not 2');
        // Check that the scene format is 0, indicating that it is JSON
        if (magic !== _consts__WEBPACK_IMPORTED_MODULE_1__["JSON_MAGIC"])
            throw new Error('Binary glTF scene format is not JSON');
        const scene = this.gltfIO.decodeUTF8(buffer, _consts__WEBPACK_IMPORTED_MODULE_1__["GLB_HEADER_SIZE"], jsonSize);
        this._glbData = buffer.slice(_consts__WEBPACK_IMPORTED_MODULE_1__["GLB_HEADER_SIZE"] + jsonSize + 8);
        this._data = JSON.parse(scene);
        this.prepareGltfDatas(this._data);
        // const mbuffer = new Buffer()
        // const bufferData : Gltf2.IBuffer = {
        //   byteLength: bbytes.byteLength,
        //   gltftype: GltfTypes.BUFFER,
        //   uuid: getUUID()
        // }
        // mbuffer.parse(this, bufferData );
        // mbuffer._bytes = bbytes;
        // this._elements.set(bufferData.uuid, Promise.resolve(mbuffer));
        // this.gltf.addElement(mbuffer)
    }
    // loadBuffers = () => {
    //   const buffers: Buffer[] = this.gltf._getTypeHolder(GltfTypes.BUFFER);
    //   for (var i = buffers.length; i < this._data.buffers.length; i++) {
    //     var buffer = new Buffer();
    //     buffer.parse(this, this._data.buffers[i]);
    //     this.gltf.addElement(buffer);
    //   }
    //   return Promise.all(buffers.map(b => this.loadBuffer(b)));
    // }
    resolveUri(uri) {
        return this.gltfIO.resolvePath(uri, this._baseUrl);
    }
    // create element
    _createElement(data) {
        const extensions = this._extensions._list;
        for (const ext of extensions) {
            const res = ext.loadElement(data);
            if (res === undefined)
                throw new Error("extensiosn should not return undefined");
            if (res !== null)
                return res;
        }
        throw new Error("Unhandled type");
    }
    // create elementif not already created
    _loadElement(data) {
        let res = this._elements.get(data.uuid);
        if (res === undefined) {
            res = this._createElement(data);
            this._pendingElements.push(res);
            this._elements.set(data.uuid, res);
        }
        return res;
    }
    _getElementHolder(type) {
        let array = this._byType.get(type);
        if (array === undefined) {
            array = [];
            this._byType.set(type, array);
        }
        return array;
    }
    getElement(type, index) {
        const holder = this._getElementHolder(type);
        if (holder[index] !== undefined)
            return holder[index];
        // get existing or create if not exist!
        const properties = this._propertyMaps.get(type);
        const property = properties[index];
        return this._loadElement(property);
    }
    resolveElements() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this._pendingElements.length > 0) {
                const allPromises = this._pendingElements.splice(0, this._pendingElements.length);
                const allElements = yield Promise.all(allPromises);
                this.gltf.addElements(allElements);
            }
        });
    }
    prepareGltfDatas(gltfData) {
        this.prepareGltfRootProperties(gltfData.accessors, "accessors" /* ACCESSOR */, null);
        this.prepareGltfRootProperties(gltfData.animations, "animations" /* ANIMATION */, null);
        this.prepareGltfRootProperties([gltfData.asset], "asset" /* ASSET */, null);
        this.prepareGltfRootProperties(gltfData.buffers, "buffers" /* BUFFER */, null);
        this.prepareGltfRootProperties(gltfData.bufferViews, "bufferViews" /* BUFFERVIEW */, null);
        this.prepareGltfRootProperties(gltfData.cameras, "cameras" /* CAMERA */, null);
        this.prepareGltfRootProperties(gltfData.images, "images" /* IMAGE */, null);
        this.prepareGltfRootProperties(gltfData.materials, "materials" /* MATERIAL */, null);
        this.prepareGltfRootProperties(gltfData.meshes, "meshes" /* MESH */, null);
        this.prepareGltfRootProperties(gltfData.nodes, "nodes" /* NODE */, null);
        this.prepareGltfRootProperties(gltfData.samplers, "samplers" /* SAMPLER */, null);
        this.prepareGltfRootProperties(gltfData.scenes, "scenes" /* SCENE */, null);
        this.prepareGltfRootProperties(gltfData.skins, "skins" /* SKIN */, null);
        this.prepareGltfRootProperties(gltfData.textures, "textures" /* TEXTURE */, null);
        // ANIMATION_SAMPLER
        // ANIMATION_CHANNEL
        // NORMAL_TEXTURE_INFO
        // OCCLUSION_TEXTURE_INFO
        // PRIMITIVE
        // TEXTURE_INFO
        if (gltfData.animations !== undefined) {
            for (const animation of gltfData.animations) {
                this.prepareGltfProperties(animation.samplers, "animationSamplers" /* ANIMATION_SAMPLER */, animation);
                this.prepareGltfProperties(animation.channels, "animationChannels" /* ANIMATION_CHANNEL */, animation);
            }
        }
        if (gltfData.materials !== undefined) {
            for (const material of gltfData.materials) {
                this.prepareGltfProperty(material.normalTexture, "normalTextureInfo" /* NORMAL_TEXTURE_INFO */, -1, material);
                this.prepareGltfProperty(material.occlusionTexture, "occlusionTextureInfo" /* OCCLUSION_TEXTURE_INFO */, -1, material);
                this.prepareGltfProperty(material.emissiveTexture, "textureInfo" /* TEXTURE_INFO */, -1, material);
                if (material.pbrMetallicRoughness !== undefined) {
                    this.prepareGltfProperty(material.pbrMetallicRoughness.baseColorTexture, "textureInfo" /* TEXTURE_INFO */, -1, material);
                    this.prepareGltfProperty(material.pbrMetallicRoughness.metallicRoughnessTexture, "textureInfo" /* TEXTURE_INFO */, -1, material);
                }
            }
        }
        if (gltfData.meshes !== undefined) {
            for (const mesh of gltfData.meshes) {
                this.prepareGltfProperties(mesh.primitives, "primitives" /* PRIMITIVE */, mesh);
            }
        }
        if (gltfData.accessors !== undefined) {
            for (const accessor of gltfData.accessors) {
                this.prepareGltfProperty(accessor.sparse, "sparse" /* ACCESSOR_SPARSE */, -1, accessor);
                if (accessor.sparse !== undefined) {
                    this.prepareGltfProperty(accessor.sparse.indices, "sparseIndices" /* ACCESSOR_SPARSE_INDICES */, -1, accessor.sparse);
                    this.prepareGltfProperty(accessor.sparse.values, "sparseValues" /* ACCESSOR_SPARSE_VALUES */, -1, accessor.sparse);
                }
            }
        }
    }
    prepareGltfProperties(elementsData, type, parent) {
        if (elementsData === undefined)
            return;
        for (let i = 0; i < elementsData.length; i++) {
            const element = elementsData[i];
            this.prepareGltfProperty(element, type, i, parent);
        }
    }
    prepareGltfRootProperties(elementsData, type, parent) {
        if (elementsData === undefined)
            return;
        this._propertyMaps.set(type, elementsData);
        for (let i = 0; i < elementsData.length; i++) {
            const element = elementsData[i];
            this.prepareGltfProperty(element, type, i, parent);
        }
    }
    prepareGltfProperty(element, type, index, parent) {
        if (element === undefined)
            return;
        element.gltftype = type;
        element.uuid = getUUID();
        element.elementIndex = index;
        element.elementParent = parent;
    }
}


/***/ }),

/***/ "./src/io/index.ts":
/*!*************************!*\
  !*** ./src/io/index.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GltfIO; });
/* harmony import */ var _GltfLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GltfLoader */ "./src/io/GltfLoader.ts");

class GltfIO {
    constructor(io) {
        this._ioImpl = io;
    }
    loadGltf(path, baseurl = undefined) {
        if (baseurl === undefined)
            [baseurl, path] = this._ioImpl.resolveBaseDir(path);
        const reader = new _GltfLoader__WEBPACK_IMPORTED_MODULE_0__["default"](this._ioImpl, path, baseurl);
        return this._ioImpl.loadBinaryResource(this._ioImpl.resolvePath(path, baseurl))
            .then(reader.parse);
    }
}


/***/ }),

/***/ "./src/io/web.ts":
/*!***********************!*\
  !*** ./src/io/web.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js");
/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(base64_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/net */ "./src/lib/net.ts");
/* harmony import */ var _lib_utf8_decoder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/utf8-decoder */ "./src/lib/utf8-decoder.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! . */ "./src/io/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class WebImpl {
    isDataURI(uri) {
        return (uri.indexOf('data:') === 0);
    }
    decodeDataURI(uri) {
        if (uri.indexOf('data:') !== 0) {
            throw new Error('invalid dataURI');
        }
        var b64 = uri.substr(uri.indexOf(',') + 1);
        return base64_js__WEBPACK_IMPORTED_MODULE_0___default.a.toByteArray(b64).buffer;
    }
    resolveBaseDir(path) {
        return Object(_lib_net__WEBPACK_IMPORTED_MODULE_1__["baseDir"])(path);
    }
    resolvePath(path, baseurl) {
        if (baseurl === undefined || this.isDataURI(path))
            return path;
        return baseurl + '/' + path;
    }
    decodeUTF8(buffer, offset = 0, length = undefined) {
        return Object(_lib_utf8_decoder__WEBPACK_IMPORTED_MODULE_2__["default"])(new Uint8Array(buffer, offset, length));
    }
    loadResource(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(path);
            return response.text();
        });
    }
    loadBinaryResource(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isDataURI(path)) {
                return this.decodeDataURI(path);
            }
            const response = yield fetch(path);
            return response.arrayBuffer();
        });
    }
    writeResource(path, data) {
        throw new Error("Method not implemented.");
    }
    writeBinaryResource(path, data) {
        throw new Error("Method not implemented.");
    }
}
const _instance = new ___WEBPACK_IMPORTED_MODULE_3__["default"](new WebImpl());
/* harmony default export */ __webpack_exports__["default"] = (_instance);


/***/ }),

/***/ "./src/lib/assert.ts":
/*!***************************!*\
  !*** ./src/lib/assert.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _throw(msg) {
    throw new Error(msg);
}
const Assert = {
    /**
     * Assert o is not undefined
     * @param {any} o
     * @param {string} msg
     */
    isDefined(o, msg = '') {
        if (o === undefined)
            _throw(msg);
    },
    /**
     * Assert o is undefined
     * @param {any} o
     * @param {string} msg
     */
    isUndefined(o, msg = '') {
        if (o !== undefined)
            _throw(msg);
    },
    /**
     * Assert o is true
     * @param {boolean} o
     * @param {string} msg
     */
    isTrue(o, msg = '') {
        if (o !== true)
            _throw(msg);
    },
    /**
     * Assert o is false
     * @param {boolean} o
     * @param {string} msg
     */
    isFalse(o, msg = '') {
        if (o !== false)
            _throw(msg);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Assert);


/***/ }),

/***/ "./src/lib/net.ts":
/*!************************!*\
  !*** ./src/lib/net.ts ***!
  \************************/
/*! exports provided: whenAll, loadText, loadJson, loadBytes, loadImage, baseDir, releaseAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenAll", function() { return whenAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadText", function() { return loadText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadJson", function() { return loadJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadBytes", function() { return loadBytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseDir", function() { return baseDir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "releaseAll", function() { return releaseAll; });
/* harmony import */ var when__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! when */ "./node_modules/when/when.js");
/* harmony import */ var when__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(when__WEBPACK_IMPORTED_MODULE_0__);

function whenAll(promises) {
    const def = when__WEBPACK_IMPORTED_MODULE_0___default.a.defer();
    let remaining = promises.length;
    const oneResolve = () => {
        remaining--;
        def.notify(1 - remaining / promises.length);
        if (remaining === 0) {
            def.resolve(true);
        }
    };
    for (var p of promises) {
        p.then(oneResolve, def.reject);
    }
    return def.promise;
}
function loadText(url) {
    return _ajax(url, '');
}
function loadJson(url) {
    return loadText(url)
        .then(str => JSON.parse(str));
}
function loadBytes(url) {
    return _ajax(url, 'arraybuffer');
}
function loadImage(url) {
    const defer = when__WEBPACK_IMPORTED_MODULE_0___default.a.defer();
    const img = new Image();
    img.onload = defer.resolve;
    img.onerror = defer.reject;
    img.crossOrigin = 'anonymous';
    img.src = url;
    return defer.promise.yield(img);
}
function baseDir(p) {
    const sep = p.lastIndexOf("/");
    return [
        p.substr(0, sep),
        p.substr(sep + 1),
    ];
}
let _requestsList = [];
let _requestsMap = {};
let _UID = 0;
function releaseAll() {
    for (var req of _requestsList) {
        req.xhr.abort();
        req.defer.reject();
    }
    _requestsMap = {};
    _requestsList.length = 0;
}
function _ajax(url, rtype) {
    return _getAjax(url, rtype).defer.promise.then(yieldResponse);
}
function yieldResponse(req) {
    return req.xhr.response;
}
function _getAjax(url, rtype) {
    const method = 'GET';
    const deferred = when__WEBPACK_IMPORTED_MODULE_0___default.a.defer();
    const xhr = new XMLHttpRequest();
    const req = {
        xhr: xhr,
        id: _UID++,
        defer: deferred
    };
    xhr.open(method, url, true);
    if (rtype === 'arraybuffer')
        xhr.setRequestHeader("Accept", 'application/octet-stream');
    xhr.responseType = rtype;
    xhr.onload = function () {
        deferred.resolve(req);
    };
    xhr.onerror = function (e) {
        deferred.reject(req);
    };
    xhr.send();
    _requestsList.push(req);
    _requestsMap[req.id] = req;
    deferred.promise.then(_reqComplete);
    return req;
}
function _reqComplete(req) {
    delete _requestsMap[req.id];
    const i = _requestsList.indexOf(req);
    if (i > -1)
        _requestsList.splice(i, 1);
}


/***/ }),

/***/ "./src/lib/utf8-decoder.ts":
/*!*********************************!*\
  !*** ./src/lib/utf8-decoder.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const utf8Decoder = (typeof TextDecoder !== 'undefined') ? new TextDecoder('utf-8') : null;
// Exposed functions for testing
function decodeWithTextDecoder(view) {
    return utf8Decoder.decode(view);
}
function decodeWithFromCharCode(view) {
    let result = '';
    const codePoints = utf8Handler(view);
    for (let cp of codePoints) {
        if (cp <= 0xFFFF) {
            result += String.fromCharCode(cp);
        }
        else {
            cp -= 0x10000;
            result += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00);
        }
    }
    return result;
}
function inRange(a, min, max) {
    return min <= a && a <= max;
}
// This code is inspired by public domain code found here: https://github.com/inexorabletash/text-encoding
function utf8Handler(utfBytes) {
    let codePoint = 0;
    let bytesSeen = 0;
    let bytesNeeded = 0;
    let lowerBoundary = 0x80;
    let upperBoundary = 0xBF;
    let codePoints = [];
    let length = utfBytes.length;
    for (var i = 0; i < length; ++i) {
        var currentByte = utfBytes[i];
        // If bytesNeeded = 0, then we are starting a new character
        if (bytesNeeded === 0) {
            // 1 Byte Ascii character
            if (inRange(currentByte, 0x00, 0x7F)) {
                // Return a code point whose value is byte.
                codePoints.push(currentByte);
                continue;
            }
            // 2 Byte character
            if (inRange(currentByte, 0xC2, 0xDF)) {
                bytesNeeded = 1;
                codePoint = currentByte & 0x1F;
                continue;
            }
            // 3 Byte character
            if (inRange(currentByte, 0xE0, 0xEF)) {
                // If byte is 0xE0, set utf-8 lower boundary to 0xA0.
                if (currentByte === 0xE0) {
                    lowerBoundary = 0xA0;
                }
                // If byte is 0xED, set utf-8 upper boundary to 0x9F.
                if (currentByte === 0xED) {
                    upperBoundary = 0x9F;
                }
                bytesNeeded = 2;
                codePoint = currentByte & 0xF;
                continue;
            }
            // 4 Byte character
            if (inRange(currentByte, 0xF0, 0xF4)) {
                // If byte is 0xF0, set utf-8 lower boundary to 0x90.
                if (currentByte === 0xF0) {
                    lowerBoundary = 0x90;
                }
                // If byte is 0xF4, set utf-8 upper boundary to 0x8F.
                if (currentByte === 0xF4) {
                    upperBoundary = 0x8F;
                }
                bytesNeeded = 3;
                codePoint = currentByte & 0x7;
                continue;
            }
            throw new Error('String decoding failed.');
        }
        // Out of range, so ignore the first part(s) of the character and continue with this byte on its own
        if (!inRange(currentByte, lowerBoundary, upperBoundary)) {
            codePoint = bytesNeeded = bytesSeen = 0;
            lowerBoundary = 0x80;
            upperBoundary = 0xBF;
            --i;
            continue;
        }
        // Set appropriate boundaries, since we've now checked byte 2 of a potential longer character
        lowerBoundary = 0x80;
        upperBoundary = 0xBF;
        // Add byte to code point
        codePoint = (codePoint << 6) | (currentByte & 0x3F);
        // We have the correct number of bytes, so push and reset for next character
        ++bytesSeen;
        if (bytesSeen === bytesNeeded) {
            codePoints.push(codePoint);
            codePoint = bytesNeeded = bytesSeen = 0;
        }
    }
    return codePoints;
}
const Decoder = (typeof TextDecoder !== 'undefined') ? decodeWithTextDecoder : decodeWithFromCharCode;
// const Decoder =  decodeWithFromCharCode;
/* harmony default export */ __webpack_exports__["default"] = (Decoder);


/***/ }),

/***/ "./src/types/Gltf2.ts":
/*!****************************!*\
  !*** ./src/types/Gltf2.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Module for glTF 2.0 Interface
 */
var Gltf2;
(function (Gltf2) {
    // PreParse Additions
    /**
     * The datatype of the components in the attribute
     */
    let AccessorComponentType;
    (function (AccessorComponentType) {
        /**
         * Byte
         */
        AccessorComponentType[AccessorComponentType["BYTE"] = 5120] = "BYTE";
        /**
         * Unsigned Byte
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        /**
         * Short
         */
        AccessorComponentType[AccessorComponentType["SHORT"] = 5122] = "SHORT";
        /**
         * Unsigned Short
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        /**
         * Unsigned Int
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        /**
         * Float
         */
        AccessorComponentType[AccessorComponentType["FLOAT"] = 5126] = "FLOAT";
    })(AccessorComponentType = Gltf2.AccessorComponentType || (Gltf2.AccessorComponentType = {}));
    /**
     * Specifies if the attirbute is a scalar, vector, or matrix
     */
    let AccessorType;
    (function (AccessorType) {
        /**
         * Scalar
         */
        AccessorType["SCALAR"] = "SCALAR";
        /**
         * Vector2
         */
        AccessorType["VEC2"] = "VEC2";
        /**
         * Vector3
         */
        AccessorType["VEC3"] = "VEC3";
        /**
         * Vector4
         */
        AccessorType["VEC4"] = "VEC4";
        /**
         * Matrix2x2
         */
        AccessorType["MAT2"] = "MAT2";
        /**
         * Matrix3x3
         */
        AccessorType["MAT3"] = "MAT3";
        /**
         * Matrix4x4
         */
        AccessorType["MAT4"] = "MAT4";
    })(AccessorType = Gltf2.AccessorType || (Gltf2.AccessorType = {}));
    /**
     * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
     */
    let AnimationChannelTargetPath;
    (function (AnimationChannelTargetPath) {
        /**
         * Translation
         */
        AnimationChannelTargetPath["TRANSLATION"] = "translation";
        /**
         * Rotation
         */
        AnimationChannelTargetPath["ROTATION"] = "rotation";
        /**
         * Scale
         */
        AnimationChannelTargetPath["SCALE"] = "scale";
        /**
         * Weights
         */
        AnimationChannelTargetPath["WEIGHTS"] = "weights";
    })(AnimationChannelTargetPath = Gltf2.AnimationChannelTargetPath || (Gltf2.AnimationChannelTargetPath = {}));
    /**
     * Interpolation algorithm
     */
    let AnimationSamplerInterpolation;
    (function (AnimationSamplerInterpolation) {
        /**
         * The animated values are linearly interpolated between keyframes
         */
        AnimationSamplerInterpolation["LINEAR"] = "LINEAR";
        /**
         * The animated values remain constant to the output of the first keyframe, until the next keyframe
         */
        AnimationSamplerInterpolation["STEP"] = "STEP";
        /**
         * The animation's interpolation is computed using a cubic spline with specified tangents
         */
        AnimationSamplerInterpolation["CUBICSPLINE"] = "CUBICSPLINE";
    })(AnimationSamplerInterpolation = Gltf2.AnimationSamplerInterpolation || (Gltf2.AnimationSamplerInterpolation = {}));
    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene
     */
    let CameraType;
    (function (CameraType) {
        /**
         * A perspective camera containing properties to create a perspective projection matrix
         */
        CameraType["PERSPECTIVE"] = "perspective";
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix
         */
        CameraType["ORTHOGRAPHIC"] = "orthographic";
    })(CameraType = Gltf2.CameraType || (Gltf2.CameraType = {}));
    /**
     * The mime-type of the image
     */
    let ImageMimeType;
    (function (ImageMimeType) {
        /**
         * JPEG Mime-type
         */
        ImageMimeType["JPEG"] = "image/jpeg";
        /**
         * PNG Mime-type
         */
        ImageMimeType["PNG"] = "image/png";
    })(ImageMimeType = Gltf2.ImageMimeType || (Gltf2.ImageMimeType = {}));
    /**
     * The alpha rendering mode of the material
     */
    let MaterialAlphaMode;
    (function (MaterialAlphaMode) {
        /**
         * The alpha value is ignored and the rendered output is fully opaque
         */
        MaterialAlphaMode["OPAQUE"] = "OPAQUE";
        /**
         * The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value
         */
        MaterialAlphaMode["MASK"] = "MASK";
        /**
         * The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator)
         */
        MaterialAlphaMode["BLEND"] = "BLEND";
    })(MaterialAlphaMode = Gltf2.MaterialAlphaMode || (Gltf2.MaterialAlphaMode = {}));
    /**
     * The type of the primitives to render
     */
    let MeshPrimitiveMode;
    (function (MeshPrimitiveMode) {
        /**
         * Points
         */
        MeshPrimitiveMode[MeshPrimitiveMode["POINTS"] = 0] = "POINTS";
        /**
         * Lines
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINES"] = 1] = "LINES";
        /**
         * Line Loop
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_LOOP"] = 2] = "LINE_LOOP";
        /**
         * Line Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_STRIP"] = 3] = "LINE_STRIP";
        /**
         * Triangles
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLES"] = 4] = "TRIANGLES";
        /**
         * Triangle Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        /**
         * Triangle Fan
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
        MeshPrimitiveMode[MeshPrimitiveMode["DEFAULT"] = 4] = "DEFAULT";
    })(MeshPrimitiveMode = Gltf2.MeshPrimitiveMode || (Gltf2.MeshPrimitiveMode = {}));
    /**
     * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    let TextureMagFilter;
    (function (TextureMagFilter) {
        /**
         * Nearest
         */
        TextureMagFilter[TextureMagFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMagFilter[TextureMagFilter["LINEAR"] = 9729] = "LINEAR";
    })(TextureMagFilter = Gltf2.TextureMagFilter || (Gltf2.TextureMagFilter = {}));
    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    let TextureMinFilter;
    (function (TextureMinFilter) {
        /**
         * Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR"] = 9729] = "LINEAR";
        /**
         * Nearest Mip-Map Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        /**
         * Linear Mipmap Nearest
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        /**
         * Nearest Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        /**
         * Linear Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
    })(TextureMinFilter = Gltf2.TextureMinFilter || (Gltf2.TextureMinFilter = {}));
    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    let TextureWrapMode;
    (function (TextureWrapMode) {
        /**
         * Clamp to Edge
         */
        TextureWrapMode[TextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        /**
         * Mirrored Repeat
         */
        TextureWrapMode[TextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        /**
         * Repeat
         */
        TextureWrapMode[TextureWrapMode["REPEAT"] = 10497] = "REPEAT";
    })(TextureWrapMode = Gltf2.TextureWrapMode || (Gltf2.TextureWrapMode = {}));
})(Gltf2 || (Gltf2 = {}));
/* harmony default export */ __webpack_exports__["default"] = (Gltf2);


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** vertx (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });