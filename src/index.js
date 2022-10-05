import express from 'express';
import { RouteProvider, MiddlewareProvider } from './providers';
import { initializeLogger, logger } from './utils/Logger';
import { initPreProcessors } from './utils/ServerProcessor';
import ErrorHandler from './handlers/ErrorHander';
import { validateServerSettings } from './schema-validators';
import { getControllerOptions } from './handlers/RequestHandler';
import { hasUniqueMethods } from './utils/array';

const registerMethod = (app, endpoint, endpointHandlerConfigItem, controllerOptions, serverConfig) => {
	const uri = `${serverConfig.basePath || ''}${endpoint}`;
	if (typeof endpointHandlerConfigItem.method === 'string') {
		const method = String(endpointHandlerConfigItem.method);
		logger.info('Registering route path:', method.toUpperCase(), uri);
		app[method.toLowerCase()](uri, RouteProvider(endpointHandlerConfigItem, controllerOptions, serverConfig));
	}
};

const NodeRestServer = async (app, routeConfig, serverConfig = {}) => {
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
		const controllerOptions = getControllerOptions(serverConfig);

		logger.debug('Applying custom global middlewares');
		const customMiddleWares = serverConfig?.middlewares ?? [];
		if (customMiddleWares.length > 0) {
			for (let customMiddleware in customMiddleWares) {
				if (typeof customMiddleware === 'function') {
					app.use(customMiddleware());
				}
			}
		}

		Object.keys(routeConfig).forEach((endpoint) => {
			const endpointHandlerConfigs = routeConfig[endpoint];
			if (Array.isArray(endpointHandlerConfigs)) {
				if (hasUniqueMethods(endpointHandlerConfigs)) {
					endpointHandlerConfigs.forEach((endpointHandlerConfigItem) =>
						registerMethod(app, endpoint, endpointHandlerConfigItem, controllerOptions, serverConfig),
					);
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
};

export default NodeRestServer;
