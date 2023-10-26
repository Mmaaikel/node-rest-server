import express from 'express';
import chalk from 'chalk';
import DateFormat from 'date-fns/format/index.js';
import requestIp from 'request-ip';
import cors from 'cors';
import FastValidator from 'fastest-validator';

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
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
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
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
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
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
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var dateTime = function dateTime() {
  return DateFormat(Date.now(), 'dd-MM-yyyy HH-mm-ss');
};
var appName = function appName() {
  return '[node-rest-server]';
};
var isDebug = false;
var isEnabled = true;
var getValue = function getValue(value, defaultValue) {
  return value === undefined ? defaultValue : value;
};
var getMessage = function getMessage(type, message) {
  return {
    appName: appName(),
    level: type.toUpperCase(),
    timestamp: dateTime(),
    message: message.join(' ')
  };
};
var print = function print(color, type) {
  if (isEnabled) {
    for (var _len = arguments.length, message = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      message[_key - 2] = arguments[_key];
    }
    var jsonMessage = getMessage(type, message);
    var formattedLog = chalk[color](jsonMessage.appName, '-', jsonMessage.timestamp, '-', jsonMessage.level, '\t-', jsonMessage.message);
    console[type](formattedLog);
  }
};
var logger = {
  log: function log() {
    for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      message[_key2] = arguments[_key2];
    }
    return print.apply(void 0, ['green', 'log'].concat(message));
  },
  info: function info() {
    for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      message[_key3] = arguments[_key3];
    }
    return print.apply(void 0, ['green', 'info'].concat(message));
  },
  warn: function warn() {
    for (var _len4 = arguments.length, message = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      message[_key4] = arguments[_key4];
    }
    return print.apply(void 0, ['yellow', 'warn'].concat(message));
  },
  debug: function debug() {
    if (isDebug) {
      for (var _len5 = arguments.length, message = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        message[_key5] = arguments[_key5];
      }
      print.apply(void 0, ['gray', 'debug'].concat(message));
    }
  },
  error: function error() {
    for (var _len6 = arguments.length, message = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      message[_key6] = arguments[_key6];
    }
    return print.apply(void 0, ['red', 'error'].concat(message));
  },
  trace: function trace() {
    for (var _len7 = arguments.length, message = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      message[_key7] = arguments[_key7];
    }
    return print.apply(void 0, ['red', 'trace'].concat(message));
  }
};
var initializeLogger = function initializeLogger(_ref) {
  var logger = _ref.logger;
  if (typeof logger === 'boolean') {
    isDebug = false;
    isEnabled = logger;
  } else if (_typeof(logger) === 'object') {
    isDebug = getValue(logger.debug, false);
    isEnabled = getValue(logger.enable, true);
  }
};

/* eslint-enable no-console */

var GLOBAL_API_ERROR = 500;

var extractIfAvailable = function extractIfAvailable(object, attributes) {
  if (typeof attributes === 'string' && object[attributes]) return _defineProperty({}, attributes, object[attributes]);
  if (Array.isArray(attributes)) {
    return attributes.reduce(function (result, attribute) {
      if (object[attribute]) result[attribute] = object[attribute];
    }, {});
  }
  return;
};

var getRequestData = function getRequestData(request) {
  return {
    url: "".concat(request.protocol, "://").concat(request.hostname).concat(request.originalUrl),
    body: request.body,
    pathParams: request.params,
    queryParams: request.query,
    getHeader: request.get,
    headers: request.headers,
    method: request.method,
    clientIp: request.clientIp
  };
};
var getFilterData = function getFilterData(response) {
  return {
    filter: response.locals
  };
};
var getControllerOptions = function getControllerOptions(options) {
  var sanitisedOptions = extractIfAvailable(options, 'getDatabaseConnection');
  return sanitisedOptions || {};
};

var _excluded = ["status", "payload"];
var ResponseHandler = /*#__PURE__*/function () {
  function ResponseHandler() {
    _classCallCheck(this, ResponseHandler);
  }
  _createClass(ResponseHandler, null, [{
    key: "getResponseData",
    value: function getResponseData(routeConfig) {
      var responseData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var status = responseData.status,
        payload = responseData.payload,
        userData = _objectWithoutProperties(responseData, _excluded);
      return {
        status: status || routeConfig.status || 200,
        data: payload || userData
      };
    }
  }]);
  return ResponseHandler;
}();

var errorHandler = function errorHandler(err) {
  logger.error(JSON.stringify(err));
};

