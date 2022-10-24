/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SeededRandom.js":
/*!*****************************!*\
  !*** ./src/SeededRandom.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SeededRandom)\n/* harmony export */ });\nclass SeededRandom {\r\n\r\n    constructor(seed){\r\n        this.seed = seed+\"\"\r\n        this.pnrg = SeededRandom.cyrb128(this.seed)\r\n        this.generate = SeededRandom.sfc32(this.pnrg[0], this.pnrg[1], this.pnrg[2], this.pnrg[3])\r\n    }\r\n\r\n    random(){\r\n        return this.generate()\r\n    }\r\n\r\n    static cyrb128(str) {\r\n        let h1 = 1779033703, h2 = 3144134277,\r\n            h3 = 1013904242, h4 = 2773480762;\r\n        for (let i = 0, k; i < str.length; i++) {\r\n            k = str.charCodeAt(i);\r\n            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);\r\n            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);\r\n            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);\r\n            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);\r\n        }\r\n        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);\r\n        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);\r\n        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);\r\n        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);\r\n        return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];\r\n    }\r\n\r\n    static sfc32(a, b, c, d) {\r\n        return function() {\r\n          a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; \r\n          var t = (a + b) | 0;\r\n          a = b ^ b >>> 9;\r\n          b = c + (c << 3) | 0;\r\n          c = (c << 21 | c >>> 11);\r\n          d = d + 1 | 0;\r\n          t = t + d | 0;\r\n          c = c + t | 0;\r\n          return (t >>> 0) / 4294967296;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://string-to-image/./src/SeededRandom.js?");

/***/ }),

/***/ "./src/StringToImage.js":
/*!******************************!*\
  !*** ./src/StringToImage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ StringToImage)\n/* harmony export */ });\n/* harmony import */ var _SeededRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SeededRandom */ \"./src/SeededRandom.js\");\n\r\n\r\nclass StringToImage {\r\n    constructor(input, opts={}) {\r\n        this.input = input+\"\"\r\n        this.opts = Object.assign({\r\n            width: 9,\r\n            height: 9,\r\n            color: \"limegreen\",\r\n            horizontalMirror: true,\r\n            verticalMirror: false,\r\n            population: 0.6,\r\n            rounded: true\r\n        }, opts)\r\n        this.build()\r\n        this.draw()\r\n    }\r\n\r\n    build(){\r\n        this.c = document.createElement('canvas')\r\n        this.c.width = this.opts.width\r\n        this.c.height = this.opts.height\r\n        this.ctx = this.c.getContext('2d')\r\n\r\n        this.generator = new _SeededRandom__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.input)\r\n    }\r\n    draw(){\r\n        this.ctx.clearRect(0, 0, this.c.width, this.c.height)\r\n\r\n        this.ctx.fillStyle = this.opts.color\r\n        for(let x = 0; x < this.c.width; x++){\r\n            for(let y = 0; y < this.c.height; y++){\r\n                let rand = this.generator.random()\r\n                if(this.opts.rounded && !this.inEllipse(x,y)) continue;\r\n                if(rand > 1 - this.opts.population) {\r\n                    this.ctx.fillRect(x,y,1,1)\r\n                }\r\n            }\r\n        }\r\n        if(this.opts.horizontalMirror){\r\n            this.ctx.clearRect(Math.ceil(this.c.width/2), 0, Math.floor(this.c.width/2), this.c.height)\r\n            this.ctx.save()\r\n            this.ctx.translate(this.c.width, 0)\r\n            this.ctx.scale(-1, 1)\r\n            this.ctx.drawImage(\r\n                this.c,\r\n                0, 0, Math.floor(this.c.width/2), this.c.height,\r\n                0, 0, Math.floor(this.c.width/2), this.c.height\r\n            )\r\n            this.ctx.restore()\r\n        }\r\n        if(this.opts.verticalMirror){\r\n            this.ctx.clearRect(0, Math.ceil(this.c.height/2), this.c.width, Math.floor(this.c.height/2))\r\n            this.ctx.save()\r\n            this.ctx.translate(0, this.c.height)\r\n            this.ctx.scale(1, -1)\r\n            this.ctx.drawImage(\r\n                this.c,\r\n                0, 0, this.c.width, this.c.height,\r\n                0, 0, this.c.width, this.c.height\r\n            )\r\n            this.ctx.restore()\r\n        }\r\n    }\r\n\r\n    getUrl(){\r\n        return this.c.toDataURL()\r\n    }\r\n\r\n    inEllipse(x,y){\r\n        return Math.pow((x - this.c.width/2), 2) / Math.pow(this.c.width/2, 2)\r\n        + Math.pow((y - this.c.height/2), 2) / Math.pow(this.c.height/2, 2) <= 1\r\n    }\r\n\r\n    static generateImageUrl(input, opts){\r\n        return (new this(input, opts)).getUrl()\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://string-to-image/./src/StringToImage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _StringToImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringToImage */ \"./src/StringToImage.js\");\n\r\n\r\nlet index = 0\r\nlet height = 0\r\nconst createImage = ()=>{\r\n    \r\n    let img = document.createElement('img')\r\n    let size = 9\r\n    img.src = _StringToImage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].generateImageUrl(index, {\r\n        width: size,\r\n        height: size,\r\n        rounded: true,\r\n        color: `hsl(${Math.random()*360}deg, 70%, 70%)`\r\n    })\r\n    document.body.appendChild(img)\r\n    index++\r\n    let currentHeight = document.body.getBoundingClientRect().height\r\n    if(height != currentHeight){\r\n        height = currentHeight\r\n        window.scrollTo({\r\n            top: height,\r\n            behavior: \"smooth\"\r\n        })\r\n    }\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', ()=>{\r\n    const loop = ()=>{\r\n        createImage()\r\n        setTimeout(loop)\r\n    }\r\n    loop()\r\n\r\n})\n\n//# sourceURL=webpack://string-to-image/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;