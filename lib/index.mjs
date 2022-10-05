import express from 'express';
import chalk from 'chalk';
import DateFormat from 'date-fns/format/index.js';
import requestIp from 'request-ip';
import cors from 'cors';
import FastValidator from 'fastest-validator';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
    Object.defineProperty(target, descriptor.key, descriptor);
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

var handleControllerResponse = function handleControllerResponse(routeConfig, request, response, controllerOptions) {
  if (typeof routeConfig.controller === 'function') {
    var requestData = _objectSpread2(_objectSpread2({}, getRequestData(request)), getFilterData(response));

    return routeConfig.controller(requestData, controllerOptions);
  } else if (_typeof(routeConfig.controller) === 'object') {
    return routeConfig.controller;
  }

  return;
};

var RouteProvider = (function (routeConfig, controllerOptions, serverConfig) {
  return function (request, response) {
    try {
      var responseData = handleControllerResponse(routeConfig, request, response, controllerOptions);

      if (responseData instanceof Promise) {
        responseData.then(function (data) {
          sendResponse(routeConfig, data, response, serverConfig);
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
      while (1) {
        switch (_context.prev = _context.next) {
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
      }
    }, _callee);
  }));

  return function NodeRestServer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

export { NodeRestServer as default };