var publishResponse = function publishResponse(response, status, data) {
  if (status && data && Object.keys(data).length !== 0) {
    response.status(status).json(data);
  } else if (status && (!data || Object.keys(data).length === 0)) {
    response.status(status).end();
  } else {
    response.end();
  }
};
var sendResponse = function sendResponse(routeConfig, responseData, response, serverConfig) {
  var _ResponseHandler$getR = ResponseHandler.getResponseData(routeConfig, responseData, serverConfig),
    status = _ResponseHandler$getR.status,
    data = _ResponseHandler$getR.data;
  logger.info('Response sent : ', JSON.stringify(data));
  if (serverConfig.delay > 0) {
    setTimeout(function () {
      publishResponse(response, status, data);
    }, serverConfig.delay * 1000);
  } else {
    publishResponse(response, status, data);
  }
};
var handleControllerResponse = function handleControllerResponse(routeConfig, controllerOptions, request, response, next) {
  if (typeof routeConfig.controller === 'function') {
    var requestData = _objectSpread2(_objectSpread2({}, getRequestData(request)), getFilterData(response));
    return routeConfig.controller(requestData, controllerOptions, request, response, next);
  } else if (_typeof(routeConfig.controller) === 'object') {
    return routeConfig.controller;
  }
  return;
};
var RouteProvider = (function (routeConfig, controllerOptions, serverConfig) {
  return function (request, response, next) {
    try {
      var responseData = handleControllerResponse(routeConfig, controllerOptions, request, response, next);
      if (responseData instanceof Promise) {
        responseData.then(function (data) {
          sendResponse(routeConfig, data, response, next, serverConfig);
        }, function (error) {
          errorHandler(error);
          publishResponse(response, GLOBAL_API_ERROR, error.message);
        });
        return;
      }
      sendResponse(routeConfig, responseData, response, serverConfig);
    } catch (error) {
      errorHandler(error);
      publishResponse(response, GLOBAL_API_ERROR, error.message);
    }
  };
});

var MiddlewareProvider = /*#__PURE__*/function () {
  function MiddlewareProvider() {
    _classCallCheck(this, MiddlewareProvider);
  }
  _createClass(MiddlewareProvider, null, [{
    key: "registerRequestLogger",
    value: function registerRequestLogger(app) {
      logger.debug('Registering request logger');
      app.use(function (request, response, next) {
        var data = getRequestData(request);
        logger.info('Request URL : ', JSON.stringify(data.url));
        logger.info('Request headers : ', JSON.stringify(data.headers));
        logger.info('Request body : ', JSON.stringify(data.body));
        next();
      });
    }
  }, {
    key: "registerIpMiddleware",
    value: function registerIpMiddleware(app) {
      logger.debug('Registering ip middleware');
      app.use(requestIp.mw());
    }
  }, {
    key: "registerFilters",
    value: function registerFilters(app, serverConfig) {
      logger.debug('Registering global filter');
      app.use(function (request, response, next) {
        var data = getRequestData(request);
        if (typeof serverConfig.filter === 'function') {
          logger.info('Executing filter...');
          var filterData = serverConfig.filter(data);
          if (filterData instanceof Promise) {
            filterData.then(function (filterDataResponse) {
              response.locals = filterDataResponse || {};
              next();
            }, errorHandler);
            return;
          }
          response.locals = filterData || {};
        }
        next();
      });
    }
  }, {
    key: "registerStatusEndpoint",
    value: function registerStatusEndpoint(app) {
      logger.debug('Registering /status endpoint to get routes information');
      app.get('/status', function (request, response) {
        response.send(app._router.stack);
      });
    }
  }]);
  return MiddlewareProvider;
}();

var configProcessor = function configProcessor(app, serverConfig) {
  app.set('port', serverConfig.port || 8000);
  app.set('x-powered-by', false);
};
var registerPreprocessor = function registerPreprocessor(app, serverConfig) {
  logger.debug('loading json processor');
  app.use(express.json());
  logger.debug('loading URL encoder');
  app.use(express.urlencoded({
    extended: true
  }));
  logger.debug('loading cors request handler');
  app.use(cors(serverConfig.cors));
};
var initPreProcessors = function initPreProcessors(app, serverConfig) {
  configProcessor(app, serverConfig);
  registerPreprocessor(app, serverConfig);
};

var ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }
  _createClass(ErrorHandler, null, [{
    key: "registerDevHandler",
    value: function registerDevHandler(app) {
      if (app.get('env') === 'development') {
        logger.debug('Loading Error handler');
      }
    }
  }]);
  return ErrorHandler;
}();

