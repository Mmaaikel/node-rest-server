'use strict';

var express = require('express');
var chalk = require('chalk');
var DateFormat = require('date-fns/format/index.js');
var cors = require('cors');
var FastValidator = require('fastest-validator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var DateFormat__default = /*#__PURE__*/_interopDefaultLegacy(DateFormat);
var cors__default = /*#__PURE__*/_interopDefaultLegacy(cors);
var FastValidator__default = /*#__PURE__*/_interopDefaultLegacy(FastValidator);

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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
  return DateFormat__default["default"](Date.now(), 'dd-MM-yyyy HH-mm-ss');
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
    var formattedLog = chalk__default["default"][color](jsonMessage.appName, '-', jsonMessage.timestamp, '-', jsonMessage.level, '\t-', jsonMessage.message);
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
    method: request.method
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

var errorHandler$1 = function errorHandler(err) {
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
          errorHandler$1(error);
          publishResponse(response, GLOBAL_API_ERROR, error.message);
        });
        return;
      }

      sendResponse(routeConfig, responseData, response, serverConfig);
    } catch (error) {
      errorHandler$1(error);
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
            }, errorHandler$1);
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
  app.use(express__default["default"].json());
  logger.debug('loading URL encoder');
  app.use(express__default["default"].urlencoded({
    extended: true
  }));
  logger.debug('loading cors request handler');
  app.use(cors__default["default"](serverConfig.cors));
};

var initPreProcessors = function initPreProcessors(app, serverConfig) {
  configProcessor(app, serverConfig);
  registerPreprocessor(app, serverConfig);
};

var errorHandler = require('errorhandler');

var ErrorHandler = /*#__PURE__*/function () {
  function ErrorHandler() {
    _classCallCheck(this, ErrorHandler);
  }

  _createClass(ErrorHandler, null, [{
    key: "registerDevHandler",
    value: function registerDevHandler(app) {
      if (app.get('env') === 'development') {
        logger.debug('Loading Error handler');
        app.use(errorHandler());
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
    getDatabaseConnection: {
      type: 'function',
      optional: true
    }
  }
};

var validator = new FastValidator__default["default"]();
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

var NodeRestServer = function NodeRestServer(routeConfig) {
  var serverConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    validateServerSettings(serverConfig);
    logger.info('Loading resources and starting server');
    var app = express__default["default"]();
    logger.debug('initializing application logger with', JSON.stringify(serverConfig.logger));
    initializeLogger(serverConfig);
    logger.debug('Applying preprocessors');
    initPreProcessors(app, serverConfig);
    logger.debug('Applying global middlewares');
    MiddlewareProvider.registerRequestLogger(app);
    MiddlewareProvider.registerFilters(app, serverConfig);
    MiddlewareProvider.registerStatusEndpoint(app);
    var controllerOptions = getControllerOptions(serverConfig);
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
    app.listen(app.get('port'), function () {
      logger.info('Server started listening on port', app.get('port'));
    });
  } catch (error) {
    logger.error(error);
  }
};

var nodeServer = module.exports = NodeRestServer;
nodeServer.NodeRestServer = NodeRestServer;
