(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-lazytube"] = factory();
	else
		root["vue-lazytube"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0a06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var buildURL = __webpack_require__("30b5");
var InterceptorManager = __webpack_require__("f6b4");
var dispatchRequest = __webpack_require__("5270");
var mergeConfig = __webpack_require__("4a7b");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0df6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1d2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "21c1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"720145b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LazyVimeo.vue?vue&type=template&id=65dba21d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VideoWrapper',{attrs:{"aspectRatioValue":_vm.aspectRatioValue,"maxWidth":_vm.maxWidth}},[(!_vm.onceLoaded && _vm.videoID)?_c('Preview',{on:{"click":function($event){return _vm.createIframe(_vm.isVideoFound, 'vimeo')}}},[(_vm.isVideoFound )?[(_vm.isCustomThumbnailExist)?_c('img',{attrs:{"src":_vm.customThumbnail,"alt":""},on:{"error":function($event){$event.target.src=_vm.getVimeoThumbnail(_vm.videoID, _vm.thumbnailQuality)}}}):_c('img',{attrs:{"src":_vm.getVimeoThumbnail(_vm.videoID, _vm.thumbnailQuality),"alt":""},on:{"error":function($event){$event.target.src=_vm.videoInfo.thumbnail_url}}}),(_vm.showTitle)?[_c('span',{staticClass:"ly-text"},[_vm._v(_vm._s(_vm.isCustomTitleExist ? _vm.customTitle : _vm.getTitle))])]:_vm._e(),_c('button',{directives:[{name:"show",rawName:"v-show",value:(!_vm.clicked),expression:"!clicked"}],staticClass:"ly-button-wrapper"},[_vm._t("button",[_c('svg',{attrs:{"height":"100%","version":"1.1","viewBox":"0 0 68 48","width":"100%"}},[_c('path',{staticClass:"ly-large-play-button-bg--v",attrs:{"d":"M 63 0 C 55.79 0.13 34 0 34 0 S 12.21 0.13 0 0 C 0.06 13.05 0 24 0 24 s 0.06 10.95 0 24 C 12.21 47.87 34 48 34 48 s 21.79 -0.13 34 -0 C 67.94 34.95 68 24 68 24 S 67.94 13.05 68 0 z","fill":"#00adef"}}),_c('path',{attrs:{"d":"M 45,24 27,14 27,34","fill":"#fff"}})])])],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.clicked),expression:"clicked"}],staticClass:"ly-loader-wrapper"},[_vm._t("loader",[_c('span',{staticClass:"ly-ring"},[_c('span'),_c('span'),_c('span')])])],2)]:(!_vm.fetchingInfo)?[_c('div',{staticClass:"ly-error-container"},[_c('span',{staticClass:"ly-error-icon"},[_c('svg',{attrs:{"fill":"#fff","viewBox":"0 0 48 48"}},[_c('path',{attrs:{"d":"M0 0h48v48H0V0z","fill":"none"}}),_c('path',{attrs:{"d":"M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z","fill-opacity":"0.7"}})])]),_c('span',{staticClass:"ly-error-content"},[_c('span',{staticClass:"ly-error-content__reason"},[_c('span',[_vm._v("Video unavailable")])]),_c('span',{staticClass:"ly-error-content__subreason"},[_c('span',[_vm._v("This video is unavailable or embed permissions are disabled for this video")])])])])]:_vm._e()],2):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.onceLoaded),expression:"onceLoaded"}],staticClass:"ly-iframe-wrapper"})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LazyVimeo.vue?vue&type=template&id=65dba21d&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./src/mixins/vimeoMixin.js
/* harmony default export */ var vimeoMixin = ({
  methods: {
    playVideo: function playVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"method":"play"}', '*');
      } else {
        this.createIframe(this.isVideoFound, 'vimeo');
      }
    },
    pauseVideo: function pauseVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"method":"pause"}', '*');
      }
    },
    stopVideo: function stopVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"method":"pause"}', '*');
      }
    },
    getVimeoThumbnail: function getVimeoThumbnail(video_id, quality) {
      var thumbnail;

      if (video_id) {
        if (typeof quality == "undefined") {
          quality = 'high';
        }

        var quality_key = '960x540';

        if (quality === 'default') {
          quality_key = '200x150';
        } else if (quality === 'medium') {
          quality_key = '295x166';
        } else if (quality === 'high') {
          quality_key = '640x360';
        } else if (quality === 'standard') {
          quality_key = '960x540';
        } else if (quality === 'maxres') {
          quality_key = '1280x720';
        }

        thumbnail = "https://i.vimeocdn.com/video/" + video_id + "_" + quality_key + ".jpg";
        return thumbnail;
      }

      return false;
    }
  }
});
// EXTERNAL MODULE: ./src/mixins/commonMixin.js
var commonMixin = __webpack_require__("4018");

// EXTERNAL MODULE: ./src/components/common/Preview.js
var Preview = __webpack_require__("727b");

// EXTERNAL MODULE: ./src/components/common/Wrapper.js
var Wrapper = __webpack_require__("777d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LazyVimeo.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

 // Importing Components



/* harmony default export */ var LazyVimeovue_type_script_lang_js_ = ({
  name: "LazyVimeo",
  mixins: [commonMixin["a" /* default */], vimeoMixin],
  data: function data() {
    return {
      videoID: null
    };
  },
  props: {
    src: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: String,
      default: '16:9',
      validator: function validator(value) {
        return /^\d+:\d+$/.test(value);
      }
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: '560px'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    thumbnailQuality: {
      type: String,
      default: 'standard'
    },
    iframeClass: {
      type: String,
      default: 'ly-iframe'
    },
    customTitle: {
      type: String,
      default: ''
    },
    customThumbnail: {
      type: String,
      default: ''
    }
  },
  components: {
    VideoWrapper: Wrapper["a" /* default */],
    Preview: Preview["a" /* default */]
  },
  mounted: function mounted() {
    this.$nextTick(function () {
      this.fetchingOembed('vimeo');
    });
  },
  computed: {
    aspectRatioValue: function aspectRatioValue() {
      return this.calcAspect(this.aspectRatio);
    },
    getTitle: function getTitle() {
      return this.videoInfo !== null && this.videoInfo.title ? this.videoInfo.title : '';
    },
    isCustomTitleExist: function isCustomTitleExist() {
      return this.customTitle.trim().length > 0;
    },
    isCustomThumbnailExist: function isCustomThumbnailExist() {
      return this.customThumbnail.trim().length > 0;
    }
  },
  watch: {
    'src': function src(val, oldVal) {
      if (val !== oldVal) {
        this.resetState();
        this.fetchingOembed('vimeo');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/LazyVimeo.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LazyVimeovue_type_script_lang_js_ = (LazyVimeovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/LazyVimeo.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_LazyVimeovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "65dba21d",
  null
  
)

/* harmony default export */ var LazyVimeo = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2444":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__("c532");
var normalizeHeaderName = __webpack_require__("c8af");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__("b50d");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__("b50d");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "2d83":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__("387f");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "2e67":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "30b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "387f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "3934":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "4018":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1276");
/* harmony import */ var core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);



// Importing Utils
var axios = __webpack_require__("bc3a").default;

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      clicked: false,
      onceLoaded: false,
      iframeEl: null,
      videoInfo: null,
      fetchingInfo: true,
      isVideoFound: false
    };
  },
  methods: {
    fetchingOembed: function fetchingOembed() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'youtube';
      var self = this;
      var url = '';

      if (type === 'youtube') {
        url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=".concat(this.videoID, "&format=json");
      } else {
        url = "https://vimeo.com/api/oembed.json?url=".concat(this.src);
      }

      axios.get(url).then(function (response) {
        // handle success
        self.videoInfo = response.data;

        if (type === 'vimeo') {
          self.videoID = response.data.video_id;
        }

        self.isVideoFound = true;
      }).catch(function () {
        // handle error
        self.videoInfo = null;
        self.isVideoFound = false;
      }).then(function () {
        // always executed
        self.fetchingInfo = false;

        if (self.autoplay) {
          self.playVideo();
        }
      });
    },
    isPostMessageSupported: function isPostMessageSupported() {
      if (!window.postMessage) {
        console.info('Client does not support postMessage');
        return false;
      }

      return true;
    },
    createIframe: function createIframe() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'youtube';

      if (this.iframeEl === null && flag) {
        this.clicked = true;
        this.iframeEl = document.createElement('iframe');

        if (type === 'youtube') {
          this.iframeEl.setAttribute('src', "https://www.youtube.com/embed/".concat(this.videoID, "?enablejsapi=1&autoplay=1"));
        } else {
          this.iframeEl.setAttribute('src', "https://player.vimeo.com/video/".concat(this.videoID, "?autoplay=1"));
        }

        this.iframeEl.setAttribute('frameborder', "0");
        this.iframeEl.setAttribute('allow', "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        this.iframeEl.setAttribute('allowfullscreen', "1");
        this.iframeEl.setAttribute('title', "".concat(this.getTitle));
        this.iframeEl.setAttribute('class', "".concat(this.iframeClass));
        this.iframeEl.addEventListener('load', this.handleLoad);
        this.$el.lastChild.appendChild(this.iframeEl);
        this.iframeEl.focus();
      }
    },
    resetView: function resetView() {
      if (this.iframeEl !== null) {
        // Removing form dom
        this.iframeEl.remove(); // Resetting the states

        this.iframeEl = null;
        this.clicked = false;
        this.onceLoaded = false;
      }
    },
    resetState: function resetState() {
      this.resetView();
      this.clicked = false, this.onceLoaded = false, this.iframeEl = null, this.videoInfo = null, this.fetchingInfo = true, this.isVideoFound = false;
    },
    calcAspect: function calcAspect(aspect) {
      var aspects = aspect.split(':');

      if (typeof aspects[1] === "undefined") {
        return 56.25;
        /* 16:9 */
      } else {
        return aspects[1] / aspects[0] * 100;
      }
    },
    handleLoad: function handleLoad() {
      if (this.fetchingInfo === false) {
        if (!this.onceLoaded) {
          this.onceLoaded = true;
          console.info('Video is loaded');
          return;
        }
      }
    }
  }
});

