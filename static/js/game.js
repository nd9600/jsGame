!function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="static/js/",r(r.s=0)}([function(t,n,r){"use strict";function e(t){return null!=t&&"object"==typeof t&&!0===t["@@functional/placeholder"]}function o(t){return function n(r){return 0===arguments.length||e(r)?n:t.apply(this,arguments)}}r.r(n);var u=o(function(t){return function(){return t}});function i(t){return function n(r,u){switch(arguments.length){case 0:return n;case 1:return e(r)?n:o(function(n){return t(r,n)});default:return e(r)&&e(u)?n:e(r)?o(function(n){return t(n,u)}):e(u)?o(function(n){return t(r,n)}):t(r,u)}}}function a(t,n){var r;t=t||[],n=n||[];var e=t.length,o=n.length,u=[];for(r=0;r<e;)u[u.length]=t[r],r+=1;for(r=0;r<o;)u[u.length]=n[r],r+=1;return u}function c(t,n){switch(t){case 0:return function(){return n.apply(this,arguments)};case 1:return function(t){return n.apply(this,arguments)};case 2:return function(t,r){return n.apply(this,arguments)};case 3:return function(t,r,e){return n.apply(this,arguments)};case 4:return function(t,r,e,o){return n.apply(this,arguments)};case 5:return function(t,r,e,o,u){return n.apply(this,arguments)};case 6:return function(t,r,e,o,u,i){return n.apply(this,arguments)};case 7:return function(t,r,e,o,u,i,a){return n.apply(this,arguments)};case 8:return function(t,r,e,o,u,i,a,c){return n.apply(this,arguments)};case 9:return function(t,r,e,o,u,i,a,c,f){return n.apply(this,arguments)};case 10:return function(t,r,e,o,u,i,a,c,f,s){return n.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function f(t,n,r){return function(){for(var o=[],u=0,i=t,a=0;a<n.length||u<arguments.length;){var s;a<n.length&&(!e(n[a])||u>=arguments.length)?s=n[a]:(s=arguments[u],u+=1),o[a]=s,e(s)||(i-=1),a+=1}return i<=0?r.apply(this,o):c(i,f(t,o,r))}}var s=i(function(t,n){return 1===t?o(n):c(t,f(t,[],n))});function l(t){return function n(r,u,a){switch(arguments.length){case 0:return n;case 1:return e(r)?n:i(function(n,e){return t(r,n,e)});case 2:return e(r)&&e(u)?n:e(r)?i(function(n,r){return t(n,u,r)}):e(u)?i(function(n,e){return t(r,n,e)}):o(function(n){return t(r,u,n)});default:return e(r)&&e(u)&&e(a)?n:e(r)&&e(u)?i(function(n,r){return t(n,r,a)}):e(r)&&e(a)?i(function(n,r){return t(n,u,r)}):e(u)&&e(a)?i(function(n,e){return t(r,n,e)}):e(r)?o(function(n){return t(n,u,a)}):e(u)?o(function(n){return t(r,n,a)}):e(a)?o(function(n){return t(r,u,n)}):t(r,u,a)}}}var p=l(function(t,n,r){if(n>=r.length||n<-r.length)return r;var e=(n<0?r.length:0)+n,o=a(r);return o[e]=t(r[e]),o}),y=Array.isArray||function(t){return null!=t&&t.length>=0&&"[object Array]"===Object.prototype.toString.call(t)};function h(t){return"function"==typeof t["@@transducer/step"]}function d(t,n,r){return function(){if(0===arguments.length)return r();var e=Array.prototype.slice.call(arguments,0),o=e.pop();if(!y(o)){for(var u=0;u<t.length;){if("function"==typeof o[t[u]])return o[t[u]].apply(o,e);u+=1}if(h(o))return n.apply(null,e)(o)}return r.apply(this,arguments)}}function b(t){return t&&t["@@transducer/reduced"]?t:{"@@transducer/value":t,"@@transducer/reduced":!0}}var g={init:function(){return this.xf["@@transducer/init"]()},result:function(t){return this.xf["@@transducer/result"](t)}};function v(t,n){for(var r=0,e=n.length,o=Array(e);r<e;)o[r]=t(n[r]),r+=1;return o}function w(t){return"[object String]"===Object.prototype.toString.call(t)}var m=o(function(t){return!!y(t)||!!t&&("object"==typeof t&&(!w(t)&&(1===t.nodeType?!!t.length:0===t.length||t.length>0&&(t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1)))))}),O=function(){function t(t){this.f=t}return t.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},t.prototype["@@transducer/result"]=function(t){return t},t.prototype["@@transducer/step"]=function(t,n){return this.f(t,n)},t}();function j(t){return new O(t)}var P=i(function(t,n){return c(t.length,function(){return t.apply(n,arguments)})});function E(t,n,r){for(var e=r.next();!e.done;){if((n=t["@@transducer/step"](n,e.value))&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e=r.next()}return t["@@transducer/result"](n)}function S(t,n,r,e){return t["@@transducer/result"](r[e](P(t["@@transducer/step"],t),n))}var x="undefined"!=typeof Symbol?Symbol.iterator:"@@iterator";function _(t,n,r){if("function"==typeof t&&(t=j(t)),m(r))return function(t,n,r){for(var e=0,o=r.length;e<o;){if((n=t["@@transducer/step"](n,r[e]))&&n["@@transducer/reduced"]){n=n["@@transducer/value"];break}e+=1}return t["@@transducer/result"](n)}(t,n,r);if("function"==typeof r["fantasy-land/reduce"])return S(t,n,r,"fantasy-land/reduce");if(null!=r[x])return E(t,n,r[x]());if("function"==typeof r.next)return E(t,n,r);if("function"==typeof r.reduce)return S(t,n,r,"reduce");throw new TypeError("reduce: list must be array or iterable")}var A=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=g.init,t.prototype["@@transducer/result"]=g.result,t.prototype["@@transducer/step"]=function(t,n){return this.xf["@@transducer/step"](t,this.f(n))},t}(),C=i(function(t,n){return new A(t,n)});function k(t,n){return Object.prototype.hasOwnProperty.call(n,t)}var T=Object.prototype.toString,D=function(){return"[object Arguments]"===T.call(arguments)?function(t){return"[object Arguments]"===T.call(t)}:function(t){return k("callee",t)}},M=!{toString:null}.propertyIsEnumerable("toString"),U=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],I=function(){return arguments.propertyIsEnumerable("length")}(),R=function(t,n){for(var r=0;r<t.length;){if(t[r]===n)return!0;r+=1}return!1},B=o("function"!=typeof Object.keys||I?function(t){if(Object(t)!==t)return[];var n,r,e=[],o=I&&D(t);for(n in t)!k(n,t)||o&&"length"===n||(e[e.length]=n);if(M)for(r=U.length-1;r>=0;)k(n=U[r],t)&&!R(e,n)&&(e[e.length]=n),r-=1;return e}:function(t){return Object(t)!==t?[]:Object.keys(t)}),q=i(d(["fantasy-land/map","map"],C,function(t,n){switch(Object.prototype.toString.call(n)){case"[object Function]":return s(n.length,function(){return t.call(this,n.apply(this,arguments))});case"[object Object]":return _(function(r,e){return r[e]=t(n[e]),r},{},B(n));default:return v(t,n)}}));var N=l(function(t,n,r){var e={};for(var o in r)e[o]=r[o];return e[t]=n,e});Number.isInteger;function F(t){return"[object Function]"===Object.prototype.toString.call(t)}var L=o(function(t){return s(t.length,t)});var z=o(function(t){return null===t?"Null":void 0===t?"Undefined":Object.prototype.toString.call(t).slice(8,-1)});function H(t){for(var n,r=[];!(n=t.next()).done;)r.push(n.value);return r}function G(t,n,r){for(var e=0,o=r.length;e<o;){if(t(n,r[e]))return!0;e+=1}return!1}var W=i(function(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n});function X(t,n,r,e){var o=H(t);function u(t,n){return Y(t,n,r.slice(),e.slice())}return!G(function(t,n){return!G(u,n,t)},H(n),o)}function Y(t,n,r,e){if(W(t,n))return!0;var o=z(t);if(o!==z(n))return!1;if(null==t||null==n)return!1;if("function"==typeof t["fantasy-land/equals"]||"function"==typeof n["fantasy-land/equals"])return"function"==typeof t["fantasy-land/equals"]&&t["fantasy-land/equals"](n)&&"function"==typeof n["fantasy-land/equals"]&&n["fantasy-land/equals"](t);if("function"==typeof t.equals||"function"==typeof n.equals)return"function"==typeof t.equals&&t.equals(n)&&"function"==typeof n.equals&&n.equals(t);switch(o){case"Arguments":case"Array":case"Object":if("function"==typeof t.constructor&&"Promise"===function(t){var n=String(t).match(/^function (\w*)/);return null==n?"":n[1]}(t.constructor))return t===n;break;case"Boolean":case"Number":case"String":if(typeof t!=typeof n||!W(t.valueOf(),n.valueOf()))return!1;break;case"Date":if(!W(t.valueOf(),n.valueOf()))return!1;break;case"Error":return t.name===n.name&&t.message===n.message;case"RegExp":if(t.source!==n.source||t.global!==n.global||t.ignoreCase!==n.ignoreCase||t.multiline!==n.multiline||t.sticky!==n.sticky||t.unicode!==n.unicode)return!1}for(var u=r.length-1;u>=0;){if(r[u]===t)return e[u]===n;u-=1}switch(o){case"Map":return t.size===n.size&&X(t.entries(),n.entries(),r.concat([t]),e.concat([n]));case"Set":return t.size===n.size&&X(t.values(),n.values(),r.concat([t]),e.concat([n]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var i=B(t);if(i.length!==B(n).length)return!1;var a=r.concat([t]),c=e.concat([n]);for(u=i.length-1;u>=0;){var f=i[u];if(!k(f,n)||!Y(n[f],t[f],a,c))return!1;u-=1}return!0}var Z=i(function(t,n){return Y(t,n,[],[])});function $(t,n,r){var e,o;if("function"==typeof t.indexOf)switch(typeof n){case"number":if(0===n){for(e=1/n;r<t.length;){if(0===(o=t[r])&&1/o===e)return r;r+=1}return-1}if(n!=n){for(;r<t.length;){if("number"==typeof(o=t[r])&&o!=o)return r;r+=1}return-1}return t.indexOf(n,r);case"string":case"boolean":case"function":case"undefined":return t.indexOf(n,r);case"object":if(null===n)return t.indexOf(n,r)}for(;r<t.length;){if(Z(t[r],n))return r;r+=1}return-1}function J(t,n){return $(n,t,0)>=0}function K(t){return'"'+t.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0").replace(/"/g,'\\"')+'"'}var Q=function(t){return(t<10?"0":"")+t},V="function"==typeof Date.prototype.toISOString?function(t){return t.toISOString()}:function(t){return t.getUTCFullYear()+"-"+Q(t.getUTCMonth()+1)+"-"+Q(t.getUTCDate())+"T"+Q(t.getUTCHours())+":"+Q(t.getUTCMinutes())+":"+Q(t.getUTCSeconds())+"."+(t.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"};function tt(t){return function(){return!t.apply(this,arguments)}}function nt(t,n){for(var r=0,e=n.length,o=[];r<e;)t(n[r])&&(o[o.length]=n[r]),r+=1;return o}function rt(t){return"[object Object]"===Object.prototype.toString.call(t)}var et=function(){function t(t,n){this.xf=n,this.f=t}return t.prototype["@@transducer/init"]=g.init,t.prototype["@@transducer/result"]=g.result,t.prototype["@@transducer/step"]=function(t,n){return this.f(n)?this.xf["@@transducer/step"](t,n):t},t}(),ot=i(d(["filter"],i(function(t,n){return new et(t,n)}),function(t,n){return rt(n)?_(function(r,e){return t(n[e])&&(r[e]=n[e]),r},{},B(n)):nt(t,n)})),ut=i(function(t,n){return ot(tt(t),n)});var it=o(function(t){return function t(n,r){var e=function(e){var o=r.concat([n]);return J(e,o)?"<Circular>":t(e,o)},o=function(t,n){return v(function(n){return K(n)+": "+e(t[n])},n.slice().sort())};switch(Object.prototype.toString.call(n)){case"[object Arguments]":return"(function() { return arguments; }("+v(e,n).join(", ")+"))";case"[object Array]":return"["+v(e,n).concat(o(n,ut(function(t){return/^\d+$/.test(t)},B(n)))).join(", ")+"]";case"[object Boolean]":return"object"==typeof n?"new Boolean("+e(n.valueOf())+")":n.toString();case"[object Date]":return"new Date("+(isNaN(n.valueOf())?e(NaN):K(V(n)))+")";case"[object Null]":return"null";case"[object Number]":return"object"==typeof n?"new Number("+e(n.valueOf())+")":1/n==-1/0?"-0":n.toString(10);case"[object String]":return"object"==typeof n?"new String("+e(n.valueOf())+")":K(n);case"[object Undefined]":return"undefined";default:if("function"==typeof n.toString){var u=n.toString();if("[object Object]"!==u)return u}return"{"+o(n,B(n)).join(", ")+"}"}}(t,[])}),at=l(function(t,n,r){return p(u(n),t,r)});var ct=i(function(t,n){var r=t<0?n.length+t:t;return w(n)?n.charAt(r):n[r]}),ft=function(){function t(t,n){this.xf=n,this.f=t,this.idx=-1,this.found=!1}return t.prototype["@@transducer/init"]=g.init,t.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,-1)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,n){return this.idx+=1,this.f(n)&&(this.found=!0,t=b(this.xf["@@transducer/step"](t,this.idx))),t},t}(),st=i(d([],i(function(t,n){return new ft(t,n)}),function(t,n){for(var r=0,e=n.length;r<e;){if(t(n[r]))return r;r+=1}return-1}));function lt(t){return t}var pt="function"==typeof Object.assign?Object.assign:function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),r=1,e=arguments.length;r<e;){var o=arguments[r];if(null!=o)for(var u in o)k(u,o)&&(n[u]=o[u]);r+=1}return n},yt=i(function(t,n){var r={};return r[t]=n,r});Array,String,Object;var ht=i(function(t,n){return s(t+1,function(){var r=arguments[t];if(null!=r&&F(r[n]))return r[n].apply(r,Array.prototype.slice.call(arguments,0,t));throw new TypeError(it(r)+' does not have a method named "'+n+'"')})}),dt=ht(1,"join");var bt=i(function(t,n){return pt({},t,n)});var gt,vt,wt="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";String.prototype.trim;!function(t){t.Character="c",t.Wall="x",t.Empty=" ",t.End="end"}(gt||(gt={})),function(t){t[t.Up=0]="Up",t[t.Down=1]="Down",t[t.Left=2]="Left",t[t.Right=3]="Right"}(vt||(vt={}));var mt={range:function(t,n){var r=Math.min(t,n),e=Math.max(t,n),o=Array.from({length:e-r},function(t,n){return n+r});return n<t?o.reverse():o},makeError:function(t,n){return{name:t,message:n}},errorHandler:function(t){return console.log(t)},assertUnreachable:function(t){throw new Error("Didn't expect to get here")},abyss:function(){}},Ot=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();var jt=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.type="Event"}return Ot(t,[{key:"handle",value:function(t){return t}}]),t}();var Pt=function(t){function n(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var t=function(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments));return t.type="MovementEvent",t}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}(n,jt),n}(),Et=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();var St=function(t){function n(t){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var r=function(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return r.type="FailedMovementEvent",r.data=t,r}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}(n,Pt),Et(n,[{key:"handle",value:function(t){return mt.errorHandler(this.data),function t(n,r,e){null===n&&(n=Function.prototype);var o=Object.getOwnPropertyDescriptor(n,r);if(void 0===o){var u=Object.getPrototypeOf(n);return null===u?void 0:t(u,r,e)}if("value"in o)return o.value;var i=o.get;return void 0!==i?i.call(e):void 0}(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"handle",this).call(this,t)}}]),n}();var xt=function t(n){var r=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.setInitialPositions=function(t,n){return r.board.setPosition(t,gt.Character).setPosition(n,gt.End)},this.board=n},_t=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();var At=function(t){function n(t,r){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var e=function(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return e.type="SuccessfulMovementEvent",e.data={boardID:t,newCharacterPosition:r},e}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}(n,Pt),_t(n,[{key:"handle",value:function(t){var n=t.board.setPosition(t.board.characterPosition,gt.Empty).setPosition(this.data.newCharacterPosition,gt.Character).setCharacterPosition(this.data.newCharacterPosition);return new xt(n)}}]),n}();function Ct(t,n){var r=st(function(t){return Z(n.getPosition(t),gt.Wall)},t),e=void 0;return 0===r?new St(mt.makeError("MovementError","wall immediately beside")):(e=-1===r?t[t.length-1]:t[r-1],new At(n.id,e))}function kt(t,n){var r=t.board,e=r.characterPosition;switch(n){case vt.Up:if(0===e.y)return new St(mt.makeError("MovementError","at top of board"));var o=mt.range(e.y,0);return Ct(q(function(t){return N("y",t,e)},o),r);case vt.Down:if(e.y+1===r.numberOfRows)return new St(mt.makeError("MovementError","at bottom of board"));var u=mt.range(e.y+1,r.numberOfRows);return Ct(q(function(t){return N("y",t,e)},u),r);case vt.Left:if(0===e.x)return new St(mt.makeError("MovementError","at left of board"));var i=mt.range(e.x,0);return Ct(q(function(t){return N("x",t,e)},i),r);case vt.Right:if(e.x+1===r.numberOfColumns)return new St(mt.makeError("MovementError","at right of board"));var a=mt.range(e.x+1,r.numberOfColumns);return Ct(q(function(t){return N("x",t,e)},a),r)}return mt.assertUnreachable(n)}function Tt(t){if(Array.isArray(t)){for(var n=0,r=Array(t.length);n<t.length;n++)r[n]=t[n];return r}return Array.from(t)}var Dt=bt({makeInitialBoard:function(t,n,r){var e=q(u(gt.Empty),[].concat(Tt(Array(t[0])))),o=q(u(e),[].concat(Tt(Array(t[1])))),i=ct(n.y,o),a=at(n.x,gt.Character,i),c=at(n.y,a,o);return i=ct(r.y,c),a=at(r.x,gt.End,i),c=at(r.y,a,c)}},{move:function(t,n){return kt(t,n).handle(t)},getPositionToMoveInto:kt});var Mt=function t(n,r,e){var o=this;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.getBoard=function(){return o.boardData},this.boardAsString=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\n",n=q(dt(" "),o.boardData);return dt(t,n)},this.setCharacterPosition=function(n){return new t(o.boardData,n,o.endPoint)},this.uncurriedGetPosition=function(t){o.isPositionOnBoard(t);var n=ct(t.y,o.boardData);return ct(t.x,n)},this.uncurriedSetPosition=function(n,r){o.isPositionOnBoard(n);var e=ct(n.y,o.boardData),u=at(n.x,r,e),i=at(n.y,u,o.boardData);return new t(i,o.characterPosition,o.endPoint)},this.getPosition=L(this.uncurriedGetPosition),this.setPosition=L(this.uncurriedSetPosition),this.isPositionOnBoard=function(t){var n=0<=t.y&&t.y<=o.boardData.length,r=0<=t.x&&t.x<=ct(0,o.boardData).length;if(!n||!r)throw new Error("position "+t+" is off the board")},this.id=t.idCounter++,this.boardData=n,this.characterPosition=r,this.endPoint=e,this.numberOfRows=this.boardData.length,this.numberOfColumns=ct(0,this.boardData).length,this.boardSolved=Z(this.characterPosition,this.endPoint)},Ut=Mt;Mt.idCounter=0;var It=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();var Rt=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t)}return It(t,[{key:"getSize",value:function(){return[10,10]}},{key:"getStartPoint",value:function(){return{x:0,y:9}}},{key:"getEndPoint",value:function(){return{x:9,y:9}}},{key:"getEmptyGameState",value:function(){return new xt(new Ut([[gt.Character]],this.getStartPoint(),this.getEndPoint()))}}]),t}(),Bt=function(){function t(t,n){for(var r=0;r<n.length;r++){var e=n[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(n,r,e){return r&&t(n.prototype,r),e&&t(n,e),n}}();var qt=function(t){function n(t){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var r=function(t,n){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?t:n}(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return r.type="InputEvent",r.data=t,r}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(t,n):t.__proto__=n)}(n,jt),Bt(n,[{key:"handle",value:function(t){var n=this.data;return Dt.move(t,n)}}]),n}(),Nt="ArrowUp",Ft="ArrowDown",Lt="ArrowLeft",zt="ArrowRight",Ht=new Rt,Gt=[Ht.getSize(),Ht.getStartPoint(),Ht.getEndPoint()],Wt=Gt[0],Xt=Gt[1],Yt=Gt[2],Zt=new Ut(Dt.makeInitialBoard(Wt,Xt,Yt),Xt,Yt),$t=new xt(Zt),Jt=document.getElementById("board");Jt.innerHTML="<pre>"+$t.board.boardAsString()+"</pre>",window.addEventListener("keyup",function(t){var n=t.code,r={};r[Nt]=vt.Up,r[Ft]=vt.Down,r[Lt]=vt.Left,r[zt]=vt.Right;var e=new qt(r[n]);$t=e.handle($t),console.log(n),console.log($t.board.getBoard()),Jt.innerHTML="<pre>"+$t.board.boardAsString()+"</pre>"})}]);
//# sourceMappingURL=game.js.map