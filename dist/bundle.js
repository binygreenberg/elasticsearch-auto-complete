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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by binyamin.greenberg on 8/23/17.
 */
var app = angular.module('app', ['ngMaterial', 'ngCookies']);
__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by binyamin.greenberg on 8/23/17.
 */
function appCtr($http) {
    var url = 'https://94fba154fa7d00f3cda66819e29b54aa.europe-west1.gcp.cloud.es.io:9243/word/';
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;
    self.time;
    // list of `state` value/display objects
    self.querySearch   = querySearch;
    self.addCount = addCount;
    // ******************************
    // Internal methods
    // ******************************

    /**
     * remote dataservice call.
     */
    function querySearch (query) {
        var postData = {"_source":false,"suggest":{"suggest":{"prefix":query,"completion":{"field":"word"}}}};
        return $http.post(url+'_search',postData)
            .then(function(res) {
                self.time = res.data.took;
                // Map the response object to the data object
                return res.data.suggest.suggest[0].options;
            });
    }

    function addCount(id){
        var postData = {"script" : "ctx._source.word.weight+=1"};
        $http.post(url + 'website/' + id + '/_update',postData);
    }

}

angular.module('app').controller('appCtr', ['$http',appCtr]);


/***/ })
/******/ ]);