/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__("2d83");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var IS_NODE = __webpack_require__("605d");
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // eslint-disable-next-line es/no-symbol -- required for testing
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (IS_NODE ? V8_VERSION === 38 : V8_VERSION > 37 && V8_VERSION < 41);
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5270":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var transformData = __webpack_require__("c401");
var isCancel = __webpack_require__("2e67");
var defaults = __webpack_require__("2444");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "55b3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"720145b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LazyYoutube.vue?vue&type=template&id=5032af12&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('VideoWrapper',{attrs:{"aspectRatioValue":_vm.aspectRatioValue,"maxWidth":_vm.maxWidth}},[(!_vm.onceLoaded)?_c('Preview',{on:{"click":function($event){return _vm.createIframe(_vm.isVideoFound, 'youtube')}}},[(_vm.isVideoFound )?[(_vm.isCustomThumbnailExist)?_c('img',{attrs:{"src":_vm.customThumbnail,"alt":""},on:{"error":function($event){$event.target.src=_vm.getYoutubeThumbnail(_vm.videoID, _vm.thumbnailQuality)}}}):_c('img',{attrs:{"src":_vm.getYoutubeThumbnail(_vm.videoID, _vm.thumbnailQuality),"alt":""}}),(_vm.showTitle)?[_c('span',{staticClass:"ly-text"},[_vm._v(_vm._s(_vm.isCustomTitleExist ? _vm.customTitle : _vm.getTitle))])]:_vm._e(),_c('button',{directives:[{name:"show",rawName:"v-show",value:(!_vm.clicked),expression:"!clicked"}],staticClass:"ly-button-wrapper"},[_vm._t("button",[_c('svg',{attrs:{"height":"100%","version":"1.1","viewBox":"0 0 68 48","width":"100%"}},[_c('path',{staticClass:"ly-large-play-button-bg",attrs:{"d":"M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z","fill":"#f00"}}),_c('path',{attrs:{"d":"M 45,24 27,14 27,34","fill":"#fff"}})])])],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.clicked),expression:"clicked"}],staticClass:"ly-loader-wrapper"},[_vm._t("loader",[_c('span',{staticClass:"ly-ring"},[_c('span'),_c('span'),_c('span')])])],2)]:(!_vm.fetchingInfo)?[_c('div',{staticClass:"ly-error-container"},[_c('span',{staticClass:"ly-error-icon"},[_c('svg',{attrs:{"fill":"#fff","viewBox":"0 0 48 48"}},[_c('path',{attrs:{"d":"M0 0h48v48H0V0z","fill":"none"}}),_c('path',{attrs:{"d":"M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z","fill-opacity":"0.7"}})])]),_c('span',{staticClass:"ly-error-content"},[_c('span',{staticClass:"ly-error-content__reason"},[_c('span',[_vm._v("Video unavailable")])]),_c('span',{staticClass:"ly-error-content__subreason"},[_c('span',[_vm._v("This video is unavailable.")])])])])]:_vm._e()],2):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.onceLoaded),expression:"onceLoaded"}],staticClass:"ly-iframe-wrapper"})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LazyYoutube.vue?vue&type=template&id=5032af12&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// CONCATENATED MODULE: ./src/mixins/youtubeMixin.js


/* harmony default export */ var youtubeMixin = ({
  methods: {
    getYouTubeID: function getYouTubeID(url) {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      /* eslint-disable no-useless-escape */

      return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    },
    pauseVideo: function pauseVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
      }
    },
    playVideo: function playVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
      } else {
        this.createIframe(this.isVideoFound, 'youtube');
      }
    },
    stopVideo: function stopVideo() {
      if (!this.isPostMessageSupported) {
        return;
      }

      if (this.iframeEl !== null) {
        this.iframeEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      }
    },
    getYoutubeThumbnail: function getYoutubeThumbnail(video_id, quality) {
      var thumbnail;

      if (video_id) {
        if (typeof quality == "undefined") {
          quality = 'high';
        }

        var quality_key = 'maxresdefault'; // Max quality

        if (quality === 'default') {
          quality_key = 'default';
        } else if (quality === 'medium') {
          quality_key = 'mqdefault';
        } else if (quality === 'high') {
          quality_key = 'hqdefault';
        } else if (quality === 'standard') {
          quality_key = 'sddefault';
        } else if (quality === 'maxres') {
          quality_key = 'maxresdefault';
        }

        thumbnail = "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
        return thumbnail;
      }

      return false;
    }
  }
});
// EXTERNAL MODULE: ./src/mixins/commonMixin.js
var commonMixin = __webpack_require__("4018");

// EXTERNAL MODULE: ./src/components/common/Wrapper.js
var Wrapper = __webpack_require__("777d");