var serverSettingsSchema = {
  $$root: true,
  strict: true,
  type: 'object',
  optional: true,
  messages: {
    objectStrict: "Server settings contains forbidden keys: '{actual}', valid properties are '{expected}'"
  },
  props: {
    basePath: {
      type: 'string',
      "default": ''
    },
    port: {
      type: 'number',
      positive: true,
      integer: true,
      "default": 8000
    },
    delay: {
      type: 'number',
      positive: true,
      integer: true,
      "default": 0
    },
    logger: {
      type: 'multi',
      rules: [{
        type: 'boolean'
      }, {
        type: 'object',
        props: {
          enable: {
            type: 'boolean',
            "default": true
          },
          debug: {
            type: 'boolean',
            "default": false
          }
        }
      }],
      "default": true
    },
    filter: {
      type: 'function',
      optional: true
    },
    cors: {
      type: 'any',
      optional: true
    },
    middlewares: {
      type: 'array',
      optional: true
    },
    getDatabaseConnection: {
      type: 'function',
      optional: true
    }
  }
};

var validator = new FastValidator();
var serverSettingsValidator = validator.compile(serverSettingsSchema);

var ERROR = {
  VALIDATION_MESSAGE: 'occurred during validation of'
};

var commonResultProcessor = function commonResultProcessor(result, type) {
  if (result !== true) {
    var formattedMessages = result.map(function (_ref) {
      var message = _ref.message;
      return "\n".concat(message);
    });
    throw Error(["".concat(ERROR.VALIDATION_MESSAGE, " ").concat(type)].concat(_toConsumableArray(formattedMessages)).join(''));
  }
};
var validateServerSettings = function validateServerSettings(serverConfig) {
  logger.info('Validating Server settings');
  var validationStatus = serverSettingsValidator(serverConfig);
  commonResultProcessor(validationStatus, 'server settings');
};

var hasUniqueMethods = function hasUniqueMethods() {
  var endpointList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return endpointList.map(function (endpointHandler) {
    return endpointHandler.method;
  }).filter(function (method, index, methods) {
    return methods.indexOf(method) === index;
  }).length === endpointList.length;
};

var registerMethod = function registerMethod(app, endpoint, endpointHandlerConfigItem, controllerOptions, serverConfig) {
  var uri = "".concat(serverConfig.basePath || '').concat(endpoint);
  if (typeof endpointHandlerConfigItem.method === 'string') {
    var method = String(endpointHandlerConfigItem.method);
    logger.info('Registering route path:', method.toUpperCase(), uri);
    app[method.toLowerCase()](uri, RouteProvider(endpointHandlerConfigItem, controllerOptions, serverConfig));
  }
};
var NodeRestServer = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(app, routeConfig) {
    var serverConfig,
      _serverConfig$middlew,
      controllerOptions,
      customMiddleWares,
      customMiddleware,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          serverConfig = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          try {
            validateServerSettings(serverConfig);
            logger.info('Loading resources and starting server', serverConfig);
            logger.debug('initializing application logger with', JSON.stringify(serverConfig.logger));
            initializeLogger(serverConfig);
            logger.info('Applying preprocessors');
            initPreProcessors(app, serverConfig);
            logger.info('Applying global middlewares');
            MiddlewareProvider.registerRequestLogger(app);
            MiddlewareProvider.registerIpMiddleware(app);
            MiddlewareProvider.registerFilters(app, serverConfig);
            MiddlewareProvider.registerStatusEndpoint(app);
            controllerOptions = getControllerOptions(serverConfig);
            logger.debug('Applying custom global middlewares');
            customMiddleWares = (_serverConfig$middlew = serverConfig === null || serverConfig === void 0 ? void 0 : serverConfig.middlewares) !== null && _serverConfig$middlew !== void 0 ? _serverConfig$middlew : [];
            if (customMiddleWares.length > 0) {
              for (customMiddleware in customMiddleWares) {
                if (typeof customMiddleware === 'function') {
                  app.use(customMiddleware());
                }
              }
            }
            Object.keys(routeConfig).forEach(function (endpoint) {
              var endpointHandlerConfigs = routeConfig[endpoint];
              if (Array.isArray(endpointHandlerConfigs)) {
                if (hasUniqueMethods(endpointHandlerConfigs)) {
                  endpointHandlerConfigs.forEach(function (endpointHandlerConfigItem) {
                    return registerMethod(app, endpoint, endpointHandlerConfigItem, controllerOptions, serverConfig);
                  });
                } else {
                  logger.error('Multiple handlers for same http method found for endpoint : ', endpoint);
                }
              } else {
                registerMethod(app, endpoint, endpointHandlerConfigs, controllerOptions, serverConfig);
              }
            });
            ErrorHandler.registerDevHandler(app);
          } catch (error) {
            logger.error(error);
          }
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function NodeRestServer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export { NodeRestServer as default };