// EXTERNAL MODULE: ./src/components/common/Preview.js
var Preview = __webpack_require__("727b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LazyYoutube.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Importing Mixins

 // Importing Components



/* harmony default export */ var LazyYoutubevue_type_script_lang_js_ = ({
  name: "LazyYoutube",
  mixins: [commonMixin["a" /* default */], youtubeMixin],
  components: {
    VideoWrapper: Wrapper["a" /* default */],
    Preview: Preview["a" /* default */]
  },
  props: {
    src: {
      type: String,
      required: true
    },
    aspectRatio: {
      type: String,
      default: '16:9',
      validator: function validator(value) {
        return /^\d+:\d+$/.test(value);
      }
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: String,
      default: '560px'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    thumbnailQuality: {
      type: String,
      default: 'standard'
    },
    iframeClass: {
      type: String,
      default: 'ly-iframe'
    },
    customTitle: {
      type: String,
      default: ''
    },
    customThumbnail: {
      type: String,
      default: ''
    }
  },
  computed: {
    videoID: function videoID() {
      return this.getYouTubeID(this.src);
    },
    aspectRatioValue: function aspectRatioValue() {
      return this.calcAspect(this.aspectRatio);
    },
    getTitle: function getTitle() {
      return this.videoInfo !== null ? this.videoInfo.title : '';
    },
    isCustomTitleExist: function isCustomTitleExist() {
      return this.customTitle.trim().length > 0;
    },
    isCustomThumbnailExist: function isCustomThumbnailExist() {
      return this.customThumbnail.trim().length > 0;
    }
  },
  mounted: function mounted() {
    this.$nextTick(function () {
      this.fetchingOembed('youtube');
    });
  },
  watch: {
    'src': function src(val, oldVal) {
      if (val !== oldVal) {
        this.resetState();
        this.fetchingOembed('youtube');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/LazyYoutube.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LazyYoutubevue_type_script_lang_js_ = (LazyYoutubevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/LazyYoutube.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_LazyYoutubevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LazyYoutube = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.10.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5f02":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "605d":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var global = __webpack_require__("da84");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "727b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var E_Improvement_vue_lazytube_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8785");
/* harmony import */ var vue_styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("9c56");


var _templateObject;


/* harmony default export */ __webpack_exports__["a"] = (Object(vue_styled_components__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('a')(_templateObject || (_templateObject = Object(E_Improvement_vue_lazytube_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n  text-decoration: none;\n  padding: 21px !important;\n  color: #ffffff;\n\n  img {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    top: 0;\n    left: 0;\n    pointer-events: none;\n  }\n\n  background-size: cover;\n\n  display: block;\n  height: 100%;\n  width: 100%;\n\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n\n  &:after {\n    background: radial-gradient(circle,rgba(19, 19, 27, 0.13) 0%,rgba(0,0,0,0) 40%,rgba(86, 88, 88, 0.09) 100%) no-repeat center center fixed;\n    content: \"\";\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n  }\n\n  &:before {\n    content: \"\";\n    height: 60px;\n    padding-bottom: 50px;\n    top: 0;\n    left: 0;\n    z-index: 25;\n    background-position: top;\n    width: 100%;\n    position: absolute;\n    background-repeat: repeat-x;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);\n    -moz-transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);\n    -webkit-transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);\n    transition: opacity .25s cubic-bezier(0.0, 0.0, 0.2, 1);\n    pointer-events: none;\n    opacity: 0.9;\n  }\n\n  .ly-error-container {\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n\n    height: 100%;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    background: #282828;\n\n    padding: 0 4rem;\n  }\n\n  .ly-error-icon {\n    height: 64px;\n    width: 64px;\n    min-width: 64px;\n    min-height: 64px;\n    margin-right: 12px;\n    margin-top: -4px;\n  }\n\n  .ly-error-content {\n    display: flex;\n    flex-direction: column;\n\n    text-shadow: 0 0 2px rgba(0, 0, 0, .5);\n    font-family: \"YouTube Noto\", Roboto, Arial, Helvetica, sans-serif;\n\n    &__reason {\n      font-size: 22px;\n      padding-bottom: 10px;\n    }\n\n    &__subreason {\n      font-size: 18px;\n    }\n  }\n\n  button {\n    border: none;\n    background-color: transparent;\n    padding: 0;\n    color: inherit;\n    text-align: inherit;\n    font-size: 100%;\n    font-family: inherit;\n    cursor: pointer;\n    line-height: inherit;\n\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    width: 68px;\n    height: 48px;\n    transform: translate(-50%, -50%);\n    -webkit-transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);\n    transition: opacity .25s cubic-bezier(0, 0, 0.2, 1);\n    z-index: 63;\n\n  }\n\n  .ly-text {\n    position: relative;\n    z-index: 26;\n    text-shadow: 0 0 2px rgba(0, 0, 0, .5);\n    font-family: \"YouTube Noto\", Roboto, Arial, Helvetica, sans-serif;\n    width: 82%;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    display: block;\n    font-size: 18px;\n    color: #ffffff;\n  }\n\n  .ly-large-play-button-bg, .ly-large-play-button-bg--v {\n    -webkit-transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);\n    transition: fill .1s cubic-bezier(0.4, 0, 1, 1), fill-opacity .1s cubic-bezier(0.4, 0, 1, 1);\n    fill: #1b1b1b;\n    fill-opacity: .9\n  }\n\n  .ly-large-play-button-bg:hover, &:hover .ly-large-play-button-bg {\n    -webkit-transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);\n    transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);\n    fill: #f00;\n    fill-opacity: 1\n  }\n\n  .ly-large-play-button-bg--v:hover, &:hover .ly-large-play-button-bg--v {\n    -webkit-transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);\n    transition: fill .1s cubic-bezier(0, 0, 0.2, 1), fill-opacity .1s cubic-bezier(0, 0, 0.2, 1);\n    fill: #00adef;\n    fill-opacity: 1\n  }\n\n\n  .ly-ring {\n    display: inline-block;\n    width: 80px;\n    height: 80px;\n    position: absolute;\n    z-index: 8;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    \n\n    span {\n      box-sizing: border-box;\n      display: block;\n      position: absolute;\n      width: 67px;\n      height: 67px;\n      margin: 6px;\n      border: 7px solid #ffffff;\n      border-radius: 50%;\n      animation: ly-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n      border-color: #FFFFFF transparent transparent transparent;\n\n      &:nth-child(1) {\n        animation-delay: -0.45s;\n      }\n\n      &:nth-child(2) {\n        animation-delay: -0.3s;\n      }\n\n      &:nth-child(3) {\n        animation-delay: -0.15s;\n      }\n\n    }\n  }\n\n  @keyframes ly-ring {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n"]))));

/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "777d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var E_Improvement_vue_lazytube_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8785");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a9e3");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("9c56");


var _templateObject;



var divProps = {
  aspectRatioValue: String | Number,
  maxWidth: String
};
/* harmony default export */ __webpack_exports__["a"] = (Object(vue_styled_components__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])('div', divProps)(_templateObject || (_templateObject = Object(E_Improvement_vue_lazytube_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(["\n\n  --aspect-ratio:  ", "\n  max-width:  ", "\n  width: 100%;\n  display: inline-block;\n \n  background-color: #000000;\n  position: relative;\n  \n  & * {\n    padding:0;margin:0;overflow:hidden; box-sizing: border-box;\n  }\n\n  &:before {\n    display: block;\n    padding-top: 56.25%; /* 16:9 */\n\n    /* falls back to 16/9, but otherwise uses ratio from HTML */\n    padding-top: calc(var(--aspect-ratio) * 1%);\n    content: \"\";\n  }\n\n  iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 100%;\n}\n"])), function (props) {
  return props.aspectRatioValue ? props.aspectRatioValue : 56;
}, function (props) {
  return props.maxWidth ? props.maxWidth : '560px';
}));

/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7a77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "7aac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "83b9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__("d925");
var combineURLs = __webpack_require__("e683");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8785":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _taggedTemplateLiteral; });
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fb6a");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("dca8");
/* harmony import */ var core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_freeze_js__WEBPACK_IMPORTED_MODULE_1__);


function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__("7a77");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var shared = __webpack_require__("5692");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = shared('native-string-replace', String.prototype.replace);

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9c56":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ThemeProvider */
/* unused harmony export css */
/* unused harmony export injectGlobal */
/* unused harmony export keyframes */
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

var generateAlphabeticName = function generateAlphabeticName(code) {
  var lastDigit = chars[code % chars.length];
  return code > chars.length ? "".concat(generateAlphabeticName(Math.floor(code / chars.length))).concat(lastDigit) : lastDigit;
};

var interleave = (function (strings, interpolations) {
  return interpolations.reduce(function (array, interp, i) {
    return array.concat(interp, strings[i + 1]);
  }, [strings[0]]);
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */

function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */


function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}
/** Used for built-in method references. */


var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString.call(Object);
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Built-in value references. */

var getPrototype = overArg(Object.getPrototypeOf, Object);
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */


function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }

  var proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

var lodash_isplainobject = isPlainObject;

var _uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

var objToCss = function objToCss(obj, prevKey) {
  var css = Object.keys(obj).map(function (key) {
    if (lodash_isplainobject(obj[key])) return objToCss(obj[key], key);
    return "".concat(hyphenateStyleName_1(key), ": ").concat(obj[key], ";");
  }).join(' ');
  return prevKey ? "".concat(prevKey, " {\n  ").concat(css, "\n}") : css;
};

var flatten = function flatten(chunks, executionContext) {
  return chunks.reduce(function (ruleSet, chunk) {
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet;
    if (Array.isArray(chunk)) return [].concat(_toConsumableArray(ruleSet), _toConsumableArray(flatten(chunk, executionContext)));

    if (typeof chunk === 'function') {
      return executionContext ? ruleSet.concat.apply(ruleSet, _toConsumableArray(flatten([chunk(executionContext)], executionContext))) : ruleSet.concat(chunk);
    }

    return ruleSet.concat(lodash_isplainobject(chunk) ? objToCss(chunk) : chunk.toString());
  }, []);
};

var css = (function (rules) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  return flatten(interleave(rules, interpolations));
});

function last(arr) {
  return arr[arr.length - 1];
}

function sheetForTag(tag) {
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}

var isDev = function (x) {
  return x === 'development' || !x;
}("development");

var isTest = "development" === 'test';
var isBrowser = typeof document !== 'undefined' && !isTest;

var oldIE = function () {
  if (isBrowser) {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lt IE 10]><i></i><![endif]-->';
    return div.getElementsByTagName('i').length === 1;
  }
}();

function makeStyleTag() {
  var tag = document.createElement('style');
  tag.type = 'text/css';
  tag.appendChild(document.createTextNode(''));
  (document.head || document.getElementsByTagName('head')[0]).appendChild(tag);
  return tag;
}

var StyleSheet = function () {
  function StyleSheet() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$speedy = _ref.speedy,
        speedy = _ref$speedy === void 0 ? !isDev && !isTest : _ref$speedy,
        _ref$maxLength = _ref.maxLength,
        maxLength = _ref$maxLength === void 0 ? isBrowser && oldIE ? 4000 : 65000 : _ref$maxLength;

    _classCallCheck(this, StyleSheet);

    this.isSpeedy = speedy;
    this.sheet = undefined;
    this.tags = [];
    this.maxLength = maxLength;
    this.ctr = 0;
  }

  _createClass(StyleSheet, [{
    key: "inject",
    value: function inject() {
      var _this = this;

      if (this.injected) {
        throw new Error('already injected stylesheet!');
      }

      if (isBrowser) {
        this.tags[0] = makeStyleTag();
        this.sheet = sheetForTag(this.tags[0]);
      } else {
        this.sheet = {
          cssRules: [],
          insertRule: function insertRule(rule) {
            var serverRule = {
              cssText: rule
            };

            _this.sheet.cssRules.push(serverRule);

            return {
              serverRule: serverRule,
              appendRule: function appendRule(newCss) {
                return serverRule.cssText += newCss;
              }
            };
          }
        };
      }

      this.injected = true;
    }
  }, {
    key: "speedy",
    value: function speedy(bool) {
      if (this.ctr !== 0) {
        throw new Error("cannot change speedy mode after inserting any rule to sheet. Either call speedy(".concat(bool, ") earlier in your app, or call flush() before speedy(").concat(bool, ")"));
      }

      this.isSpeedy = !!bool;
    }
  }, {
    key: "_insert",
    value: function _insert(rule) {
      try {
        this.sheet.insertRule(rule, this.sheet.cssRules.length);
      } catch (e) {
        if (isDev) {
          console.warn('whoops, illegal rule inserted', rule);
        }
      }
    }
  }, {
    key: "insert",
    value: function insert(rule) {
      var insertedRule;

      if (isBrowser) {
        if (this.isSpeedy && this.sheet.insertRule) {
          this._insert(rule);
        } else {
          var textNode = document.createTextNode(rule);
          last(this.tags).appendChild(textNode);
          insertedRule = {
            textNode: textNode,
            appendRule: function appendRule(newCss) {
              return textNode.appendData(newCss);
            }
          };

          if (!this.isSpeedy) {
            this.sheet = sheetForTag(last(this.tags));
          }
        }
      } else {
        insertedRule = this.sheet.insertRule(rule);
      }

      this.ctr++;

      if (isBrowser && this.ctr % this.maxLength === 0) {
        this.tags.push(makeStyleTag());
        this.sheet = sheetForTag(last(this.tags));
      }

      return insertedRule;
    }
  }, {
    key: "flush",
    value: function flush() {
      if (isBrowser) {
        this.tags.forEach(function (tag) {
          return tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.sheet = null;
        this.ctr = 0;
      } else {
        this.sheet.cssRules = [];
      }

      this.injected = false;
    }
  }, {
    key: "rules",
    value: function rules() {
      if (!isBrowser) {
        return this.sheet.cssRules;
      }

      var arr = [];
      this.tags.forEach(function (tag) {
        return arr.splice.apply(arr, [arr.length, 0].concat(_toConsumableArray(Array.from(sheetForTag(tag).cssRules))));
      });
      return arr;
    }
  }]);

  return StyleSheet;
}();

var StyleSheet$1 = function () {
  function StyleSheet$1() {
    _classCallCheck(this, StyleSheet$1);

    this.globalStyleSheet = new StyleSheet({
      speedy: false
    });
    this.componentStyleSheet = new StyleSheet({
      speedy: false,
      maxLength: 40
    });
  }

  _createClass(StyleSheet$1, [{
    key: "inject",
    value: function inject() {
      this.globalStyleSheet.inject();
      this.componentStyleSheet.inject();
    }
  }, {
    key: "flush",
    value: function flush() {
      if (this.globalStyleSheet.sheet) this.globalStyleSheet.flush();
      if (this.componentStyleSheet.sheet) this.componentStyleSheet.flush();
    }
  }, {
    key: "insert",
    value: function insert(rule) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        global: false
      };
      var sheet = opts.global ? this.globalStyleSheet : this.componentStyleSheet;
      return sheet.insert(rule);
    }
  }, {
    key: "rules",
    value: function rules() {
      return this.globalStyleSheet.rules().concat(this.componentStyleSheet.rules());
    }
  }, {
    key: "injected",
    get: function get() {
      return this.globalStyleSheet.injected && this.componentStyleSheet.injected;
    }
  }]);

  return StyleSheet$1;
}();

var styleSheet = new StyleSheet$1();

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hash = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = doHash; // murmurhash2 via https://gist.github.com/raycmorgan/588423

  function doHash(str, seed) {
    var m = 0x5bd1e995;
    var r = 24;
    var h = seed ^ str.length;
    var length = str.length;
    var currentIndex = 0;

    while (length >= 4) {
      var k = UInt32(str, currentIndex);
      k = Umul32(k, m);
      k ^= k >>> r;
      k = Umul32(k, m);
      h = Umul32(h, m);
      h ^= k;
      currentIndex += 4;
      length -= 4;
    }

    switch (length) {
      case 3:
        h ^= UInt16(str, currentIndex);
        h ^= str.charCodeAt(currentIndex + 2) << 16;
        h = Umul32(h, m);
        break;

      case 2:
        h ^= UInt16(str, currentIndex);
        h = Umul32(h, m);
        break;

      case 1:
        h ^= str.charCodeAt(currentIndex);
        h = Umul32(h, m);
        break;
    }

    h ^= h >>> 13;
    h = Umul32(h, m);
    h ^= h >>> 15;
    return h >>> 0;
  }

  function UInt32(str, pos) {
    return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8) + (str.charCodeAt(pos++) << 16) + (str.charCodeAt(pos) << 24);
  }

  function UInt16(str, pos) {
    return str.charCodeAt(pos++) + (str.charCodeAt(pos++) << 8);
  }

  function Umul32(n, m) {
    n = n | 0;
    m = m | 0;
    var nlo = n & 0xffff;
    var nhi = n >>> 16;
    var res = nlo * m + ((nhi * m & 0xffff) << 16) | 0;
    return res;
  }
});
var hashStr = unwrapExports(hash);

var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

var makeAnimation = function makeAnimation(name, css) {
  return "\n@keyframes ".concat(name, " {\n   ").concat(css, "\n}\n");
};

var keyframes = (function (css) {
  var name = generateAlphabeticName(hashStr(replaceWhitespace(JSON.stringify(css))));
  var animation = makeAnimation(name, css);
  if (!styleSheet.injected) styleSheet.inject();
  styleSheet.insert(animation);
  return name;
});

var stylis = createCommonjsModule(function (module, exports) {
  /*
   *          __        ___
   *    _____/ /___  __/ (_)____
   *   / ___/ __/ / / / / / ___/
   *  (__  ) /_/ /_/ / / (__  )
   * /____/\__/\__, /_/_/____/
   *          /____/
   *
   * light - weight css preprocessor @licence MIT
   */
  (function (factory) {
    /* eslint-disable */
     module['exports'] = factory(null) ;
  })(
  /** @param {*=} options */
  function factory(options) {
    /**
     * Notes
     *
     * The ['<method name>'] pattern is used to support closure compiler
     * the jsdoc signatures are also used to the same effect
     *
     * ----
     *
     * int + int + int === n4 [faster]
     *
     * vs
     *
     * int === n1 && int === n2 && int === n3
     *
     * ----
     *
     * switch (int) { case ints...} [faster]
     *
     * vs
     *
     * if (int == 1 && int === 2 ...)
     *
     * ----
     *
     * The (first*n1 + second*n2 + third*n3) format used in the property parser
     * is a simple way to hash the sequence of characters
     * taking into account the index they occur in
     * since any number of 3 character sequences could produce duplicates.
     *
     * On the other hand sequences that are directly tied to the index of the character
     * resolve a far more accurate measure, it's also faster
     * to evaluate one condition in a switch statement
     * than three in an if statement regardless of the added math.
     *
     * This allows the vendor prefixer to be both small and fast.
     */

    var nullptn = /^\0+/g;
    /* matches leading null characters */

    var formatptn = /[\0\r\f]/g;
    /* matches new line, null and formfeed characters */

    var colonptn = /: */g;
    /* splits animation rules */

    var cursorptn = /zoo|gra/;
    /* assert cursor varient */

    var transformptn = /([,: ])(transform)/g;
    /* vendor prefix transform, older webkit */

    var animationptn = /,+\s*(?![^(]*[)])/g;
    /* splits multiple shorthand notation animations */

    var propertiesptn = / +\s*(?![^(]*[)])/g;
    /* animation properties */

    var elementptn = / *[\0] */g;
    /* selector elements */

    var selectorptn = /,\r+?/g;
    /* splits selectors */

    var andptn = /([\t\r\n ])*\f?&/g;
    /* match & */

    var escapeptn = /:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g;
    /* matches :global(.*) */

    var invalidptn = /\W+/g;
    /* removes invalid characters from keyframes */

    var keyframeptn = /@(k\w+)\s*(\S*)\s*/;
    /* matches @keyframes $1 */

    var plcholdrptn = /::(place)/g;
    /* match ::placeholder varient */

    var readonlyptn = /:(read-only)/g;
    /* match :read-only varient */

    var beforeptn = /\s+(?=[{\];=:>])/g;
    /* matches \s before ] ; = : */

    var afterptn = /([[}=:>])\s+/g;
    /* matches \s after characters [ } = : */

    var tailptn = /(\{[^{]+?);(?=\})/g;
    /* matches tail semi-colons ;} */

    var whiteptn = /\s{2,}/g;
    /* matches repeating whitespace */

    var pseudoptn = /([^\(])(:+) */g;
    /* pseudo element */

    var writingptn = /[svh]\w+-[tblr]{2}/;
    /* match *gradient property */

    var supportsptn = /\(\s*(.*)\s*\)/g;
    /* match supports (groups) */

    var propertyptn = /([\s\S]*?);/g;
    /* match properties leading semicolon */

    var selfptn = /-self|flex-/g;
    /* match flex- and -self in align-self: flex-*; */

    var pseudofmt = /[^]*?(:[rp][el]a[\w-]+)[^]*/;
    /* match tail whitspace */

    var dimensionptn = /stretch|:\s*\w+\-(?:conte|avail)/;
    /* match max/min/fit-content, fill-available */

    var imgsrcptn = /([^-])(image-set\()/;
    /* vendors */

    var webkit = '-webkit-';
    var moz = '-moz-';
    var ms = '-ms-';
    /* character codes */

    var SEMICOLON = 59;
    /* ; */

    var CLOSEBRACES = 125;
    /* } */

    var OPENBRACES = 123;
    /* { */

    var OPENPARENTHESES = 40;
    /* ( */

    var CLOSEPARENTHESES = 41;
    /* ) */

    var OPENBRACKET = 91;
    /* [ */

    var CLOSEBRACKET = 93;
    /* ] */

    var NEWLINE = 10;
    /* \n */

    var CARRIAGE = 13;
    /* \r */

    var TAB = 9;
    /* \t */

    var AT = 64;
    /* @ */

    var SPACE = 32;
    /*   */

    var AND = 38;
    /* & */

    var DASH = 45;
    /* - */

    var UNDERSCORE = 95;
    /* _ */

    var STAR = 42;
    /* * */

    var COMMA = 44;
    /* , */

    var COLON = 58;
    /* : */

    var SINGLEQUOTE = 39;
    /* ' */

    var DOUBLEQUOTE = 34;
    /* " */

    var FOWARDSLASH = 47;
    /* / */

    var GREATERTHAN = 62;
    /* > */

    var PLUS = 43;
    /* + */

    var TILDE = 126;
    /* ~ */

    var NULL = 0;
    /* \0 */

    var FORMFEED = 12;
    /* \f */

    var VERTICALTAB = 11;
    /* \v */

    /* special identifiers */

    var KEYFRAME = 107;
    /* k */

    var MEDIA = 109;
    /* m */

    var SUPPORTS = 115;
    /* s */

    var PLACEHOLDER = 112;
    /* p */

    var READONLY = 111;
    /* o */

    var IMPORT = 105;
    /* <at>i */

    var CHARSET = 99;
    /* <at>c */

    var DOCUMENT = 100;
    /* <at>d */

    var PAGE = 112;
    /* <at>p */

    var column = 1;
    /* current column */

    var line = 1;
    /* current line numebr */

    var pattern = 0;
    /* :pattern */

    var cascade = 1;
    /* #id h1 h2 vs h1#id h2#id  */

    var prefix = 1;
    /* vendor prefix */

    var escape = 1;
    /* escape :global() pattern */

    var compress = 0;
    /* compress output */

    var semicolon = 0;
    /* no/semicolon option */

    var preserve = 0;
    /* preserve empty selectors */

    /* empty reference */

    var array = [];
    /* plugins */

    var plugins = [];
    var plugged = 0;
    var should = null;
    /* plugin context */

    var POSTS = -2;
    var PREPS = -1;
    var UNKWN = 0;
    var PROPS = 1;
    var BLCKS = 2;
    var ATRUL = 3;
    /* plugin newline context */

    var unkwn = 0;
    /* keyframe animation */

    var keyed = 1;
    var key = '';
    /* selector namespace */

    var nscopealt = '';
    var nscope = '';
    /**
     * Compile
     *
     * @param {Array<string>} parent
     * @param {Array<string>} current
     * @param {string} body
     * @param {number} id
     * @param {number} depth
     * @return {string}
     */

    function compile(parent, current, body, id, depth) {
      var bracket = 0;
      /* brackets [] */

      var comment = 0;
      /* comments /* // or /* */

      var parentheses = 0;
      /* functions () */

      var quote = 0;
      /* quotes '', "" */

      var first = 0;
      /* first character code */

      var second = 0;
      /* second character code */

      var code = 0;
      /* current character code */

      var tail = 0;
      /* previous character code */

      var trail = 0;
      /* character before previous code */

      var peak = 0;
      /* previous non-whitespace code */

      var counter = 0;
      /* count sequence termination */

      var context = 0;
      /* track current context */

      var atrule = 0;
      /* track @at-rule context */

      var pseudo = 0;
      /* track pseudo token index */

      var caret = 0;
      /* current character index */

      var format = 0;
      /* control character formating context */

      var insert = 0;
      /* auto semicolon insertion */

      var invert = 0;
      /* inverted selector pattern */

      var length = 0;
      /* generic length address */

      var eof = body.length;
      /* end of file(length) */

      var eol = eof - 1;
      /* end of file(characters) */

      var char = '';
      /* current character */

      var chars = '';
      /* current buffer of characters */

      var child = '';
      /* next buffer of characters */

      var out = '';
      /* compiled body */

      var children = '';
      /* compiled children */

      var flat = '';
      /* compiled leafs */

      var selector;
      /* generic selector address */

      var result;
      /* generic address */
      // ...build body

      while (caret < eof) {
        code = body.charCodeAt(caret); // eof varient

        if (caret === eol) {
          // last character + noop context, add synthetic padding for noop context to terminate
          if (comment + quote + parentheses + bracket !== 0) {
            if (comment !== 0) {
              code = comment === FOWARDSLASH ? NEWLINE : FOWARDSLASH;
            }

            quote = parentheses = bracket = 0;
            eof++;
            eol++;
          }
        }

        if (comment + quote + parentheses + bracket === 0) {
          // eof varient
          if (caret === eol) {
            if (format > 0) {
              chars = chars.replace(formatptn, '');
            }

            if (chars.trim().length > 0) {
              switch (code) {
                case SPACE:
                case TAB:
                case SEMICOLON:
                case CARRIAGE:
                case NEWLINE:
                  {
                    break;
                  }

                default:
                  {
                    chars += body.charAt(caret);
                  }
              }

              code = SEMICOLON;
            }
          } // auto semicolon insertion


          if (insert === 1) {
            switch (code) {
              // false flags
              case OPENBRACES:
              case CLOSEBRACES:
              case SEMICOLON:
              case DOUBLEQUOTE:
              case SINGLEQUOTE:
              case OPENPARENTHESES:
              case CLOSEPARENTHESES:
              case COMMA:
                {
                  insert = 0;
                }
              // ignore

              case TAB:
              case CARRIAGE:
              case NEWLINE:
              case SPACE:
                {
                  break;
                }
              // valid

              default:
                {
                  insert = 0;
                  length = caret;
                  first = code;
                  caret--;
                  code = SEMICOLON;

                  while (length < eof) {
                    switch (body.charCodeAt(length++)) {
                      case NEWLINE:
                      case CARRIAGE:
                      case SEMICOLON:
                        {
                          ++caret;
                          code = first;
                          length = eof;
                          break;
                        }

                      case COLON:
                        {
                          if (format > 0) {
                            ++caret;
                            code = first;
                          }
                        }

                      case OPENBRACES:
                        {
                          length = eof;
                        }
                    }
                  }
                }
            }
          } // token varient


          switch (code) {
            case OPENBRACES:
              {
                chars = chars.trim();
                first = chars.charCodeAt(0);
                counter = 1;
                length = ++caret;

                while (caret < eof) {
                  switch (code = body.charCodeAt(caret)) {
                    case OPENBRACES:
                      {
                        counter++;
                        break;
                      }

                    case CLOSEBRACES:
                      {
                        counter--;
                        break;
                      }

                    case FOWARDSLASH:
                      {
                        switch (second = body.charCodeAt(caret + 1)) {
                          // /*, //
                          case STAR:
                          case FOWARDSLASH:
                            {
                              caret = delimited(second, caret, eol, body);
                            }
                        }

                        break;
                      }
                    // given "[" === 91 & "]" === 93 hence forth 91 + 1 + 1 === 93

                    case OPENBRACKET:
                      {
                        code++;
                      }
                    // given "(" === 40 & ")" === 41 hence forth 40 + 1 === 41

                    case OPENPARENTHESES:
                      {
                        code++;
                      }
                    // quote tail delimiter is identical to the head delimiter hence noop,
                    // fallthrough clauses have been shifted to the correct tail delimiter

                    case DOUBLEQUOTE:
                    case SINGLEQUOTE:
                      {
                        while (caret++ < eol) {
                          if (body.charCodeAt(caret) === code) {
                            break;
                          }
                        }
                      }
                  }

                  if (counter === 0) {
                    break;
                  }

                  caret++;
                }

                child = body.substring(length, caret);

                if (first === NULL) {
                  first = (chars = chars.replace(nullptn, '').trim()).charCodeAt(0);
                }

                switch (first) {
                  // @at-rule
                  case AT:
                    {
                      if (format > 0) {
                        chars = chars.replace(formatptn, '');
                      }

                      second = chars.charCodeAt(1);

                      switch (second) {
                        case DOCUMENT:
                        case MEDIA:
                        case SUPPORTS:
                        case DASH:
                          {
                            selector = current;
                            break;
                          }

                        default:
                          {
                            selector = array;
                          }
                      }

                      child = compile(current, selector, child, second, depth + 1);
                      length = child.length; // preserve empty @at-rule

                      if (preserve > 0 && length === 0) {
                        length = chars.length;
                      } // execute plugins, @at-rule context


                      if (plugged > 0) {
                        selector = select(array, chars, invert);
                        result = proxy(ATRUL, child, selector, current, line, column, length, second, depth, id);
                        chars = selector.join('');

                        if (result !== void 0) {
                          if ((length = (child = result.trim()).length) === 0) {
                            second = 0;
                            child = '';
                          }
                        }
                      }

                      if (length > 0) {
                        switch (second) {
                          case SUPPORTS:
                            {
                              chars = chars.replace(supportsptn, supports);
                            }

                          case DOCUMENT:
                          case MEDIA:
                          case DASH:
                            {
                              child = chars + '{' + child + '}';
                              break;
                            }

                          case KEYFRAME:
                            {
                              chars = chars.replace(keyframeptn, '$1 $2' + (keyed > 0 ? key : ''));
                              child = chars + '{' + child + '}';

                              if (prefix === 1 || prefix === 2 && vendor('@' + child, 3)) {
                                child = '@' + webkit + child + '@' + child;
                              } else {
                                child = '@' + child;
                              }

                              break;
                            }

                          default:
                            {
                              child = chars + child;

                              if (id === PAGE) {
                                child = (out += child, '');
                              }
                            }
                        }
                      } else {
                        child = '';
                      }

                      break;
                    }
                  // selector

                  default:
                    {
                      child = compile(current, select(current, chars, invert), child, id, depth + 1);
                    }
                }

                children += child; // reset

                context = 0;
                insert = 0;
                pseudo = 0;
                format = 0;
                invert = 0;
                atrule = 0;
                chars = '';
                child = '';
                code = body.charCodeAt(++caret);
                break;
              }

            case CLOSEBRACES:
            case SEMICOLON:
              {
                chars = (format > 0 ? chars.replace(formatptn, '') : chars).trim();

                if ((length = chars.length) > 1) {
                  // monkey-patch missing colon
                  if (pseudo === 0) {
                    first = chars.charCodeAt(0); // first character is a letter or dash, buffer has a space character

                    if (first === DASH || first > 96 && first < 123) {
                      length = (chars = chars.replace(' ', ':')).length;
                    }
                  } // execute plugins, property context


                  if (plugged > 0) {
                    if ((result = proxy(PROPS, chars, current, parent, line, column, out.length, id, depth, id)) !== void 0) {
                      if ((length = (chars = result.trim()).length) === 0) {
                        chars = '\0\0';
                      }
                    }
                  }

                  first = chars.charCodeAt(0);
                  second = chars.charCodeAt(1);

                  switch (first) {
                    case NULL:
                      {
                        break;
                      }

                    case AT:
                      {
                        if (second === IMPORT || second === CHARSET) {
                          flat += chars + body.charAt(caret);
                          break;
                        }
                      }

                    default:
                      {
                        if (chars.charCodeAt(length - 1) === COLON) {
                          break;
                        }

                        out += property(chars, first, second, chars.charCodeAt(2));
                      }
                  }
                } // reset


                context = 0;
                insert = 0;
                pseudo = 0;
                format = 0;
                invert = 0;
                chars = '';
                code = body.charCodeAt(++caret);
                break;
              }
          }
        } // parse characters


        switch (code) {
          case CARRIAGE:
          case NEWLINE:
            {
              // auto insert semicolon
              if (comment + quote + parentheses + bracket + semicolon === 0) {
                // valid non-whitespace characters that
                // may precede a newline
                switch (peak) {
                  case CLOSEPARENTHESES:
                  case SINGLEQUOTE:
                  case DOUBLEQUOTE:
                  case AT:
                  case TILDE:
                  case GREATERTHAN:
                  case STAR:
                  case PLUS:
                  case FOWARDSLASH:
                  case DASH:
                  case COLON:
                  case COMMA:
                  case SEMICOLON:
                  case OPENBRACES:
                  case CLOSEBRACES:
                    {
                      break;
                    }

                  default:
                    {
                      // current buffer has a colon
                      if (pseudo > 0) {
                        insert = 1;
                      }
                    }
                }
              } // terminate line comment


              if (comment === FOWARDSLASH) {
                comment = 0;
              } else if (cascade + context === 0 && id !== KEYFRAME && chars.length > 0) {
                format = 1;
                chars += '\0';
              } // execute plugins, newline context


              if (plugged * unkwn > 0) {
                proxy(UNKWN, chars, current, parent, line, column, out.length, id, depth, id);
              } // next line, reset column position


              column = 1;
              line++;
              break;
            }

          case SEMICOLON:
          case CLOSEBRACES:
            {
              if (comment + quote + parentheses + bracket === 0) {
                column++;
                break;
              }
            }

          default:
            {
              // increment column position
              column++; // current character

              char = body.charAt(caret); // remove comments, escape functions, strings, attributes and prepare selectors

              switch (code) {
                case TAB:
                case SPACE:
                  {
                    if (quote + bracket + comment === 0) {
                      switch (tail) {
                        case COMMA:
                        case COLON:
                        case TAB:
                        case SPACE:
                          {
                            char = '';
                            break;
                          }

                        default:
                          {
                            if (code !== SPACE) {
                              char = ' ';
                            }
                          }
                      }
                    }

                    break;
                  }
                // escape breaking control characters

                case NULL:
                  {
                    char = '\\0';
                    break;
                  }

                case FORMFEED:
                  {
                    char = '\\f';
                    break;
                  }

                case VERTICALTAB:
                  {
                    char = '\\v';
                    break;
                  }
                // &

                case AND:
                  {
                    // inverted selector pattern i.e html &
                    if (quote + comment + bracket === 0 && cascade > 0) {
                      invert = 1;
                      format = 1;
                      char = '\f' + char;
                    }

                    break;
                  }
                // ::p<l>aceholder, l
                // :read-on<l>y, l

                case 108:
                  {
                    if (quote + comment + bracket + pattern === 0 && pseudo > 0) {
                      switch (caret - pseudo) {
                        // ::placeholder
                        case 2:
                          {
                            if (tail === PLACEHOLDER && body.charCodeAt(caret - 3) === COLON) {
                              pattern = tail;
                            }
                          }
                        // :read-only

                        case 8:
                          {
                            if (trail === READONLY) {
                              pattern = trail;
                            }
                          }
                      }
                    }

                    break;
                  }
                // :<pattern>

                case COLON:
                  {
                    if (quote + comment + bracket === 0) {
                      pseudo = caret;
                    }

                    break;
                  }
                // selectors

                case COMMA:
                  {
                    if (comment + parentheses + quote + bracket === 0) {
                      format = 1;
                      char += '\r';
                    }

                    break;
                  }
                // quotes

                case DOUBLEQUOTE:
                case SINGLEQUOTE:
                  {
                    if (comment === 0) {
                      quote = quote === code ? 0 : quote === 0 ? code : quote;
                    }

                    break;
                  }
                // attributes

                case OPENBRACKET:
                  {
                    if (quote + comment + parentheses === 0) {
                      bracket++;
                    }

                    break;
                  }

                case CLOSEBRACKET:
                  {
                    if (quote + comment + parentheses === 0) {
                      bracket--;
                    }

                    break;
                  }
                // functions

                case CLOSEPARENTHESES:
                  {
                    if (quote + comment + bracket === 0) {
                      parentheses--;
                    }

                    break;
                  }

                case OPENPARENTHESES:
                  {
                    if (quote + comment + bracket === 0) {
                      if (context === 0) {
                        switch (tail * 2 + trail * 3) {
                          // :matches
                          case 533:
                            {
                              break;
                            }
                          // :global, :not, :nth-child etc...

                          default:
                            {
                              counter = 0;
                              context = 1;
                            }
                        }
                      }

                      parentheses++;
                    }

                    break;
                  }

                case AT:
                  {
                    if (comment + parentheses + quote + bracket + pseudo + atrule === 0) {
                      atrule = 1;
                    }

                    break;
                  }
                // block/line comments

                case STAR:
                case FOWARDSLASH:
                  {
                    if (quote + bracket + parentheses > 0) {
                      break;
                    }

                    switch (comment) {
                      // initialize line/block comment context
                      case 0:
                        {
                          switch (code * 2 + body.charCodeAt(caret + 1) * 3) {
                            // //
                            case 235:
                              {
                                comment = FOWARDSLASH;
                                break;
                              }
                            // /*

                            case 220:
                              {
                                length = caret;
                                comment = STAR;
                                break;
                              }
                          }

                          break;
                        }
                      // end block comment context

                      case STAR:
                        {
                          if (code === FOWARDSLASH && tail === STAR && length + 2 !== caret) {
                            // /*<!> ... */, !
                            if (body.charCodeAt(length + 2) === 33) {
                              out += body.substring(length, caret + 1);
                            }

                            char = '';
                            comment = 0;
                          }
                        }
                    }
                  }
              } // ignore comment blocks


              if (comment === 0) {
                // aggressive isolation mode, divide each individual selector
                // including selectors in :not function but excluding selectors in :global function
                if (cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON) {
                  switch (code) {
                    case COMMA:
                    case TILDE:
                    case GREATERTHAN:
                    case PLUS:
                    case CLOSEPARENTHESES:
                    case OPENPARENTHESES:
                      {
                        if (context === 0) {
                          // outside of an isolated context i.e nth-child(<...>)
                          switch (tail) {
                            case TAB:
                            case SPACE:
                            case NEWLINE:
                            case CARRIAGE:
                              {
                                char = char + '\0';
                                break;
                              }

                            default:
                              {
                                char = '\0' + char + (code === COMMA ? '' : '\0');
                              }
                          }

                          format = 1;
                        } else {
                          // within an isolated context, sleep untill it's terminated
                          switch (code) {
                            case OPENPARENTHESES:
                              {
                                // :globa<l>(
                                if (pseudo + 7 === caret && tail === 108) {
                                  pseudo = 0;
                                }

                                context = ++counter;
                                break;
                              }

                            case CLOSEPARENTHESES:
                              {
                                if ((context = --counter) === 0) {
                                  format = 1;
                                  char += '\0';
                                }

                                break;
                              }
                          }
                        }

                        break;
                      }

                    case TAB:
                    case SPACE:
                      {
                        switch (tail) {
                          case NULL:
                          case OPENBRACES:
                          case CLOSEBRACES:
                          case SEMICOLON:
                          case COMMA:
                          case FORMFEED:
                          case TAB:
                          case SPACE:
                          case NEWLINE:
                          case CARRIAGE:
                            {
                              break;
                            }

                          default:
                            {
                              // ignore in isolated contexts
                              if (context === 0) {
                                format = 1;
                                char += '\0';
                              }
                            }
                        }
                      }
                  }
                } // concat buffer of characters


                chars += char; // previous non-whitespace character code

                if (code !== SPACE && code !== TAB) {
                  peak = code;
                }
              }
            }
        } // tail character codes


        trail = tail;
        tail = code; // visit every character

        caret++;
      }

      length = out.length; // preserve empty selector

      if (preserve > 0) {
        if (length === 0 && children.length === 0 && current[0].length === 0 === false) {
          if (id !== MEDIA || current.length === 1 && (cascade > 0 ? nscopealt : nscope) === current[0]) {
            length = current.join(',').length + 2;
          }
        }
      }

      if (length > 0) {
        // cascade isolation mode?
        selector = cascade === 0 && id !== KEYFRAME ? isolate(current) : current; // execute plugins, block context

        if (plugged > 0) {
          result = proxy(BLCKS, out, selector, parent, line, column, length, id, depth, id);

          if (result !== void 0 && (out = result).length === 0) {
            return flat + out + children;
          }
        }

        out = selector.join(',') + '{' + out + '}';

        if (prefix * pattern !== 0) {
          if (prefix === 2 && !vendor(out, 2)) pattern = 0;

          switch (pattern) {
            // ::read-only
            case READONLY:
              {
                out = out.replace(readonlyptn, ':' + moz + '$1') + out;
                break;
              }
            // ::placeholder

            case PLACEHOLDER:
              {
                out = out.replace(plcholdrptn, '::' + webkit + 'input-$1') + out.replace(plcholdrptn, '::' + moz + '$1') + out.replace(plcholdrptn, ':' + ms + 'input-$1') + out;
                break;
              }
          }

          pattern = 0;
        }
      }

      return flat + out + children;
    }
    /**
     * Select
     *
     * @param {Array<string>} parent
     * @param {string} current
     * @param {number} invert
     * @return {Array<string>}
     */


    function select(parent, current, invert) {
      var selectors = current.trim().split(selectorptn);
      var out = selectors;
      var length = selectors.length;
      var l = parent.length;

      switch (l) {
        // 0-1 parent selectors
        case 0:
        case 1:
          {
            for (var i = 0, selector = l === 0 ? '' : parent[0] + ' '; i < length; ++i) {
              out[i] = scope(selector, out[i], invert, l).trim();
            }

            break;
          }
        // >2 parent selectors, nested

        default:
          {
            for (var i = 0, j = 0, out = []; i < length; ++i) {
              for (var k = 0; k < l; ++k) {
                out[j++] = scope(parent[k] + ' ', selectors[i], invert, l).trim();
              }
            }
          }
      }

      return out;
    }
    /**
     * Scope
     *
     * @param {string} parent
     * @param {string} current
     * @param {number} invert
     * @param {number} level
     * @return {string}
     */


    function scope(parent, current, invert, level) {
      var selector = current;
      var code = selector.charCodeAt(0); // trim leading whitespace

      if (code < 33) {
        code = (selector = selector.trim()).charCodeAt(0);
      }

      switch (code) {
        // &
        case AND:
          {
            switch (cascade + level) {
              case 0:
              case 1:
                {
                  if (parent.trim().length === 0) {
                    break;
                  }
                }

              default:
                {
                  return selector.replace(andptn, '$1' + parent.trim());
                }
            }

            break;
          }
        // :

        case COLON:
          {
            switch (selector.charCodeAt(1)) {
              // g in :global
              case 103:
                {
                  if (escape > 0 && cascade > 0) {
                    return selector.replace(escapeptn, '$1').replace(andptn, '$1' + nscope);
                  }

                  break;
                }

              default:
                {
                  // :hover
                  return parent.trim() + selector.replace(andptn, '$1' + parent.trim());
                }
            }
          }

        default:
          {
            // html &
            if (invert * cascade > 0 && selector.indexOf('\f') > 0) {
              return selector.replace(andptn, (parent.charCodeAt(0) === COLON ? '' : '$1') + parent.trim());
            }
          }
      }

      return parent + selector;
    }
    /**
     * Property
     *
     * @param {string} input
     * @param {number} first
     * @param {number} second
     * @param {number} third
     * @return {string}
     */


    function property(input, first, second, third) {
      var index = 0;
      var out = input + ';';
      var hash = first * 2 + second * 3 + third * 4;
      var cache; // animation: a, n, i characters

      if (hash === 944) {
        return animation(out);
      } else if (prefix === 0 || prefix === 2 && !vendor(out, 1)) {
        return out;
      } // vendor prefix


      switch (hash) {
        // text-decoration/text-size-adjust/text-shadow/text-align/text-transform: t, e, x
        case 1015:
          {
            // text-shadow/text-align/text-transform, a
            return out.charCodeAt(10) === 97 ? webkit + out + out : out;
          }
        // filter/fill f, i, l

        case 951:
          {
            // filter, t
            return out.charCodeAt(3) === 116 ? webkit + out + out : out;
          }
        // color/column, c, o, l

        case 963:
          {
            // column, n
            return out.charCodeAt(5) === 110 ? webkit + out + out : out;
          }
        // box-decoration-break, b, o, x

        case 1009:
          {
            if (out.charCodeAt(4) !== 100) {
              break;
            }
          }
        // mask, m, a, s
        // clip-path, c, l, i

        case 969:
        case 942:
          {
            return webkit + out + out;
          }
        // appearance: a, p, p

        case 978:
          {
            return webkit + out + moz + out + out;
          }
        // hyphens: h, y, p
        // user-select: u, s, e

        case 1019:
        case 983:
          {
            return webkit + out + moz + out + ms + out + out;
          }
        // background/backface-visibility, b, a, c

        case 883:
          {
            // backface-visibility, -
            if (out.charCodeAt(8) === DASH) {
              return webkit + out + out;
            } // image-set(...)


            if (out.indexOf('image-set(', 11) > 0) {
              return out.replace(imgsrcptn, '$1' + webkit + '$2') + out;
            }

            return out;
          }
        // flex: f, l, e

        case 932:
          {
            if (out.charCodeAt(4) === DASH) {
              switch (out.charCodeAt(5)) {
                // flex-grow, g
                case 103:
                  {
                    return webkit + 'box-' + out.replace('-grow', '') + webkit + out + ms + out.replace('grow', 'positive') + out;
                  }
                // flex-shrink, s

                case 115:
                  {
                    return webkit + out + ms + out.replace('shrink', 'negative') + out;
                  }
                // flex-basis, b

                case 98:
                  {
                    return webkit + out + ms + out.replace('basis', 'preferred-size') + out;
                  }
              }
            }

            return webkit + out + ms + out + out;
          }
        // order: o, r, d

        case 964:
          {
            return webkit + out + ms + 'flex' + '-' + out + out;
          }
        // justify-items/justify-content, j, u, s

        case 1023:
          {
            // justify-content, c
            if (out.charCodeAt(8) !== 99) {
              break;
            }

            cache = out.substring(out.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
            return webkit + 'box-pack' + cache + webkit + out + ms + 'flex-pack' + cache + out;
          }
        // cursor, c, u, r

        case 1005:
          {
            return cursorptn.test(out) ? out.replace(colonptn, ':' + webkit) + out.replace(colonptn, ':' + moz) + out : out;
          }
        // writing-mode, w, r, i

        case 1000:
          {
            cache = out.substring(13).trim();
            index = cache.indexOf('-') + 1;

            switch (cache.charCodeAt(0) + cache.charCodeAt(index)) {
              // vertical-lr
              case 226:
                {
                  cache = out.replace(writingptn, 'tb');
                  break;
                }
              // vertical-rl

              case 232:
                {
                  cache = out.replace(writingptn, 'tb-rl');
                  break;
                }
              // horizontal-tb

              case 220:
                {
                  cache = out.replace(writingptn, 'lr');
                  break;
                }

              default:
                {
                  return out;
                }
            }

            return webkit + out + ms + cache + out;
          }
        // position: sticky

        case 1017:
          {
            if (out.indexOf('sticky', 9) === -1) {
              return out;
            }
          }
        // display(flex/inline-flex/inline-box): d, i, s

        case 975:
          {
            index = (out = input).length - 10;
            cache = (out.charCodeAt(index) === 33 ? out.substring(0, index) : out).substring(input.indexOf(':', 7) + 1).trim();

            switch (hash = cache.charCodeAt(0) + (cache.charCodeAt(7) | 0)) {
              // inline-
              case 203:
                {
                  // inline-box
                  if (cache.charCodeAt(8) < 111) {
                    break;
                  }
                }
              // inline-box/sticky

              case 115:
                {
                  out = out.replace(cache, webkit + cache) + ';' + out;
                  break;
                }
              // inline-flex
              // flex

              case 207:
              case 102:
                {
                  out = out.replace(cache, webkit + (hash > 102 ? 'inline-' : '') + 'box') + ';' + out.replace(cache, webkit + cache) + ';' + out.replace(cache, ms + cache + 'box') + ';' + out;
                }
            }

            return out + ';';
          }
        // align-items, align-center, align-self: a, l, i, -

        case 938:
          {
            if (out.charCodeAt(5) === DASH) {
              switch (out.charCodeAt(6)) {
                // align-items, i
                case 105:
                  {
                    cache = out.replace('-items', '');
                    return webkit + out + webkit + 'box-' + cache + ms + 'flex-' + cache + out;
                  }
                // align-self, s

                case 115:
                  {
                    return webkit + out + ms + 'flex-item-' + out.replace(selfptn, '') + out;
                  }
                // align-content

                default:
                  {
                    return webkit + out + ms + 'flex-line-pack' + out.replace('align-content', '').replace(selfptn, '') + out;
                  }
              }
            }

            break;
          }
        // min/max

        case 973:
        case 989:
          {
            // min-/max- height/width/block-size/inline-size
            if (out.charCodeAt(3) !== DASH || out.charCodeAt(4) === 122) {
              break;
            }
          }
        // height/width: min-content / width: max-content

        case 931:
        case 953:
          {
            if (dimensionptn.test(input) === true) {
              // stretch
              if ((cache = input.substring(input.indexOf(':') + 1)).charCodeAt(0) === 115) return property(input.replace('stretch', 'fill-available'), first, second, third).replace(':fill-available', ':stretch');else return out.replace(cache, webkit + cache) + out.replace(cache, moz + cache.replace('fill-', '')) + out;
            }

            break;
          }
        // transform, transition: t, r, a

        case 962:
          {
            out = webkit + out + (out.charCodeAt(5) === 102 ? ms + out : '') + out; // transitions

            if (second + third === 211 && out.charCodeAt(13) === 105 && out.indexOf('transform', 10) > 0) {
              return out.substring(0, out.indexOf(';', 27) + 1).replace(transformptn, '$1' + webkit + '$2') + out;
            }

            break;
          }
      }

      return out;
    }
    /**
     * Vendor
     *
     * @param {string} content
     * @param {number} context
     * @return {boolean}
     */


    function vendor(content, context) {
      var index = content.indexOf(context === 1 ? ':' : '{');
      var key = content.substring(0, context !== 3 ? index : 10);
      var value = content.substring(index + 1, content.length - 1);
      return should(context !== 2 ? key : key.replace(pseudofmt, '$1'), value, context);
    }
    /**
     * Supports
     *
     * @param {string} match
     * @param {string} group
     * @return {string}
     */


    function supports(match, group) {
      var out = property(group, group.charCodeAt(0), group.charCodeAt(1), group.charCodeAt(2));
      return out !== group + ';' ? out.replace(propertyptn, ' or ($1)').substring(4) : '(' + group + ')';
    }
    /**
     * Animation
     *
     * @param {string} input
     * @return {string}
     */


    function animation(input) {
      var length = input.length;
      var index = input.indexOf(':', 9) + 1;
      var declare = input.substring(0, index).trim();
      var out = input.substring(index, length - 1).trim();

      switch (input.charCodeAt(9) * keyed) {
        case 0:
          {
            break;
          }
        // animation-*, -

        case DASH:
          {
            // animation-name, n
            if (input.charCodeAt(10) !== 110) {
              break;
            }
          }
        // animation/animation-name

        default:
          {
            // split in case of multiple animations
            var list = out.split((out = '', animationptn));

            for (var i = 0, index = 0, length = list.length; i < length; index = 0, ++i) {
              var value = list[i];
              var items = value.split(propertiesptn);

              while (value = items[index]) {
                var peak = value.charCodeAt(0);

                if (keyed === 1 && ( // letters
                peak > AT && peak < 90 || peak > 96 && peak < 123 || peak === UNDERSCORE || // dash but not in sequence i.e --
                peak === DASH && value.charCodeAt(1) !== DASH)) {
                  // not a number/function
                  switch (isNaN(parseFloat(value)) + (value.indexOf('(') !== -1)) {
                    case 1:
                      {
                        switch (value) {
                          // not a valid reserved keyword
                          case 'infinite':
                          case 'alternate':
                          case 'backwards':
                          case 'running':
                          case 'normal':
                          case 'forwards':
                          case 'both':
                          case 'none':
                          case 'linear':
                          case 'ease':
                          case 'ease-in':
                          case 'ease-out':
                          case 'ease-in-out':
                          case 'paused':
                          case 'reverse':
                          case 'alternate-reverse':
                          case 'inherit':
                          case 'initial':
                          case 'unset':
                          case 'step-start':
                          case 'step-end':
                            {
                              break;
                            }

                          default:
                            {
                              value += key;
                            }
                        }
                      }
                  }
                }

                items[index++] = value;
              }

              out += (i === 0 ? '' : ',') + items.join(' ');
            }
          }
      }

      out = declare + out + ';';
      if (prefix === 1 || prefix === 2 && vendor(out, 1)) return webkit + out + out;
      return out;
    }
    /**
     * Isolate
     *
     * @param {Array<string>} current
     */


    function isolate(current) {
      for (var i = 0, length = current.length, selector = Array(length), padding, element; i < length; ++i) {
        // split individual elements in a selector i.e h1 h2 === [h1, h2]
        var elements = current[i].split(elementptn);
        var out = '';

        for (var j = 0, size = 0, tail = 0, code = 0, l = elements.length; j < l; ++j) {
          // empty element
          if ((size = (element = elements[j]).length) === 0 && l > 1) {
            continue;
          }

          tail = out.charCodeAt(out.length - 1);
          code = element.charCodeAt(0);
          padding = '';

          if (j !== 0) {
            // determine if we need padding
            switch (tail) {
              case STAR:
              case TILDE:
              case GREATERTHAN:
              case PLUS:
              case SPACE:
              case OPENPARENTHESES:
                {
                  break;
                }

              default:
                {
                  padding = ' ';
                }
            }
          }

          switch (code) {
            case AND:
              {
                element = padding + nscopealt;
              }

            case TILDE:
            case GREATERTHAN:
            case PLUS:
            case SPACE:
            case CLOSEPARENTHESES:
            case OPENPARENTHESES:
              {
                break;
              }

            case OPENBRACKET:
              {
                element = padding + element + nscopealt;
                break;
              }

            case COLON:
              {
                switch (element.charCodeAt(1) * 2 + element.charCodeAt(2) * 3) {
                  // :global
                  case 530:
                    {
                      if (escape > 0) {
                        element = padding + element.substring(8, size - 1);
                        break;
                      }
                    }
                  // :hover, :nth-child(), ...

                  default:
                    {
                      if (j < 1 || elements[j - 1].length < 1) {
                        element = padding + nscopealt + element;
                      }
                    }
                }

                break;
              }

            case COMMA:
              {
                padding = '';
              }

            default:
              {
                if (size > 1 && element.indexOf(':') > 0) {
                  element = padding + element.replace(pseudoptn, '$1' + nscopealt + '$2');
                } else {
                  element = padding + element + nscopealt;
                }
              }
          }

          out += element;
        }

        selector[i] = out.replace(formatptn, '').trim();
      }

      return selector;
    }
    /**
     * Proxy
     *
     * @param {number} context
     * @param {string} content
     * @param {Array<string>} selectors
     * @param {Array<string>} parents
     * @param {number} line
     * @param {number} column
     * @param {number} length
     * @param {number} id
     * @param {number} depth
     * @param {number} at
     * @return {(string|void|*)}
     */


    function proxy(context, content, selectors, parents, line, column, length, id, depth, at) {
      for (var i = 0, out = content, next; i < plugged; ++i) {
        switch (next = plugins[i].call(stylis, context, out, selectors, parents, line, column, length, id, depth, at)) {
          case void 0:
          case false:
          case true:
          case null:
            {
              break;
            }

          default:
            {
              out = next;
            }
        }
      }

      if (out !== content) {
        return out;
      }
    }
    /**
     * @param {number} code
     * @param {number} index
     * @param {number} length
     * @param {string} body
     * @return {number}
     */


    function delimited(code, index, length, body) {
      for (var i = index + 1; i < length; ++i) {
        switch (body.charCodeAt(i)) {
          // /*
          case FOWARDSLASH:
            {
              if (code === STAR) {
                if (body.charCodeAt(i - 1) === STAR && index + 2 !== i) {
                  return i + 1;
                }
              }

              break;
            }
          // //

          case NEWLINE:
            {
              if (code === FOWARDSLASH) {
                return i + 1;
              }
            }
        }
      }

      return i;
    }
    /**
     * Minify
     *
     * @param {(string|*)} output
     * @return {string}
     */


    function minify(output) {
      return output.replace(formatptn, '').replace(beforeptn, '').replace(afterptn, '$1').replace(tailptn, '$1').replace(whiteptn, ' ');
    }
    /**
     * Use
     *
     * @param {(Array<function(...?)>|function(...?)|number|void)?} plugin
     */


    function use(plugin) {
      switch (plugin) {
        case void 0:
        case null:
          {
            plugged = plugins.length = 0;
            break;
          }

        default:
          {
            if (typeof plugin === 'function') {
              plugins[plugged++] = plugin;
            } else if (typeof plugin === 'object') {
              for (var i = 0, length = plugin.length; i < length; ++i) {
                use(plugin[i]);
              }
            } else {
              unkwn = !!plugin | 0;
            }
          }
      }

      return use;
    }
    /**
     * Set
     *
     * @param {*} options
     */


    function set(options) {
      for (var name in options) {
        var value = options[name];

        switch (name) {
          case 'keyframe':
            keyed = value | 0;
            break;

          case 'global':
            escape = value | 0;
            break;

          case 'cascade':
            cascade = value | 0;
            break;

          case 'compress':
            compress = value | 0;
            break;

          case 'semicolon':
            semicolon = value | 0;
            break;

          case 'preserve':
            preserve = value | 0;
            break;

          case 'prefix':
            should = null;

            if (!value) {
              prefix = 0;
            } else if (typeof value !== 'function') {
              prefix = 1;
            } else {
              prefix = 2;
              should = value;
            }

        }
      }

      return set;
    }
    /**
     * Stylis
     *
     * @param {string} selector
     * @param {string} input
     * @return {*}
     */


    function stylis(selector, input) {
      if (this !== void 0 && this.constructor === stylis) {
        return factory(selector);
      } // setup


      var ns = selector;
      var code = ns.charCodeAt(0); // trim leading whitespace

      if (code < 33) {
        code = (ns = ns.trim()).charCodeAt(0);
      } // keyframe/animation namespace


      if (keyed > 0) {
        key = ns.replace(invalidptn, code === OPENBRACKET ? '' : '-');
      } // reset, used to assert if a plugin is moneky-patching the return value


      code = 1; // cascade/isolate

      if (cascade === 1) {
        nscope = ns;
      } else {
        nscopealt = ns;
      }

      var selectors = [nscope];
      var result; // execute plugins, pre-process context

      if (plugged > 0) {
        result = proxy(PREPS, input, selectors, selectors, line, column, 0, 0, 0, 0);

        if (result !== void 0 && typeof result === 'string') {
          input = result;
        }
      } // build


      var output = compile(array, selectors, input, 0, 0); // execute plugins, post-process context

      if (plugged > 0) {
        result = proxy(POSTS, output, selectors, selectors, line, column, output.length, 0, 0, 0); // bypass minification

        if (result !== void 0 && typeof (output = result) !== 'string') {
          code = 0;
        }
      } // reset


      key = '';
      nscope = '';
      nscopealt = '';
      pattern = 0;
      line = 1;
      column = 1;
      return compress * code === 0 ? output : minify(output);
    }

    stylis['use'] = use;
    stylis['set'] = set;

    if (options !== void 0) {
      set(options);
    }

    return stylis;
  });
});

var ComponentStyle = function () {
  function ComponentStyle(rules, selector) {
    _classCallCheck(this, ComponentStyle);

    this.rules = rules;
    this.selector = selector;
  }

  _createClass(ComponentStyle, [{
    key: "generateAndInject",
    value: function generateAndInject() {
      if (!styleSheet.injected) styleSheet.inject();
      var flatCSS = flatten(this.rules).join('');
      var cssString = this.selector ? "".concat(this.selector, " { ").concat(flatCSS, " }") : flatCSS;
      var css = stylis('', cssString, false, false);
      styleSheet.insert(css, {
        global: true
      });
    }
  }]);

  return ComponentStyle;
}();

var injectGlobal = function injectGlobal(strings) {
  for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var globalStyle = new ComponentStyle(css.apply(void 0, [strings].concat(interpolations)));
  globalStyle.generateAndInject();
};

var ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: Object
  },
  provide: function provide() {
    var _this = this;

    return {
      $theme: function $theme() {
        return _this.theme;
      }
    };
  },
  render: function render(createElement) {
    return createElement('div', {}, this.$slots["default"]);
  }
};

/**
 * lodash 4.1.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}
/**
 * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
 *
 * @private
 * @param {Array} props The property identifiers.
 * @param {Array} values The property values.
 * @param {Function} assignFunc The function to assign values.
 * @returns {Object} Returns the new object.
 */


function baseZipObject(props, values, assignFunc) {
  var index = -1,
      length = props.length,
      valsLength = values.length,
      result = {};

  while (++index < length) {
    var value = index < valsLength ? values[index] : undefined;
    assignFunc(result, props[index], value);
  }

  return result;
}
/**
 * This method is like `_.fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @since 0.4.0
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject(['a', 'b'], [1, 2]);
 * // => { 'a': 1, 'b': 2 }
 */


function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue);
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */


function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var lodash_zipobject = zipObject;

function normalizeProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (Array.isArray(props)) {
    return lodash_zipobject(props);
  } else {
    return props;
  }
}

function isVueComponent(target) {
  return target && (typeof target.render === 'function' || typeof target.template === 'string');
}

var _styledComponent = (function (ComponentStyle) {
  var createStyledComponent = function createStyledComponent(target, rules, props, options) {
    var _options$attrs = options.attrs,
        _attrs = _options$attrs === void 0 ? [] : _options$attrs;

    var componentStyle = new ComponentStyle(rules);
    var currentProps = normalizeProps(props);
    var prevProps = normalizeProps(target.props);
    var StyledComponent = {
      inject: {
        $theme: {
          "default": function _default() {
            return function () {
              return {};
            };
          }
        }
      },
      props: _objectSpread2({
        as: [String, Object],
        value: null
      }, currentProps, {}, prevProps),
      data: function data() {
        return {
          localValue: this.value
        };
      },
      render: function render(createElement) {
        var _this = this;

        var children = [];

        for (var slot in this.$slots) {
          if (slot === 'default') {
            children.push(this.$slots[slot]);
          } else {
            children.push(createElement('template', {
              slot: slot
            }, this.$slots[slot]));
          }
        }

        return createElement(isVueComponent(target) ? target : this.$props.as || target, {
          "class": [this.generatedClassName],
          props: this.$props,
          domProps: _objectSpread2({}, this.attrs, {
            value: this.localValue
          }),
          on: _objectSpread2({}, this.$listeners, {
            input: function input(event) {
              if (event && event.target) {
                _this.localValue = event.target.value;
              }
            }
          }),
          scopedSlots: this.$scopedSlots
        }, children);
      },
      methods: {
        generateAndInjectStyles: function generateAndInjectStyles(componentProps) {
          return componentStyle.generateAndInjectStyles(componentProps);
        }
      },
      computed: {
        generatedClassName: function generatedClassName() {
          var context = this.context,
              attrs = this.attrs;

          var componentProps = _objectSpread2({}, context, {}, attrs);

          return this.generateAndInjectStyles(componentProps);
        },
        theme: function theme() {
          return this.$theme();
        },
        context: function context() {
          return _objectSpread2({
            theme: this.theme
          }, this.$props);
        },
        attrs: function attrs() {
          var resolvedAttrs = {};
          var context = this.context;

          _attrs.forEach(function (attrDef) {
            var resolvedAttrDef = attrDef;

            if (typeof resolvedAttrDef === 'function') {
              resolvedAttrDef = resolvedAttrDef(context);
            }

            for (var key in resolvedAttrDef) {
              context[key] = resolvedAttrs[key] = resolvedAttrDef[key];
            }
          });

          return resolvedAttrs;
        }
      },
      watch: {
        value: function value(newValue) {
          this.localValue = newValue;
        },
        localValue: function localValue() {
          this.$emit('input', this.localValue);
        }
      },
      extend: function extend(cssRules) {
        for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          interpolations[_key - 1] = arguments[_key];
        }

        var extendedRules = css.apply(void 0, [cssRules].concat(interpolations));
        return createStyledComponent(target, rules.concat(extendedRules), props, options);
      },
      withComponent: function withComponent(newTarget) {
        return createStyledComponent(newTarget, rules, props, options);
      }
    };
    return StyledComponent;
  };

  return createStyledComponent;
});

var _componentStyle = (function (nameGenerator) {
  var inserted = {};

  var ComponentStyle = function () {
    function ComponentStyle(rules) {
      _classCallCheck(this, ComponentStyle);

      this.rules = rules;
      stylis.set({
        keyframe: false
      });
      if (!styleSheet.injected) styleSheet.inject();
      this.insertedRule = styleSheet.insert('');
    }

    _createClass(ComponentStyle, [{
      key: "generateAndInjectStyles",
      value: function generateAndInjectStyles(executionContext) {
        var flatCSS = flatten(this.rules, executionContext).join('').replace(/^\s*\/\/.*$/gm, '');
        var hash = hashStr(flatCSS);

        if (!inserted[hash]) {
          var selector = nameGenerator(hash);
          inserted[hash] = selector;
          var css = stylis(".".concat(selector), flatCSS);
          this.insertedRule.appendRule(css);
        }

        return inserted[hash];
      }
    }]);

    return ComponentStyle;
  }();

  return ComponentStyle;
});

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', 'circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

function isTag(target) {
  if (typeof target === 'string') {
    return domElements.indexOf(target) !== -1;
  }
}

function isStyledComponent(target) {
  return target && target.methods && typeof target.methods.generateAndInjectStyles === 'function';
}

function isValidElementType(target) {
  return isStyledComponent(target) || isVueComponent(target) || isTag(target);
}

var _styled = (function (createStyledComponent) {
  var styled = function styled(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!isValidElementType(tagName)) {
      throw new Error(tagName + ' is not allowed for styled tag type.');
    }

    var templateFunction = function templateFunction(cssRules) {
      for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      return createStyledComponent(tagName, css.apply(void 0, [cssRules].concat(interpolations)), props, options);
    };

    templateFunction.attrs = function (attrs) {
      return styled(tagName, props, _objectSpread2({}, options, {
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
      }));
    };

    return templateFunction;
  };

  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });
  return styled;
});

var styled = _styled(_styledComponent(_componentStyle(generateAlphabeticName)));

/* harmony default export */ __webpack_exports__["a"] = (styled);



/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "b50d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var settle = __webpack_require__("467f");
var cookies = __webpack_require__("7aac");
var buildURL = __webpack_require__("30b5");
var buildFullPath = __webpack_require__("83b9");
var parseHeaders = __webpack_require__("c345");
var isURLSameOrigin = __webpack_require__("3934");
var createError = __webpack_require__("2d83");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cca6");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_LazyYoutube_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("55b3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _components_LazyYoutube_vue__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _components_LazyVimeo_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("21c1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _components_LazyVimeo_vue__WEBPACK_IMPORTED_MODULE_2__["a"]; });




 // Declare install function executed by plugin

function registerComponents(Vue) {
  Vue.component("LazyYoutube", _components_LazyYoutube_vue__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
  Vue.component("LazyVimeo", _components_LazyVimeo_vue__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
} // Create module definition for Vue.use()


var plugin = {
  install: function install(Vue) {
    var finalOptions = Object.assign({}, {
      installComponents: true
    });

    if (finalOptions.installComponents) {
      registerComponents(Vue);
    } // Vue.component(component.name, component);

  }
}; // To allow use as module (npm/webpack/etc.) export component

/* harmony default export */ __webpack_exports__["c"] = (plugin); // Auto-install when vue is found (eg. in browser via <script> tag)

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "bb2f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "bc3a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cee4");

/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c345":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "c401":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("1d2b");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cee4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");
var bind = __webpack_require__("1d2b");
var Axios = __webpack_require__("0a06");
var mergeConfig = __webpack_require__("4a7b");
var defaults = __webpack_require__("2444");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__("7a77");
axios.CancelToken = __webpack_require__("8df4");
axios.isCancel = __webpack_require__("2e67");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__("0df6");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__("5f02");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dca8":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var FREEZING = __webpack_require__("bb2f");
var fails = __webpack_require__("d039");
var isObject = __webpack_require__("861d");
var onFreeze = __webpack_require__("f183").onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e683":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "f183":
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__("d012");
var isObject = __webpack_require__("861d");
var has = __webpack_require__("5135");
var defineProperty = __webpack_require__("9bf2").f;
var uid = __webpack_require__("90e3");
var FREEZING = __webpack_require__("bb2f");

var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "f6b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__("c532");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "LazyYoutube", function() { return /* reexport */ src_0["b" /* LazyYoutube */]; });
__webpack_require__.d(__webpack_exports__, "LazyVimeo", function() { return /* reexport */ src_0["a" /* LazyVimeo */]; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/index.js
var src_0 = __webpack_require__("b635");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0["c" /* default */]);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ });
});
//# sourceMappingURL=vue-lazytube.umd.js.map